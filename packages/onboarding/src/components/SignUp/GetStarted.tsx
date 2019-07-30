import React, { Fragment, useContext, useState } from 'react';
import { Icon, Input } from 'semantic-ui-react';
import * as _ from 'lodash';
import {
  OnboardHeader,
  OnboardSubHeader,
  OnboardInput,
  OnboardButton,
  CallToSignIn,
  OnboardDisclaimer,
  OnboardLogo
} from '../styles';
import { AppContext } from '../App';
import { IContext } from '../types';
import validations from '../validations';
import { checkEmail } from '../../services';

const GetStarted = () => {
  const { onSetStep, credentials, onSetCredentials, referralCode } = useContext<
    IContext
  >(AppContext);

  const [error, setError] = useState<any>({
    validation: false,
    exist: false
  });

  const onChangeEmail = _.debounce((e, data) => {
    const { value } = data;
    const validateEmail = validations.isEmail(value);

    validateEmail.fold(
      () => setError({ ...error, validation: true }),
      async () => {
        const alreadyExist: any = await checkEmail(value);

        alreadyExist.fold(
          () => {
            setError({ validation: false, exist: true });
          },
          () => {
            setError({ validation: false, exist: false });
            onSetCredentials('email', value);
          }
        );
      }
    );
  }, 500);

  const onKeyPress = event => {
    if (
      event.key === 'Enter' &&
      (credentials.email !== '' && !error.validation && !error.exist)
    ) {
      onSetStep('Register')();
    }
  };

  const header = !!referralCode
    ? 'True friends invited you to Raise'
    : 'Get started';

  return (
    <Fragment>
      <OnboardHeader>
        {header} <OnboardLogo />
      </OnboardHeader>
      <OnboardSubHeader>Create an account</OnboardSubHeader>
      <OnboardInput>
        <Input
          placeholder="Email address"
          onChange={onChangeEmail}
          error={error.validation || error.exist}
          onKeyPress={onKeyPress}
        />
        <Icon size="big" name="mail outline" />
        {error.validation && (
          <div className="errorText">
            That format doesn't look right. Make sure there aren't any typos.
          </div>
        )}
        {error.exist && (
          <div className="errorText">This email already exists.</div>
        )}
      </OnboardInput>
      <OnboardButton
        disabled={credentials.email === '' || error.validation || error.exist}
        onClick={onSetStep('Register')}
      >
        Next
      </OnboardButton>
      <OnboardDisclaimer>
        By signing up, I agree to Raise
        <button className="disclaimerBTN">Terms of Service</button> and
        <button className="disclaimerBTN">Privacy Policy</button>
      </OnboardDisclaimer>
      <CallToSignIn>
        Do you have an account already? Press here to
        <button className="callToSignIn" onClick={onSetStep('SignIn')}>
          Sign In
        </button>
      </CallToSignIn>
    </Fragment>
  );
};

export default GetStarted;

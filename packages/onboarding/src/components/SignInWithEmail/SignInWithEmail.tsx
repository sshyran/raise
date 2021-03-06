import React, { Fragment, useContext, useState, useCallback, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Icon, Input } from 'semantic-ui-react';
import { useMediaQuery } from 'react-responsive';
import { Button } from '@raisehq/components';
import * as _ from 'lodash';
import {
  OnboardHeader,
  OnboardInput,
  CallToSignIn,
  Separator,
  MyRecapcha,
  GoogleCaptchaPolicies
} from '../styles';
import validations from '../validations';
import AppContext from '../App.context';

const SignInWithEmail = () => {
  const {
    onSetStep,
    onSetCredentials,
    onLogin,
    error,
    setLoginError,
    credentials
  }: any = useContext(AppContext);

  const [errors, setErrors] = useState<{
    login: boolean;
    email: boolean;
  }>({
    login: false,
    email: false
  });
  const [recaptcha, setRecaptcha] = useState(null);

  const recaptchaRef: any = React.createRef();

  const onSetEmail = useCallback(
    _.debounce((_e: any, data: any) => {
      setLoginError(false);
      const { value } = data;
      const emailLowerCase = value.toLowerCase();
      const validateEmail = validations.isEmail(emailLowerCase);
      validateEmail.fold(
        () => setErrors({ ...errors, email: true }),
        () => {
          setErrors({ ...errors, email: false });

          onSetCredentials('email', emailLowerCase);
        }
      );
    }, 800),
    []
  );

  const onSetPassword = (e: any) => {
    setLoginError(false);
    onSetCredentials('password', e.target.value);
  };

  const onLoginCaptcha = () => {
    recaptchaRef.current.reset();
    recaptchaRef.current.execute();
  };

  const onKeyPress = (event: any) => {
    if (
      event.key === 'Enter' &&
      !error &&
      !errors.email &&
      credentials.email &&
      credentials.password
    ) {
      onLoginCaptcha();
    }
  };

  useEffect(() => {
    if (recaptcha) {
      onLogin();
    }
  }, [recaptcha]);

  const onCaptchaCallback = async (captchaResponse) => {
    onSetCredentials('g-recaptcha-response', captchaResponse);
    setRecaptcha(captchaResponse);
  };

  const onCaptchaExpired = (/* captchaResponse */) => {
    recaptchaRef.current.reset();
  };

  const onCaptchaErrored = (captchaError) => {
    console.error('Captcha error. You should check the network and retry: ', captchaError);
  };

  const isMobile = useMediaQuery({ maxWidth: 767 });

  if (isMobile) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <OnboardHeader>Welcome to Raise</OnboardHeader>
      <OnboardInput>
        <Input
          id="input-login"
          placeholder="Please enter you email address"
          onChange={onSetEmail}
          error={errors.email || error}
          onKeyPress={onKeyPress}
        />
        {errors.email && (
          <div className="errorText">
            This format doesn&apos;t look right. Make sure there aren&apos;t any typos.
          </div>
        )}
        <Icon size="big" name="mail" />
      </OnboardInput>
      <OnboardInput>
        <Input
          id="input-password"
          placeholder="Please enter your password"
          type="password"
          onChange={onSetPassword}
          error={error}
          onKeyPress={onKeyPress}
        />
        {error && (
          <div className="errorText">Sorry, I can&apos;t find anyone with these details.</div>
        )}
        <Icon size="big" name="lock" />
      </OnboardInput>
      <MyRecapcha
        ref={recaptchaRef}
        size="invisible"
        sitekey="6Lc9-rAUAAAAAH-rveEYo78h5rXiGnAVtsoE5rjc"
        render="explicit"
        onChange={onCaptchaCallback}
        onExpired={onCaptchaExpired}
        onErrored={onCaptchaErrored}
      />
      <Button
        idAttr="btn-login"
        disabled={error || errors.email || !credentials.email || !credentials.password}
        onClick={onLoginCaptcha}
        type="secondary"
        size="large"
        text="Login"
        fullWidth
      />

      <CallToSignIn>
        <button className="callToSignIn" type="button" onClick={onSetStep('Reset')}>
          Forgot password?
        </button>
      </CallToSignIn>
      <Separator />
      <CallToSignIn>
        You don&apos;t have an account?
        <button className="callToSignIn" type="button" onClick={onSetStep('Start')}>
          Get Started
        </button>
      </CallToSignIn>
      <GoogleCaptchaPolicies>
        This site is protected by reCAPTCHA and the Google{' '}
        <a href="https://policies.google.com/privacy">Privacy Policy</a> and{' '}
        <a href="https://policies.google.com/terms">Terms of Service</a> apply.
      </GoogleCaptchaPolicies>
    </Fragment>
  );
};

export default SignInWithEmail;

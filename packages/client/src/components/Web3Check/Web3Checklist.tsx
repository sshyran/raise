import React, { useContext } from 'react';
import { AppContext } from '../App';
import { List, Icon } from 'semantic-ui-react';
import { match, ANY, TAIL } from 'pampy';
import * as Bowser from 'bowser';

const Check = ({ value, message }) => {
  const iconProps = match(
    value,
    'error',
    () => ({ name: 'times', color: 'red' }),
    'pass',
    () => ({ name: 'check', color: 'green' }),
    'user-action',
    () => ({ name: 'exclamation', color: 'yellow' }),
    'pending',
    () => ({ name: 'minus', color: 'grey' })
  );
  return (
    <List.Item>
      <List.Content verticalAlign="middle">
        <Icon circular {...iconProps} size="small" />
        {message}
      </List.Content>
    </List.Item>
  );
};

export const satisfiesBrowser = () => {
  const browser = Bowser.getParser(window.navigator.userAgent);
  return !!browser.satisfies({
    // or in general
    chrome: '>50',
    firefox: '>53'
  });
};

const capitalize = s => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const Checklist = () => {
  const {
    web3Status: {
      hasProvider,
      unlocked,
      accountMatches,
      networkMatches,
      targetNetwork
    }
  }: any = useContext(AppContext);

  // Browsers compatible: Brave, Firefox, Chrome, Metamask mobile

  const steps = match(
    [satisfiesBrowser(), hasProvider, unlocked, networkMatches, accountMatches],
    [false, TAIL],
    () => ['error', 'pending', 'pending', 'pending'],
    [true, false, TAIL],
    () => ['user-action', 'pending', 'pending', 'pending'],
    [true, true, false, TAIL],
    () => ['pass', 'user-action', 'pending', 'pending'],
    [true, true, true, false, TAIL],
    () => ['pass', 'pass', 'user-action', 'pending'],
    [true, true, true, true, false],
    () => ['pass', 'pass', 'pass', 'user-action'],
    [true, true, true, true, true],
    () => ['pass', 'pass', 'pass', 'pass'],
    ANY,
    () => ['pending', 'pending', 'pending', 'pending']
  );

  const stepsMessage = [
    'Detecting Web3 provider',
    'Connect your wallet with Raise',
    `Select ${capitalize(targetNetwork)} network in your wallet`,
    'Sign message and bind your wallet to your account'
  ];

  const StepsDOM = steps.map((value, index) => (
    <Check key={index} value={value} message={stepsMessage[index]} />
  ));

  return <List>{StepsDOM}</List>;
};

export default Checklist;

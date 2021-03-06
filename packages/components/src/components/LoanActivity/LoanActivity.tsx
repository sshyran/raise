import React, { useState } from 'react';
import dayjs from 'dayjs';
import Card from '../Card';
import LoanActivityBody from './LoanActivityBody';
import { RepayCalendar } from '../RepayCalendar';
import { LoanLenderView } from '../../commons/graphTypes';
import { CoinsType } from '../../commons/coins';
import FlipCardAnimation from './FlipCardAnimation';
import { calculateInstalments } from '../../utils/progressiveCalcs';

interface LoanActivityProps {
  borrower: any;
  auction: Partial<LoanLenderView>;
  coin: CoinsType;
  children?: any;
  style?: React.CSSProperties;
  className?: string;
}

const LoanActivity = ({ children, auction, coin, ...rest }: LoanActivityProps) => {
  const [flipped, setFlip] = useState(false);
  const onOpen = () => setFlip(!flipped);

  const repayInfo = calculateInstalments(auction, coin?.decimals, dayjs().unix());

  const { schedules } = repayInfo;

  const activityProps = { onOpen, repayInfo, auction, coin, ...rest };
  const calendarProps = { onOpen, schedules };
  return (
    <Card width="372px">
      <FlipCardAnimation
        flipped={flipped}
        heads={<LoanActivityBody {...activityProps} />}
        tails={<RepayCalendar {...calendarProps} />}
      />
      {children}
    </Card>
  );
};

export default LoanActivity;

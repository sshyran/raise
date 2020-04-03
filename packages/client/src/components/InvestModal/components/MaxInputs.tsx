import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MaxButton = styled.div`
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  text-align: center;
  text-decoration-line: underline;
  color: #00da9e;
`;

const Divider = styled.div`
  margin: 0px 6px;
`;

const MaxInputs = ({ onClick, ...rest }) => {
  const fundAll = divisor => () => {
    onClick(divisor);
  };

  return (
    <Container {...rest}>
      <MaxButton id="btn-invest-all" onClick={fundAll(1)}>
        All balance
      </MaxButton>
      <Divider>|</Divider>
      <MaxButton id="btn-invest-half" onClick={fundAll(2)}>
        1/2
      </MaxButton>
      <Divider>|</Divider>
      <MaxButton id="btn-invest-quarter" onClick={fundAll(4)}>
        1/4
      </MaxButton>
    </Container>
  );
};

export default MaxInputs;

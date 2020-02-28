import styled from 'styled-components';

import { Checkbox } from 'semantic-ui-react';

export const CheckboxStyled = styled(Checkbox)`
  &&& {
    &&&.ui.checkbox label {
      font-family: Lato;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 24px;
      color: #b1b3b9;
    }

    .box:after,
    .box:before,
    label:after,
    label:before {
      transform: scale(1.28571429);
      transform-origin: left;
      top: 3px;
    }
    &&&.ui.checkbox input:focus ~ .box:before,
    &&&.ui.checkbox input:focus ~ label:before {
      border: 1px solid #c5c7cb;
      box-sizing: border-box;
    }
    &&& label::after {
      color: #eb3f93;
      top: -2px;
      font-weight: normal;
    }
    &&& label::before:hover {
      border: 1px solid #8a8e97;
    }
  }
`;

export const CheckboxLabel = styled.label`
  font-family: Lato;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
`;
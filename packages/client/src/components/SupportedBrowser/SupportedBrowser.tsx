import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import { CardSized, CardContent } from '../Layout/Layout.styles';
import { CardCenteredText, CardTitle, CardBottom } from './SupportedBrowser.styles';
import { IMAGES_PATH } from '../../commons/constants';

const SupportedBrowser = () => (
  <Grid.Row>
    <CardSized centered>
      <CardContent>
        <Image src={`${IMAGES_PATH}img_browser.png`} fluid />
        <CardCenteredText>
          <CardTitle>Your browser is not supported</CardTitle>
          <p>To access Raise you need to log using one of the following browsers</p>
        </CardCenteredText>
        <CardBottom>
          <span>
            <a href="https://www.mozilla.org/firefox"> Firefox</a>|
            <a href="https://www.google.com/chrome">Chrome</a>|
            <a href="https://brave.com/">Brave</a>|<a href="https://www.opera.com/">Opera</a>
          </span>
        </CardBottom>
      </CardContent>
    </CardSized>
  </Grid.Row>
);
export default SupportedBrowser;

/*

<BrowserView>
      <p>
        To access Raise you will need a browser that supports CryptoWallets:
        <span>
          <a href="https://www.mozilla.org/firefox"> Firefox</a>
          <span>, </span>
          <a href="https://www.google.com/chrome">Chrome</a>
          <span> and </span>
          <a href="https://brave.com/">Brave</a>.
        </span>
      </p>
    </BrowserView>
    <MobileView>
      <p>
        To access Raise on mobile please download{' '}
        <a href="https://mobile.metamask.io/Metamask">Metamask Mobile</a>.
      </p>
    </MobileView>

    */

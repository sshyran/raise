import React, { useState } from 'react';
import { Header, Segment, Loader, Dimmer, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import useAsyncEffect from '../../hooks/useAsyncEffect';
import { requestPage } from '../../helpers/butter';
import { BorrowerProfile as BorrowerProfileType } from '../../commons/BorrowerProfile';
import { BorrowerCard, SideInfo, Container } from './BorrowerProfile.styles';

const defaultBorrower = {
  companyName: 'Loading...',
  description: '',
  logo: '',
  socialNetworks: [],
  extraResources: [],
  kpi1: 0,
  kpi2: 0,
  url: ''
};

const BorrowerProfile = () => {
  const [borrower, setPayload]: [BorrowerProfileType, any] = useState(defaultBorrower);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const { companyName, description, logo, url } = borrower;

  useAsyncEffect(async () => {
    try {
      const response = await requestPage('borrower_profile', 'speck-sl');
      setPayload(response);
      setLoading(false);
    } catch (error) {
      setNotFound(true);
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      {loading && (
        <Segment>
          <Dimmer active={loading} inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src="https://react.semantic-ui.com/images/wireframe/short-paragraph.png" />
        </Segment>
      )}

      {notFound && (
        <Segment>
          <Header>Nothing here to see</Header>
          <p>Click in the button below to go home.</p>
          <Button primary as={Link} to="/">
            Return to home
          </Button>
        </Segment>
      )}
      {!notFound && (
        <>
          <BorrowerCard>
            <Image size="small" src={logo} />
            <a href={url} rel="noopener noreferrer" target="_blank">
              {url}
            </a>
            <Header>{companyName}</Header>
            <p>Last updated: 19.02.2018</p>
            <b>About</b>
            <p>{description}</p>
          </BorrowerCard>
          <SideInfo>
            <p>Ubication: Malaga, Spain</p>
          </SideInfo>
        </>
      )}
    </Container>
  );
};

export default BorrowerProfile;

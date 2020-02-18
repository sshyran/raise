import React, { useContext, useState } from 'react';
import { Header, Icon } from 'semantic-ui-react';
import { Element } from 'react-scroll';
import Slider from 'react-slick';
import {
  Slide,
  SlideContent,
  SlideDescription,
  SlideImage,
  SliderClose,
  SlideLink,
  NoSlider
} from './GetStarted.styles';
import { Wrapper } from './GetStarted.styles';
import AppContext from '../AppContext';
import { getGetStarted } from '../../helpers/butter';
import useAsyncEffect from '../../hooks/useAsyncEffect';

const settings = {
  dots: true,
  infinite: false,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  arrows: false
};

const getSlides = slides =>
  slides.map(slide => (
    <div key={slide.title} className="slide-wrapper">
      <Slide className="slides">
        <SlideContent className="images">
          <SlideImage src={slide.image}></SlideImage>
        </SlideContent>
        <SlideContent>
          <Header as="h1">{slide.title}</Header>
          <SlideDescription>{slide.description}</SlideDescription>
          <SlideLink href="https://raise.it/help" target="_blank">
            Learn more
          </SlideLink>
        </SlideContent>
      </Slide>
    </div>
  ));

const GetStarted = () => {
  const { getStarted, onSetGetStarted }: any = useContext(AppContext);
  const [slides, setSlides]: any = useState([]);

  useAsyncEffect(async () => {
    const content = await getGetStarted();

    setSlides(getSlides(content));
  }, []);

  console.log('get started::: ', getStarted, slides);

  return (
    <Element name="toGetStarted" className="element">
      <Wrapper visible={getStarted}>
        <SliderClose onClick={onSetGetStarted}>
          <Icon name="cancel" />
        </SliderClose>
        <Slider className="slider" {...settings}>
          {slides}
        </Slider>
        <NoSlider>{slides}</NoSlider>
      </Wrapper>
    </Element>
  );
};

export default GetStarted;

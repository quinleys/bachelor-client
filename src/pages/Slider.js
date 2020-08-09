import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

const Slide = (props) => {

  return <div>
    <img src={"https://quinten.staging.7.web.codedor.online/storage/carousel/" + props.slide.src}/>
  </div>
};

const Slider = (props) => {
 
  const slides = props.slides.map((slide) => <div data-src={"https://quinten.staging.7.web.codedor.online/storage/carousel/" + slide.src} key={slide.src} />);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  return (<AutoplaySlider
    animation="foldOutAnimation"
    cssModule={[CoreStyles, AnimationStyles]}
  play={true}
  cancelOnInteraction={false} // should stop playing on user interaction
  interval={2000}
  infinite={true}
  bullets={false}
  buttons={false}
>{slides}</AutoplaySlider>);
};

export default Slider;
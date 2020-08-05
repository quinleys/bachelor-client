import React from 'react';
import AwesomeSlider from 'react-awesome-slider';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import 'react-awesome-slider/dist/styles.css';
import CoreStyles from 'react-awesome-slider/src/core/styles.scss';
import AnimationStyles from 'react-awesome-slider/src/styled/fold-out-animation/fold-out-animation.scss';

const Slide = (props) => {
  console.log('This is something tiny missing somehwere...');
  return <div>
    <img src={"http://127.0.0.1:8000/storage/carousel/" + props.slide.src}/>
  </div>
};

const Slider = (props) => {
    console.log('props', props)
  const slides = props.slides.map((slide) => <div data-src={"http://127.0.0.1:8000/storage/carousel/" + slide.src} key={slide.src} />);
  const AutoplaySlider = withAutoplay(AwesomeSlider);

  console.log(slides);
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
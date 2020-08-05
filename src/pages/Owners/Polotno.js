
import React, { Component, Suspense } from 'react';
import { createDemoApp } from 'polotno/polotno-app';

const { store } = createDemoApp({ container: document.getElementById('polotno') });
class Polotno extends Component {
  render(){
      return (
          <div ></div>
      )
  }
}
export default Polotno;


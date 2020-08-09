import React from "react";
import { css } from "@emotion/core";
/* import ClipLoader from "react-spinners/ClipLoader";
import { Spin } from "antd"; */
import { MetroSpinner } from "react-spinners-kit";
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
 
class Spinner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }
 
  render() {
    return (
      <div className="row" style={{width: '100%'}}>
      <div className="col d-flex justify-content-center">
        <div className="sweet-loading">
        <MetroSpinner  size={35}
            color="#2369f6"
            loading={this.state.loading} />
          
        </div>
      </div>
      </div>
    );
  }
}
export default Spinner;
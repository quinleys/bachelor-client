import React, { Component } from 'react'

export default class CustomModal extends Component {
    render() {
        return (
            <div className="custommodal">
                <div className="customCard">
                    <h1>hello</h1>
                </div> 
                <div className="customImg">
                <img src={process.env.PUBLIC_URL + '/cardimg.jpeg'} ></img>
                </div> 
                
            </div>
        )
    }
}

import React, { Component } from 'react'
import Badge from 'reactstrap'

export default class Badges extends Component {
    constructor(props){
        super(props)
        this.state = {
            color: 'secundary'
          };
    }

    onClick = e => {
        console.log('click',e)
        if(this.state.color == 'secundary'){
            this.setState({
                color: 'primary'
            })
        }else {
            this.setState({
                color: 'secundary'
            })
        }

    }
    render() {
        return (
            <Badge color={this.state.color} onClick={this.onClick}>
                {this.props.title}
                </Badge>
        )
    }
}

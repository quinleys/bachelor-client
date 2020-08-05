import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import EuroIcon from '@material-ui/icons/Euro';
export default class PriceComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            price: this.props.price
        }
    }

    componentDidMount(){
        console.log(this.props.price)
    }
    render() {
        return (
            <Box>
                {this.state.price ? <Rating name="price" value={this.state.price.price}  max={3} icon={<EuroIcon fontSize="inherit" />} readOnly/> : null }
            </Box>
        )
    }
}

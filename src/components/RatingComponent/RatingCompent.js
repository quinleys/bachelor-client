import React, { Component } from 'react'
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';

export default class RatingComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            ratings: this.props.rating
        }
    }

    componentDidMount(){
        console.log('ratings',this.props.rating)
    }
    render() {
        return (
            <Box component="fieldset" mb={3} borderColor="transparent">
                        
            {this.state.rating ?   <Rating name="rating" defaultValue={0} onChange={this.onSubmitRating} value={this.state.rating.avg} /> : null }
           
           
               </Box>
        )
    }
}

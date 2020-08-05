import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Badge,Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink, Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, } from 'reactstrap';
import FadeIn from 'react-fade-in'
import ReservationModal from '../../components/ReservationModal/ReservationModal'

import { Link } from 'react-router-dom';

import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import LoginModal from '../../components/Auth/LoginModal';

export default class RestaurantCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: this.props.item
        }
    }
    render() {
        const { item } = this.state.item
        return (
             <div className="col-md-6">
                   {item ?                         
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                        >
                                             <Link to={{
                                                    pathname: `/restaurants:${item.id}`,
                                                    
                                                    }}>
                                        <Card key={item.id}>
                                        <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><h5><strong>{item.title}</strong></h5></CardTitle>
                                        <CardSubtitle><Badge>{item.category.title}</Badge></CardSubtitle>
                                        <CardText><p className="color-primary"><RoomIcon /> {item.address} </p>
                                        {console.log('rating', item.ratings)}
                                        {item.ratings ? <p>Rating {item.average_rating} <Rating name="rating" defaultValue={item.average_rating} readOnly/></p> : null }
                                        </CardText>
                                        <ReservationModal item={item} />   <LoginModal type='reserveerbutton'/> 
                                        </CardBody>
                                            </Card>
                                            </Link>
                                            </FadeIn>  
                                            : null } 
                                            </div>
        )
    }
}

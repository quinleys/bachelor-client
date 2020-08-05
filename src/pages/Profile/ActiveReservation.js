import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Container, Badge,Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink, Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Fade } from 'reactstrap';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { getAllFavorites } from '../../actions/favoriteActions';
import FadeIn from 'react-fade-in'
import { Link } from 'react-router-dom';
import Spinner from '../../components/Components/Spinner/Spinner'
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import ReservationModal from '../../components/ReservationModal/ReservationModal'
class ActiveReservations extends Component {
    state = { isHide: false };

    componentDidMount(){

        this.props.getAllFavorites();

    }
    render() {
        const { loading, favorites } = this.props.favorite;
        return (
            <div className="profile">
                 <h6> All favorites 🔥</h6>
                {loading ? 
                <Spinner />
                : 
                <div className="row">
                    {console.log(this.props.favorite)}
                    {favorites && favorites.map((m,i) => {
                        return (
                            <div className="col-md-6" key={i}>
                                            
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                        >
                                             <Link to={{
                                                    pathname: `/restaurants:${m.restaurant.id}`,
                                                    
                                                    }}>
                                        <Card key={m.id}>
                                        <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><h5><strong>{m.restaurant.title}</strong></h5></CardTitle>
                                        <CardSubtitle><Badge>{m.restaurant.category.title}</Badge></CardSubtitle> 
                                        <CardText><p className="color-primary"><RoomIcon /> {m.restaurant.address} </p>
                                        {console.log('rating', m.restaurant.ratings)}
                                        {m.restaurant.ratings ? <p>Rating {m.restaurant.average_rating} <Rating name="rating" defaultValue={m.restaurant.average_rating} readOnly/></p> : null }
                                        </CardText>
                                            <ReservationModal item={m.restaurant} /> 
                                        </CardBody>
                                            </Card>
                                            </Link>
                                            </FadeIn>  
                                            </div>
                        )
                    })}
                </div>
                }
            </div>
        )
    }
}
ActiveReservations.propTypes = {
    getAllFavorites: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    favorite: state.favorite,
    auth: state.auth,
})
export default connect(mapStateToProps, { getAllFavorites })(ActiveReservations)
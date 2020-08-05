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
import { Translation } from 'react-i18next';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import StarBorderIcon from '@material-ui/icons/StarBorder';
class Favorites extends Component {
    state = { isHide: false };

    componentDidMount(){

        this.props.getAllFavorites();

    }
    render() {
        const { loading, favorites } = this.props.favorite;
        return (
            <div className="profile mt-3 padding-top">
                <Container>
                 <h3>  <Trans i18nKey="allfavorites"></Trans></h3>
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
                                        {m.restaurant.average_rating ? <div className="row"><div><Rating  name="rating" defaultValue={m.restaurant.average_rating}  emptyIcon={<StarBorderIcon fontSize="14px" />} readOnly/> </div><div className="col v-centerText"> ({m.restaurant.totalrating})</div></div> : null }
                                        </CardText>
                                        </CardBody>
                                            </Card>
                                            </Link>
                                            </FadeIn>  
                                            </div>
                        )
                    })}
                </div>
                }
               </Container>
            </div>
        )
    }
}
Favorites.propTypes = {
    getAllFavorites: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    favorite: state.favorite,
    auth: state.auth,
})
export default connect(mapStateToProps, { getAllFavorites })(Favorites)
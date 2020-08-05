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
import { getReservations } from '../../actions/reservationActions'
import ReservationModal from '../../components/ReservationModal/ReservationModal'
import { Translation } from 'react-i18next';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
class AllReservations extends Component {
    state = { isHide: false };

    componentDidMount(){

        this.props.getReservations();

    }
    render() {
        const { loading, reservations } = this.props.reservation;
        return (
            <div className="profile mt-3">
                <Container>
                 <h3> <Trans i18nKey="allreservations"></Trans></h3>
                {loading && !reservations ? 
                <Spinner />
                : 
                <div className="row">
                    {console.log(reservations.all)}
                     {reservations.all && reservations.all.map((m,i) => {
                        return (
                            <div className="col-md-6" key={i}>
                            <Card key={m.id}>
                            <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                            <CardBody>
                            <CardTitle><strong>{m.restaurant.title}</strong>
                            <p>Datum: {m.date}</p>
                            <p>Uur: {m.time}</p>
                            <p>Aantal: {m.persons} personen</p>
                            <a target="_blank" href={`https://www.google.com/maps/place/${m.restaurant.address}`}>
                            <p className="color-primary mt-3"><RoomIcon /> {m.restaurant.address} </p>
                            </a>
                            </CardTitle>
                            <Link to={`/restaurants:${m.restaurant.id}`}>
                            <Button className="my-2 fullLengthButton blueButton">
                                Bekijk restaurant
                            </Button>
                            </Link>
                            </CardBody>
                            </Card>
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
AllReservations.propTypes = {
    getReservations: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    reservation: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    reservation: state.reservation,
    auth: state.auth,
})
export default connect(mapStateToProps, { getReservations })(AllReservations)
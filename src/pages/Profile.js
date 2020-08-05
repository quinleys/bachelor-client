import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getReservations, getPastReservations, getFutureReservations } from '../actions/reservationActions';
import { Container, Badge,Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink, Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Fade } from 'reactstrap';
import HorizontalScroll from 'react-scroll-horizontal'
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { makeStyles } from '@material-ui/core/styles';
import SingleLineGridList from '../components/GridList/GridList';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getFavorites} from '../actions/favoriteActions'
import { Link } from 'react-router-dom';
import Spinner from '../components/Components/Spinner/Spinner'
import AddToCalendar from 'react-add-to-calendar';
import RoomIcon from '@material-ui/icons/Room';
import AnnulationModal from '../components/AnnulationModal/AnnulationModal'
import { Translation } from 'react-i18next';
import i18n from '../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
class Profile extends Component {
    state = { isHide: false,
        event: {
            title: 'Avondje eten',
            description: 'This is the sample event provided as an example only',
            location: 'Portland, OR',
            startTime: '2016-09-16T20:15:00-04:00',
            endTime: '2016-09-16T21:45:00-04:00'
          }
      
     };

    componentDidMount(){

        this.props.getPastReservations();
        this.props.getFutureReservations();
        this.props.getFavorites();
        
        console.log(this.props.reservation)
    }


    render() {
        const { past,future, loading } = this.props.reservation; 
        const { userfavs } = this.props.favorite;
        const { isAuthenticated, user } = this.props.auth;
        return (
            <Container className="profile mt-2 padding-top">
                {this.props.favorite.loading &&  loading ? <Spinner /> : 
                <div>
                <h3><Trans i18nKey="myprofile"></Trans></h3>
                
                <div className="row">
                    <div className="col-12">
                <Accordion>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    >
                    <Typography ><Trans i18nKey="basicinformation"></Trans></Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <div className="col-12">
                            {console.log(user, 'user')}
                            {user && !loading ? 
                            <div>
                             <Typography><Trans i18nKey="name"></Trans>: {user.name}</Typography> 
                             <Typography><Trans i18nKey="email"></Trans>: {user.email}</Typography> 
                             </div>
                      : null  }
                   
                    </div>
                    </AccordionDetails>
                    {console.log('future', future)}
                </Accordion>
                </div>
                </div>
                <div className="row mt-3">
                <h3><Trans i18nKey="myreservations"></Trans></h3>
                
                <div className="row my-2">
                   <h6> <Trans i18nKey="activereservations"></Trans>({future.total}) </h6>
                    {future.total > 3 ? <Link to="/profile/reservations">  | <Trans i18nKey="viewall"></Trans></Link> : null}
                    <div className="row">

                        {future.data && future.data.map((m,i) => {
                            return(
                                <div className="col-md-4" key={i}>
                                <Card key={m.id}>
                                <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                <CardBody>
                                <CardTitle><strong>{m.restaurant.title}</strong>
                                <p><Trans i18nKey="date"></Trans>: {m.date}</p>
                                <p><Trans i18nKey="hour"></Trans>: {m.time}</p>
                                <p><Trans i18nKey="persons"></Trans>: {m.persons} </p>
                                <a target="_blank" href={`https://www.google.com/maps/place/${m.restaurant.address}`}>
                                <p className="color-primary mt-3"><RoomIcon /> {m.restaurant.address} </p>
                                </a>
                                </CardTitle>
                                <Button className="my-2 fullLengthButton blueButton">
                                    <AddToCalendar event={{
                                        title : m.restaurant.title,
                                        description: 'Gaan eten met ' + m.persons + ' personen',
                                        location: m.restaurant.address ,
                                        // fix timme                                     
                                    }} />
                                </Button >
                                <AnnulationModal item={m}/>
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
                    </div>
                    </div>
                    <div className="row my-2">
                    <h6><Trans i18nKey="pastreservations"></Trans>({past.total})</h6>
                    {past.total > 3 ? <Link to="/profile/reservations"> | <Trans i18nKey="viewall"></Trans></Link>: null}
                    <div className="row">
                    {console.log('reservations',past)}
                    { past.data && past.data.map((m,i) => {
                    return(
                   
                            <div className="col-md-4" key={i}>
                                <Card key={m.id}>
                                <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                <CardBody>
                                <CardTitle><strong>{m.restaurant.title}</strong>
                                <p><Trans i18nKey="date"></Trans>: {m.date}</p>
                                <p><Trans i18nKey="hour"></Trans>: {m.time}</p>
                                <p><Trans i18nKey="persons"></Trans>: {m.persons} </p>
                                <a target="_blank" href={`https://www.google.com/maps/place/${m.restaurant.address}`}>
                                <p className="color-primary mt-3"><RoomIcon /> {m.restaurant.address} </p>
                                </a>
                                </CardTitle>
                                <Link to={`/restaurants:${m.restaurant.id}`}>
                                <Button className="my-2 fullLengthButton blueButton">
                                <Trans i18nKey="gotorestaurant"></Trans>
                                </Button>
                                </Link>
                                </CardBody>
                                </Card>
                            </div>
           

                    )
                }) }
                </div>
                </div>
                <div className="row my-2">
                    <div className="row">
                    <h3><Trans i18nKey="myfavorites"></Trans>({userfavs.total}) </h3>
                    { userfavs.total > 3 ? <Link to="/profile/favorites"> |  <Trans i18nKey="viewall"></Trans> </Link>: null}
                    </div>
                    <div className="row">
                    { userfavs.data && userfavs.data.map((m,i) => {
                    return(
                        <div className="col-md-4" key={i}>
                            <Link to={{
                                                    pathname: `/restaurants:${m.id}`,
                                                    
                                                    }}>
                                <Card key={m.id}>
                                <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                <CardBody>
                                <CardTitle><strong>{m.restaurant.title}</strong>
                                <a target="_blank" href={`https://www.google.com/maps/place/${m.restaurant.address}`}>
                                <p className="color-primary mt-3"><RoomIcon /> {m.restaurant.address} </p>
                                </a>
                                </CardTitle>
                                <Link to={`/restaurants:${m.restaurant.id}`}>
                                <Button className="my-2 fullLengthButton blueButton">
                                <Trans i18nKey="gotorestaurant"></Trans>
                                </Button>
                                </Link>
                                </CardBody>
                                </Card>
                                </Link>
                            </div>
                    )
                }) }
                    </div>
                </div>
                </div>
                 }
            </Container>
           
        )
    }
}
Profile.propTypes = {
    getReservations: PropTypes.func.isRequired,
    getFutureReservations: PropTypes.func.isRequired,
    getPastReservations: PropTypes.func.isRequired,
    getFavorites: PropTypes.func.isRequired,
    reservation: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    favorite: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    reservation: state.reservation,
    favorite: state.favorite,
    auth: state.auth,
})
export default connect(mapStateToProps, { getReservations, getPastReservations,getFavorites, getFutureReservations })(Profile)
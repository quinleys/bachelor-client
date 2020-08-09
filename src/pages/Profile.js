import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { getReservations, getPastReservations, getFutureReservations } from '../actions/reservationActions';
import { Container,Button, Card, CardImg, CardText, CardBody,
    CardTitle } from 'reactstrap';
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
import { Trans } from 'react-i18next'
import FadeIn from 'react-fade-in'
class Profile extends Component {
    state = { isHide: false,
       
      
     };

    componentDidMount(){

        this.props.getPastReservations();
        this.props.getFutureReservations();
        this.props.getFavorites();
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
                      
                            {user && !loading ? 
                            <div>
                             <Typography><Trans i18nKey="name"></Trans>: {user.name}</Typography> 
                             <Typography><Trans i18nKey="email"></Trans>: {user.email}</Typography> 
                             </div>
                      : null  }
                   
                    </div>
                    </AccordionDetails>
                  
                </Accordion>
                </div>
                </div>
                <div className="row mt-3">
                   
                <h3><Trans i18nKey="myreservations"></Trans></h3>
                </div>
                {past.data && future.data && future.data.length + past.data.length == 0 ?
                <div className="row mt-3">
                   
                <p><Trans i18nKey="noreservations"></Trans></p>
                </div>
                : null }
                {future.data && future.data.length > 0 ? 
                <div className="row my-2">
                   <h6> <Trans i18nKey="activereservations"></Trans>({future.total}) </h6>
                    {future.total > 3 ? <Link to="/profile/reservations">  | <Trans i18nKey="viewall"></Trans></Link> : null}
                    
                    <div className="row">
                            {future.data && past.data && future.data.length + past.data.length > 0 ? null : <div>No reservations</div>}
                        {future.data && future.data.length > 0 ? future.data.map((m,i) => {
                            return(
                                <div className="col-md-4" key={i}>
                                <Card key={m.id}>
                                <CardImg top className="img-fluid image-responsive" src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.restaurant.primary_img}`} alt="Card image cap" />
                                <CardBody>
                                <CardTitle><h5><strong>{m.restaurant.title}</strong></h5></CardTitle>
                                <CardText>
                                <p><Trans i18nKey="date"></Trans>: {m.date}</p>
                                <p><Trans i18nKey="hour"></Trans>: {m.time}</p>
                                <p><Trans i18nKey="persons"></Trans>: {m.persons} </p>
                                <a target="_blank" href={`https://www.google.com/maps/place/${m.restaurant.address}`}>
                                <p className="color-primary mt-3"><RoomIcon /> {m.restaurant.address} </p>
                                </a>
                                </CardText>
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
                                <Trans i18nKey="gotorestaurant"></Trans>
                                </Button>
                                </Link>
                                </CardBody>
                                </Card>
                            </div>
                            )
                        }) : null}
                    </div>
                    </div>
                 : null }
                 {past.data && past.data.length > 0 ? 
                    <div className="row my-2">
                    <h6><Trans i18nKey="pastreservations"></Trans>({past.total})</h6>
                    {past.total > 3 ? <Link to="/profile/reservations"> | <Trans i18nKey="viewall"></Trans></Link>: null}
                    <div className="row">
                  
                    { past.data && past.data.length > 0 ? past.data.map((m,i) => {
                    return(
                   
                            <div className="col-md-4" key={i}>
                                <Card key={m.id}>
                                <CardImg top className="img-fluid image-responsive" src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.restaurant.primary_img}`} alt="Card image cap" />
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
                }) : null}
                </div>
                </div>
                : null }
                <div className="row my-2">
                    <div className="row">
                    <h3><Trans i18nKey="myfavorites"></Trans>{userfavs.data && userfavs.data.length > 0 ? ` ( ${userfavs.total} )` : null }</h3>
                    </div>
                    { userfavs.total > 3 ? <Link to="/profile/favorites"> |  <Trans i18nKey="viewall"></Trans> </Link>: null}
                    </div>
                    <div className="row">
                    { userfavs.data && userfavs.data.length > 0 ? userfavs.data.map((m,i) => {
                    return(
                        <div className="col-md-4 my-2 d-flex align-items-stretch" key={i}>
                                            
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                            className="d-flex align-items-stretch"
                                        >
                                             <Link to={{
                                                    pathname: `/restaurants:${m.restaurant.id}`,
                                                    
                                                    }}>
                                        <Card key={m.id} className="h-100">
                                        <CardImg top  className="img-fluid image-responsive" src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.restaurant.primary_img}`} alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><h5><strong>{m.restaurant.title}</strong></h5></CardTitle>
                                        <CardText>
                                        <p className="pt-1"><RoomIcon /> {m.restaurant.address} </p>
                                      
                                        <Link to={`restaurants:${m.restaurant.id}`}><Button className="my-2 fullLengthButton blueButton"><Trans i18nKey="gotorestaurant"></Trans></Button></Link>
                                        </CardText>
                                   
                                        </CardBody>
                                            </Card>
                                            </Link>
                                            </FadeIn>  
                                            </div>
                    )
                }) : 
                <div>
              <Trans i18nKey="nofavorites"></Trans></div> }
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
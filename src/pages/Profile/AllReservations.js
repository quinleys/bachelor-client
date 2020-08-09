import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Container,Button,Card, CardImg, CardBody,
    CardTitle,  } from 'reactstrap';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Components/Spinner/Spinner'
import RoomIcon from '@material-ui/icons/Room';
import { getReservations } from '../../actions/reservationActions'
import moment from 'moment';
// the hoc
import { Trans } from 'react-i18next'
import FadeIn from 'react-fade-in'
import AnnulationModal from '../../components/AnnulationModal/AnnulationModal'
class AllReservations extends Component {
    state = { isHide: false };
    state= { searchedNew : false }
    componentDidMount(){

        this.props.getReservations();

    }
    searchNew = () => {
        this.setState({
            searchNew : true,
        }, this.props.getReservations())
    }
    render() {
        const { loading, reservations } = this.props.reservation;
        return (
            <div className="profile mt-3  padding-top">
                <Container>
                 <h3> <Trans i18nKey="allreservations"></Trans></h3>
                {loading && !reservations.all ? 
                <Spinner />
                : 
               reservations.all && reservations.all.length > 0 ? 
                <div className="row">
                     {reservations.all && reservations.all.map((m,i) => {
                        return (
                            <div className="col-md-6 my-2 d-flex align-items-stretch" key={i}>
                                            
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                            className="d-flex align-items-stretch"
                                        >
                            <Card key={m.id} className="h-100">
                            <CardImg top width="100%" className="img-fluid image-responsive" src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.restaurant.primary_img}`}  alt="Card image cap" />
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
                            {console.log(m, moment().format("YYYY-MM-DD hh-mm-ss"))}
                            { m.date_time > moment().format("YYYY-MM-DD hh-mm-ss") ? 
                            <AnnulationModal item={m} onClick={() => this.setState({ searchNew: false }) }/>
                         : null }
                            </CardBody>
                            </Card>
                            </FadeIn>
                        </div>
                        )
                    })}
                    
              
                </div>
                 : 'geen reservaties' 
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
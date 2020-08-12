import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Container, Badge,Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

import { getAllFavorites } from '../../actions/favoriteActions';
import FadeIn from 'react-fade-in'
import { Link } from 'react-router-dom';
import Spinner from '../../components/Components/Spinner/Spinner'
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
// the hoc
import { Trans } from 'react-i18next'
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
                            <div className="col-md-6 my-2 d-flex align-items-stretch" key={i}>
                                            
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                            className="d-flex align-items-stretch"
                                        >
                                            
                                        
                                             <Link to={{
                                                    pathname: `/restaurants:${m.restaurant.id}`,
                                                    
                                                    }}>
                                        <Card key={m.id} className="h-100">
                                        <CardImg top width="100%" className="img-fluid image-responsive" src={`https://quinten.staging.7.web.codedor.online/storage/primary_imgs/${m.restaurant.primary_img}`}  alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><h5><strong>{m.restaurant.title}</strong></h5></CardTitle>
                                        <CardSubtitle><Badge>{m.restaurant.category.title}</Badge></CardSubtitle> 
                                        <CardText><p><RoomIcon /> {m.restaurant.address} </p>
                                        {m.restaurant.average_rating ? <div className="row"><div><Rating  name="rating" precision={0.5}  defaultValue={m.restaurant.average_rating}   readOnly/> </div><div > ({m.restaurant.totalrating})</div></div> : null }
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
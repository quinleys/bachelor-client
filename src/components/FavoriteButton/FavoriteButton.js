import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addFavorite, deleteFavorite } from '../../actions/favoriteActions';
import  FavoriteIcon  from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { Trans } from 'react-i18next'
class FavoriteButton extends Component {
    constructor(props){
        super(props)
        this.state = {
            item: this.props.item,
            id: '',
            favorite: this.props.favorite,
            
        }
    }
    compoponentDidMount(){
        
    }
    favorite = () => {
        this.setState({
            favorite: !this.state.favorite
        },
        function(){
            if(this.state.favorite){
                
                let restaurant_id = this.props.item.item.id;
                let user_id = localStorage.getItem('id');

                const favorite = {
                    restaurant_id,
                    user_id,
                    
                }
                this.props.addFavorite(favorite);
            }else{
                
                this.props.item.item.favorites.map(m => {
                   
                    if(m.user_id == localStorage.getItem('id')){
                       
                        this.props.deleteFavorite(m.id)
                    }
                   
                })  
                

            }
        }
        )
    }
    render() {
        const { isAuthenticated } = this.props.auth
        return (
            <div onClick={this.favorite}>
                <Button  variant="outlined" className="outlinedButton" >
                    
                {this.state.favorite ?<div> <Trans i18nKey="favorited"></Trans> <FavoriteIcon /> </div>  : <div> <Trans i18nKey="favorite"></Trans> <FavoriteBorderIcon /> </div>}
                </Button>
            </div>
        )
    }
}
FavoriteButton.propTypes = {
    addFavorite: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    item: state.item,
    auth: state.auth,
})

export default connect(mapStateToProps, { addFavorite, deleteFavorite })(FavoriteButton)
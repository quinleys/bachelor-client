
import errorReducer from './errorReducer';
import authReducer from './authReducer'; 
import itemReducer from './itemReducer';
import categoriesReducer from './categoriesReducer'
import ratingReducer from './ratingReducer'
import reservationReducer from './reservationReducer'
import commentReducer from './commentReducer'
import paymentsReducer from './paymentsReducer'
import facilitiesReducer from './facilitiesReducer'
import favoriteReducer from './favoriteReducer'
import personsReducer from './personsReducer'
import tableReducer from './tableReducer'
import roomReducer from './roomReducer'
import { combineReducers } from 'redux';
import extraReducer from './extraReducer';
import  layoutReducer from './layoutReducer';
import dashboardReducer from './dashboardReducer';
import priceReducer from './priceReducer';

export default combineReducers({
    item: itemReducer,
    auth: authReducer,
    payments: paymentsReducer,
    facilities: facilitiesReducer,
    categories: categoriesReducer,
    favorite: favoriteReducer,
    reservation: reservationReducer,
    rating: ratingReducer,
    persons: personsReducer,
    layout: layoutReducer,
    table: tableReducer,
    room: roomReducer,
    comment: commentReducer, 
    dashboard: dashboardReducer,
    extra: extraReducer,
    error: errorReducer,
    price: priceReducer,
});

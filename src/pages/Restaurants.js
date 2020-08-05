import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container, Badge,Button, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink, Alert, Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, } from 'reactstrap';
import { getItems , loadNext } from '../actions/itemActions';
import FadeIn from 'react-fade-in'
import Grid from '@material-ui/core/Grid';
import Slide from '@material-ui/core/Slide';
import { Link } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import FaceIcon from '@material-ui/icons/Face';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SearchIcon from '@material-ui/icons/Search';
import Collapse from '@material-ui/core/Collapse';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import PeopleIcon from '@material-ui/icons/People';
import EuroIcon from '@material-ui/icons/Euro';
import GradeIcon from '@material-ui/icons/Grade';
import StoreIcon from '@material-ui/icons/Store';
import PaymentIcon from '@material-ui/icons/Payment';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FilterListIcon from '@material-ui/icons/FilterList';
import Drawer from '@material-ui/core/Drawer';
import Fab from '@material-ui/core/Fab';
import CancelIcon from '@material-ui/icons/Cancel';
import SortIcon from '@material-ui/icons/Sort';
import { withStyles } from '@material-ui/core/styles';
import DatePicker from 'react-date-picker'
import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from "react-js-pagination";
import CloseIcon from '@material-ui/icons/Close';
import  Spinner  from '../components/Components/Spinner/Spinner'
import Fade from '@material-ui/core/Fade';
import TextRotateUpIcon from '@material-ui/icons/TextRotateUp';
import TextRotateVerticalIcon from '@material-ui/icons/TextRotateVertical';
import RoomIcon from '@material-ui/icons/Room';
import Rating from '@material-ui/lab/Rating';
import LoginModal from '../components/Auth/LoginModal';
import moment from 'moment';
import Box from '@material-ui/core/Box';
import { Translation } from 'react-i18next';
import i18n from '../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import TooManyRequests from './TooManyRequest'
import { clearErrors } from '../actions/errorActions'; 

function ListItemLink(props) {
    return <ListItem button component="a" {...props} />;
  }

class Restaurants extends Component {
    constructor(props){
        super(props)
        this.state = {
            selectedFilters: [],
            cost: '',
            time: '',
            day: '',
            date:'',
            address: '',
            persons: '',
            dateForm: null,
            timeForm: null,
            personsForm: 0,
            title: '',
            category: '',
            selectedSorting: '',
            bottom: false,
            rating: '',
            sort: '',
            page: 1,
            price: '',
            amountOfpage: 1,
            categories: [],
            facilities: [],
            anchorEl: null,
            openFilterCategory: false,
            openFilterPersonen: false,
            openFilterPrijs: false,
            openFilterRating : false,
            ToggleViewFilters: false,
            openFilterFacility: false,
            openFilterPayment: false,
            openFilterSort: false,
            payments: [],
            openAvailability: false,
            filters: [],
            checkBoxfilters: [],
            url: '',
            day: '',
            filterPage: '?page=1',
            filterRating: '&filter[rating]=',
            filterTitle: '?filter[title]=',
            filterCategory: '&filter[category.title]=',
            filterPayments: '&filter[payments.id]=',
            filterFacilities: '&filter[facilities.id]=',
            filterPrice: '&filter[price]=',
            filterAvailability : '&filter[availability]=1',
            // fix != date & time
            filterDate: '&filter[day]=',
            filterTime: '&filter[time]=',
            filterAddress: '&filter[address]=',
            filterPersons: '&filter[layouts.tables.persons]=',
            sortText: '&sort=',
            filterAantalPersons: [
                {"id" : 1 , "value" : 1 , "title": "1 persoon"},
                {"id" : 2 , "value" : 2 , "title": "2 personen"},
                {"id" : 3 , "value" : 3 , "title": "3 personen"},
                {"id" : 4 , "value" : 4 , "title": "4 personen"},
                {"id" : 5 , "value" : 5 , "title": "5 personen"},
                {"id" : 6 , "value" : 6 , "title": "6 personen"},
                {"id" : 7 , "value" : 7 , "title": "7 personen"},
            ],
            filterAantalPrijs: [
                {"id":1 , "value" : 1 , "title": "Goedkoop"},
                {"id":2 , "value" : 2 , "title": "Normaal"},
                {"id":3, "value" : 3 , "title": "Duur"},
            ],
            filterAantalRating: [
                {"id":1 , "value" : 1 , "title": "1 Ster"},
                {"id":2 , "value" : 2 , "title": "2 Sterren"},
                {"id":3, "value" : 3 , "title": "3 Sterren"},
                {"id":4, "value" : 4 , "title": "4 Sterren"},
                {"id":5, "value" : 5 , "title": "3 Sterren"},
            ],
            filterUrl: '',
        }
    }
    componentDidMount(){
        console.log(this.props.prices, 'prices')
        console.log(this.state.url)
        console.log(this.props.location.searchProps)
        
        if(this.props.location.searchProps){
            console.log('category', this.props.location.searchProps.categories)
            console.log('availabilty', this.props.location.searchProps)
            if( this.props.location.searchProps.date && this.props.location.searchProps.time && this.props.location.searchProps.date != '' && this.props.location.searchProps.time != '' ){
                
                if(this.props.location.searchProps.persons != '' ){
                    this.setState({
                        date: this.props.location.searchProps.date,
                        time: this.props.location.searchProps.time,
                        personsForm: this.props.location.searchProps.persons,
                        categories: this.props.location.searchProps.categories,
                        title: this.props.location.searchProps.title,
                    }, this.props.getItems( this.state.filterTitle + this.props.location.searchProps.title +  this.state.filterAvailability + this.state.filterCategory + this.props.location.searchProps.categories.map(m => m.title) + this.state.filterDate + this.props.location.searchProps.date + ' ' + this.props.location.searchProps.time + this.state.filterPersons + this.props.location.searchProps.persons + this.state.sortText + this.state.sort)  );
   
                
                        let item = {"class" : "availability", "value" :  this.props.location.searchProps.date + ' ' + this.props.location.searchProps.time + ' ' + this.props.location.searchProps.persons };
                        
                        this.setState(previousState => ({
                            filters: [...previousState.filters, item]
                        }));
                        this.setState(previousState => ({
                            checkBoxfilters: [...previousState.checkBoxfilters, 'availability']
                        }));

                }else {

                    this.setState({
                        date: this.props.location.searchProps.date,
                        time: this.props.location.searchProps.time,
                        title: this.props.location.searchProps.title,
                        persons: this.props.location.searchProps.persons,
                        categories: this.props.location.searchProps.categories,
                    }, this.props.getItems( this.state.filterTitle + this.props.location.searchProps.title + this.state.filterCategory + this.props.location.searchProps.categories.map(m => m.title) + this.state.filterDate + this.props.location.searchProps.date + ' ' + this.props.location.searchProps.time + this.state.filterPersons + this.props.location.searchProps.persons + this.state.sortText + this.state.sort)  );
                
                    let item = {"class" : "day", "value" :  this.props.location.searchProps.date + ' ' + this.props.location.searchProps.time };
                        
                    this.setState(previousState => ({
                        filters: [...previousState.filters, item]
                    }));

                    this.setState(previousState => ({
                        checkBoxfilters: [...previousState.checkBoxfilters, 'day' ]
                    }));
                
                }
              
                
           
                if(this.props.location.searchProps.title){
                 
                    let item = {"class" : "title", "value" :  this.props.location.searchProps.title};
                    this.setState(previousState => ({
                        filters: [...previousState.filters, item]
                    }));
                }
                

                if(this.props.location.searchProps.categories.length >= 1){
                    console.log('categories',this.props.location.searchProps.categories )
                    
                    if(this.props.location.searchProps.categories.length > 1){
                       
                        this.props.location.searchProps.categories.map(m => {
                            
                            let checkbox = m.title;
    
                            if(this.state.checkBoxfilters.includes(m.title)){
                                this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                                    return filter !== checkbox
                                })});
                            }else{
                                this.setState(previousState => ({
                                    checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
                                }));
                            }
                            console.log('cat',m.title)
                            let item = {"class" : "category.title", "value" :  m.title};
                            if(this.state.filters.includes(item)){
                                this.setState({filters: this.state.filters.filter(function(filter) { 
                                    return filter !== item
                                })});
                            }else{
                                this.setState(previousState => ({
                                    filters: [...previousState.filters, item ]
                                }));
                            }
                        })

                    }else {
                        let item = {"class" : "category.title", "value" :  this.props.location.searchProps.categories[0].title};
                        let checkbox = this.props.location.searchProps.categories[0].title;
    
                            if(this.state.checkBoxfilters.includes(checkbox)){
                                this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                                    return filter !== checkbox
                                })});
                            }else{
                                this.setState(previousState => ({
                                    checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
                                }));
                            }
                        this.setState(previousState => ({
                            filters: [...previousState.filters, item]
                        }));
                    }
    
                }
            }else{

          
            this.setState({
                date: this.props.location.searchProps.date,
                time: this.props.location.searchProps.time,
                title: this.props.location.searchProps.title,
                persons: this.props.location.searchProps.persons,
                categories: this.props.location.searchProps.categories,
            }, this.props.getItems( this.state.filterTitle + this.props.location.searchProps.title + this.state.filterCategory + this.props.location.searchProps.categories.map(m => m.title) + this.state.filterDate + this.props.location.searchProps.date + this.state.filterPersons + this.props.location.searchProps.persons + this.state.sortText + this.state.sort)  );
        
            if(this.props.location.searchProps.title){
                 
                let item = {"class" : "title", "value" :  this.props.location.searchProps.title};
                this.setState(previousState => ({
                    filters: [...previousState.filters, item]
                }));
            }

            if(this.props.location.searchProps.persons){
                
                    let checkbox = this.props.location.searchProps.persons;

                        if(this.state.checkBoxfilters.includes(checkbox)){
                            this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                                return filter !== checkbox
                            })});
                        }else{
                            this.setState(previousState => ({
                                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
                            }));
                        }
                let item = {"class" : "layouts.tables.people", "value" :  this.props.location.searchProps.persons};
                console.log('persons', this.props.location.searchProps.persons)
                this.setState(previousState => ({
                    filters: [...previousState.filters, item ]
                }));
            }
            if(this.props.location.searchProps.categories.length >= 1){
                console.log('categories',this.props.location.searchProps.categories )
                
                if(this.props.location.searchProps.categories.length > 1){
                   
                    this.props.location.searchProps.categories.map(m => {
                        
                        let checkbox = m.title;

                        if(this.state.checkBoxfilters.includes(m.title)){
                            this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                                return filter !== checkbox
                            })});
                        }else{
                            this.setState(previousState => ({
                                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
                            }));
                        }
                        console.log('cat',m.title)
                        let item = {"class" : "category.title", "value" :  m.title};
                        if(this.state.filters.includes(item)){
                            this.setState({filters: this.state.filters.filter(function(filter) { 
                                return filter !== item
                            })});
                        }else{
                            this.setState(previousState => ({
                                filters: [...previousState.filters, item ]
                            }));
                        }
                    })
                }else {
                    let item = {"class" : "category.title", "value" :  this.props.location.searchProps.categories[0].title};
                    let checkbox = this.props.location.searchProps.categories[0].title;

                        if(this.state.checkBoxfilters.includes(checkbox)){
                            this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                                return filter !== checkbox
                            })});
                        }else{
                            this.setState(previousState => ({
                                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
                            }));
                        }
                    this.setState(previousState => ({
                        filters: [...previousState.filters, item]
                    }));
                }

            }
        }
        } else{
            this.props.getItems(this.state.filterTitle);
        }

       
    }
    componentWillUnmount(){
        this.props.clearErrors()
    }
    onChangeForm = e => {
        console.log(e.target.value)
        console.log(e.target.name)
        console.log('value',e.target.value)
        
        this.setState({ 
            [e.target.name] : e.target.value
           
        })
        
        
    } 

    toggle = e => {
        
        let item = e.target.value;
        console.log(e.target.value)
        if(this.state.filters.includes(e)){
            this.setState({filters: this.state.filters.filter(function(filter) { 
                return filter !== item
            })});
        }else{
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }));
        }
       
    }
    togglePersons = e => {
        let item = {"class" : "layouts.tables.people", "value" :  e.target.value};
        
        let checkbox = e.target.value;

        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }


        
    }
/*     toggleAvailabilty = e => {
        let item = {"class" : "availibility" , "value" : e.target.value};

        if(this.state.checkBoxfilters.includes(item.e)){
            this.handleDelete(item)
        }else{
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, "availibility"]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }
    } */
    toggleCategories = e => {
        let item = {"class" : "category.title", "value" :  e.target.value};
        
        let checkbox = e.target.value;

        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }


    }

    toggleFacilities = e => {
        let item = {"class" : "facilities.title", "value" :  e.target.value};
        
        let checkbox = e.target.value;
        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }


        
    }
    toggleRating = e => {
        let item = {"class" : "rating", "value" :  e.target.value};
        
        let checkbox = e.target.value;

        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }


    }
    togglePrice = e => {
        let item = {"class" : "price", "value" :  e.target.value};
        
        let checkbox = e.target.value;

        console.log(this.state.checkBoxfilters, 'filters')
        console.log(this.state.checkBoxfilters.includes(checkbox))

        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }


    }
    makeUrl = () => {
        console.log('make Url')
        console.log('make url with these filters', this.state.filters);
        let paymentUrl = ''; 
        let priceUrl = '';
        let facilitiesUrl = '';
        let categoriesUrl = '';
        let personsUrl = "";
        let ratingUrl = "";
        let titleUrl = "";
        let availabilityUrl = "";
        let dayUrl = "";
        if(this.state.filters.length >= 1){
            this.state.filters.map( m => {
                console.log('filter map for url',m)
                if(m.class == "payments.title" ){
                    if(paymentUrl == '' ){
                        paymentUrl = "&filter[payments.title]=" + m.value
                    }else{
                        paymentUrl = paymentUrl + ',' + m.value
                    }
                }else if(m.class == "price" ){
                    if(priceUrl == '' ){
                        priceUrl = "&filter[price.title]=" + m.value
                    }else{
                        priceUrl = priceUrl + ',' + m.value
                    }
                }else if(m.class == "facilities.title"){
                    if(facilitiesUrl == ''){
                        facilitiesUrl = "&filter[facilities.title]=" + m.value
                    }else{
                        facilitiesUrl = facilitiesUrl + ',' + m.value
                    }
                }else if (m.class == "category.title"){
                    if(categoriesUrl == ''){
                        categoriesUrl = '&filter[category.title]=' + m.value
                    }else{
                        categoriesUrl = categoriesUrl + ',' + m.value
                    }
                }else if (m.class == 'layouts.tables.people'){
                    if(personsUrl == ''){
                        personsUrl = '&filter[layouts.tables.people]=' + m.value
                    }else{
                        personsUrl = personsUrl + ',' + m.value
                    }
                }else if (m.class == 'rating'){
                    if(ratingUrl == ''){
                        ratingUrl = '&filter[rating]=' + m.value
                    }else{
                        ratingUrl = ratingUrl + ',' + m.value
                    }
                }else if (m.class == 'title'){
                    if(titleUrl == ''){
                        titleUrl = '&filter[title]=' + m.value
                    }else{
                        titleUrl = titleUrl + ',' + m.value
                    }
                }else if (m.class == 'availability'){
                    let string = m.value.split(' ')
                    let date = string[0] + ' ' + string[1]
                    let persons = string[2]
                    availabilityUrl = this.state.filterAvailability +  this.state.filterDate + date + this.state.filterPersons + persons
                }else if (m.class == 'day'){
                    dayUrl = '&filter[day]' + m.value
                }
            })

            this.setState({
                filterUrl: '?' + paymentUrl + priceUrl + facilitiesUrl + categoriesUrl + ratingUrl + titleUrl + availabilityUrl + dayUrl
            }, function(){
                    console.log('getItems', this.state.filterUrl)
                    this.props.getItems(this.state.filterUrl + '&sort=' + this.state.sort);
                    console.log(this.state.filters , 'filters na uploading')
            })
        
        }else{
            this.props.getItems('?sort=' + this.state.sort)
        }
        
        
    }
    togglePayments = e => {

        let item = {"class" : "payments.title", "value" :  e.target.value};

        let checkbox = e.target.value;

        if(this.state.checkBoxfilters.includes(checkbox)){
            this.handleDelete(item)
            /* const newList = this.state.checkBoxfilters.filter((filter) => filter !== checkbox);
 
            this.setState({
                checkBoxfilters: newList
            }); */
            console.log('bestaat al')
            /* this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })}); */
        }else{
            console.log(this.state.checkBoxfilters, 'filters')
            console.log('bestaat nog niets')
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }), function (){
                this.makeUrl()
            })
        }



    }
    searchTitle = () => {
        let item = {"class" : "title", "value" :  this.state.title};
        let checkbox = this.state.title;
        if(this.state.checkBoxfilters.includes(this.state.title)){
            this.setState({checkBoxfilters: this.state.checkBoxfilters.filter(function(filter) { 
                return filter !== checkbox
            })});
        }else{
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, checkbox]
            }));
        }


        console.log('item', item);
        // make chip and add to filter array
        if(this.state.filters.includes(item)){
            this.setState({filters: this.state.filters.filter(function(filter) { 
                return filter !== item
            })});
            console.log('bestaat al')
        }else{
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            })

            ,function(){
                this.makeUrl()
            });
        }
    }
    sortIt = e => {
        console.log(e.target.id)
        console.log ('sort',e.target.id)
        let page = this.props.item.page.current_page
        this.setState({
            sort: e.target.id
        },function(){
           this.makeUrl()
        })
      
    }


    loadNextPage = e => {
        console.log(e)
        let page = this.props.item.page.current_page + 1;
        this.setState({
            pageUrl: e
        })
        console.log('page',page)
        /* this.props.loadNext(this.props.item.page.next_page_url) */
        this.props.getItems(this.state.filterUrl + '?&page=' + e )
        /* console.log(this.props.item.page.last_page)
        this.setState({
            page: this.props.item.page.current_page + 1 ,
            amountOfpage : this.props.item.page.last_page,
        },
        
        function() {this.props.loadNext(this.state.filterUrl + '?page=' + this.state.page)})  */
        
    }

    handleDelete = m => {

           
           console.log(m, this.state.filters, 'mmmm')

           if(m.class == "availability" || m.class == "day"){
               console.log('inside availability')
               this.setState({
                checkBoxfilters: this.state.checkBoxfilters.filter(item => item !== m.class),
                filters: this.state.filters.filter(item => item !== m)
               
          },function(){
            this.makeUrl()
          })
          console.log('checkboxfilters', this.state.checkBoxfilters);    
        }else{
            this.setState({
                checkBoxfilters: this.state.checkBoxfilters.filter(item => item !== m.value),
                filters: this.state.filters.filter(item => item.value !== m.value)
              },function(){
                this.makeUrl()
              })
              console.log('checkboxfilters', this.state.checkBoxfilters);  
        }
      
    }

    handleToggle = () => {

    }
    handleClickFilterCategory = () => {
        this.setState({
            openFilterCategory : !this.state.openFilterCategory
        })
    }

    handleClickFilterPerson = () => {
        this.setState({
            openFilterPersonen : !this.state.openFilterPersonen
        })

    }

    handleClickFilterPrice = () => {
        this.setState({
            openFilterPrijs : !this.state.openFilterPrijs
        })
    }
    handleClickFilterRating = () => {
        this.setState({
            openFilterRating : !this.state.openFilterRating
        })
    }
    handleClickFilterFacility = () => {
        this.setState({
            openFilterFacility : !this.state.openFilterFacility
        })
    }
    handleClickFilterPayment = () => {
        this.setState({
            openFilterPayment : !this.state.openFilterPayment
        })
    }
    handleClickFilterSort = () => {
        this.setState({
            openFilterSort : !this.state.openFilterSort
        })
        
    }
    handleClickAvailability = () => {
        this.setState({
            openAvailability : !this.state.openAvailability
        })
    }
    handleClose = () => {
        this.setState({
            anchorEl: null
        })
      };
    handleClick = (event) => {
        let item = event.currentTarget;
        this.setState({
           anchorEl:  item
        });
      };
      toggleDrawer = () => event =>{
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
      
          this.setState({ ...this.state, bottom: !this.state.bottom });
        };

      searchForm = e => {
         
        e.preventDefault()
        console.log('search for form')
        console.log('form data',this.state.dateForm, this.state.timeForm, this.state.personsForm)

        if(this.state.personsData){
            let item = {"class" : "day", "value" :  this.state.date + ' ' + this.state.time };
                        
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }));

            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, 'day' ]
            }),function(){
                this.makeUrl()
            });

        }else{
            let item = {"class" : "availability", "value" :  this.state.date + ' ' + this.state.time + ' ' + this.state.personsForm };
                        
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }));
            this.setState(previousState => ({
                checkBoxfilters: [...previousState.checkBoxfilters, 'availability']
            }),function (){ this.makeUrl()});
        }

        /* this.props.getItems() */
        // make a filter chip 

        // filter with url

/*         if(this.state.filters.includes(e)){
            this.setState({filters: this.state.filters.filter(function(filter) { 
                return filter !== item
            })});
        }else{
            this.setState(previousState => ({
                filters: [...previousState.filters, item]
            }));
        } */

      }
      ToggleViewFilters = () => {
          this.setState({
            ToggleViewFilters: !this.state.ToggleViewFilters
          })
      }
      onChange = (e) => {
          this.setState({
              title: e.target.value
          })
      }
    render() {
        const { items, loading, page } = this.props.item;
        const { isAuthenticated, user } = this.props.auth;
        const { categories } = this.props.categories;
        const { payments } = this.props.payments;
        const { facilities } = this.props.facilities; 
        return (
           <div className="padding-top">
                 {this.props.error.tooMany ? <TooManyRequests />
                  : 
            <Container className="my-3">
                <Drawer type="permanent"
                    classes={{
                    paper: 'bottomdrawer'
                    }} anchor={'bottom'} open={this.state.bottom} onClose={this.toggleDrawer(false)} className="bottomdrawer" >
                        <div className="row mt-3" >
                            <div className="col">
                        <h2>Filter</h2>
                        </div>
                        <div className="col float-right">
                        <CancelIcon classes={{
                         root: 'floatright' }} onClick={this.toggleDrawer(false)} className="cancelbutton" fontSize="large"/>
                        </div>
                        
                        </div>
                        <div className="row" style={{overflow: "scroll"}}>
                            <List classes={{
                    root: 'listDrawer'
                    }}>
  <List component="nav" aria-label="main mailbox folders">
                    <ListItem >
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText>
                        <Input 
                                type="input"
                                name="title"
                                onChange={this.onChange}                                                        
                                value={this.state.title}
                                id="title"
                                className="form-controll"
                                />
                         
                        </ListItemText>
                    </ListItem>
                    <List>
                    <ListItem>
                    <Button onClick={this.searchTitle } className="btn button blueButton">
                    <Trans i18nKey="search">
                        </Trans>
                        </Button>
                    </ListItem>
                    </List>
                    <Divider />
                    
                    <ListItem button  onClick={this.handleClickAvailability}>
                    <ListItemIcon>
                            <EventAvailableIcon />
                            </ListItemIcon>
                            <ListItemText primary={
                               <Trans i18nKey="availability">
                               </Trans>}/>
                             {this.state.openAvailability ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openAvailability} timeout="auto" unmountOnExit>
                        <List>
                            <ListItem>
                        <Form onSubmit={this.searchForm} style={{ width: '100%'}}>
                        <FormGroup>
                         
                        <Label for="date"><Trans i18nKey="date"></Trans></Label>
                        
                                                <Input
                                                type="date"
                                                placeholder="yyyy-mm-dd"
                                                name="date"
                                                onChange={this.onChangeForm}
                                                id="date"
                                                min= {moment().format("YYYY-MM-DD")}
                                                value={this.state.date}
                                                required
                                                
                                                />
                                                <Label for="start"><Trans i18nKey="hour"></Trans></Label>
                                                <Input
                                                type="time"
                                                placeholder="HH:mm"
                                                name="time"
                                                value={this.state.time}
                                                onChange={this.onChangeForm}
                                                required
                                                id="time"
                                                placeholder="time placeholder"
                                                />
                                                <Label for="personsForm"><Trans i18nKey="persons"></Trans></Label>
                                                <Input type="select" name="personsForm" id="personsForm" onChange={this.onChangeForm} required value={this.state.personsForm}>
                                                    <option value="">choose ... </option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                </Input>
                                                <Button 
                                                className="mb-2 mt-2"
                                                color="dark"
                                                block 
                                                disabled={this.state.checkBoxfilters.includes('availability') || this.state.checkBoxfilters.includes('day') }
                                                renderAs="button"
                                                type="submit"
                                                >
                                                    <span>{this.state.checkBoxfilters.includes('availability') ? <CheckCircleOutlineIcon/> : <Trans i18nKey="search"></Trans>}</span>
                                                </Button>
                                        </FormGroup>
                                    </Form>
                  
                 
                                    </ListItem>
                            </List>
                        </Collapse>
                      
                   
                        <Divider />

                    <ListItem button  onClick={this.handleClickFilterSort} >
                            <ListItemIcon>
                            <SortIcon />
                            </ListItemIcon>
                            <ListItemText primary={
                               <Trans i18nKey="sortby">
                               </Trans>}/>
                             {this.state.openFilterSort ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterSort} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>

                                        <ListItem className="nested" onClick={this.toggle}>
                                        <ListItemText>
                                        <RadioGroup aria-label="sort" name="sort">
                                                <FormControlLabel id="title" value="title" onClick={this.sortIt.bind(this)}   control={<Radio />} label={<Trans i18nKey="namez-a"></Trans>} />
                                                <FormControlLabel id="-title" value="-title" onClick={this.sortIt.bind(this)}  control={<Radio />} label={<Trans i18nKey="namea-z"></Trans>}  />
                                                <FormControlLabel id="price_id" value="price_id" onClick={this.sortIt.bind(this)}   control={<Radio />} label={<Trans i18nKey="pricelowhigh"></Trans>}  />
                                                <FormControlLabel id="-price_id" value="-price_id" onClick={this.sortIt.bind(this)}   control={<Radio />} label={<Trans i18nKey="pricehighlow"></Trans>}  />
                                            </RadioGroup>
                                            </ListItemText>
                                    </ListItem>
                            </List>
                        </Collapse>
                        
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterCategory} >
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Trans i18nKey="kitchen"></Trans>} />
                             {this.state.openFilterCategory ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterCategory} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {categories && categories.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title} >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggleCategories}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title}  />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterFacility} >
                            <ListItemIcon>
                            <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary={
                                <Trans i18nKey="facilities"></Trans>}/>
                             {this.state.openFilterFacility ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterFacility} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {facilities && facilities.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggleFacilities}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} value={m.title}  />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterPayment} >
                            <ListItemIcon>
                            <PaymentIcon />
                            </ListItemIcon>
                        <ListItemText primary=
                        {<Trans i18nKey="payment"></Trans>}/>
                             {this.state.openFilterPayment ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterPayment} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {payments && payments.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePayments}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        {/* <Divider />
                        <ListItem button  onClick={this.handleClickFilterPerson} >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="persons"></Trans>}/>
                             {this.state.openFilterPersonen ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterPersonen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalPersons && this.state.filterAantalPersons.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePersons}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse> */}
                    
                    <Divider />
                    <ListItem button  onClick={this.handleClickFilterPrice} >
                            <ListItemIcon>
                                <EuroIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="price"></Trans>}/>
                             {this.state.openFilterPrijs ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        {console.log('prijs',this.props.price )}
                        <Collapse  in={this.state.openFilterPrijs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalPrijs && this.props.price.prices.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title} >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePrice}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />

                    <ListItem button  onClick={this.handleClickFilterRating}  >
                            <ListItemIcon>
                                <GradeIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="rating"></Trans>}/>
                             {this.state.openFilterRating ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterRating} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalRating && this.state.filterAantalRating.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title} >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggle}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    
                    </List>
                        </div>
                </Drawer>
                <Fab size="large" color="secondary" aria-label="add" className="fab d-sm-block d-md-none buttonstyle " onClick={this.toggleDrawer()}>
                        {this.state.bottom ? <CloseIcon /> : <FilterListIcon /> }
                </Fab>
                {/* // DESKTOP */}
                <div className="restaurants">
                    <div className="row">
                        <div className="col-12">
                            <h3><Trans i18nKey="restaurants"></Trans></h3>
                        </div>
                    </div>
                    
                <div className="row ">
                    <div className={this.state.ToggleViewFilters ? "ToggleViewFilters" : "col-lg-3 d-none d-lg-block "}>
                    
                    
                    <List component="nav" aria-label="main mailbox folders">
                        <Divider />
                    <ListItem className="pb-0">
                        <ListItemIcon>
                            <SearchIcon />
                        </ListItemIcon>
                        <ListItemText>
                        <Input 
                                type="input"
                                name="title"
                                onChange={this.onChange}
                                value={this.state.title}
                                id="title"
                                placeholder="Zoek bij naam"
                                className="form-controll"
                                />
                                <div className="row">
                        </div>
                        </ListItemText>
                    </ListItem>
                 
                    <ListItem className="pt-0 px-1 mb-2">
                    <Button 
                                                className="mb-2 mt-2 noradius"
                                                color="dark"
                                                block 
                                                renderAs="button"
                                                onClick={this.searchTitle }
                                                >
                
                    <Trans i18nKey="search"></Trans>
                        </Button>
                    </ListItem>
                    
                        <Divider />
                        <ListItem>
                        <Form onSubmit={this.searchForm} style={{ width: '100%'}}>
                        <FormGroup>
                            <h6><Trans i18nKey="availability"></Trans></h6>
                        <Label for="date"><Trans i18nKey="date"></Trans></Label>
                        
                                                <Input
                                                type="date"
                                                placeholder="yyyy-mm-dd"
                                                name="date"
                                                onChange={this.onChangeForm}
                                                id="date"
                                                min= {moment().format("YYYY-MM-DD")}
                                                value={this.state.date}
                                                required
                                                
                                                />
                                                <Label for="start"><Trans i18nKey="hour"></Trans></Label>
                                                <Input
                                                type="time"
                                                placeholder="HH:mm"
                                                name="time"
                                                value={this.state.time}
                                                onChange={this.onChangeForm}
                                                required
                                                id="time"
                                                placeholder="time placeholder"
                                                />
                                                <Label for="personsForm"><Trans i18nKey="persons"></Trans></Label>
                                                <Input type="select" name="personsForm" id="personsForm" onChange={this.onChangeForm} required value={this.state.personsForm}>
                                                    <option value="">choose ... </option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                </Input>
                                                <Button 
                                                className="mb-2 mt-2 noradius"
                                                color="dark"
                                                block 
                                                disabled={this.state.checkBoxfilters.includes('availability') || this.state.checkBoxfilters.includes('day') }
                                                renderAs="button"
                                                type="submit"
                                                >
                                                    <span><Trans i18nKey="search"></Trans></span>
                                                </Button>
                                        </FormGroup>
                                    </Form>
                  
                 
                    
                      
                        </ListItem>
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterCategory} >
                            <ListItemIcon>
                            <InboxIcon />
                            </ListItemIcon>
                        <ListItemText primary={<Trans i18nKey="kitchen"></Trans>}/>
                             {this.state.openFilterCategory ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterCategory} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {categories && categories.map((m,i) => {
                                    return (
                                        <ListItem className="nested"  value={m.title} >
                                        <ListItemIcon value={m.title} >
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggleCategories}
                                        />
                                        </ListItemIcon>
                                        <ListItemText value={m.title} primary={m.title}/>
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterFacility} >
                            <ListItemIcon>
                            <StoreIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="facilities"></Trans>}/>
                             {this.state.openFilterFacility ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterFacility} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {facilities && facilities.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title} >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggleFacilities}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} value={m.title}  />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                        <ListItem button  onClick={this.handleClickFilterPayment} >
                            <ListItemIcon>
                            <PaymentIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="payments"></Trans>}/>
                             {this.state.openFilterPayment ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterPayment} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {payments && payments.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}   >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePayments}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                       {/*  <ListItem button  onClick={this.handleClickFilterPerson} >
                            <ListItemIcon>
                                <PeopleIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="persons"></Trans>}/>
                             {this.state.openFilterPersonen ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterPersonen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalPersons && this.state.filterAantalPersons.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon id={m.id} >
                                        <Checkbox
                                            edge="start"
                                            id={m.id}
                                            checked={this.state.filters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePersons}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                    
                    <Divider /> */}
                    <ListItem button  onClick={this.handleClickFilterPrice} >
                            <ListItemIcon>
                                <EuroIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="price"></Trans>}/>
                             {this.state.openFilterPrijs ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterPrijs} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalPrijs && this.props.price.prices.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.checkBoxfilters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.togglePrice}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        <ListItemText style={{ textAlign: "end"}} edge="end" primary={`(${m.total})`} />
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                        <Divider />
                    <ListItem button  onClick={this.handleClickFilterRating} >
                            <ListItemIcon>
                                <GradeIcon />
                            </ListItemIcon>
                            <ListItemText primary={<Trans i18nKey="rating"></Trans>}/>
                             {this.state.openFilterRating ? <ExpandLess /> : <ExpandMore />} 
                        </ListItem>
                        
                        <Collapse  in={this.state.openFilterRating} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {this.state.filterAantalRating && this.state.filterAantalRating.map((m,i) => {
                                    return (
                                        <ListItem className="nested" value={m.title}  >
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            checked={this.state.filters.includes(m.title)}
                                            tabIndex={-1}
                                            disableRipple
                                            value={m.title}
                                            onClick={this.toggle}
                                        />
                                        </ListItemIcon>
                                        <ListItemText primary={m.title} />
                                        
                                    </ListItem>
                                      )  
                            })}
                            
                        
                            </List>
                        </Collapse>
                    </List>
                    <Divider />
                    
                    </div>
          
                    <div className={this.state.ToggleViewFilters ? 'col-lg-12' : 'col-lg-9'}>
                    {console.log(page)}
                    <div className='d-none d-lg-block'>
                    <div className="row  justify-content-end">
             

                        {this.state.ToggleViewFilters ? <div className="mx-2 align-self-end"  onClick={this.ToggleViewFilters}>{<Trans i18nKey="showfilters"></Trans>}< FilterListIcon />  </div> : <div className="mx-2" onClick={this.ToggleViewFilters}>{<Trans i18nKey="hidefilters"></Trans>} < FilterListIcon />  </div>  }
                      
                        <div  >
                    <div className="float-right mx-2" aria-controls="simple-menu"  aria-haspopup="true" onClick={this.handleClick}>
                    <Trans i18nKey="sortby"></Trans> {this.state.sort} {this.state.anchorEl ? <ExpandLess /> : <ExpandMore />} 
                    </div>
                    <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                      }}
                    TransitionComponent={Fade}
                    >
                    <MenuItem id="title" value="title" onClick={this.sortIt.bind(this)}  ><Trans i18nKey="namea-z"></Trans></MenuItem>
                    <MenuItem id="-title" value="-title" onClick={this.sortIt.bind(this)}  ><Trans i18nKey="namez-a"></Trans></MenuItem>
                    <MenuItem id="price_id" value="price_id" onClick={this.sortIt.bind(this)} ><Trans i18nKey="pricehighlow"></Trans></MenuItem>
                    <MenuItem id="-price_id" value="-price_id" onClick={this.sortIt.bind(this)} ><Trans i18nKey="pricelowhigh"></Trans></MenuItem>
                    </Menu>
                            {/* <Input type="select" name="sort" id="sort" onChange={this.onChange} value={this.state.sort}  className="form-controll" placeholder="sort by">
                                <option value="">Sort by</option>
                                <option value="title">name</option>
                                <option value="price_id">price</option>
                            </Input> */}
                      </div>
                    
                    
                   
                    </div>
                    </div>
                    { this.state.filters.length >= 1 ? 

                    <div className="row filterRow">
                        <div className="col-12">
                    {this.state.filters ? this.state.filters.map((m,i) => {
                        console.log('filters',m)

                        return(
                            <Chip
                            label={m.class, m.value}
                            value={m}
                            id={m}
                            key={i}
                            onDelete={() => { this.handleDelete(m)} }
                            color="primary"
                          />
                    )}): null}
                    </div>
                </div>
                : null }
                    
                    
               
                <div className="row p-x-0">
                {console.log(items)}
                {/*     { items && items.map((m, i) => {
                                    return(

                                        <div className="col-md-6" key={i}>
                                                                                    <FadeIn
                    transitionDuration="500"
                    delay="100"
                >
                                        <Card key={m.id}>
                                        <CardImg top width="100%" src={process.env.PUBLIC_URL + '/bgimg.jpg'} alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><strong>{m.title}</strong></CardTitle>
                                        <CardSubtitle><Badge>{m.category.title}</Badge></CardSubtitle>
                                        <CardText>{m.address}</CardText>
                                       
                                        <Link to={{
                                                    pathname: `/restaurants:${m.id}`,
                                                    
                                                    }}>
                                                <Button 
                                                className="mb-2 mt-2"
                                                color="dark"
                                                block 
                                                renderAs="button">
                                                    <span>More info</span>
                                                </Button>
                                                </Link>
                                        </CardBody>
                                            </Card>
                                            </FadeIn>  
                                            </div>
                                           
                                    )})}  */}
                                                {console.log(this.props.item)}                      
                                    {  !loading && items   ? 
                                    
                                    <div>
                                        {items.length > 0  ? 
                                    <div className="row">
                                    
                                 {items && items.map((m, i) => {
                                    return(
                                        
                                        <div className="col-md-6 my-2" key={i}>
                                            
                                        <FadeIn
                                            transitionDuration="500"
                                            delay="100"
                                        >
                                             <Link to={{
                                                    pathname: `/restaurants:${m.id}`,
                                                    
                                                    }}>
                                        <Card key={m.id}>
                                        <CardImg top width="100%" src={`http://127.0.0.1:8000/storage/primary_imgs/${m.primary_img}`} alt="Card image cap" />
                                        <CardBody>
                                        <CardTitle><h5><strong>{m.title}</strong></h5></CardTitle>
                                        <CardText><Badge>{m.category.title}</Badge>
                                        <p className="pt-1"><RoomIcon /> {m.address} </p>
                                        {console.log('rating', m.ratings)}
                                        {m.ratings ? <div className="row"><Box><Rating name="rating" precision={0.5} defaultValue={m.average_rating} readOnly/></Box> <div> ( {m.totalrating} )</div> </div>: null }
                                        </CardText>
                                   
                                        </CardBody>
                                            </Card>
                                            </Link>
                                            </FadeIn>  
                                            </div>
                                           
                                    )})}
                    
                            </div>
                             : <div className="row ">
                                 <div className="col-12"> <p><Trans i18nKey="noitemsfound"></Trans></p></div></div>}
                                              <div className="row pt-3">
                                                  <div className="col">
                                              {this.props.item.page && items.length > 1?
          
                                              <Pagination
                                              activePage={this.props.item.page.current_page}
                                              itemsCountPerPage={this.props.item.page.per_page}
                                              totalItemsCount={this.props.item.page.total}
                                              pageRangeDisplayed={5}
                                              onChange={this.loadNextPage.bind(this)}
                                              itemClass="page-item"
                                              linkClass="page-link"
                                            /> 
                                          
                                          : null
                                          
                                          }
                                          </div>
                                          </div>
                                           
                                          </div>
                            : 
                                    <Spinner/>
                               }
                                     </div>
                        
                  
              
                    </div>
                </div>
                
                </div> 
                
                
                
            </Container>
    }
           </div>
        )
    }
}
 Restaurants.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    facilities: PropTypes.object.isRequired,
    payments: PropTypes.object.isRequired,
    categories: PropTypes.object.isRequired,
    loadNext: PropTypes.func.isRequired,
    auth: PropTypes.func.isRequired,
    price: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors : PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    item: state.item,
    categories: state.categories,
    facilities: state.facilities,
    auth: state.auth,
    payments: state.payments,
    price: state.price,
    error: state.error
})
export default connect(mapStateToProps, { getItems , clearErrors, loadNext })(Restaurants)
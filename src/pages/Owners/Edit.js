import React, { Component } from 'react'
import MiniDrawer from '../../components/Owners/MiniDrawer'
import { Container } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getItem } from '../../actions/itemActions';
import { updateRestaurant } from '../../actions/dashboardActions';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Spinner from '../../components/Components/Spinner/Spinner'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
/* import Select from '@material-ui/core/Select'; */
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import HorizontalScroll from 'react-scroll-horizontal'
import Select from 'react-select'
import DeleteIcon from '@material-ui/icons/Delete';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Divider from '@material-ui/core/Divider';
import ImageUploader from 'react-images-upload';
import {postPrimaryImg , postRestaurantImages, deleteRestaurantImage} from '../../actions/dashboardActions';
import { getRestaurant } from '../../actions/dashboardActions'
import Alert from '@material-ui/lab/Alert';
import { clearErrors } from '../../actions/errorActions'; 

class Edit extends Component {

    constructor(props){
        super(props)
        this.state = {
            id: 0,
            title: '',
            description: '',
            category: '',
            address: '',
            telephone: '',
            contactemail: '',
            website: '',
            payments: [],
            facilities: [],
            price: '',
            primary_img: '',
            images: [],
            selectedFacilities: [],
            menus: [],
            priceData: [{"id": 1 , "label": 'Goedkoop' , "value": 1},
            {"id": 2 , "label": 'Normaal' , "value": 2},
            {"id": 3 , "label": 'Duur' , "value": 3}],
            paymentData: [],
            facilityData: [],
            loaded: false,
            madePaymentData: false,
            madeFacilityData: false,
            categoryData: [],
            madeCategoryData: false,
            primary_img: '',
            openinghours: null,
            file: null,
            fileObject: null,
            image: null,
            imageFile: null,
            deleteMenu: false,
            menusimg: [],
            newCarousel: null,
            addMenuState: false,
            addCarousel: false,
            deleteCarousel: false,
            addProfile: false,
            alert: false,
            hasError: false

        }
        this.onFormSubmitPrimaryImg = this.onFormSubmitPrimaryImg.bind(this)
        this.onChangePrimaryImage = this.onChangePrimaryImage.bind(this)
        
        this.onFormSubmitMenus = this.onFormSubmitMenus.bind(this)
        this.onChangeMenuImages= this.onChangeMenuImages.bind(this)

        this.onFormSubmitCarousel = this.onFormSubmitCarousel.bind(this)
        this.onChangeCarouselImages= this.onChangeCarouselImages.bind(this)

     /*    this.addOpeninghours = this.addOpeninghours.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this); */
    }

    componentDidMount(){
        /* this.props.getItem(14) */
        this.props.getRestaurant(localStorage.getItem('restaurant_id'));
        this.props.clearErrors();

    }

    loaded = () => {
        if(this.props.dashboard.updated){
            this.setState({
                id: this.props.dashboard.restaurant.id,
                title: this.props.dashboard.restaurant.title,
                description: this.props.dashboard.restaurant.description,
                address: this.props.dashboard.restaurant.address,
                telephone: this.props.dashboard.restaurant.telephone,
                contactemail: this.props.dashboard.restaurant.contactemail,
                website: this.props.dashboard.restaurant.website,
                category: this.props.dashboard.restaurant.category.id,
                openinghours: this.props.dashboard.restaurant.openinghours,
                price: this.props.dashboard.restaurant.price.id,
                primary_img: this.props.dashboard.restaurant.primary_img,
                /* menus: JSON.parse(this.props.dashboard.restaurant.menus),
                images: JSON.parse(this.props.dashboard.restaurant.images), */
                loaded:true
            })
        }else {
            this.setState({
                id: this.props.dashboard.restaurant.id,
                title: this.props.dashboard.restaurant.title,
                description: this.props.dashboard.restaurant.description,
                address: this.props.dashboard.restaurant.address,
                telephone: this.props.dashboard.restaurant.telephone,
                contactemail: this.props.dashboard.restaurant.contactemail,
                website: this.props.dashboard.restaurant.website,
                category: this.props.dashboard.restaurant.category.id,
                openinghours: JSON.parse(this.props.dashboard.restaurant.openinghours),
                price: this.props.dashboard.restaurant.price.id,
                primary_img: this.props.dashboard.restaurant.primary_img,
              
                /* menus: JSON.parse(this.props.dashboard.restaurant.menus),
                images: JSON.parse(this.props.dashboard.restaurant.images), */
                loaded:true
            })
        }
        


        console.log('item images' , this.props.dashboard.restaurant.images)

        console.log('loaded', this.props.dashboard.restaurant. payments)
        if(this.props.dashboard.restaurant.payments && this.props.dashboard.restaurant.payments.length > 0 ){
            this.props.dashboard.restaurant.payments.map(m => {
                let item = { "id" : m.id }
                this.setState(previousState => ({
                    payments: [...previousState.payments, item],
                }))
            })
        } 
        if(this.props.dashboard.restaurant.payments && this.props.dashboard.restaurant.facilities.length > 0 ){
            this.props.dashboard.restaurant.facilities.map(m => {
                let item = { "id" : m.id }
                this.setState(previousState => ({
                    facilities: [...previousState.facilities, item],
                }))
            })
        }
/*         if(this.props.dashboard.restaurant.payments.length ==  this.state.facilities && this.props.dashboard.restaurant.payments == this.state.payments){
            this.setState({
               
            })
        } */
    }

    onSubmit = (e) => {
        e.preventDefault();
       
        
        console.log('submit facilites', this.state.facilities)
        console.log('this.state.fileObject', this.state.fileObject)
        console.log(this.state.openinghours, 'openingsuren');
        if(this.state.payments.length > 0 && this.state.facilities.length > 0){ 

        
            let item = {
                "id": this.state.id,
                "title": this.state.title,
                "description": this.state.description,
                "address": this.state.address,
                "telephone": this.state.telephone,
                "website": this.state.website,
                "contactemail": this.state.contactemail,
                "payments" : this.state.payments,
                "facilities" : this.state.facilities,
                "category" : this.state.category,
                "price": this.state.price,
                "openinghours": this.state.openinghours,
            }

            console.log('submut item' , item)
            this.props.updateRestaurant(this.state.id, item)  
    
         }else {
            if(this.state.payments.length == 0){
                this.setState({
                    errorMsg: 'U moet minimum 1 betaaloptie hebben.'
                })
            }else if(this.state.facilities.length == 0){
                this.setState({
                    errorMsg: 'U moet minimum 1 faciliteit hebben.'
                })
            }
        } 


       
    }
    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }
    makePaymentData = () => {
        this.props.payments.payments.map(m => {
            let item = { "label" : m.title , "value" : m.id }
            this.setState(previousState => ({
                paymentData: [...previousState.paymentData, item]
            }));
        },function(){
           
        })
        this.setState({
            madePaymentData: true
        })
    }
    makeFacilityData = () => {
        this.props.facilities.facilities.map(m => {
            console.log('m', m)
            let item = { "label" : m.title , "value" : m.id }
            this.setState(previousState => ({
                facilityData: [...previousState.facilityData, item]
            }));
        })
        this.setState({
            madeFacilityData: true
        })
    }
    makePriceData = () => {
        this.props.price.facilities.map(m => {
            console.log('m', m)
            let item = { "label" : m.title , "value" : m.id }
            this.setState(previousState => ({
                priceData: [...previousState.priceData, item]
            }));
        })
        this.setState({
            madePriceData: true
        })
    }
    makeCategoryData = () => {
        this.props.categories.categories.map(m => {
            console.log('m', m)
            let item = { "label" : m.title , "value" : m.id }
            this.setState(previousState => ({
                categoryData: [...previousState.categoryData, item]
            }));
        })
        this.setState({
            madeCategoryData: true
        })
    }
    selectChangePayments = (e) => {
        console.log('payments', e)
        if(e.length){
        this.setState({
            payments: [],
            errormsg: ''
        }, function(){
            if(e.length > 0){
                e.map( m => {
                    let item = { "id" : m.value }
                    if(this.state.payments.includes(item)){
                        this.setState({payments: this.state.payments.filter(function(filter) { 
                            return filter !== item
                        })});
                        console.log('bestaat al')
                    }else{
                        this.setState(previousState => ({
                            payments: [...previousState.payments, item]
                        }))
                }})
            }

        })
    }else{
        this.setState({
            errormsg: 'U moet minstens 1 betaaloptie hebben'
        })
    }

    }
    selectedChangeCategory = (e) => {
        console.log('category', e)
        this.setState({
            category: e.value
        }) 
    }
    selectedChangePrice = (e) => {
        console.log('price', e)
        this.setState({
            price: e.value
        }) 
    }
    selectChangeFacilities = (e) => {
        console.log('payments', e.length)
        if(e.length){

       
        this.setState({
            facilities: [],
            errormsg: ''
        }, function(){
            if(e.length > 0){
                e.map( m => {
                    let item = { "id" : m.value }
                    if(this.state.facilities.includes(item)){
                        this.setState({facilities: this.state.facilities.filter(function(filter) { 
                            return filter !== item
                        })});
                        console.log('bestaat al')
                    }else{
                        this.setState(previousState => ({
                            facilities: [...previousState.facilities, item]
                        }))
                }})
            }

        })
    }else{
        this.setState({
            errormsg: 'U moet minstens 1 faciliteit hebben'
        })
    }
    }
    onChangeOpeninghours = (e) => {
        console.log('change openingshours', e.target.name , e.target.value)
        let string = e.target.name.split('-')
        console.log(string)
        let newopeninghours = JSON.parse(JSON.stringify(this.state.openinghours));
        
        console.log(newopeninghours[0][string[0]][string[1]].split('-')[1],'moet geedit worden')
        if(string[2] == 0){
            console.log(newopeninghours[0][string[0]][string[1]].split('-')[1],'extra openinghours')
            let newvalue = e.target.value + '-' + newopeninghours[0][string[0]][string[1]].split('-')[1];
            newopeninghours[0][string[0]][string[1]] = newvalue;
        }
        if(string[2] == 1){
            let newvalue = newopeninghours[0][string[0]][string[1]].split('-')[0]  + '-' +  e.target.value;
            newopeninghours[0][string[0]][string[1]] = newvalue;
        }
        console.log(newopeninghours,'new openinghours')
         this.setState({
            openinghours : newopeninghours
        })    
    }
    onClickDelete = (day, row) => {
        
        console.log(row, day);

        let newopeninghours = JSON.parse(JSON.stringify(this.state.openinghours));
        let newDay = day.split('-');
        console.log(newDay, 'new day');
        console.log(newopeninghours[0][newDay[0]][newDay[1]],'delete this row')
        
        if(newopeninghours[0][newDay[0]].length > 1){
            newopeninghours[0][newDay[0]].splice([newDay[1]]);
        }else{
            newopeninghours[0][newDay[0]].length = 0;
        }
        this.setState({
            openinghours: newopeninghours
        },function(){
            console.log(this.state.openinghours)
        })
    }  
    addOpeninghours = (day) => {
        try{

       
        let newopeninghours = JSON.parse(JSON.stringify(this.state.openinghours));
        console.log(newopeninghours[0][day], 'dag')
        let length = newopeninghours[0][day].length
        console.log(length, 'length')
        let newvalue;
        if(length >= 1){
            let split = newopeninghours[0][day][length - 1].split('-')
            console.log(split, 'split')
            console.log('add openinghours', day)
            let item = split[1] + '-' + '23:59'
            console.log(item,'item')
            newvalue = newopeninghours[0][day].concat(item);
        }else{
            let item = '09:00-12:00'
            console.log(item,'item')
            newvalue = newopeninghours[0][day].concat(item);
        }

        newopeninghours[0][day] = newvalue;
        console.log(newvalue, 'new value')
         this.setState({
            openinghours: newopeninghours
        }) 
    }catch(error){
        console.log(error)
    }
    }
    newPrimaryImg = (e) => {
        console.log(e)
    }
    onDrop(picture) {
        this.setState({
            primary_img: picture,
        });
    }

    handleImageUpload = (event) => {
        this.setState({
            file: URL.createObjectURL(event.target.files[0]),
            fileObject: event.target.files[0],
        })
    }

    onFormSubmitPrimaryImg =  (e) => {
        e.preventDefault() 
        console.log(this.state.image, 'image')
        const formData = new FormData();
        formData.append('primary_img', this.state.image)
        formData.append('id', this.state.id)

        this.props.postPrimaryImg(formData) 
    }
    
    onChangePrimaryImage = (e) => {
        this.setState({
            image: e.target.files[0],
            imageFile: URL.createObjectURL(e.target.files[0])
        })

    }

    onChangeCarouselImages = (e) => {
          console.log('files',e.target.files[0])
             let img = e.target.files[0]
            this.setState({
                NewCarousel : img,
                carouselFile: URL.createObjectURL(e.target.files[0])
            })
        
        
    }
    onFormSubmitCarousel = (e) => {
          e.preventDefault();
          const formData = new FormData();
          formData.append('carousel', this.state.NewCarousel)
          formData.append('id', this.state.id)

          this.props.postRestaurantImages(formData) 

          this.setState(previousState => ({
            images: [...previousState.images ,this.state.carouselFile]
        }), function(){
            console.log(this.state.menusimg,'img');
        }) 
      }
      onChangeMenuImages = (e) => {
        console.log('files',e.target.files[0])
           let img = e.target.files[0]
          this.setState({
              NewMenu : img,
              menuFile: URL.createObjectURL(e.target.files[0])
          })
     /*  this.setState(previousState => ({
          images: [...previousState.images ,img]
      }), function(){
          console.log(this.state.menusimg,'img');
      })  */
      
  }
    onFormSubmitMenus = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('menus', this.state.NewMenu)
        formData.append('id', this.state.id)

        this.props.postRestaurantImages(formData) 
    }
    deleteImg = (type, img) => {
        console.log('delete this', img.src)
        console.log(type,img.src)
        const formData = new FormData();
        formData.append(type, img.src)
        formData.append('id', this.state.id)
        
        this.props.deleteRestaurantImage(formData) 
    }
    deleteMenu = ()=> {
        this.setState({
            deleteMenu: !this.state.deleteMenu
        })
    }
    addMenu = () => {
        this.setState({
            addMenuState: !this.state.addMenuState
        })
    }
    deleteCarousel = ()=> {
        this.setState({
            deleteCarousel: !this.state.deleteCarousel
        })
    }
    addCarousel = () => {
        this.setState({
            addCarousel: !this.state.addCarousel
        })
    }
    addProfile = () => {
        this.setState({
            addProfile : !this.state.addProfile
        })
    }
    updateNow = () => {

            this.loaded()
    
    }
    closeAlert = () => {
        this.setState({
            alert: false
        })
        this.props.clearErrors();
    }
    render() {
        const { categories } = this.props.categories;
        const { payments, paymentsloading } = this.props.payments;
        const { facilities } = this.props.facilities; 
        const { menus ,images , restaurant, dashboardloading , imagesloading , restaurantupdating, updated} = this.props.dashboard 
        return (
            <div>
                        {this.props.dashboard.restaurant && this.props.dashboard.restaurant.title && !this.state.loaded ? this.loaded() : null}
                        { restaurant && payments.length > 0 && !this.state.madePaymentData ? this.makePaymentData() : null  }
                        { restaurant && facilities.length > 0 && !this.state.madeFacilityData ? this.makeFacilityData() : null  }
                        { restaurant && categories.length > 0 && !this.state.madeCategoryData ? this.makeCategoryData() : null  }
            <div className="dashboard">
                { this.state.loaded && !dashboardloading && this.state.madeCategoryData  && this.state.madeFacilityData &&  this.state.madePaymentData && restaurant.openinghours[0] ?
                <Container>

                    <Form onSubmit={this.onSubmit}> 
                    <div className="row justify-content-center">
                        <div className="col">   
                            <h1>Bewerk</h1>
                        </div>
                        <div  className="col">
                          {dashboardloading ?  <Button className="floatright" disabled={this.state.errormsg || dashboardloading}>Loading</Button>  : 
                        <Button className="floatright" disabled={this.state.errormsg || dashboardloading}>Opslaan</Button> 
                    } 
                        </div>
                    </div>
              
                  
                    { !paymentsloading && restaurant  && restaurant.payments &&  this.state.madePaymentData && this.state.madeFacilityData && this.state.madeCategoryData ? 
                    <div className="row">
                        <div className="col">
                        <Accordion className="my-2">
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    
                                <Typography >Basis informatie</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                               
                                    <div className="row">
                                    <div className="row" style={{width: "100%"}}>
                                  
                                    <div className="col-12">
                                    <FormGroup>
                                        <Label for="title">Titel</Label>
                                        <Input type="text" name="title" id="title" required onChange={this.onChange} value={this.state.title} />
                                    </FormGroup>
                                    </div>
                                    </div>      
                                    <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                                        <FormGroup>
                                            <Label for="description">Beschrijving</Label>
                                            <Input type="textarea" name="description" id="description" required onChange={this.onChange}  value={this.state.description} />
                                        </FormGroup>
                                        </div>
                                        </div>
                                        <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                                        {   restaurant && this.props.payments.payments.length > 0 ? 
                                    <FormGroup>
                                        <Label for="categorie">Categorie</Label>
                                    <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            defaultValue={restaurant.category_id > 0 ? this.state.categoryData[restaurant.category_id - 1]: null}
                                            name="Categorie"
                                            onChange={this.selectedChangeCategory}
                                            options={this.state.categoryData}
                                            />
                                        </FormGroup>
                                : null }
                                </div>
                                </div>
                                <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                                       
                                        { restaurant.payments  && this.props.payments.payments.length > 0 ? 
                                        <FormGroup>
                                            {console.log('restaurant', restaurant)}
                                            <Label for="payments">Betaalopties</Label>
                                        <Select options={this.state.paymentData} 
                                        defaultValue={restaurant.payments.length > 0 && restaurant.payments.map(m => this.state.paymentData[m.id - 1])}
                                        isMulti
                                        required
                                        hasValue={true}
                                        onChange={this.selectChangePayments}
                                        />
                                        </FormGroup>
                                        : null }
                                        {  restaurant ? 
                                        <FormGroup>
                                        <Label for="price">Prijs</Label>
                                        <Select 
                                            options={this.state.priceData}
                                            required
                                            defaultValue={restaurant.price_id > 0 ? this.state.priceData[restaurant.price_id - 1 ]: null}
                                            onChange={this.selectedChangePrice}
                                            />
                                        
                                        </FormGroup>
                                    : null }
                                </div>
                                </div>
                                <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                                       
                                    { restaurant && this.state.facilityData.length > 0 && this.props.facilities.facilities.length > 0 ? 
                                    <FormGroup>
                                        <Label for="facilities">Faciliteiten</Label>
                                        <Select options={this.state.facilityData} 
                                        isMulti
                                        defaultValue={restaurant.facilities.length > 0 && restaurant.facilities.map(m => this.state.facilityData[m.id - 1])}
                                        onChange={this.selectChangeFacilities}
                                        />
                                    </FormGroup>
                                    : null }
                                </div>
                                </div>
                        </div>
                        </AccordionDetails>
                        </Accordion>
                        <Accordion className="my-2">
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Contact</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div className="row">
                                    <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                                <FormGroup>
                            <Label for="address">Adres</Label>
                            <Input type="textarea" name="address" id="address" required onChange={this.onChange}  value={this.state.address} />
                        </FormGroup>
                        </div>
                        </div>
                        <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                        <FormGroup>
                            <Label for="description">Telefoon</Label>
                            <Input type="text" name="telephone" id="telephone" required onChange={this.onChange}  value={this.state.telephone} />
                        </FormGroup>
                        </div>
                        </div>
                        <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                        <FormGroup>
                            <Label for="description">Email</Label>
                            <Input type="text" name="contactemail" id="contactemail" required onChange={this.onChange}  value={this.state.contactemail} />
                        </FormGroup>
                        </div>
                        </div>
                        <div className="row" style={{width: "100%"}}>
                                    <div className="col-12">
                        <FormGroup>
                            <Label for="description">Website</Label>
                            <Input type="text" name="website" id="website" required onChange={this.onChange}  value={this.state.website} />
                        </FormGroup>
                        </div>
                        </div>
                        </div>
                        </AccordionDetails>
                        </Accordion>
                        { restaurant.openinghours && !this.state.loaded  && dashboardloading ? null : 
                        <Accordion className="my-2">
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Openingsuren</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    
                                <FormGroup style={{width: '100%'}}>
                               <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                                        <div className="col">
                            <Label for="monday">Maandag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('monday')}>< AddCircleIcon/> </Button>
                            </div>
                            </div>
                            {this.state.openinghours[0].monday.length >= 1 ?
                            this.state.openinghours[0].monday.map((m,i) => 
                            <div key={i} className="row my-2" style={{width: "100%"}}>
                               
                                Shift {i + 1}
                                
                     
                           <div className="col">
                            <Input
                            type="time"
                            name={`monday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].monday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`monday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].monday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                                <Button className="floatright" onClick={() => this.onClickDelete(`monday-${i}`, m)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            )
                            
                            : <div>Gesloten</div> }
                            </div> 
                            <Divider />
                            <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="tuesday">Dinsdag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={(e) => this.addOpeninghours('tuesday', e)}>< AddCircleIcon/> </Button> 
                            </div>
                            </div>
                            {this.state.openinghours[0].tuesday.length >= 1 ?
                            this.state.openinghours[0].tuesday.map((m,i) => 
                            <div  key={'tuesday' + i} className="row my-2"  style={{width: "100%"}}>
                            Shift {i + 1}
                        
                           <div className="col">
                            <Input
                            type="time"
                            name={`tuesday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].tuesday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`tuesday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].tuesday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                          <Button className="floatright" onClick={(e) => this.onClickDelete(`tuesday-${i}`, m,e)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            ) : <div>Gesloten</div> }
                           
                            </div> 
                            <Divider />
                            <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="wednesday">Woensdag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('wednesday')}>< AddCircleIcon/> </Button>
                            </div>
                            </div>
                            {this.state.openinghours[0].wednesday.length >= 1 ?
                            this.state.openinghours[0].wednesday.map((m,i) => 
                            <div  key={i}  className="row my-2"  style={{width: "100%"}}>
                            Shift {i + 1}
                        
                            <div className="col">
                            <Input
                            type="time"
                            name={`wednesday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].wednesday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`wednesday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].wednesday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                            <Button className="floatright" onClick={() => this.onClickDelete(`wednesday-${i}`, m)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            ) : <div>Gesloten</div> }
                            
                            </div> 
                           <Divider />
                            <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="thursday">Donderdag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('thursday')}>< AddCircleIcon/> </Button>
                            </div>
                            </div>
                            {this.state.openinghours[0].thursday.length >= 1 ?
                            this.state.openinghours[0].thursday.map((m,i) => 
                            <div  key={i} className="row my-2"  style={{width: "100%"}}>
                            Shift {i + 1}
                     
                           <div className="col">
                            <Input
                            type="time"
                            name={`thursday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].thursday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`thursday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].thursday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                            <Button className="floatright" onClick={() => this.onClickDelete(`thursday-${i}`, m)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            ) : <div>Gesloten</div> }
                            
                            </div> 
                            <Divider />
                            <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="friday">Vrijdag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('friday')}>< AddCircleIcon/> </Button>
                            </div>
                            </div>
                            {this.state.openinghours[0].friday.length >= 1 ?
                            this.state.openinghours[0].friday.map((m,i) => 
                            <div  key={i} className="row my-2"  style={{width: "100%"}}>
                            Shift {i + 1}
                   
                           <div className="col">
                            <Input
                            type="time"
                            name={`friday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].friday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`friday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].friday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                            <Button className="floatright" onClick={() => this.onClickDelete(`friday-${i}`, m)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            ) :  <div>Gesloten</div> } 
                            
                            </div>
                            <Divider />
                            <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="saturday">Zaterdag</Label>
                            </div>
                            <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('saturday')}>< AddCircleIcon/> </Button>
                            </div>
                            </div>
                            {this.state.openinghours[0].saturday.length >= 1 ?
                            this.state.openinghours[0].saturday.map((m,i) => 
                            <div  key={i} className="row my-2"  style={{width: "100%"}} >
                            Shift {i + 1}
                      
                           <div className="col">
                            <Input
                            type="time"
                            name={`saturday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].saturday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`saturday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].saturday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col-2">
                            <Button className="floatright" onClick={() => this.onClickDelete(`saturday-${i}`, m)} ><DeleteIcon /></Button>
                            </div>
                            </div>
                            ) : <div>Gesloten</div> }
                           
                            </div>
                            <Divider />
                             <div className="col float-right" >
                            <Button className="floatright" onClick={() => this.addOpeninghours('sunday')}>< AddCircleIcon/> </Button>
                            </div>
                              <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row" style={{width: "100%"}}>
                            <div className="col">
                            <Label for="sunday">Zondag</Label>
                            </div>
                           
                            </div>
                            {this.state.openinghours[0].sunday.length >= 1 && this.state.loaded && dashboardloading?
                            <div>
                            { this.state.openinghours[0].sunday.map((m,i) => 
                            <div  key={i} className="row my-2"  style={{width: "100%"}}>
                            Shift {i + 1}
                         
                           <div className="col">
                            <Input
                            type="time"
                            name={`sunday-${i}-0`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].sunday[i].split('-')[0]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Input
                            type="time"
                            name={`sunday-${i}-1`}
                            onChange={this.onChangeOpeninghours} 
                            value={this.state.openinghours[0].sunday[i].split('-')[1]}
                            id="time"
                            required
                            placeholder="time placeholder"
                            />
                            </div>
                            <div className="col">
                            <Button className="floatright" onClick={() => this.onClickDelete(`sunday-${i}`, m)} ><DeleteIcon /></Button>
                            </div> 
                            </div>
                            )}
                            </div>
                            : <div>Gesloten</div> }  
                            </div>  
                            
                        </FormGroup>
                                </AccordionDetails>
                            </Accordion>
                           }
                        </div>
                    </div>
                    : <Spinner /> }
  
                    </Form>
                    { !paymentsloading && this.state.madePaymentData && this.state.madeFacilityData && this.state.madeCategoryData &&   this.state.loaded  ? 
                    <div className="row my-1">
                        <div className="col-12">
                            
                    <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Foto's</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                <div className="row my-3" style={{width: "100%"}}>
                          
                                    <div className="row my-2" style={{width: "100%"}}>
                                    <div className="col">
                                        <h6>Menukaarten</h6>
                                    </div>
                                    <div className="col-6 floatright float-right">

                                        <Button className="floatright" onClick={() => this.deleteMenu()}>
                                            < DeleteIcon />
                                        </Button>
                                        <Button className="floatright  mx-2" onClick={() => this.addMenu()}>
                                            < AddCircleIcon />
                                        </Button>
                                    </div>
                                    </div>
                                    { this.props.dashboard.menus.length == 1 ?
                                    <div className="row" style={{ width: '100%' }}>
                                        <Alert severity="info" >U moet minstens 1 foto hebben.</Alert>
                                    </div>
                                   : null  }
                                    { imagesloading ? <Spinner />  :
                                    <div className="row" style={{width: "100%"}}>
                  <div className='row my-2'>
                        {  restaurant && !imagesloading && menus && menus.length > 0 ? 
                        
                     
                         this.props.dashboard.menus.map((m,i) => 
                        <div key={'menus' + i} >
                        <div className="m-2">
                             <img className="img-thumbnail" style={{maxWidth: "150px" }} src={`http://127.0.0.1:8000/storage/menus/${m.src}`} />
                            </div>
                             {this.state.deleteMenu ?
                             <div className="col-12 my-2" style={{textAlign : "center"}}>
                             <Button disabled={this.props.dashboard.menus.length == 1 } onClick={()=> this.deleteImg('menus', m)}>Delete</Button>
                             </div>
                           
                             : null }
                        </div>
                        )  : 'Geen menukaarten geupload' }
                        </div>
                        {this.state.menuFile ? <img className="img-thumbnail" style={{maxWidth: "150px" }} src={this.state.menuFile}/> : null }
                        {this.state.addMenuState ? 
                        <div className="row my-2" style={{width : '100%'}}>
                            <div className="col-12">
                        <FormGroup>
                        <form onSubmit={this.onFormSubmitMenus}>
                            <input type="file" required onChange={this.onChangeMenuImages}
                            />
                            <Button type="submit" >Upload </Button>
                        </form>
                        </FormGroup>
                        </div>
                        </div>
                       : null }
                        </div>
                     
                        }
                        <Divider />
                        <div className="row my-3"  style={{width: "100%"}}>
                                    <div className="row my-2" style={{width: "100%"}}>
                                    <div className="col">
                                        <h6>Profiel foto</h6>
                                    </div>
                                    <div className="col-6 floatright float-right">
                                        <Button className="floatright" onClick={() => this.addProfile()}>
                                            < AddCircleIcon />
                                        </Button>
                                    </div>
                                    </div>
                
                            <div >
                        {console.log(restaurant.primary_img, 'primary')}
                        {  restaurant && this.state.primary_img  && this.state.primary_img != 'null'  ? 
                            <div className="row">
                                <div className="col">
                                {this.state.imageFile ? <img className="img-thumbnail" style={{maxWidth: "150px" }} src={this.state.imageFile}/> : <img className="img-thumbnail" style={{maxWidth: "150px" }} src={`http://127.0.0.1:8000/storage/primary_imgs/${this.state.primary_img}`} /> }
                                </div>
                            </div>
                        : 'Geen hoofdfoto geupload'}
         
                        {this.state.addProfile ? 
                        <div className="row my-2">
                        <div className="col-12">
                        <FormGroup>
                        <form onSubmit={this.onFormSubmitPrimaryImg} >
                            <input type="file" required onChange={this.onChangePrimaryImage}/>
                            <Button type="submit" >Upload</Button>
                        </form>
                        {/*  <Label for="primary_img">Hoofdfoto</Label>
                           <Input type="file" name="primary_img" id="primary_img" onChange={this.newPrimaryImg}/> 
                            <Input type="file" onChange={this.handleImageUpload}/> */}
                        </FormGroup>
                        </div>
                        </div>
                        : null }
                        </div>
                        </div>
                        <Divider />
                        <div className="row my-3" style={{width: "100%"}}>
                                    <div className="row my-2" style={{width: "100%"}}>
                                    <div className="col">
                                        <h6>Carousel foto's</h6>
                                    </div>
                                    <div className="col-6 floatright float-right">
                                    <Button className="floatright" onClick={() => this.deleteCarousel()}>
                                            < DeleteIcon />
                                        </Button>
                                    <Button className="floatright  mx-2" onClick={() => this.addCarousel()}>
                                            < AddCircleIcon />
                                        </Button>

                                    
                                      
                                
                                    </div>
                                    </div>
                                    { this.props.dashboard.images.length == 1 ?
                                    <div className="row" style={{ width: '100%' }}>
                                        <Alert severity="info" style={{width : '100%'}}>U moet minstens 1 foto hebben.</Alert>
                                    </div>
                                   : null  }
                                    { imagesloading ? <Spinner />  :
                                    <div className="row" style={{width: "100%"}}>
                  <div className='row my-2'>
                        { restaurant && !imagesloading && images && images.length > 0 ? 
                        
                     
                         this.props.dashboard.images.map(( m,i) => 
                        <div key={'images' + i}>
                        <div className="m-2">
                             <img className="img-thumbnail" style={{maxWidth: "150px" }} src={`http://127.0.0.1:8000/storage/carousel/${m.src}`} />
                            </div>
                             {this.state.deleteCarousel ?
                             <div className="col-12 my-2" style={{textAlign : "center"}}>
                             <Button disabled={this.props.dashboard.images.length == 1 }  onClick={()=> this.deleteImg('images', m)}>Delete</Button>
                             </div>
                           
                             : null }
                        </div>
                        )  : 'Geen menukaarten geupload' }
                        </div>
                        {this.state.menuFile ? <img className="img-thumbnail" style={{maxWidth: "150px" }} src={this.state.menuFile}/> : null }
                        {this.state.addCarousel ? 
                        <div className="row my-2" style={{width:'100%'}}>
                            <div className="col-12">
                        <FormGroup>
                        <form onSubmit={this.onFormSubmitMenus}>
                            <input required type="file" required onChange={this.onChangeMenuImages}
                            />
                            <Button type="submit" >Upload </Button>
                        </form>
                        </FormGroup>
                        </div>
                        </div>
                       : null }
                        </div>
                     
                        }
                        <Divider />
                        </div>
                        </div>
                        </AccordionDetails>
                        </Accordion>
                        </div>
                        </div>
                        : null }
                </Container>
           : <Spinner /> }
           </div>
            
            </div>
        )
    }
}
Edit.propTypes = {
    categories: PropTypes.object.isRequired,
    facilities: PropTypes.object.isRequired,
    payments: PropTypes.object.isRequired,
    updateRestaurant: PropTypes.func.isRequired,
    postPrimaryImg: PropTypes.func.isRequired,
    postRestaurantImages: PropTypes.func.isRequired,
    error : PropTypes.object.isRequired,
    deleteRestaurantImage: PropTypes.func.isRequired,
    getRestaurant: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    item: state.item,
    categories: state.categories,
    facilities: state.facilities,
    payments: state.payments,
    error : state.error,
    dashboard : state.dashboard
})
export default connect(mapStateToProps, { updateRestaurant, postPrimaryImg ,getRestaurant,clearErrors, deleteRestaurantImage, postRestaurantImages})(Edit)
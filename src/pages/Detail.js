import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Container,  Button, Form, Input,  
    CardTitle,
    } from 'reactstrap';
    import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { getItem } from '../actions/itemActions';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { addComment, getComments } from '../actions/commentAction';
import { addRating } from '../actions/ratingActions';
import { getRatings } from '../actions/ratingActions';
import ReservationModal from '../components/ReservationModal/ReservationModal'
import FavoriteButton from '../components/FavoriteButton/FavoriteButton';
import PriceComponent from '../components/PriceComponent/PriceComponent';
import RoomIcon from '@material-ui/icons/Room';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AwesomeSlider from 'react-awesome-slider';
import 'react-awesome-slider/dist/styles.css';
import withAutoplay from 'react-awesome-slider/dist/autoplay';
import CustomizedProgressBars from '../components/Progress/Progress'
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import LoginModal from '../components/Auth/LoginModal';
import Spinner from '../components/Components/Spinner/Spinner'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; 
import AddToCalendar from 'react-add-to-calendar';
import PhoneIcon from '@material-ui/icons/Phone';
import HouseIcon from '@material-ui/icons/House';
import PublicIcon from '@material-ui/icons/Public';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import Pagination from "react-js-pagination";
// the hoc
import { Trans } from 'react-i18next'
import moment from 'moment';
import Slider from './Slider';
import TooManyRequests from './TooManyRequest'
import { clearErrors } from '../actions/errorActions'
class Detail extends Component {
    constructor(props){
        super(props)
        this.state = {
            dateNow: moment().format("YYYY-MM-DD"), 
            item: [],
            comments: [],
            rating: null,
            comment: '',
            loaded: false,
            openComments: false,
            extraInformation: false,
            menukaart: false,
            value: 0,
            gegevens: false,
            photoIndex: 0,
            isOpen: false,
            restaurant_id: '',
            openinghours: null,
            openinghoursCollapse: false,
            loadedImages: [],
            loadImages: false,
            extraRating: false,
            myRating: null
        }
}

    componentDidMount(){
        let id = this.props.match.params.id
        var splitstr = id.split(':');
        let final = splitstr.slice(0)

        this.setState({
            restaurant_id: final[1]
        })
        this.props.getItem(final[1])
        this.props.getComments(final[1]);
        this.props.getRatings(final[1]);

    }
    componentDidUpdate(){
        if( !this.state.loaded && !this.props.item.loading){
                this.setState({
                    loaded: true,
                    openinghours: JSON.parse(this.props.item.item.openinghours)
                })

            
        }
    }
    componentWillUnmount(){
        this.props.clearErrors()
    }
    onChangeComment = e => {
        this.setState({
            comment: e.target.value
        })
    }
    onSubmitComment = e => {
        e.preventDefault();
        const { comment } = this.state;

        let restaurant_id = this.props.item.item.id;
        let user_id = localStorage.getItem('id');

        const newComment = {
            restaurant_id,
            user_id,
            comment
        }
        this.props.addComment(newComment);
    }
    onSubmitRating = e => {
        e.preventDefault();
        this.setState({ rating : e.target.value}, function(){

        const { rating } = this.state;

        let restaurant_id = this.props.item.item.id;
        let user_id = localStorage.getItem('id');

        const newComment = {
            restaurant_id,
            user_id,
            rating
        }
        this.props.addRating(newComment);

        this.props.item.item.totalrating ++ ;
        if(this.state.rating == 1){
            this.props.item.item.onestar ++ ;
        }else if(this.state.rating == 2){
            this.props.item.item.twostar ++;
        }else if(this.state.rating == 3){
            this.props.item.item.threestar ++;
        }else if(this.state.rating == 4){
            this.props.item.item.fourstar ++;
        }else if(this.state.rating == 5){
            this.props.item.item.fivestar ++;
        }
      
        })
        
    }
    onChange = value => this.setState({ value });

    handleComments = () => {
        this.setState({
            openComments : !this.state.openComments
        })
    }
    extraInformation = () => {
        this.setState({
            extraInformation: !this.state.extraInformation
        })
    }
    gegevens = () => {
        this.setState({
            gegevens: !this.state.gegevens
        })
    }
    openinghoursCollapse = () => {
        this.setState({
            openinghoursCollapse: !this.state.openinghoursCollapse
        })
    }
    extraRating = () => {
        this.setState({
            extraRating: !this.state.extraRating
        })
    }
    menukaart = () => {
        this.setState({
            menukaart: !this.state.menukaart
        })
    }
    loadNextPageComments = e => {
        let page = this.props.comments.current_p;
        this.props.getComments(this.state.restaurant_id + '?page=' + e)
        
    }
    loadImages = () => {
        let images =  this.props.item.images
        this.setState({
            loadedImages: images
        }, function(){
            this.setState({
                loadImages: true
            })
        })
    }
    render() {
        const { item, loading, images ,menus , } = this.props.item;
         const { comments, commentsloading } = this.props.comments; 
         const { ratings } = this.props.ratings;
         const { isAuthenticated } = this.props.auth;
         var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
          };
          const AutoplaySlider = withAutoplay(AwesomeSlider);

        return (
            
           <div>
                {this.props.error.tooMany ? <TooManyRequests />
                  : 
                        <div className="padding-top">
                            {images && !this.state.loadImages ? this.loadImages() : null }
                        { !loading && item && ratings && comments  ? 
                        <div>
                           
                            { item && images && !loading && this.state.loadImages ?
                          <div 	className="d-block d-xl-none">
                              <Slider slides={images }></Slider>
                            
                        </div>
                    : null }
            <div className="fabButton d-sm-block d-md-none" >
                { isAuthenticated ? 
            <ReservationModal key={item.id} item={item}  customClasses={'fullLengthButton'} />
            : <LoginModal custom='fullLengthButton' type="reserveerbutton" />}
        
            </div>

            <Container style={{marginBottom : "75px"}}>
            { item && images && !loading && this.state.loadImages ?
                          <div className="d-none d-xl-block">
                              <Slider slides={images}></Slider>
          
                      
                        </div>
                    : null }
                    <div className="row pt-4">
                        <div className="col-lg-8">
                            
                            
                                <h1>{item.title}</h1>

                                {item.category ? 
                                <Chip
                                        label={item.category.title}
                                        value={item.category.id}
                                        id={item}
                                        key={item}
                                       /*  color="#2369f6" */
                                    />
                                : null }
                                <a target="_blank" href={`https://www.google.com/maps/place/${item.address}`}>
                                <p className="color-primary mt-3"><RoomIcon /> {item.address} </p>
                                </a>
                                <p>{item.description}</p>
                          
                    </div>
                
                <div className="col-lg-4">
                    <CardTitle>  <strong><Trans i18nKey="intrested">
                               </Trans></strong> </CardTitle>    
                    { isAuthenticated  ? <ReservationModal item={item} key={item.id} favorite={false} /> : <LoginModal custom='fullLengthButton' type="reserveerbutton" /> }
                    
                                { isAuthenticated ?  <FavoriteButton favorite={item.favorited ? true : false} /> :  <LoginModal type="favoritebutton" /> }
                    
                    { item.reservation && item.reservation[item.reservation.length - 1].date > this.state.dateNow ?
                   <Button className="button blueButton mt-2 ">
                    <AddToCalendar event={{
                        'title' :   item.title,
                        description: 'Gaan eten met ' + item.reservation[0].persons + ' personen.',
                        location: item.address ,
                        // fix timme                                     
                    }} />
                </Button>
                : null }
            </div>
            </div>
            <div className="row mt-3">
                <div className="col-md-12">
                    <List>
                    <Divider />
                    <ListItem button  onClick={this.openinghoursCollapse}>
                        <ListItemText primary={
                            <Trans i18nKey="openinghours">
                            </Trans>} />
                        {this.state.openinghoursCollapse ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openinghoursCollapse} timeout="auto" unmountOnExit>
                    <List>
            <ListItem>
                                
                                <ListItemText>
                                    {this.state.openinghours ? 
                                     <div>
                                    <div> <Trans i18nKey="monday"> </Trans>: {this.state.openinghours[0].monday.length >= 1 ? this.state.openinghours[0].monday.map((m,i) =>{ return ( <div key={'monday' + i} className="col"> {m} </div> )} ) : <Trans i18nKey="closed"> </Trans>} </div>
                                    <div> <Trans i18nKey="tuesday"> </Trans>: {this.state.openinghours[0].tuesday.length >= 1 ? this.state.openinghours[0].tuesday.map((m,i) => { return ( <div key={'tuesday' + i} className="col"> {m} </div> )}) : <Trans i18nKey="closed"> </Trans>} </div>
                                    <div> <Trans i18nKey="wednesday"> </Trans>: {this.state.openinghours[0].wednesday.length >= 1 ? this.state.openinghours[0].wednesday.map((m,i) => { return ( <div key={'wednesday' + i} className="col"> {m} </div>)}) :<Trans i18nKey="closed"> </Trans>} </div>
                                    <div> <Trans i18nKey="thursday"> </Trans>: {this.state.openinghours[0].thursday.length >= 1 ? this.state.openinghours[0].thursday.map((m,i) => { return ( <div key={'thusday' + i} className="col"> {m} </div> )}) : <Trans i18nKey="closed"> </Trans>} </div>
                                    <div><Trans i18nKey="friday"> </Trans>: {this.state.openinghours[0].friday.length >= 1 ? this.state.openinghours[0].friday.map((m,i) => { return ( <div key={'friday' + i} className="col"> {m} </div>)}) : <Trans i18nKey="closed"> </Trans>} </div>
                                    <div><Trans i18nKey="saturday"> </Trans>: {this.state.openinghours[0].saturday.length >= 1 ? this.state.openinghours[0].saturday.map((m,i) => { return (<div key={'saturday' + i} className="col"> {m} </div>)}): <Trans i18nKey="closed"> </Trans>} </div>
                                    <div><Trans i18nKey="sunday"> </Trans>: {this.state.openinghours[0].sunday.length >= 1 ? this.state.openinghours[0].sunday.map((m,i) => { return ( <div key={'sunday' + i} className="col"> {m} </div> )}): <Trans i18nKey="closed"> </Trans>} </div>
                                    </div> : null }
                                </ListItemText>
                            </ListItem>   
                            </List>
                              </Collapse>
                              </List>
                  
                    </div>
                    </div>
            <div className="row">
                <div className="col-md-12">
                    <List>
                    <Divider />
                    <ListItem button  onClick={this.gegevens}>
                        <ListItemText primary={
                            <Trans i18nKey="contactdetails"> </Trans>}/>
                        {this.state.gegevens ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.gegevens} timeout="auto" unmountOnExit>

                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <PhoneIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {item.telephone ? item.telephone : <Trans i18nKey="nonumber"> </Trans>}
                                </ListItemText>
                            </ListItem>
                            { item.address ? 
                            <a target="_blank" href={`https://www.google.com/maps/place/${item.address}`}>
                            <ListItem>
                                <ListItemIcon>
                                    <HouseIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {item.address ? item.address :  <Trans i18nKey="noaddress"> </Trans>}
                                </ListItemText>
                            </ListItem>
                            </a>
                            : <ListItem>
                            <ListItemIcon>
                                <HouseIcon />
                            </ListItemIcon>
                            <ListItemText>
                                {item.address ? item.address : <Trans i18nKey="noaddress"></Trans>}
                            </ListItemText>
                        </ListItem> }
                            <ListItem>
                                <ListItemIcon>
                                    <AlternateEmailIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {item.contactemail ? item.contactemail :  <Trans i18nKey="nocontactemail"></Trans>}
                                </ListItemText>
                            </ListItem>
                            {item.website ?
                            <a target="_blank" href={item.website}>
                            <ListItem>
                                <ListItemIcon>
                                    <PublicIcon />
                                </ListItemIcon>
                                <ListItemText>
                                    {item.website ? item.website : <Trans i18nKey="nowebsite"></Trans>}
                                </ListItemText>
                            </ListItem>
                            </a>
                            : 
                            <ListItem>
                                <ListItemIcon>
                                    <PublicIcon />
                                </ListItemIcon>
                                <ListItemText>
                                <Trans i18nKey="nowebsite"></Trans>
                                </ListItemText>
                            </ListItem>
                            
                            }
                        </List>
                        </Collapse>
                    <Divider />
                    <ListItem button  onClick={this.menukaart}>
                        <ListItemText primary={
                             <Trans i18nKey="menu"></Trans>} />
                        {this.state.menukaart ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.menukaart} timeout="auto" unmountOnExit>
                        <List className="nested">
                            {item && menus ?<Trans i18nKey="clickonpicture"></Trans> : <Trans i18nKey="nomenus"></Trans> }
                        </List>
                        {item && menus ? 
                        <div className="col-12 m-2">
                            {menus.map(m => 
                             <img key={'img' + m.id} className="img-thumbnail m-2" alt={`menu picture ${m.id}`} style={{maxWidth: "150px" }} src={`https://quinten.staging.7.web.codedor.online/storage/menus/${m.src}`} onClick={() => this.setState({ isOpen: true })}/>
                            )}
                           
 
        {this.state.isOpen && (
          <Lightbox
            mainSrc={'https://quinten.staging.7.web.codedor.online/storage/menus/' + menus[0].src}
            nextSrc={'https://quinten.staging.7.web.codedor.online/storage/menus/' + menus[(this.state.photoIndex + 1) % menus.length].src}
            prevSrc={'https://quinten.staging.7.web.codedor.online/storage/menus/' + menus[(this.state.photoIndex + menus.length - 1) % menus.length].src}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (this.state.photoIndex + menus.length - 1) % menus.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (this.state.photoIndex + 1) % menus.length,
              })
            }
          />
        )}
             </div>
           : null  }
 
                  
                    </Collapse>
                    <Divider />
                    <ListItem button  onClick={this.extraInformation}>
                        <ListItemText primary={<Trans i18nKey="extrainformation"></Trans>} />
                        {this.state.extraInformation ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.extraInformation} timeout="auto" unmountOnExit>
                        <List className="nested">
                        {<Trans i18nKey="extrainformation"></Trans>} <PriceComponent price={item.price} /> 
                        </List>
               

                    <List className="nested">
                    <Trans i18nKey="payment"></Trans>
                    {item && item.payments ?
                     item.payments.length > 0 ?
                     item.payments.map((m , i) => {
                        return(
                            
                            <ListItemText
                            key={'payment' + m.id}
                                    primary={m.title}
                                   
                                />
                            
                        )
                    } ) : <ListItemText
                    primary={  <Trans i18nKey="nopayment"></Trans>} /> : 
                    <ListItemText
                    primary={<Trans i18nKey="nopayment"></Trans>} /> 
                    }
                    </List>
                    <List className="nested">
                    <Trans i18nKey="facilities"></Trans>
                    {item && item.facilities ? 
                    item.facilities.length > 0 ?
                    item.facilities.map((m , i) => {
                        return(
                            
                            <ListItemText
                            key={'facility' + m.id}
                                    primary={m.title}
                                   
                                />
                            
                        )
                    } ) :  <ListItemText
                    primary={<Trans i18nKey="nofacilities"></Trans>}
                   /> : 
                   <ListItemText
                   primary={<Trans i18nKey="nofacilities"></Trans>}
                  />
                   }
                    </List>
                    </Collapse>
                    <Divider />

                    <ListItem button onClick={this.extraRating}>
                    
                        <ListItemText primary={
                            <React.Fragment>
                           {/*  <Typography
                              
                            > */}
                         
                            
                                <div className='row'> <div> <Trans i18nKey="rating"></Trans> ( {this.state.rating ? item.totalrating  : item.totalrating } ) </div> <div className="col"> <Rating className="floatright" name="rating" fontSize={"inherit"} precision={0.5}  defaultValue={this.state.rating ? item.average_rating > 0 ? item.average_rating : this.state.rating : item.average_rating }readOnly />  </div> </div>
                  
                           
                           
                                        
                                       
                                    
                        {/*              */}
                        {/*     </Typography> */}
         
                        </React.Fragment> }/> 
                        {this.state.extraRating ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.extraRating} timeout="auto" unmountOnExit>
                     
                    <List >
                   <div className="col-12">
                    <h6> <Trans i18nKey="amountratings"></Trans> {item.totalrating}</h6>
                                
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">5 <Trans i18nKey='stars'></Trans> </div>
                                    <div className="col float-right px-0"> <strong className="floatright"><Trans i18nKey='total'></Trans>: {item.fivestar}  </strong></div>
                                    </div>
                                    <CustomizedProgressBars  variant="determinate" value={ item.fivestar !== 0 ? (item.fivestar /  item.totalrating ) * 100 : 0}/>
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">4 <Trans i18nKey='stars'></Trans> </div>
                                    <div className="col float-right px-0">  <strong className="floatright"><Trans i18nKey='total'></Trans>: { item.fourstar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate"  value={  item.fourstar !== 0 ? (item.fourstar /  item.totalrating ) * 100 : 0}/>
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">3 <Trans i18nKey='stars'></Trans> </div>
                                    <div className="col float-right px-0">  <strong className="floatright"><Trans i18nKey='total'></Trans>: {item.threestar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={ item.threestar !== 0 ? (item.threestar /  item.totalrating ) * 100 : 0}/>
                                    <div className="row mt-3 mb-1  justify-content-end">
                                    <div className="col px-0">2 <Trans i18nKey='stars'></Trans> </div>
                                    <div className="col float-right px-0">  <strong className="floatright"><Trans i18nKey='total'></Trans>: {item.twostar }</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={  item.twostar !== 0 ? (item.twostar /  item.totalrating ) * 100 : 0}/>
                                    <div className="row mt-3 mb-1  justify-content-end">
                                    <div className="col px-0">1 <Trans i18nKey='stars'></Trans> </div>
                                    <div className="col float-right px-0">  <strong className="floatright"><Trans i18nKey='total'></Trans> : {item.onestar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={ item.onestar !== 0 ? (item.onestar /  item.totalrating ) * 100 : 0}/>
                             
                                    </div>
                                   <div className="col-12">
                                   { isAuthenticated ? 
                                 item.rated ?
                                 <div style={{textAlign: "center"}}> <div className="row my-3" style={{justifyContent: "center"}}><h6><Trans i18nKey="myrating"></Trans> </h6></div><Rating name="rating" defaultValue={item.rated} readOnly /> </div>
                                    : <div style={{textAlign: "center"}}> <div className="row my-3" style={{justifyContent: "center"}}><h6><Trans i18nKey="givearating"></Trans> </h6> </div> <Rating name="rating" defaultValue={0} onChange={this.onSubmitRating} /> </div>
                                : <div style={{textAlign: "center"}}> <div className="row my-3" style={{justifyContent: "center"}}><h6><Trans i18nKey="givearating"></Trans></h6></div> <div className="row my-2" style={{textAlign: "center", justifyContent: "center"}}><Trans i18nKey="loginrating"></Trans></div> <LoginModal type={"rating"}/></div>}
                    </div>
                    </List>
                    </Collapse>
                    <Divider /> 
                    <ListItem button  onClick={this.handleComments}>
                                {comments.data ?  <ListItemText primary={ <Trans i18nKey="comments" values={{ number: comments.total}} > Total comments {comments.total} </Trans> }/>: <ListItemText primary={<Trans i18nKey="nocomments"></Trans> }/> }
                               
                        {this.state.openComments ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                    <Collapse in={this.state.openComments} timeout="auto" unmountOnExit>
                      
   
                    { !commentsloading && comments.data && comments.data.map((m , i) => {
                        return(
                            <div className="col-12">
                            
                            <List >
                            <ListItem alignItems="flex-start">
                              <ListItemAvatar>
                              <Avatar>{m.user.name.charAt(0)}</Avatar>
                              </ListItemAvatar>
                              
                              <ListItemText
                              style={{'overflow': 'hidden'}}
                                primary={m.user.name}
                                secondary={
                                  <React.Fragment>
                                    <Typography
                                      component="span"
                                      color="textPrimary"
                                    >
                                      {m.comment}
                                     
                                    </Typography>
                                  </React.Fragment>
                                }
                              />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                            </List>
                            </div>
                        )
                    })} 
                
                      {comments.data && comments.total > 5 ?
                      <div className='row my-2'>
                     <Pagination
                     style={{margin: '0 auto'}}
                            activePage={comments.current_page}
                            itemsCountPerPage={comments.per_page}
                            totalItemsCount={comments.total}
                            pageRangeDisplayed={5}
                            onChange={this.loadNextPageComments.bind(this)}
                            itemClass="page-item"
                            linkClass="page-link"
                          /> 
                          </div>
                       : null  }
                       <div className="row my-2">
                           <div className='col-12'>
                    <h6><Trans i18nKey="writecomment"></Trans>:</h6>
                    
                    { isAuthenticated ? 
                    
                    <Form onSubmit={this.onSubmitComment}>
                        <Input
                        type='textarea'
                        id="comment"
                        name="comment"
                        onChange={this.onChangeComment}
                        >
                        </Input>
                        {this.props.comments.commentsloading || this.state.comment == '' ? <Button disabled className="my-2 noradius">
                            <Trans i18nKey="placecomment"></Trans>
                        </Button> :
                        <Button className="my-2 noradius">
                            <Trans i18nKey="placecomment"></Trans>
                        </Button>
                         }
                    </Form>
                   : <div style={{textAlign: "center"}}> <div className="row my-3" style={{justifyContent: "center"}}><h6><Trans i18nKey="placeacomment"></Trans></h6></div> <div className="row my-2" style={{textAlign: "center", justifyContent: "center"}}><Trans i18nKey="logincomment"></Trans></div> <LoginModal type={"comment"}/></div>} 
                    </div>
                    </div>
               
                    </Collapse>
                    <Divider />
                    </List>
                    
                </div>
            </div>
            </Container> 
            </div>
            : <Spinner /> }
            </div>
                }
                 </div>
        )
    }
}
Detail.propTypes = {
    getItem: PropTypes.func.isRequired,
    addComment: PropTypes.func.isRequired,
    addRating: PropTypes.func.isRequired,
    getComments: PropTypes.func.isRequired,
    getRatings: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    comments: PropTypes.object.isRequired, 
    auth: PropTypes.object.isRequired,
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired
}
const mapStateToProps = state => ({
    item: state.item,
    comments: state.comment,
    ratings: state.rating,
    auth: state.auth,
    error :state.error
})
export default connect(mapStateToProps, { getItem, clearErrors, addComment, getComments, getRatings, addRating })(Detail)
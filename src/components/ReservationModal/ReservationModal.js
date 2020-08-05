import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Container, Modal, ModalBody, ModalHeader, Form, Input, Label, FormGroup, NavLink,  Card } from 'reactstrap';
import PropTypes from 'prop-types';
import { addReservation } from '../../actions/reservationActions';
import { getReservationTable } from '../../actions/reservationActions';
 import { clearErrors } from '../../actions/errorActions'; 
import { Stage, Layer, Rect, Text, Circle, Line, Shape , Image } from 'react-konva';
import Konva from 'konva';
import { getRooms } from '../../actions/roomActions'
/* import Stepper, { Step } from "react-material-stepper"; */
import { Steps, message } from 'antd';
import TableCanvas from './TableCanvas'
import Drawer from '@material-ui/core/Drawer';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import CancelIcon from '@material-ui/icons/Cancel';
import Spinner from '../Components/Spinner/Spinner'
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Lottie from 'react-lottie';
import FadeIn from 'react-fade-in';
import moment from 'moment';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import * as animationData from './success.json'
import { Translation } from 'react-i18next';
import i18n from '../../i18n';
// the hoc
import { Trans, useTranslation } from 'react-i18next'
import Alert from '@material-ui/lab/Alert';
const { Step } = Steps;

const steps = [
  {
    title: 'Reservation data',
    content: '',
  },
  {
    title: 'Choose a table',
    content: '',
  },
  {
    title: 'Overview',
    content: '',
  },
  {
    title: 'Finished',
    content: '',
  },
];

class URLImage extends React.Component {
  state = {
    image: null
  };
  componentDidMount() {
    this.loadImage();
  }
  componentDidUpdate(oldProps) {
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    this.image.removeEventListener('load', this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    this.image = new window.Image();
    this.image.src = this.props.src;
    this.image.addEventListener('load', this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      image: this.image
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
      id={this.props.id}
          name={this.props.name}
        x={this.props.x}
        y={this.props.y}
        height={this.props.height}
        width={this.props.width}
        /* fill={this.props.fill} */
        image={this.state.image}
        /* fill={this.props.fill}
        style={{fill: this.props.fill }} */
        ref={node => {
          this.imageNode = node;
        }}
        closed
        draggable={true}
        strokeWidth={this.props.strokeWidth}
        onClick={this.props.onClick}
        onTouchEnd={this.props.onTouchEnd}
        stroke={this.props.stroke}  
         /*  onDragMove={this.props.onDragMove} */
        />
        );
      }
    } 

class ReservationModal extends Component {

    state = {
        modal: false,
        current: 0,
        username: '',
        password: '',
        persons: 1,
        date: null,
        later : null,
        showCanvas: 0,
        freetables: 0,
        time: null,
        gevonden: '',
        gevondenTest: [],
        errormsg:'',
        formCorrect: true,
        checkedProblems: false,
        tafel: 1,
        resetting: false,
        msg: '',
        item: this.props.item,
        selectedTable: [],
        selectedTableByUser: null,
        activeStep: 0,
        prevState: null ,
        listOpen: true,
        drawer: false,
        buttonDisbled: false,
    };


    handleNext = () => {
      this.setState({
        errormsg: null
      })
      this.setState({
        activeStep : this.state.activeStep + 1
      })
    };
  
    handleBack = () => {
      this.setState({
        errormsg: null,
        buttonDisbled: true,
      })
      this.setState({
        activeStep: this.state.activeStep - 1
      })
      
    };
  
    next() {
        const current = this.state.current + 1;
        this.props.getRooms(this.props.item.id)
        this.setState({ current });
      }
    
      prev() {
        const current = this.state.current - 1;
        this.setState({ current });
      }
    static propTypes = {
       error: PropTypes.object.isRequired,
        clearErrors: PropTypes.func.isRequired,
        auth: PropTypes.object.isRequired,
        getReservationTable: PropTypes.func.isRequired,
        getRooms: PropTypes.func.isRequired,
        room: PropTypes.object.isRequired,

    }

    componentDidMount(){
        console.log(this.props.item)
        this.resetSession();
        this.setState({
          modal: false,
          current: 0,
          username: '',
          password: '',
          persons: 1,
          date: null,
          later : null,
          time: null,
          showCanvas: 0,
          freetables: 0, 
          formCorrect: true,
          checkedProblems: false,
          resetting: true,
          tafel: 1,
          formSubmitted: false,
          msg: '',
          gevonden: '',
          errormsg: '',
          item: this.props.item,
          selectedTable: [],
          selectedTableByUser: null,
          activeStep: 0,
          prevState: null ,
          listOpen: true,
        }, function () {
          this.props.getRooms(this.props.item.id)
        })
        
        
    }
    componentWillUnmount(){
      this.setState({
        modal: false,
        current: 0,
        username: '',
        password: '',
        persons: 1,
        freetables: 0,
        date: null,
        later : null,
        time: null,
        formSubmitted: false,
        formCorrect: true,
        checkedProblems: false,
        resetting: true,
        tafel: 1,
        msg: null,
        item: this.props.item,
        selectedTable: [],
        selectedTableByUser: null,
        activeStep: 0,
        gevonden: '',
        prevState: null ,
        listOpen: true,
      },function(){
        this.setState({
          resetting: false
        })
      })
    }

    resetSession = () => {
      this.setState({
        modal: false,
        current: 0,
        username: '',
        password: '',
        freetables: 0,
        persons: 1,
        date: null,
        formSubmitted: false,
        later : null,
        time: null,
        formCorrect: true,
        checkedProblems: false,
        resetting: true,
        tafel: 1,
        gevonden: '',
        msg: '',
        errormsg: '',
        item: this.props.item,
        selectedTable: [],
        selectedTableByUser: null,
        activeStep: 0,
        prevState: null ,
        listOpen: true,
      },function(){
        this.setState({
          resetting: false
        })
      })
    }
    toggle = () => {
        // console.log('toggle')
        this.setState({
            modal: !this.state.modal,
        })
    }
    toggleDrawer = () => {
      
      this.setState({
        drawer: !this.state.drawer,
        formSubmitted: false,
      },function(){
        this.resetSession()})
    }
    onChange = e => {
        // console.log(e.target.name)
        this.setState({ [e.target.name] : e.target.value}, function(){
            this.setState({
              buttonDisbled: false,
              freetables: 0,

            })
        })


        // console.log('tafel',this.state.tafel)
        // console.log('persons', this.state.persons)
    }

    onSubmit = event => {
        event.preventDefault()
      this.setState({
        formSubmitted: true
      })
        if(this.state.date && this.state.time && this.state.persons){
        if(this.state.date == moment().format("YYYY-MM-DD") && this.state.time <= moment().format('HH:mm')){
          this.setState({
            errormsg: 'Pak een later uur of een andere datum.'
          })
        }
        const { date, time, persons, item } = this.state;
        this.setState({
          freetables: 0
        })
        let restaurant_id = item.id
        let user_id = localStorage.getItem('id')
        let table_id = this.state.tafel
        const newReservation = {
            date,
            time,
            persons,
            restaurant_id ,
            user_id ,
            table_id,
        }
        let url =  '?date=' + this.state.date + ' ' + this.state.time + '&persons=' + this.state.persons;
        console.log(url);

        this.setState({
          buttonDisbled: true,
        })
        this.setState({
          errormsg: '',
          gevonden: '',
          freetables: 0,
        }, function(){
          this.props.getReservationTable(item.id, url)
        })
        
        /* this.checkProblems()  */
      }else{
        this.setState({
          errormsg: 'Vul alle velden in.'
        })
      }
        // attempt login 
       /*  this.props.addReservation(newReservation);  */

    }
    onClick = e => {
      console.log('touched',e.target.attrs.id)
       this.setState({
         selectedTable: e.target.attrs.id.id
     }) 
     this.setState({
       selectedTableByUser : e.target.attrs.id.pivot.id
     }) 
  }
  finish = () => {
    console.log('finish', this.state.selectedTableByUser, this.state.selectedTable)
    let item = {
      "user_id" : this.props.auth.user.id,
      "restaurant_id": this.state.item.id,
      "persons": this.state.persons,
      "date" : this.state.date,
      "time" : this.state.time,
      "date_time": this.state.date + ' ' + this.state.time,
      "table_id" : this.state.selectedTable,
      "table_pivot_id" : this.state.selectedTableByUser
    }
    this.props.addReservation(item)
    this.handleNext(); 
  }

/*   makeReservation = () => {
    let item = {
      "user_id" : this.props.auth.user.id,
      "restaurant_id": this.state.item.id,
      "persons": this.state.persons,
      "date" : this.state.date,
      "time" : this.state.time,
      "date_time": this.state.date + ' ' + this.state.time,
      "table_id" : this.state.selectedTable.id,
      "table_pivot_id" : this.state.selectedTableByUser
    }
    this.setState({
      checkProblems: false
    })
     this.props.addReservation(item) 
    this.next() 
  } */

checkProblems = () => {


  console.log('checkProblems',this.props.reservation)
  console.log('check if same', this.state.prevState == this.props.reservation.tablereservations)

  if(this.state.prevState !== this.props.reservation.tablereservations){
    console.log('inside because new search')

    console.log('inside checkedProblems ')
  if(this.props.reservation.tablereservations[0])
  {
    if(this.props.reservation.tablereservations[0] == 'closed')
    {
      if(this.props.reservation.tablereservations[1] !== 'nothing found' ){
        this.setState({
          errormsg: this.props.reservation.tablereservations[1],
          freetables: 0
        });
      }else{
        this.setState ({
          errormsg: 'Restaurant is gesloten op: ' + this.state.date + ' ' + this.state.time ,
          gevonden: '',
          freetables: 0
        })
      }
      
    }else{ 
      if(this.props.room.rooms.length > 0 )
      {
        this.props.room.rooms.map((m,i) => {
          
          console.log('m', m.title ,'i',i)
          console.log('room', this.props.reservation.tablereservations.rooms[i])
          if(this.props.reservation.tablereservations.rooms[i].freetables.length !== 0){
            console.log(i , 'times through loop', 'freetables', this.state.freetables, 'gevonden' , this.state.gevonden );
            console.log('freetables',this.props.reservation.tablereservations.rooms[i].freetables.length)
            let length = parseInt(this.props.reservation.tablereservations.rooms[i].freetables.length,10)
            this.setState(prevState =>{
              return{
                   ...prevState,
                   freetables : prevState.freetables + length ,
                   errormsg: '',
                   gevondenTest: prevState.gevonden +  {"key" : 1, "kamer" : m.title , "amount" :this.props.reservation.tablereservations.rooms[i].freetables.length  },
                   gevonden: prevState.gevonden + 'Er zijn ' + this.props.reservation.tablereservations.rooms[i].freetables.length + " tafel(s) vrij in kamer  '" + m.title + "'. Ga verder indien u een tafel wilt kiezen. ",
              }
           })
          }else{
            if(this.state.freetables == 0 ){
              this.setState(prevState =>{
                return {
                ...prevState,
                errormsg: prevState.errormsg + "Er zijn geen tafels vrij voor " + this.state.persons + " personen " + 'om ' + this.state.time + ' op ' + this.state.date + " in kamer '" + m.title + "'.",
                freetables: prevState.freetables + 0 ,
              }},  function () {
                return;
              })
            }else{
              this.setState({
                errormsg: ''
              })
            }
            
          }
        })
      }
     

   console.log('gevonden', this.state.gevonden, 'freetables', this.state.freetables);
   
  }
}
this.setState({
  checkedProblems: true,
  prevState: this.props.reservation.tablereservations
})
} 

}
listOpen = () => {
  this.setState({
    listOpen: !this.state.listOpen
  })
}
showPrevCanvas = () => {
  console.log('show prev' , this.state.showCanvas)
  this.setState({
    showCanvas: this.state.showCanvas - 1
  })
}
showNextCanvas = () => {
  console.log('show next' , this.state.showCanvas)
  this.setState({
    showCanvas: this.state.showCanvas + 1
  })
}
closeAlert = () => {
  this.setState({
      alert: false
  })
  this.props.clearErrors();
}
    render() {
         const { current } = this.state;
         const { rooms, loading } = this.props.room;
         const { tablereservations, loadingReservation, newReservation } = this.props.reservation;
         const { msg } = this.props.error;
        // lets think you want to make all your objects visible in
      const CANVAS_VIRTUAL_WIDTH = 1000;
      const CANVAS_VIRTUAL_HEIGHT = 1000;

    // now you may want to make it visible even on small screens
    // we can just scale it
    const scale = Math.min(
      window.innerWidth / CANVAS_VIRTUAL_WIDTH,
      window.innerHeight / CANVAS_VIRTUAL_HEIGHT,
    ) - 0.05;

    const defaultOptions = {
      loop: false,
      autoplay: true, 
      animationData: animationData.default,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };
        return (
          
            <div key={this.props.item.id} >
           
            <Button classes={{
              root: this.props.customClasses ? this.props.customClasses : "blackButton" }} onClick={this.toggleDrawer} ><Trans i18nKey="reservate"></Trans></Button>

            <Drawer classes={{
                    paper: 'fullHeightBottomDrawer',
                    root: 'over'
                    }} anchor={'bottom'} open={this.state.drawer} onClose={this.toggleDrawer} >
                      <div className="row justify-content-end mt-2">
                        <div className="col">
                          <h4 style={{fontWeight : '800'}}> <Trans i18nKey="makeareservation"></Trans>. </h4>
                        </div>
                        <div className="col float-right">
                       <CancelIcon classes={{
                         root: 'floatright' }} fontSize="large" onClick={this.toggleDrawer} />
                       </div>
                       </div>
                      <div className="row" style={{overflow: "scroll"}}>
                        <div className="col-12">
                          { this.state.activeStep == 0 ?
                          <div>
                       <div>
                         {console.log(this.state.gevondenTest, 'gevonden test')}
                         { this.state.errormsg ? ( <Alert severity="error"> {this.state.errormsg} </Alert> ): null }
                         { this.state.gevonden ? ( <Alert severity="success" > {this.state.gevonden} </Alert> ): null }
                      { this.state.item && !this.state.resetting && tablereservations && tablereservations[0] && !this.props.reservation.loading && this.state.drawer && this.state.formSubmitted ? this.checkProblems() : null  } 
                      
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                            <Label for="date"><Trans i18nKey="date"></Trans></Label>
                                                <Input
                                                type="date"
                                                name="date"
                                                min= {moment().format("YYYY-MM-DD")}
                                                onChange={this.onChange}
                                                value={this.state.date}
                                                id="date"
                                                required
                                                placeholder="date placeholder"
                                                />
                                            
                                                <Label for="time"><Trans i18nKey="hour"></Trans></Label>
                                                <Input
                                                type="time"
                                                name="time"
                                                onChange={this.onChange}
                                                value={this.state.time}
                                                minDate= {this.state.date == moment().format("YYYY-MM-DD") ? moment().format('HH:mm') : null }
                                                id="time"
                                                required
                                                placeholder="time placeholder"
                                                />
                                 <Label for="persons"><Trans i18nKey="persons"></Trans></Label>
                                                <Input type="select" name="persons" id="persons" required onChange={this.onChange} value={this.state.persons}>
                                                
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                </Input>

                                              <Button className="mt-3" disabled={this.state.buttonDisbled} classes={{ root: 'fullLengthButton'}} variant="contained" color="primary" type="submit" >{this.props.reservation.loading? <CircularProgress />: <Trans i18nKey="search"></Trans> }</Button>
                            </FormGroup>
                           
                        </Form>
            
                        </div>  
                        </div>
                        : null }
                        
                        {this.state.activeStep == 1 && this.props.reservation && tablereservations && tablereservations[0] && this.state.item ? 
                        <div>
                             {rooms ?  console.log(rooms) : null }
                             
                             {rooms.length > 1 ? 
                             <div className="row my-2 justify-content-between"  >
                              <Button onClick={() => this.showPrevCanvas()} disabled={ this.state.showCanvas == 0 ? true : false  }>
                              <p><ArrowBackIosIcon /> <Trans i18nKey="prevroom"></Trans></p>
                            </Button>
                              <Button onClick={() => this.showNextCanvas()} disabled={ this.state.showCanvas == rooms.length - 1 ? true : false  } >
                                <p><Trans i18nKey="nextroom"></Trans> <ArrowForwardIosIcon /></p>
                                </Button>
                            </div>
                            : null }
                          
                          
                             {rooms ? 
                             rooms.map(( room,i ) => {
                               return (
                                 <div className={ this.state.showCanvas == i ? 'hiddenCanvas' : null}>
                                   <div className="row">
                                     {console.log('i', i , 'showCanvas' , this.state.showCanvas )}
                                    <h6>{room.title}</h6>
                                  </div>
                              <Stage  width={window.innerWidth} height={window.innerHeight} scaleX={scale} scaleY={scale}>
                              { console.log(scale)}
                             {  room.walls ?  
                             <Layer>
                                 <Shape
                                     sceneFunc={(context, shape) => {
                                     context.beginPath();
                                     {room.walls.map(m => {
                                         if(m.id == 1){
                                             context.moveTo(m.point1, m.point2);
                                         }
                                         
                                         context.lineTo(m.point1, m.point2);
                                         context.moveTo(m.point1, m.point2);
                                         if(m.id == room.walls.length){
                                             
                                             context.moveTo(m.point1, m.point2);
                                             room.walls.map(m => {
                                                 if(m.id == 1){
                                                     context.lineTo(m.point1,m.point2)
                                                 }
                                             })
                                             context.lineTo()
                                             context.closePath();
                                         }
                                     })}
                                     
                                     context.closePath();
                                     // (!) Konva specific method, it is very important
                                     context.fillStrokeShape(shape);
                                     }}
                                     fill="#00D2FF"
                                     stroke="black"
                                     strokeWidth={5}
                                 /> 
                                 </Layer> : null }
                                 { room.extras ? 
                            
                            room.extras.map(m => {
                                console.log('m',m)
                                return(
                                <Layer>
                                <Rect
                                id={m.id}
                                x={m.pivot.x}
                                y={m.pivot.y}
                                width={m.pivot.width}
                                height={m.pivot.height}
                                fill="#E2E2E2"
                                closed

                              />
                              <Text text={m.title} fontSize={30} color={"white"} x={m.pivot.x} y={m.pivot.y} />
                            </Layer>
                            )
                            })
                            : null
                            }

                            {room.layout.tables ? 
                            room.layout.tables.map(m => {
                             return(
                             <Layer>
                                  <URLImage 
                                  /* src={process.env.PUBLIC_URL + `/tables/tabletest2-3.svg`} */
                                       src={process.env.PUBLIC_URL + `/tables/table${m.id}-3.svg`} 
                                       id={m}
                                       x={m.pivot.x}
                                       y={m.pivot.y}
                                       width={m.pivot.width}
                                       height={m.pivot.height}
                                      
                                    closed
                                   
                                    
                               />
                                {/*  <Rect
                                        id={m}
                                        key={m.pivot.id}
                                        x={m.pivot.x}
                                        y={m.pivot.y}
                                        width={m.pivot.width}
                                        height={m.pivot.height}
                                        fill={"#031D44"}
                                        closed
                                        
                                        
                       
                                      />  */}   
                                      {console.log('free table', this.props.reservation.tablereservations.freetables )}
                                      {console.log('reservation tables',this.props.reservation.tablereservations.reservations)}
                                      {tablereservations.rooms[i].reservations !== 'no reservations' ? 
                                                        
                                                   tablereservations.rooms[i].reservations &&  tablereservations.rooms[i].reservations.map(res => {
                                                            console.log('reservations tables',res)
                                                            if(res.table_pivot_id == m.pivot.id){
                                                                console.log('gevonden')
                                                                return (
                                                                  <URLImage 
                                                                 /*  src={process.env.PUBLIC_URL + `/tables/tabletest2-4.svg`} */
                                                                 src={process.env.PUBLIC_URL + `/tables/table${m.id}-4.svg`} 
                                       
                                           id={m.id}
                                           x={m.pivot.x}
                                           y={m.pivot.y}
                                           width={m.pivot.width}
                                           height={m.pivot.height}
                                       
                                        closed
                                       
                                        
                                   />
                                                                   /*  <Rect
                                                                    id={m.id}
                                                                    x={m.pivot.x}
                                                                    y={m.pivot.y}
                                                                    width={m.pivot.width}
                                                                    height={m.pivot.height}
                                                                    fill={"#7A7A7A"}
                                                                    closed
                                                                  /> */
                                                                )
                                                            }  
                                                        }) : null } 
                                                 
                                                        {tablereservations.rooms[i].freetables && tablereservations.rooms[i].freetables[0] ? 
                                                        tablereservations.rooms[i].freetables && tablereservations.rooms[i].freetables.length >= 1 ? 
                                                        tablereservations.rooms[i].freetables && tablereservations.rooms[i].freetables.map(res => {
                                                         {console.log('res',res[0])}
                                                           if(res[0][0].pivot.id == m.pivot.id){
                                                               console.log('gevonden')
                                                               return (
                                                  
                                                                    <URLImage
                                                                   id={m}
                                                      
                                                                   x={m.pivot.x}
                                                                   y={m.pivot.y}
                                                                   width={m.pivot.width}
                                                                   height={m.pivot.height}
                                                                   src={this.state.selectedTableByUser == m.pivot.id ? process.env.PUBLIC_URL + `/tables/table${m.id}-2.svg` :  process.env.PUBLIC_URL + `/tables/table${m.id}-1.svg`}
                                                                   shadowBlur={this.state.selectedTableByUser == m.pivot.id ? 30 : 10}
                              
                                                                   
                                                                   onClick={this.onClick}
                                                                    onTouchEnd={this.onClick}
                                                                   closed
                                                                 /> 
                                                               )
                                                           } 
                                                       })
                                                       : null
                                                       /* tablereservations.rooms[i].freetables.map(res => {
                                                        {console.log('res',res[0][0])}
                                                          if(res[0][0].pivot.id == m.pivot.id){
                                                              console.log('gevonden')
                                                              return (
                                                                  <Rect
                                                                  id={m}
                                                                  
                                                                  x={m.pivot.x}
                                                                  y={m.pivot.y}
                                                                  width={m.pivot.width}
                                                                  height={m.pivot.height}
                                                                  fill={this.state.selectedTableByUser == m.pivot.id ? "#FB3640" : '#2369f6'}
                                                                  shadowBlur={this.state.selectedTableByUser == m.pivot.id ? 30 : 10}
                                                                  strokeWidth={this.state.selectedTableByUser == m.pivot.id ? 2 : 0 }
                                                                  stroke={"black"}
                                                                  onClick={this.onClick}
                                                                   onTouchEnd={this.onClick}
                                                                  closed
                                                                />
                                                              )
                                                          } 
                                                      }) */
                                                       : null } 
                           <Text text={m.title} fontSize={30} x={m.pivot.x} y={m.pivot.y} />
    
                         </Layer>)
                               }) 
                         : null }
                                 </Stage>
                                 </div>
                             )})
                             
                             :null }
                             
                             <div className="row my-2">
                             <div className="col-sm-6">
                                <div className="faciliteiten"> </div> <Trans i18nKey="facilities"></Trans>
                              </div>
                              <div className="col-sm-6">
                                <div className="vrijeplaats"> </div> <Trans i18nKey="freetables"></Trans>
                              </div>
                              <div className="col-sm-6">
                                <div className="geslecteerdeplaats"> </div> <Trans i18nKey="selectedtables"></Trans>
                              </div>
                              <div className="col-sm-6">
                                <div className="onbeschikbareplaats"> </div> <Trans i18nKey="unselectabletables"></Trans> 
                              </div>
                              <div className="col-sm-6">
                                <div className="geserveerdeplaats"> </div> <Trans i18nKey="reservatedtables"></Trans> 
                              </div>
                            </div>
                             {/*      {console.log('ex',this.props.room.rooms.extras)}
                            
            
                         
            */
                        
                        
                         }
                     </div>
                
                    : null }
                    {this.state.activeStep == 2 ? 
                    <div>
                       <h5><Trans i18nKey="reservationoverview"></Trans></h5>
                       <List>
                       <ListItem>
                           <ListItemText primary = {
                             <React.Fragment>
                               <Typography>
                               <Trans i18nKey="date"></Trans>: <strong>{this.state.date}</strong>
                               </Typography>
                             </React.Fragment>
                           }/>
                         </ListItem>
                         <ListItem>
                           <ListItemText primary = {
                             <React.Fragment>
                               <Typography>
                               <Trans i18nKey="hour"></Trans>: <strong>{this.state.time}</strong>
                               </Typography>
                             </React.Fragment>
                           }/>
                         </ListItem>
                         <ListItem>
                           <ListItemText primary = {
                             <React.Fragment>
                               <Typography>
                               <Trans i18nKey="persons"></Trans>: <strong>{this.state.persons}</strong>
                               </Typography>
                             </React.Fragment>
                           }/>
                         </ListItem>
                       <ListItem button onClick={this.listOpen}>
                    
                          <ListItemText primary="Restaurant informatie:" />
                          {this.state.listOpen ? <ExpandLess /> : <ExpandMore />}
                        </ListItem>
                        <Collapse in={this.state.listOpen} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            <ListItem button >
                              <ListItemText primary={
                                  <React.Fragment>
                                  <Typography>
                                  <Trans i18nKey="name"></Trans>: <strong>{this.state.item.title}</strong>
                                  </Typography>
                                </React.Fragment>
                              } />
                            </ListItem>
                            <ListItem button >
                              <ListItemText primary={
                                  <React.Fragment>
                                  <Typography>
                                  <Trans i18nKey="address"></Trans> <strong>{this.state.item.address}</strong>
                                  </Typography>
                                </React.Fragment>}/>
                            </ListItem>
                          </List>
                        </Collapse>
                      </List>
                       {/* <Button className="mt-3" classes={{ root: 'fullLengthButton'}} variant="contained" color="primary" onClick={() => this.makeReservation()}>Bevestig</Button> */}
                       
                    </div>
                    : null }
                   {this.state.activeStep == 3 ? 
                  <div>
                    { loadingReservation ? 
                    
                    <div>
                      <Spinner />
                    </div> 
                    : 
                     this.props.error && this.props.error.status == 'FAILED_RESERVATION' ? 
                    <Alert severity="error" onClose={() => this.closeAlert()}> <Trans i18nKey="somethingwentwrong"></Trans> </Alert>
                     : 
                    <div>
                      {console.log('nieuwe reservatie', newReservation)}
                       <Lottie options={defaultOptions}
                          height={250}
                          width={250}
                          isStopped={false}
                          isPaused={false}/>
                          <FadeIn>
                            <div className="pt-3">
                            <h3> <Trans i18nKey="reservationsuccesfull"></Trans></h3>
                            <p> <Trans i18nKey="reservationnumber"></Trans>: { newReservation.reservation.id }</p>
                            <Link to="/profile" ><Button classes={{ root: 'fullLengthButton'}} > <Trans i18nKey="watchyourreservation"></Trans></Button></Link>
                            </div>
                      </FadeIn>
                    </div>
                    }
                    
                  
                  </div>  
                : null }
                { this.state.activeStep < 3 ?
             <div className="row">
               <div className="col-12">
                 
             <MobileStepper
             classes= {{
               root: 'mobileStepper'
             }}
              variant="progress"
              steps={4}
              position="static"
              activeStep={this.state.activeStep}
       
              nextButton={
                this.state.activeStep == 0 ?
                <Button size="small" onClick={this.handleNext} disabled={this.state.activeStep !== 5 ? this.state.freetables ? this.state.freetables == 0 : true : true }>
                 <Trans i18nKey="next"></Trans>
              <KeyboardArrowRight />
                </Button>
                :  this.state.activeStep == 1 ? 
                <Button size="small" onClick={this.handleNext} disabled={ !this.state.selectedTableByUser}>
                 <Trans i18nKey="next"></Trans>
            <KeyboardArrowRight />
              </Button> : 
                 <Button size="small" onClick={this.finish} disabled={ !this.state.selectedTableByUser}>
                 <Trans i18nKey="confirm"></Trans>
            <KeyboardArrowRight />
              </Button>
            } 
              
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={this.state.activeStep === 0}>
                  <KeyboardArrowLeft />
                  <Trans i18nKey="back"></Trans>
                </Button>
              }
            />
            </div>
            </div>
            : null }
            </div>
            </div>
            </Drawer>
  
            </div>
        )
    }
}

const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    room: state.room,
    reservation: state.reservation
});

export default connect(mapStateToProps,{addReservation, clearErrors, getReservationTable, getRooms  })(ReservationModal)
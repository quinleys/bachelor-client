import React, { Component } from 'react'
import { Container } from 'reactstrap'
import {   Card , Input, Form, Label, FormGroup, } from 'reactstrap'
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addReservation } from '../../actions/reservationActions';
import { getReservationTable } from '../../actions/reservationActions';
import { clearErrors } from '../../actions/errorActions';  
import { getPlattegrond, getActiveRooms } from '../../actions/dashboardActions';
import { Stage, Layer, Rect, Text, Shape, Image } from 'react-konva';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import Spinner from '../../components/Components/Spinner/Spinner'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
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
        onClick={this.props.onClick}
            onTap={this.props.onTap}
            onTransform={this.props.onTransform}
            onDragStart={this.props.onDragStart}
           onDragEnd={this.props.onDragEnd}   
           /*  onDragMove={this.props.onDragMove} */
          />
          );
        }
      } 
class Plattegrond extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        dateTodayNow = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            walls: [
                { id: 1, point1: 0 , point2: 0 },
                { id: 2, point1: 800 , point2: 0 },
                { id: 3, point1: 800 , point2: 800 },
                { id: 4, point1: 0 , point2: 800 },
              ],
            tables: [
                 { id: 1 , title:'Tafel voor 1', x: 10 , y: 10 , rotation: 10, width: 100, height: 100 } 

            ],
            extras: [
                /* { id: 1, title: 'Wc' , x: 10 , y: 10 , widt 100, height: 100 } */
            ],
            x: 0,
            y: 0,
            error: '',
            errorTables: '',
            dateToday: dateTodayNow,
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm:ss'),
            toggle: false,
            toggle2: false,
            toggle3: false,
            errorExtra: '',
            selected: '',
            showCanvas: 1,
            selectedTable:'',
            selectedExtra: '',
            error : '',
            live: false,
            errormsg: ''
        }
    }

    componentDidMount(){
        this.props.getPlattegrond(localStorage.getItem('restaurant_id'), '?date=' + this.state.date + ' ' + this.state.time)
        this.props.getActiveRooms(localStorage.getItem('restaurant_id'))
        
    }

    setClosed = () => {
        this.setState({
            error: 'Restaurant gesloten.'
        })
    }

    onChangeDate = e => {
        this.setState({
            date : e.target.value
        })
    }
    onChangeTime = e => {
        this.setState({
            time : e.target.value
        })
    }
    onSubmit = (e) => {
        e.preventDefault();
        
        if(this.state.live){
            clearInterval(this.interval);
            this.setState({
                live : false,
                errormsg: '',
            })
        }
        this.props.getPlattegrond(localStorage.getItem('restaurant_id'), '?date=' + this.state.date + this.state.time )
    }
    goToLive = () => {
        this.setState({
            date: moment().format('YYYY-MM-DD'),
            time: moment().format('HH:mm:ss'),
        
        }, function (){
            this.props.getPlattegrond(localStorage.getItem('restaurant_id'), '?date=' + this.state.date + this.state.time )
            this.nowLive()
        })

    }
    stopLive = () => {
        clearInterval(this.interval);
        this.setState({
            live: false
        })
    }
    componentWillUnmount() {
        clearInterval(this.interval);
      }
    nowLive = () => {
       
        if(this.props.dashboard.plattegrond[0] !== 'closed'){
            this.interval = setInterval(() => 
            this.setState({  
                errormsg: '',
                live: true,
                date: moment().format('YYYY-MM-DD'),
                time: moment().format('HH:mm:ss'),
             }, function(){
               
                this.props.getPlattegrond(localStorage.getItem('restaurant_id'), '?date=' + this.state.date + this.state.time )
             })  , 5000);
        }else{
            this.setState({
                errormsg: 'Je kunt de plattegrond niet live bekijken indien het restaurant gesloten is'
            },function(){
                return;
            })
        }
      
    }
    onClick = (e) => {
   
    }
    showPrevCanvas = () => {
      
        this.setState({
          showCanvas: this.state.showCanvas - 1
        })
      }
      showNextCanvas = () => {
      
        this.setState({
          showCanvas: this.state.showCanvas + 1
        })
      }
      calcScale = () => {
        const CANVAS_VIRTUAL_WIDTH = 1000;
          /*   const CANVAS_VIRTUAL_HEIGHT = 1000; */
       if( window.innerWidth < 1140){
            let scaleCalc = Math.min(
                window.innerWidth / CANVAS_VIRTUAL_WIDTH,
                ) - 0.1;
                this.setState({
                    scale: scaleCalc
                })
        }
       else {
            let scaleCalc = Math.min(
                1140 / CANVAS_VIRTUAL_WIDTH,
                ) - 0.1;
                this.setState({
                    scale: scaleCalc
                })
        }
    }
    render() {
        const { plattegrond, activeRooms, dashboardloading } = this.props.dashboard;
        
        const CANVAS_VIRTUAL_WIDTH = 1000;
  
        // now you may want to make it visible even on small screens
        // we can just scale it
        const scale = Math.min(
            window.innerWidth / CANVAS_VIRTUAL_WIDTH,
        ) - 0.2;

        return (
            <div>

             { activeRooms && plattegrond && !dashboardloading && plattegrond[0]? 
                <div className="dashboard"> 
                   
                <Container>
                <div className="row">
                            <div className="col-10">
                            <h1>Plattegrond</h1>
                            </div>
                          
                        </div>
                        <div className="row justify-content-between my-2">
                          <div className="col">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link to="/dashboard">
                              <Typography color="textPrimary">Dashboard</Typography>
                              </Link>
                              <Typography color="textPrimary">Plattegrond</Typography>
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                              <h6 div className="floatright">{this.state.dateToday}</h6>
                            </div>
                        </div>
                        {activeRooms.length > 0 ?
                        <div>
                        { this.state.errormsg ? <Alert className="my-2" severity="error">{this.state.errormsg}</Alert> : null }
                    { plattegrond[0] == 'closed' ? <Alert severity="error">Het restaurant is gesloten op de gekozen data.</Alert> : null }
                     
                <div className="row my-3">
                    <div className="col-12">
                  
                    {/* {plattegrond[0] == 'closed' ?
                        <Alert color="danger"> Closed </Alert> : null } */}
                       
                        <Card>
                        <Accordion>
                        <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                <Typography >Verander uur en datum </Typography>
                                </AccordionSummary>
                                <AccordionDetails>

                                <div className="row" style={{width: '100%'}}>
                        <div className="col">
                            {this.state.live ? this.nowLive : null }
                        <Form onSubmit={this.onSubmit}>
                    {/* { !dashboardloading && plattegrond ?
                    plattegrond[0] == 'closed' ? 'Closed' : null 
                    : null } */}
                            <FormGroup>
                            <Label for="date">Datum</Label>
                                                <Input
                                                type="date"
                                                name="date"
                                                min= {moment().format("YYYY-MM-DD")}
                                                onChange={this.onChangeDate}
                                                value={this.state.date}
                                                id="date"
                                                required
                                                placeholder="date placeholder"
                                                />
                                            
                                                <Label for="time">Uur</Label>
                                                <Input
                                                type="time"
                                                name="time"
                                                onChange={this.onChangeTime}
                                                value={this.state.time}
                                                id="time"
                                                required
                                                placeholder="time placeholder"
                                                />

                                              <Button className="mt-3" classes={{ root: 'fullLengthButton'}} variant="contained" disabled={this.props.dashboard.dashboardloading} color="primary" type="submit" > {this.props.dashboard.dashboardloading ? <CircularProgress />: 'Zoek' }</Button>
                            </FormGroup>  
                        </Form>

                        { !this.state.live ? <Button classes={{ root: 'fullLengthButton'}} onClick={()=> this.goToLive()}>
                            Ga naar live!
                        </Button> :<Button classes={{ root: 'fullLengthButton'}} onClick={()=> this.stopLive()}>
                            Stop live!
                        </Button> }

                        </div>
                    </div>
                                </AccordionDetails>
                            </Accordion>
                            
                        </Card>
                    </div>
                </div>
                
                <div className="row mb-3">
                    <div className="col">
                    { !this.state.live ? <Button onClick={()=> this.goToLive()}>
                            Ga naar live!
                        </Button> :<Button onClick={()=> this.stopLive()}>
                            Stop live!
                        </Button> }
                    </div>
                </div>
               

              
                <div className='row'>
         
                             
                          
                            </div>
                <div className="row">
             
                            
                
                    <div className="col-12">
                        { !dashboardloading  ? 
                      plattegrond[0] !== 'closed' ? 
                    <div >
                        {activeRooms.length > 1 ? 
                         <div className="row my-2 justify-content-between">
                              <Button onClick={() => this.showPrevCanvas()} disabled={ this.state.showCanvas == 0 ? true : false  }>
                              <p><ArrowBackIosIcon /> Vorige kamer</p>
                            </Button>
                              <Button onClick={() => this.showNextCanvas()} disabled={ this.state.showCanvas == activeRooms.length - 1 ? true : false  } >
                                <p>Volgende kamer <ArrowForwardIosIcon /></p>
                                </Button>
                            </div>
                            : null }
                        {activeRooms.map((room, i) => 
                       <div className={ this.state.showCanvas == i ? 'hiddenCanvas' : null} > 
                       <h6>{room.title}</h6>
                    <Stage   width={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } height={1000 * this.state.scale < 1140 ? 1000 * this.state.scale : 1140 } scaleX={this.state.scale} scaleY={this.state.scale}>
                        
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
                             </Layer>: null }
                         
                        { room.extras ? 
                        
                        room.extras.map(m => {
                           
                            return(
                            <Layer>
                            <Rect
                            id={m.id}
                            x={m.pivot.x}
                            y={m.pivot.y}
                            width={m.pivot.width}
                            height={m.pivot.height}
                            fill="grey"
                            closed

        
                          />
                          <Text text={m.title} fontSize={30} x={m.pivot.x} y={m.pivot.y} />
                        </Layer>)
                        })
                        : null
                        }
                       
                   
                        
                        { !dashboardloading && activeRooms && this.props.dashboard && room.layout.tables.length >= 1 ? 
                            room.layout.tables.map((m,i) => {
                              
                                return(
                                 <Layer>
                                        <URLImage src={process.env.PUBLIC_URL + `/tables/table${m.id}-1.svg`}
                                         x={m.pivot.x}
                                         y={m.pivot.y}
                                         width={m.pivot.width}
                                         height={m.pivot.height}
                                         fill={this.state.selectedTableByUser == m.pivot.id ? '#2369f6' : "green"}
                                         shadowBlur={this.state.selectedTableByUser == m.pivot.id ? 30 : 10}
                                         strokeWidth={this.state.selectedTableByUser == m.pivot.id ? 2 : 0 }
                                         stroke={"black"}
                                         onClick={this.onClick}
                                         onTouchEnd={this.onClick}
                                         closed
                                        /* onDragMove={this.handleDragEnd} */
                                        
                                   />
                                    
                              
                                   {!dashboardloading && activeRooms && plattegrond.rooms[i] && this.props.dashboard && room.layout.tables.length >= 1 && plattegrond && plattegrond[0] !== 'closed' ?
           
                                   plattegrond && plattegrond.rooms[i].reservations !== 'geen reservaties' && plattegrond.rooms[i].reservations && !dashboardloading  ? 
                                            plattegrond.rooms[i].reservations !== 0 ?       
                                            plattegrond.rooms[i].reservations.map( res => {
                                                   
                                                    if(res.table_pivot_id == m.pivot.id){
                                                    return (
                                                 
                                                        <URLImage src={process.env.PUBLIC_URL + `/tables/table${m.id}-2.svg`}
                                                        x={m.pivot.x}
                                                        y={m.pivot.y}
                                                        width={m.pivot.width}
                                                        height={m.pivot.height}
                                                        
                                                        shadowBlur={this.state.selectedTableByUser == m.pivot.id ? 30 : 10}
                                                        strokeWidth={this.state.selectedTableByUser == m.pivot.id ? 2 : 0 }
                                                        stroke={"black"}
                                                        onClick={this.onClick}
                                                        onTouchEnd={this.onClick}
                                                        closed
                                                       /* onDragMove={this.handleDragEnd} */
                                                       
                                                  />
                                                    )
                                                    }
                                                })
                                                : null
                                                : null 
                                                
                                            : null }
                                </Layer> 
                                )
                      })
                     : null } 
                     
        
                     </Stage>
                    </div> 
                     )}   
                     
                     </div>
                     
                     : <p>Het restaurant is gesloten op de gekozen data.</p>
                     : <Spinner /> }
                    </div>
                </div>
                </div>
                : <div ><Alert className="my-2" severity="error"> GEEN ACTIEVE KAMERS</Alert> <div className="row"><Alert className="my-2 w-100" severity="info"  action={
                    <Link to="/dashboard/layout"><Button color="inherit" size="small">Klik hier!</Button></Link>
                   
                  }> U moet een actieve kamer instellen vooralleer u een plattegrond kan bekijken! </Alert> </div></div>}
                     </Container>
                </div>
                : <Spinner /> }
               
            </div>
        )
    }
}
Plattegrond.propTypes = {
    error: PropTypes.object.isRequired,
    clearErrors: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    getReservationTable: PropTypes.func.isRequired,
    getActiveRooms: PropTypes.func.isRequired,
    getPlattegrond: PropTypes.func.isRequired,
    room: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    error: state.error,
    auth: state.auth,
    room: state.room,
    reservation: state.reservation,
    dashboard: state.dashboard
})
export default connect(mapStateToProps,{ addReservation, clearErrors, getReservationTable, getActiveRooms, getPlattegrond  })(Plattegrond)
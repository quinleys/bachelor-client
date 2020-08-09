import React, { Component } from 'react'
import { Container, Card, Button } from 'reactstrap'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import { getLayouts, deleteLayout, deleteRoom } from '../../actions/dashboardActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../../components/Components/Spinner/Spinner'
import HelpIcon from '@material-ui/icons/Help';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import {   Input, Label } from 'reactstrap'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { updateRoom, makeRoomUnactive, makeRoomActive } from '../../actions/dashboardActions'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Alert from '@material-ui/lab/Alert';
const longText = `Actieve layout zijn de layouts die worden gezien door de gebruiker.
Als er geen actieve layouts is kan er geen reservatie gemaakt worden. Maak een kamer en een layout om een actieve layout te maken.`;
class Layout extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            deleteToggle: false,
            editActive:false ,
            date:date,
            change: [],
            editLayout: false,
            errormsg: '',
            update: false,
        }
    }
    componentDidMount(){
    
        this.props.getLayouts(localStorage.getItem('restaurant_id'));
    }
    deleteLayout = (id) => {
        this.props.deleteLayout(id)
    }
    deleteRoom = (id) => {
        this.props.deleteRoom(id)
    }
    makeActive = () => {
        this.setState({
            editActive: !this.state.editActive,
            update: false,
        })
    }

    toggleDelete = () => {
        this.setState({
            deleteToggle: !this.state.deleteToggle,
            update: false,
        })
    }
    updateRoom = (id, updateRoom) => {
    
        if(updateRoom){
            this.setState({
                update: true
            })
        }
        if(this.state.errormsg == ''){
         
        
        if(this.state.change.length > 1 ){
            this.state.change.map(el => (el.id == id ? this.props.updateRoom(el) : el ))
        }else{
            this.props.updateRoom(this.state.change[0])
        }
       this.setState({
           editLayout: false
       })
    }
    }
    onChangeSelectedRoom = ( e, id ) => {
      
        if(e.target.value !== 'please select a room'){
            this.setState({
                errormsg: '',
                update:false
            })
        
        let item = { "id" : id , "layout" : e.target.value}
        this.setState({change: this.state.change.filter(function(person) { 
            return person.id !== item.id
        })}, function (){
            this.setState(prevState => ({
                change: [...prevState.change, item]
              }))
        });
    }else{
        this.setState({
            errormsg: 'U moet een layout selecteren!',
            update:false
        })
    }
    }

    makeActiveNow = (id) => {
        let item = { "id" : id , "active" : "true"}
        this.props.makeRoomActive(item)
    }
    makeUnactive = (id) => {
        let item = { "id" : id , "active" : "false" }
        this.props.makeRoomUnactive(item)
    }
    render() {
        const { allLayouts, allRooms, activeRoom, loading } = this.props.dashboard;
        return (
            <div>
                <div className="dashboard">
                    { allLayouts && allRooms && activeRoom && !loading ? 
                    <Container>
                        <div className="row">
                            <div className="col-10">
                            <h1>Layout</h1>
                            </div>
                          
                        </div>
                        { this.state.errormsg ? <Alert severity="error" onClose={() => this.closeAlert()}> {this.state.errormsg}</Alert> : null }
                        <div className="row justify-content-between my-2">
                          <div className="col">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link to="/dashboard">
                              <Typography color="textPrimary">Dashboard</Typography>
                              </Link>
                              <Typography color="textPrimary">Layout</Typography>
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                            <h6 div className="floatright">{this.state.date}</h6>
                            </div>
                        </div>
                      
                        <div className="row">
                            <div className="col">
                            <h5>Configureer uw layouts.</h5>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <div className="col floatright">
                                        <Link
                                        to='/dashboard/layout/room/new'>
                                    <Button className='my-2 mx-2 floatright'>
                                        Nieuwe Kamer
                                    </Button>
                                    </Link>
                                    <Link
                                        to='/dashboard/layout/layout/new'>
                                    <Button className='my-2 mx-2 floatright'>
                                        Nieuwe Layout
                                    </Button>
                                    </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-12">
                                <Card className="dashboardcard homecard"> 
                                <div className="row">
                                    <div className="col-10">
                                        <h5>Actieve Layout</h5>
                                    </div>
                                    <div className="col" style={{textAlign: "end"}}>                                   
                                         {allRooms.length > 0 && allLayouts.length > 0 ?
                                        this.state.editActive ?
                                        <CancelIcon onClick={this.makeActive}/>
                                        :
                                        <AddCircleOutlineIcon  onClick={this.makeActive}/>
                                      
                                    : null }
                   
                                    <Tooltip title={longText} aria-label="add">
                                        <HelpIcon />
                                    </Tooltip>
                            
                                    </div>
                                </div>
                               { !this.state.editActive ? 
                                    <List >
                                    { activeRoom ? activeRoom.map(room => {
                                            return(
                                            <div>
                                            <ListItem alignItems="flex-start">
                                        
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Kamer'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                                 
                                                    {room.title}
                                                    </Typography>
                                                   
                                                </React.Fragment>
                                                }
                                            />
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Lay-out'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                           
                                                    {  room.layout_id != null ? room.layout.title : 'no layout' }
                                                    
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                   
                                            </ListItem>
                                            <Divider component="li" />
                                            </div>)
                                        }) : 'geen actieve kamers'}
                                    </List>
                                    :  <List >
                                       
                                       
                                    { activeRoom ? activeRoom.map(room => {
                                            return(
                                            <div>
                                            <ListItem alignItems="flex-start">
                                                <div className="col">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Kamer'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                     
                                                    {room.title}
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                            <div className="col d-none d-md-block d-lg-block">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Lay-out'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                              
                                                    {  room.layout_id != null ? room.layout.title : 'no layout' }
                                                  
                                                    </Typography>
                                                  
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                    
                                            <div className="col">
                                            <ListItemText 
                                            primary={
                                                <React.Fragment>
                                                <Label for="persons">Welke layout?</Label>
                                                <Input type="select" name="selectedRoom" id="selectedRoom" defaultValue={room.layout_id} onChange={(e) => this.onChangeSelectedRoom(e,room.id)}>
                                                  <option > please select a room </option>
                                                  { allLayouts ?
                                                    allLayouts.map(m => {
                                                        return(
                                                            
                                                            <option id={room.id} value={m.id}>{m.title}</option>
                                                        )
                                                    })  
                                               : 'Please make a room first' }

                                                </Input>
                                                </React.Fragment>
                                            }
                                            />
                                            </div>
                                        
                                          <Button className="mx-2" disabled={this.state.errormsg !== ''} onClick={() => this.updateRoom(room.id)}>
                                                
                                                <SaveIcon />
                                              
                                            </Button>
                                            <Button color="danger"  onClick={() => this.makeUnactive(room.id)}><VisibilityOffIcon /></Button>
                                            
                                            </ListItem>
                                            <Divider component="li" />
                                            </div>)
                                        }) : 'geen actieve kamers'}
                                    </List> }
                                </Card>
                            </div>
                        </div>
                        <div className="row my-2">
                            <div className="col-12">
                                <Card className="dashboardcard homecard "> 
                                <h5>Mijn kamers</h5>
                                    <List >
                                        { allRooms ? allRooms.map(m => {
                                            return(
                                            <div>
                                            <ListItem alignItems="flex-start">
                                                <div className="col">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Room'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                                   
                                                    {m.title}
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                            <div className="col d-none d-md-block d-lg-block">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Extra'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                                   {  m.extras.length != 0 ? m.extras.length : "no extra's selected" }
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                            { m.layout_id == null && this.state.editLayout ? 
                                            
                                            <div className="col">
                                            <ListItemText 
                                            primary={
                                                <React.Fragment>
                                                <Label for="persons">Welke layout?</Label>
                                                <Input type="select" name="selectedRoom" id="selectedRoom" defaultValue={m.layout_id} onChange={(e) => this.onChangeSelectedRoom(e,m.id)}>
                                                  <option > please select a room </option>
                                                  { allLayouts ?
                                                    allLayouts.map(m => {
                                                        return(
                                                            
                                                            <option id={m.id} value={m.id}>{m.title}</option>
                                                        )
                                                    })  
                                               : 'Please make a room first' }

                                                </Input>
                                                </React.Fragment>
                                            }
                                            />
                                            </div> : null }
                                            {m.active == true ? <Button onClick={() => this.makeUnactive(m.id) }><VisibilityOffIcon /> </Button> : this.state.update ?  <Button onClick={() => this.makeActiveNow(m.id)}> <VisibilityIcon /></Button> : m.layout_id == null && this.state.editLayout !== true ?  <Button onClick={() => this.setState({editLayout: true})} ><VisibilityIcon /></Button> : m.layout_id == null && this.state.editLayout && !this.state.updated ? <Button className="mx-2" disabled={this.state.errormsg !== ''}  onClick={() => this.updateRoom(m.id, true)}>
                                                
                                                <SaveIcon />
                                              
                                            </Button> :   <Button onClick={() => this.makeActiveNow(m.id)}> <DeleteIcon /></Button>}
                                            
                                            <Button className="mx-2 buttoneditpencil">
                                                <Link to={`/dashboard/layout/room/edit:${m.id}`}>
                                                <EditIcon />
                                                </Link>
                                            </Button>
                                            <Button color="danger" onClick={() => this.deleteRoom(m.id)}><DeleteIcon /></Button>
                                       
                                           
                                            </ListItem>
                                            <Divider component="li" />
                                            </div>)
                                        }) : 'Geen kamers.'}
                                        
                                    </List>
                                </Card>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12">
                                <Card className="dashboardcard homecard"> 
                                <h5>Mijn lay-outs</h5>
                                    <List >
                                    { allLayouts ? allLayouts.map(m => {
                                            return(
                                            <div>
                                            <ListItem alignItems="flex-start">
                                            <div className="col">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Layout'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                                 
                                                    {m.title}
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                             <div className="col d-none d-md-block d-lg-block">
                                            <ListItemText
                                                primary=/* {m.user.name} */ 'Amount of tables'
                                                secondary={
                                                <React.Fragment>
                                                    <Typography
                                                    component="span"
                                                    variant="body2"
                                                    color="textPrimary"
                                                    >
                                                
                                                    
                                                    {  m.tables.length != 0 ? m.tables.length : "no tables selected" } 
                                                    </Typography>
                                                </React.Fragment>
                                                }
                                            />
                                            </div>
                                            <Button className="mx-2 buttoneditpencil">
                                                <Link itemId={m.id} to={`/dashboard/layout/layout/edit:${m.id}`}>
                                                    <EditIcon />
                                                </Link>
                                            </Button>
                                            <Button color="danger" onClick={() => this.deleteLayout(m.id)}>
                                                <DeleteIcon />
                                            </Button>
                                            </ListItem>
                                            <Divider component="li" />
                                            </div>)
                                        }) : 'Geen layouts.'}
                                    </List>
                                </Card>
                            </div>
                        </div>
                    </Container>
                   : <Spinner /> }
                </div>
            </div>
        )
    }
}
Layout.propTypes = {
    item: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired,
    layout: PropTypes.object.isRequired,
    getItem: PropTypes.func.isRequired,
    getRooms: PropTypes.func.isRequired,
    getLayouts: PropTypes.func.isRequired,
    deleteLayout: PropTypes.func.isRequired,
    deleteRoom: PropTypes.func.isRequired,
    dashboard: PropTypes.func.isRequired,
    updateRoom: PropTypes.func.isRequired,
    makeRoomActive: PropTypes.func.isRequired,
    makeRoomUnactive: PropTypes.func.isRequired,
}
const mapStateToProps = state => ({
    dashboard: state.dashboard
})
export default connect(mapStateToProps, { getLayouts, updateRoom, deleteLayout, deleteRoom, makeRoomActive, makeRoomUnactive })(Layout)

import React, { Component } from 'react'
import { Container } from 'reactstrap'
import { Button,  Card } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import CustomizedProgressBars from '../../components/Progress/Progress'
import { getItem } from '../../actions/itemActions';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Spinner from '../../components/Components/Spinner/Spinner';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { getRecentReservations, getRecentComments } from '../../actions/dashboardActions'
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
class Dashboard extends Component {
    constructor(props){
        super(props)
        var today = new Date(),
        date = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            daily: 5,
            reservations: [
                {name: 'Quinten Leysen', date: '08/07/2020', persons: 3},
                {name: 'Quinten Leysen', date: '08/07/2020', persons: 3},
                {name: 'Quinten Leysen', date: '08/07/2020', persons: 3},
                {name: 'Quinten Leysen', date: '08/07/2020', persons: 3},
                {name: 'Quinten Leysen', date: '08/07/2020', persons: 3}
            ],
            avg: 4.5,
            ratings: [
                {rating: 4},
                {rating: 4},
                {rating: 4},
                {rating: 4},
                {rating: 3},
                {rating: 3},
                {rating: 2},
                {rating: 5},
                {rating: 1}
            ],
            date: date,
            todayReservations: 0,
            FiveStar: 0,
            FourStar: 0,
            ThreeStar: 0,
            TwoStar: 0,
            OneStar: 0,
        }
    }

    componentDidMount(){
        this.props.getItem(localStorage.getItem('restaurant_id'));
        this.props.getRecentReservations(localStorage.getItem('restaurant_id'));
        this.props.getRecentComments(localStorage.getItem('restaurant_id'));

    }
    loadNextPageComments = (where) => {

     let page = this.props.dashboard.comments.current_page;
     
      if(where == 'next'){
        let goPage = page + 1

        this.props.getRecentComments(localStorage.getItem('restaurant_id') , '?page=' + goPage )
      }else{
        let goPage = page - 1 
        this.props.getRecentComments(localStorage.getItem('restaurant_id') , '?page=' + goPage)
      } 
     
      
  }
  loadNextPageReservations = (where) => {

    let page = this.props.dashboard.comments.current_page;

     if(where == 'next'){
       let goPage = page + 1

       this.props.getRecentReservations(localStorage.getItem('restaurant_id') , '?page=' + goPage )
     }else{
       let goPage = page - 1 
       this.props.getRecentReservations(localStorage.getItem('restaurant_id') , '?page=' + goPage)
     } 
    
     
 }
    render() {
        const { item, loading } = this.props.item;
        const { reservations , comments } = this.props.dashboard;
        return (
            <div>
               
                <div className="dashboard">
                { item && !loading ?
                    <Container>
                        <div className="row">
                            <div className="col-10">
                            <h1>Dashboard</h1>
                            </div>
                           
                        </div>
                        <div className="row justify-content-between">
                          <div className="col">
                            <Breadcrumbs aria-label="breadcrumb">
                              <Typography color="textPrimary">Dashboard</Typography>
                              <Typography color="textPrimary">{item.title}</Typography>
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                            <h6 div className="floatright">{this.state.date}</h6>
                            </div>
                        </div>
                       
                        <div className="row mb-3">
                            <div className="col-md-4">
                                <Card className="dashboardcard homecard">
                                    <h5>Reservaties voor vandaag</h5>
                                    <div className="row">
                                        <div className="col-8">
                                        {item.daily ? 
                                            <h1>{item.daily.today }</h1> : null }
                                        </div>
                                        <div className="col float-right">
                                            { item.daily ? 
                                            item.daily.today > item.daily.yesterday ? <div className="floatright" > + {item.daily.today - item.daily.yesterday }  <ArrowUpwardIcon /> </div>: <div className="floatright"> - {item.daily.yesterday - item.daily.today }  <ArrowDownwardIcon />
                                       </div> : null }
                                        </div>
                                    </div>
                                   
                                    { item.daily ? 
                                    <CustomizedProgressBars variant="determinate" value={item.daily.today != 0 ? (item.daily.today / item.daily.yesterday)* 100 : 0}/>
                                    : null }
                                </Card>
                            </div>
                            <div className="col-md-4">
                                <Card className="dashboardcard homecard">
                                    <h5>Reservaties voor deze week</h5>
                                    <div className="row">
                                        <div className="col-8">
                                        {item.weekly ? 
                                            <h1>{item.weekly.week }</h1> : null }
                                        </div>
                                        <div className="col floatright">
                                       
                                        { item.weekly ? 
                                            item.weekly.week > item.weekly.lastweek ? <div className="floatright" > + {item.weekly.week - item.weekly.lastweek }  <ArrowUpwardIcon /> </div>: <div className="floatright"> - {item.weekly.lastweek - item.weekly.week }  <ArrowDownwardIcon />
                                       </div> : null }
                                        </div>
                                    </div>
                                    { item.weekly ? 
                                    item.weekly.week > item.weekly.lastweek ?  <CustomizedProgressBars className="buttonstyle" variant="determinate" value={100}/>
                                   :  <CustomizedProgressBars variant="determinate" value={item.weekly.week != 0 ? (item.weekly.week / item.weekly.lastweek)* 100 : 0 }/>
                                    : null }
                                </Card>
                            </div>
                           {console.log(item.yearly)}
                            <div className="col-md-4">
                                <Card className="dashboardcard homecard">
                                    <h5>Reservaties voor dit jaar</h5>
                                 
                                        {item.yearly && item.yearly >= 0  ? 
                                           <div className="row">
                                           <div className="col-8">
                                            <h1>{item.yearly}</h1> 
                                        </div>
                                        <div className="col">
                                       <div className="floatright"> +{item.yearly} <ArrowUpwardIcon /> </div>
                                        
                                        </div>
                                    </div>
                                    :  <div className="row">
                                    <div className="col-8">
                                     <p>Geen reservaties</p> 
                                 </div>
                               
                             </div> }
                                    { item.yearly ? 
                                    <CustomizedProgressBars variant="determinate" value={100}/>
                                    : null }
                                </Card>
                            </div>
                      </div>
                      {console.log(reservations)}
                      <div className="row">
                          <div className="col-md-8">
                            <Card className="dashboardcard homecard"> 
                                    <h5>Recente reservaties</h5>
                                    {reservations.last_page > 1 ? 
                                    <div className="row">
                                      <div className="col">
                                      <Button disabled={reservations.current_page == 1}  onClick={() => this.loadNextPageReservations('prev')}>
                                      <KeyboardArrowLeftIcon />
                                      </Button>
                                      </div>
                                      <div className="col">
                                      <Button className="float-right floatright" disabled={reservations.current_page == reservations.last_page} onClick={() => this.loadNextPageReservations('next')}>
                                      <KeyboardArrowRightIcon />
                                      </Button>
                                      </div>
                                    </div>
                                    : null }
                                    <List >
                                        { reservations && reservations.data && reservations.data.length > 0 ? reservations.data.map((m,i) => {
                                            return(
                                            <div>
                                                <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <AccountCircleIcon />
                                                </ListItemAvatar>
                                                
                                                <ListItemText
                                                  primary=/* {m.user.name} */ {m.user}
                                                  secondary={
                                                    <React.Fragment>
                                                      <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                      >
                                                 
                                                        {m.date}
                                                        <br/>
                                                        {m.time}
                                                      </Typography>
                                                    </React.Fragment>
                                                  }
                                                />
                                                 <ListItemText
                                                  primary=/* {m.user.name} */ {m.user}
                                                  secondary={
                                                    <React.Fragment>
                                                      <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                      >
                                                   
                                                        {m.persons} personen
                                                        
                                                      </Typography>
                                                    </React.Fragment>
                                                  }
                                                />
                                              </ListItem>
                                              <Divider variant="inset" component="li" />
                                              </div>
                                            )
                                        }) : 'Geen recente reservaties.'}
                            
                            </List>
                                </Card>
                          </div>
                          <div className="col-md-4">
                            <Card className="dashboardcard homecard">
                                    <h5>Gemiddelde beoordeling</h5>
                                    <h1>{item.average_rating}</h1>
                                    <h6>Aantal beoordelingen: {item.totalrating}</h6>
                                   
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">5 sterren</div>
                                    <div className="col float-right px-0"> <strong className="floatright">totaal: {item.fivestar}  </strong></div>
                                    </div>
                                    <CustomizedProgressBars style={{backgroundColor: '#2369F6'}} variant="determinate" value= {item.fivestar > 0 ? (item.fivestar / item.totalrating)*100 : 0}/>
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">4 sterren</div>
                                    <div className="col float-right px-0">  <strong className="floatright">totaal: {item.fourstar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate"  value={item.fourstar > 0 ? (item.fourstar / item.totalrating )*100 : 0}/>
                                    <div className="row mt-3 mb-1 justify-content-end">
                                    <div className="col px-0">3 sterren</div>
                                    <div className="col float-right px-0">  <strong className="floatright">totaal: {item.threestar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={item.threestar > 0 ? (item.threestar / item.totalrating)*100 : 0}/>
                                    <div className="row mt-3 mb-1  justify-content-end">
                                    <div className="col px-0">2 sterren</div>
                                    <div className="col float-right px-0">  <strong className="floatright">totaal: {item.twostar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={item.twostar > 0 ? (item.twostar / item.totalrating)*100 : 0}/>
                                    <div className="row mt-3 mb-1  justify-content-end">
                                    <div className="col px-0">1 sterren</div>
                                    <div className="col float-right px-0">  <strong className="floatright">totaal: {item.onestar}</strong></div>
                                    </div>
                                    <CustomizedProgressBars variant="determinate" value={item.onestar > 0 ? (item.onestar / item.totalrating)*100 : 0}/>
                                </Card>
                          </div>
                      </div>
                      <div className="row">
                          <div className="col-md-8">
                            <Card className="dashboardcard homecard"> 
                                    <h5>Recente commentaren</h5>
                                   
                                    {comments.last_page > 1 ? 
                                    <div className="row">
                                      <div className="col">
                                      <Button disabled={comments.current_page == 1}  onClick={() => this.loadNextPageComments('prev')}>
                                      <KeyboardArrowLeftIcon />
                                      </Button>
                                      </div>
                                      <div className="col">
                                      <Button className="float-right floatright" disabled={comments.current_page == comments.last_page} onClick={() => this.loadNextPageComments('next')}>
                                      <KeyboardArrowRightIcon />
                                      </Button>
                                      </div>
                                    </div>
                                    
                                    :  null }
                                    <List >
                                        { comments && comments.data && comments.data.length !== 0 ? comments.data.map((m,i) => {
                                            return(
                                            <div>
                                             
                                                <ListItem alignItems="flex-start">
                                                <ListItemAvatar>
                                                    <AccountCircleIcon />
                                                </ListItemAvatar>
                                                
                                                <ListItemText
                                                  primary=/* {m.user.name} */ {m.user}
                                                  secondary={
                                                    <React.Fragment>
                                                      <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                      >
                                                  
                                                        {m.comment}
                                                        
                                                      </Typography>
                                                    </React.Fragment>
                                                  }
                                                />
                                                 <ListItemText
                                                  primary={
                                                    <React.Fragment>
                                                      <Typography
                                                        component="span"
                                                        variant="body2"
                                                        color="textPrimary"
                                                      >
                                             
                                                        {m.date}
                                                        
                                                      </Typography>
                                                    </React.Fragment>
                                                  }
                                                />
                                                 </ListItem>
                                              <Divider variant="inset" component="li" />
                                              </div>
                                            )
                                        }) : 'Geen recente commentaren.'}
                            
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
Dashboard.propTypes = {
    item: PropTypes.object.isRequired,
    dashboard: PropTypes.object.isRequired,
}
const mapStateToProps = state => ({
    item: state.item,
    dashboard: state.dashboard
})
export default connect(mapStateToProps, {  getItem, getRecentReservations , getRecentComments })(Dashboard)


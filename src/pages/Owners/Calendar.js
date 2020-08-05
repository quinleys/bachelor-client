import React, { Component } from 'react'
import MiniDrawer from '../../components/Owners/MiniDrawer'
import { Container } from 'reactstrap'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  ViewSwitcher,
  AllDayPanel,
  Resources,
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { withStyles } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import appointments from './today-appointments';
import { getWeeklyReservations } from '../../actions/dashboardActions';
import { getDailyReservations } from '../../actions/dashboardActions';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Components/Spinner/Spinner'
const style = theme => ({
    todayCell: {
      backgroundColor: fade(theme.palette.primary.main, 0.1),
      '&:hover': {
        backgroundColor: fade(theme.palette.primary.main, 0.14),
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.primary.main, 0.16),
      },
    },
    weekendCell: {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      '&:hover': {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      },
      '&:focus': {
        backgroundColor: fade(theme.palette.action.disabledBackground, 0.04),
      },
    },
    today: {
      backgroundColor: fade(theme.palette.primary.main, 0.16),
    },
    weekend: {
      backgroundColor: fade(theme.palette.action.disabledBackground, 0.06),
    },
  });
  const ExternalViewSwitcher = ({
    currentViewName,
    onChange,
  }) => (
    <RadioGroup
      aria-label="Views"
      style={{ flexDirection: 'row' }}
      name="views"
      value={currentViewName}
      onChange={onChange}
    >
      <FormControlLabel value="Day" control={<Radio />} label="Day" />
      <FormControlLabel value="Week" control={<Radio />} label="Week" />
      <FormControlLabel value="Month" control={<Radio />} label="Month" />
    </RadioGroup>
  );

const TimeTableCellBase = ({ classes, ...restProps }) => {
    const { startDate } = restProps;
    const date = new Date(startDate);
    if (date.getDate() === new Date().getDate()) {
      return <WeekView.TimeTableCell {...restProps} className={classes.todayCell} />;
    } if (date.getDay() === 0 || date.getDay() === 6) {
      return <WeekView.TimeTableCell {...restProps} className={classes.weekendCell} />;
    } return <WeekView.TimeTableCell {...restProps} />;
  };
  
  const TimeTableCell = withStyles(style, { name: 'TimeTableCell' })(TimeTableCellBase);
  
  const DayScaleCellBase = ({ classes, ...restProps }) => {
    const { startDate, today } = restProps;
    if (today) {
      return <WeekView.DayScaleCell {...restProps} className={classes.today} />;
    } if (startDate.getDay() === 0 || startDate.getDay() === 6) {
      return <WeekView.DayScaleCell {...restProps} className={classes.weekend} />;
    } return <WeekView.DayScaleCell {...restProps} />;
  };
  
  const DayScaleCell = withStyles(style, { name: 'DayScaleCell' })(DayScaleCellBase);

class Calendar extends Component {

    constructor(props){
        super(props)
        var today = new Date(),
        dateTodayNow = today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            data: appointments,
            restaurant_id: localStorage.getItem('restaurant_id'),
            title: '',
            description: '',
            dateToday: dateTodayNow,
            category: '',
            makeData: true,
            makeWeeklyData: true,
            currentDate: moment().format("YYYY-MM-DD"), 
            /* date: "2020-07-21", */
            currentViewName: 'Day',
            schedulerData: [
                { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
                { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
              ],

            currenderData:  '2018-11-01',
            data: [],
        }
        this.currentViewNameChange = (currentViewName) => {

          this.setState({ currentViewName: currentViewName });
          console.log(this.state.currentDate)
          if(currentViewName == 'Week'){
            this.props.getWeeklyReservations(localStorage.getItem('restaurant_id'), this.state.currentDate);
          }else if (currentViewName == "Day"){
            this.props.getDailyReservations(localStorage.getItem('restaurant_id'), this.state.currentDate);
          }else {
          }

        };
        this.currentDateChange = (currentDate) => {
       
          let date = moment(currentDate).format('YYYY-MM-DD')
          this.setState({ currentDate : date });
           if(this.state.currentViewName == 'Week'){
            this.props.getWeeklyReservations(1, date);
            this.setState({
              makeWeeklyData: true,
            })
            this.makeWeeklyData()
           }else if (this.state.currentViewName == "Day"){
            this.props.getWeeklyReservations(1, date);
            this.setState({
              makeWeeklyData: true,
            })
            this.makeWeeklyData()
           }
        };
    }

    componentDidMount(){
      console.log('date', this.state.currentDate)
      this.props.getWeeklyReservations(localStorage.getItem('restaurant_id'), this.state.currentDate)
    }

    makeData = () => {
      if(this.state.makeData){
        this.setState({
          data: []
        })
          console.log('inside make data', this.props.dashboard.daily)
          this.props.dashboard.daily.map(m => {
            console.log('inside functtion',m.id)
            let item = {
              "id" : m.id,
              "title" : m.persons,
              "startDate": m.date + 'T' + m.time,
              "endDate": m.date + 'T' + m.time
            }
            if(this.state.data.includes(item)){
              this.setState({data: this.state.data.filter(function(m) { 
                  return m !== item
              })});
            }else{
              this.setState(previousState => ({
                  data: [...previousState.data, item]
              }));
            }
            
          },
           this.setState({
             makeData: false
           })
           
          )
        }
  }

    makeWeeklyData = () => {
      if(this.state.makeWeeklyData){
        this.setState({
          data: []
        })
      console.log('inside make data', this.props.dashboard.weekly)
          this.props.dashboard.weekly.map(m => {
            console.log('inside functtion',m.id)
            let item = {
              "id" : m.id,
              "title" : m.persons,
              "startDate": m.date + 'T' + m.time,
              "endDate": m.date + 'T' + m.time
            }
            if(this.state.data.includes(item)){
              this.setState({data: this.state.data.filter(function(m) { 
                  return m !== item
              })});
            }else{
              this.setState(previousState => ({
                  data: [...previousState.data, item]
              }));
            }
            
          },
           this.setState({
             makeWeeklyData: false
           })
          )}
    }
    makeMonthlyData = () => {
      if(this.state.makeWeeklyData){
        this.setState({
          data: []
        })
      console.log('inside make data', this.props.dashboard.weekly)
          this.props.dashboard.weekly.map(m => {
            console.log('inside functtion',m.id)
            let item = {
              "id" : m.id,
              "title" : m.persons,
              "startDate": m.date + 'T' + m.time,
              "endDate": m.date + 'T' + m.time
            }
            if(this.state.data.includes(item)){
              this.setState({data: this.state.data.filter(function(m) { 
                  return m !== item
              })});
            }else{
              this.setState(previousState => ({
                  data: [...previousState.data, item]
              }));
            }
            
          },
           this.setState({
             makeWeeklyData: false
           })
          )}
    }
    /* componentDidUpdate =() => {
      this.makeWeeklyData()
    } */
    render() {
        const { categories } = this.props.categories;
        const { data, currentViewName, currentDate } = this.state;
        const { daily , weekly, monthly, loading , loadingNewData } = this.props.dashboard
        return (
            <div className="dashboard">
              <Container>
                        <div className="row">
                            <div className="col-10">
                            <h1>Kalender</h1>
                            </div>
                          {console.log(this.state.dateToday,"todat")}
                        </div>
                        <div className="row justify-content-between my-2">
                          <div className="col">
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link to="/dashboard">
                              <Typography color="textPrimary">Dashboard</Typography>
                              </Link>
                              <Typography color="textPrimary">Kalender</Typography>
                            </Breadcrumbs>
                            </div>
                            <div className="col">
                              <h6 div className="floatright">{this.state.dateToday}</h6>
                            </div>
                        </div>
              { !loading && weekly ? 
              loadingNewData ? <div>Loading ... <Spinner /> </div>:
              <div>
                
              {console.log('data', this.state.data)}
              {this.state.currentViewName == 'Day' ? weekly.length > 0 ? this.makeWeeklyData() : null 
              : this.state.currentViewName == 'Week' ?  weekly.length > 0 ? this.makeWeeklyData() : null 
              : null}
              
       
              { daily.weekly > 0  && !loading ? this.makeWeeklyData() : null }
                <Container>

                <Paper>
        <Scheduler
          data={this.state.data}
          height={600}
        >
          <ViewState 
            currentViewName={currentViewName}
            currentDate={this.state.currentDate}
            onCurrentViewNameChange={this.currentViewNameChange}
            onCurrentDateChange={this.currentDateChange}
          />
          <DayView
        startDayHour={9}
        endDayHour={24}
      />
          <WeekView
            startDayHour={9}
            endDayHour={24}
            timeTableCellComponent={TimeTableCell}
            dayScaleCellComponent={DayScaleCell}
          />
           <AllDayPanel />
          <Appointments />
          <Toolbar />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
      </Container>
      </div> 
      : <Spinner /> }
      </Container>
            </div>
        )
    }
}

Calendar.propTypes = {
  auth: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  categories: PropTypes.object.isRequired,
  reservation: PropTypes.object.isRequired,
  getWeeklyReservations: PropTypes.func.isRequired,
  dashboard: PropTypes.object.isRequired,
}


const mapStateToProps = state => ({
    auth: state.auth,
    item: state.item,
    categories: state.categories,
    reservation : state.reservation,
    dashboard : state.dashboard
})
export default connect(mapStateToProps, {getWeeklyReservations, getDailyReservations})(Calendar)
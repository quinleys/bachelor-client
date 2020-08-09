import React, { Component } from 'react'
import {

    Container,
  } from 'reactstrap';
import LoginModal from '../Auth/LoginModal';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logout from '../Auth/Logout';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink as Link } from 'react-router-dom';
import MiniDrawer from '../Owners/MiniDrawer'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import CancelIcon from '@material-ui/icons/Cancel';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import ConfirmationNumberIcon from '@material-ui/icons/ConfirmationNumber';
import i18n from '../../i18n';
// the hoc
import { Trans } from 'react-i18next'
import DashboardIcon from '@material-ui/icons/Dashboard';
class AppNavbar extends Component {
    constructor(props){
        super(props)
        this.state = {
                left: false,
            
        }
    }
    
    static propTypes = {
        auth: PropTypes.object.isRequired
    }
    toggle = () => event => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
      
          this.setState({ ...this.state, left: !this.state.left });
        
    }
    changeLanguage = (language) => {
        i18n.changeLanguage(language);
        window.location.reload();
    } 
    render() {
      
        const { isAuthenticated, user } = this.props.auth;

        const dashboard = (
            <MiniDrawer />
        )
        /* const authLinks = (
            <Fragment>
                <NavItem className="navlink-user">
                <UncontrolledDropdown nav inNavbar>
               
              <DropdownToggle nav caret>
        
                         { user ? <strong>{ user.user ? `${user.user.name}` : `${localStorage.getItem('username')}` }</strong> : <strong>  {localStorage.getItem('username')} </strong>} 
                        <Link to='/profile'><AccountCircleIcon /></Link> 
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Link to={{
                    pathname: "/profile"}}>
                    <Trans i18nKey="profile">
                    </Trans>
                  </Link>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
                    <Logout />
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

                    
                </NavItem>
            </Fragment>
        ) */
         /*    const guestLinks = (
                <Fragment>
                    <NavItem className="navlink-login">
                        <LoginModal />
                    </NavItem>
                    <NavItem className="navlink-register">
                        <RegisterModal />
                    </NavItem>
                </Fragment>
            ) */
        return (
            <div>

         { isAuthenticated && this.state.window == `/dashboard` || this.state.window == `/dashboard/edit`  || this.state.window == `/dashboard/calendar` || this.state.window == `/dashboard/layout`  || this.state.window == `/dashboard/layout/new` || this.state.window == '/dashboard/room/new' /* || this.state.window == '/dashboard/calendar'  */ ? dashboard : 
             <div>
             <AppBar position="fixed" className="customnavbar" >
                <Toolbar className="justify-content-between">
                    <IconButton edge="start" color="inherit" aria-label="menu"  >
                        <MenuIcon onClick={this.toggle()} />
                    </IconButton>
                    <Link
                    to="/">
                    <img  className="navbarlogo" alt="navbarlogo" src={process.env.PUBLIC_URL + '/logo.png'} />
                    </Link>
                    {isAuthenticated ?<Link to='/profile'> <IconButton edge="end">
                         

    <AccountCircleIcon /> </IconButton> </Link>  : <LoginModal/> }
                </Toolbar>
            </AppBar>
                    <Drawer classes={{
                    paper: 'menudrawer'
                    }} anchor={"left"} open={this.state.left} onClose={this.toggle(false)}>
                        <Container>
                        <div className="row justify-content-end mt-5">
                        <div className="col-10">
                        <img  className="navbarlogo"  alt="navbarlogo" src={process.env.PUBLIC_URL + '/logo.png'} />
                         
                        </div>
                        <div className="col float-right exiticon">
                        <CancelIcon classes={{
                         root: 'floatright' }} fontSize="large" onClick={this.toggle(false)} />
                       </div>
                         
                         </div>
                        <div className="col-12 insideNavbar">
                        
                            <List
                            classes={{}}
                            >
                                <Link
                                to="/restaurants"
                               
                                >
                            
                            <ListItem button onClick={this.toggle(false)} component={Link} to="/restaurants">
                                <ListItemIcon>
                                    <RestaurantIcon />
                                </ListItemIcon>
                                <ListItemText  className="whitetext" primary={
                                    <Trans i18nKey="restaurants">
                                    </Trans>
                                    } />
                                </ListItem>
                                </Link>
                            </List>
                            <Divider />
                            {isAuthenticated ? 
                             <List component="nav" aria-label="secondary mailbox folders">
                             <Link to="/profile">
                             <ListItem button onClick={this.toggle()}>
                             <ListItemIcon>
                                    <AccountCircleIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Trans i18nKey="profile">
                                    </Trans>
                                    } />
                                
                             </ListItem>
                             </Link>
                             <Link to="/profile/favorites">
                             <ListItem button onClick={this.toggle()}>
                             <ListItemIcon>
                                    <FavoriteIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                    <Trans i18nKey="favorites">
                                    </Trans>
                                    } />
                                
                             </ListItem>
                             </Link>
                             <Link to="/profile/reservations">
                             <ListItem button onClick={this.toggle()}>
                             <ListItemIcon>
                                    <ConfirmationNumberIcon />
                                </ListItemIcon>
                                <ListItemText primary={
                                     <Trans i18nKey="reservations">
                                     </Trans>
                                }/>
                                
                             </ListItem>
                             </Link>
                             { localStorage.getItem('restaurant_id') ? 
                           <div>
                      < Divider />
                      <Link to="/dashboard" >
                       <ListItem button onClick={this.toggle()}>
                       <ListItemIcon>
                              <DashboardIcon />
                          </ListItemIcon>
                          <ListItemText primary={
                               <Trans i18nKey="dashboard">
                               </Trans>
                          }/>
                          
                       </ListItem>
                       </Link>
                       <Divider />
                    </div>
                     : null }
                             <ListItem button onClick={this.toggle()}>
                             <ListItemIcon>
                                    <ExitToAppIcon />
                                </ListItemIcon>
                                <ListItemText >
                                <Logout />
                                </ListItemText >
                             </ListItem>
                             

                         </List>
                    : null }
                        <Divider/>
                     <div className="d-flex justify-content-between">
                           <List>
                             
                           <Button classes={
                               i18n.languages[0] == 'en' ? 
                         {root: 'langButtonSelected m-1' } :  {root: 'langButton m-1' }} onClick={() => this.changeLanguage('en')} disabled={i18n.languages[0] == 'en'}>EN</Button>

                         
                            <Button classes={
                               i18n.languages[0] == 'nl' ? 
                         {root: 'langButtonSelected m-1' } :  {root: 'langButton m-1' }} onClick={() => this.changeLanguage('nl')} disabled={i18n.languages[0] == 'nl'} >NL</Button>
                            

                            <Button classes={
                               i18n.languages[0] == 'fr' ? 
                         {root: 'langButtonSelected m-1' } :  {root: 'langButton m-1' }} onClick={() => this.changeLanguage('fr')} disabled={i18n.languages[0] == 'fr'} >FR</Button>
                           </List>
                           </div>
                        </div>
                        </Container>
                    </Drawer>
         </div>
    }
        </div>
        )
    }
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps)(AppNavbar)
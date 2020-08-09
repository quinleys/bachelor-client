import 'antd/dist/antd.css';
import React, { Component, Suspense } from 'react';
import Profile from './pages/Profile';
import Home from  './pages/Home';
import AppNavbar from './components/Components/AppNavbar';
import Restaurants from './pages/Restaurants';
import Detail from './pages/Detail';
import Dashboard from './pages/Owners/Dashboard'
import Plattegrond from './pages/Owners/Plattegrond'
import NewRoom from './pages/Owners/NewRoom'
import Edit from './pages/Owners/Edit'
import { Provider } from 'react-redux';
import NoMatch from './pages/NoMatch';
import store from './store';
import { loadUser } from './actions/authActions';
import { getCategories, } from './actions/categoriesActions';
import { ProtectedRoute } from './components/Routes/ProtectedRoute';
import { RestaurantOwner } from './components/Routes/RestaurantOwner';
import  EditLayout  from './pages/Owners/EditLayout'
import Table from './pages/Owners/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
} from "react-router-dom";
import { getPayments } from './actions/paymentsActions';
import { getFacilities } from './actions/facilitiesActions';
import NewLayout from './pages/Owners/NewLayout';
import Calendar from './pages/Owners/Calendar';
import SocialCallback from './pages/SocialCallback';
import Favorites from './pages/Profile/Favorites';
import Reservations from './pages/Profile/AllReservations';
import AppBar from './components/Components/AppNavbar';
import MiniDrawer from './components/Owners/MiniDrawer'
import EditRoom from './pages/Owners/EditRoom';
import { ToastContainer,  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { getPrices } from './actions/priceActions';
import About from './pages/About'
import './App.css';



  export default class App extends Component {
    
  componentDidMount(){
    store.dispatch(loadUser()); 
    store.dispatch(getCategories());
    store.dispatch(getPayments());
    store.dispatch(getFacilities());
    store.dispatch(getPrices())

  }

  render(){


  return (
    <Suspense fallback="loading">
      <I18nextProvider i18n={i18n}>
    <Provider store={store}>
    <Router>
    <div>
      <AppNavbar />
      <ToastContainer
                        position="bottom-right"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        />

      <Switch>
        {/* <Route exact path="/api/user/login/google"/>  */}
       {/* <Redirect from="/api/user/login/google" to="/api/user/login/google" /> */}
         <ProtectedRoute exact path="/profile" component={Profile} />
         <ProtectedRoute exact path="/profile/favorites" component={Favorites} />
         <ProtectedRoute exact path="/profile/reservations" component={Reservations} />
         <RestaurantOwner exact path="/dashboard" component={Dashboard} />
         <RestaurantOwner exact path="/dashboard/layout" component={Table} />
         <RestaurantOwner path="/dashboard/edit" component={Edit} />
         <RestaurantOwner exact path="/dashboard/layout/layout/new" component={NewLayout} />
         <RestaurantOwner exact path="/dashboard/layout/layout/edit:id" component={EditLayout} />
         <RestaurantOwner exact path="/dashboard/layout/room/new" component={NewRoom} />
         <RestaurantOwner exact path="/dashboard/layout/room/edit:id" component={EditRoom} />
         <RestaurantOwner exact path="/dashboard/plattegrond" component={Plattegrond} />
         <RestaurantOwner exact path="/dashboard/calendar" component={Calendar} />
         <Route path="/google/callback"  component={SocialCallback} />
         <Route  path="/restaurants" component={Restaurants}/>
         <Route  path="/about" component={About}/>
        <Route  path="/restaurants:id" component={Detail}/>
        <Route exact path="/" component={Home} />
      
          <Route path="*">
            <NoMatch />
          </Route>  
      </Switch>
      <Switch>

    <Route
        path="/dashboard"
        component={MiniDrawer}
    />
    <Route component={AppBar} />
</Switch>
    </div>
  </Router>
  </Provider>
  </I18nextProvider>
  </Suspense>
  );
}
  }




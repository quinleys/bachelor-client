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
import { getItems, getRandom } from './actions/itemActions';
import { getCategories, } from './actions/categoriesActions';
import { ProtectedRoute } from './components/Routes/ProtectedRoute';
import { RestaurantOwner } from './components/Routes/RestaurantOwner';
import { getReservations } from './actions/reservationActions';
import  EditLayout  from './pages/Owners/EditLayout'
import Table from './pages/Owners/Layout'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { getPayments } from './actions/paymentsActions';
import { getFacilities } from './actions/facilitiesActions';
import './App.css';
import NewLayout from './pages/Owners/NewLayout';
import Calendar from './pages/Owners/Calendar';
import KonvaTest from './pages/Owners/KonvaTest';
import SocialCallback from './pages/SocialCallback';
import Favorites from './pages/Profile/Favorites';
import Reservations from './pages/Profile/AllReservations';
import AppBar from './components/Components/AppNavbar';
import MiniDrawer from './components/Owners/MiniDrawer'
import EditRoom from './pages/Owners/EditRoom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { getPrices } from './actions/priceActions';
import Polotno from './pages/Owners/Polotno';



class App extends Component {
  componentDidMount(){
    console.log('token',localStorage.getItem('token'))
    console.log('user', localStorage.getItem('username'))
    console.log('auth', localStorage.getItem('authenticated'))
    store.dispatch(loadUser()); 
/*     store.dispatch(getCategories()); */
 /*    store.dispatch(getRandom()); */
    store.dispatch(getCategories());
    store.dispatch(getPayments());
    store.dispatch(getFacilities());
    store.dispatch(getPrices())
    /* store.dispatch(getReservations()); */
    /* store.dispatch(getPrices()); */
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
{/*     <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <Link class="navbar-brand" to="/">Navbar</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item">
      <Link to="/login">Login</Link>
      </li>
      <li class="nav-item">
      <Link to="/posts">Posts</Link>
      </li>
    </ul>
  </div>
</nav> */}
      
      {/* A <Switch> looks through its children <Route>s and
          renders the first one that matches the current URL. */}
      <Switch>
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
         <RestaurantOwner exact path="/dashboard/polotno" component={Polotno} />
         <Route path="/google/callback" component={SocialCallback}/>
         <Route  path="/restaurants" component={Restaurants}/>
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

export default App;

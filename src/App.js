import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Index from './Components/Index/Index';
import Cart from './Components/Cart/Index';
import Checkout from './Components/Checkout/Index'
import Success from './Components/Success/Index'
import Profile from './Components/Profile/Index'
import Product from './Components/Product/Index'
import Categories from './Components/Categories/Index'
import Login from './Components/Login';
import OtpLogin from './Components/OtpLogin';
import NewUser from './Components/NewUser';

function App() {
  return (
    <Router>
      <Route exact path='/'>
        <Index />
      </Route>
      <Route exact path='/cart'>
        <Cart />
      </Route>
      <Route exact path='/check-out'>
        <Checkout />
      </Route>
      <Route exact path='/success'>
        <Success />
      </Route>
      <Route exact path='/profile'>
        <Profile />
      </Route>
      <Route exact path='/login'>
        <Login />
      </Route>
      <Route exact path='/otp-login'>
        <OtpLogin />
      </Route>
      <Route exact path='/new-user'>
        <NewUser />
      </Route>
      <Route exact path='/product/:id'>
        <Product />
      </Route>
      <Route exact path='/category/:id'>
        <Categories />
      </Route>
    </Router>
  );
}

export default App;

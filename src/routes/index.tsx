import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Profile from '../pages/Profile';

import Dashbord from '../pages/Dashbord';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/forgot-password" component={ForgotPassword} />
    <Route path="/reset-password" component={ResetPassword} />

    <Route path="/dashbord" component={Dashbord} isPrivate />
    <Route path="/profile" component={Profile} isPrivate />
  </Switch>
);

export default Routes;

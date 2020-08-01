import React from 'react';
import { Switch } from 'react-router-dom';

import Signin from '../pages/Signin';
import SignUp from '../pages/SignUp';
import Dashbord from '../pages/Dashbord';
import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Signin} />
    <Route path="/signUp" component={SignUp} />
    <Route path="/dashbord" component={Dashbord} isPrivate />
  </Switch>
);

export default Routes;

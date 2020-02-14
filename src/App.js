import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Navigation from '../src/components/Navigation/navigation'
import LandingPage from '../src/components/Landing/landing';
import SignUpPage from '../src/components/SignUp/signup';
import SignInPage from '../src/components/SignIn/signin';
import HomePage from '../src/components/Home/home';
import {Container, Header, Content, Footer} from 'rsuite';

import * as ROUTES from '../src/constants/routes'

import { withAuthentication } from '../src/components/Session';
import BlobbHome from './components/Blobb/blobbHome';
import './App.css';

const App = () => (
    <Router>
    <Container>
      <Header><Navigation /></Header>
      <Content className="content">
        <Route exact path={ROUTES.LANDING} component={LandingPage} />
        <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
        <Route path={ROUTES.SIGN_IN} component={SignInPage} />
        <Route path={ROUTES.HOME} component={HomePage} />
        <Route path={ROUTES.BLOBBHOME + "/:petId"} component={BlobbHome} />
      </Content>
    </Container>
    </Router>
);

export default withAuthentication(App);
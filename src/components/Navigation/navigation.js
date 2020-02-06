import React from 'react';
import { Link } from 'react-router-dom';

import SignOutButton from '../SignOut/signout';
import * as ROUTES from '../../constants/routes';

import { AuthUserContext } from '../Session';
import { Navbar, Nav } from 'rsuite';


const Navigation = () => (
    <div>
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? <NavigationAuth /> : <NavigationNonAuth />
      }
    </AuthUserContext.Consumer>
  </div>
  );

  const NavigationAuth = () => (
    <Navbar>
     <Navbar.Body>
     <Nav>
     <Nav.Item>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.HOME}>Home</Link>
      </Nav.Item>
      <Nav.Item>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </Nav.Item>
      <Nav.Item>
        <SignOutButton />
      </Nav.Item>
     </Nav>
     </Navbar.Body>

    </Navbar>
  );

  const NavigationNonAuth = () => (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
    </ul>
  );

export default Navigation;
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
  const NavLink = props => <Nav.Item componentClass={Link} {...props} />;
  const NavigationAuth = () => (
    <Navbar appearance="inverse">
     
     <Nav>
     
        <NavLink to={ROUTES.HOME}>Home</NavLink>
      
        <SignOutButton />
      
     </Nav>
     

    </Navbar>
  );

  const NavigationNonAuth = () => (
    <Navbar appearance="inverse">
      
      <Nav>
      <NavLink to={ROUTES.LANDING}>Home</NavLink>
      <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
      </Nav>
        
    
    </Navbar>
  );

export default Navigation;
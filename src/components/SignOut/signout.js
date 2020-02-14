import React from 'react';
import { withFirebase } from '../Firebase';
import { Nav } from 'rsuite';

const SignOutButton = ({ firebase }) => (
  <Nav.Item onClick={firebase.doSignOut}>Sign Out</Nav.Item>
  );
export default withFirebase(SignOutButton);

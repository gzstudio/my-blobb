import React from 'react';
import {Link, withRouter} from 'react-router-dom';

import {withFirebase} from '../Firebase'
import * as ROUTES from '../../constants/routes';

import { FlexboxGrid, Button, Form, FormGroup, ControlLabel, FormControl, Input } from 'rsuite'

import './form.css';
const SignUp = () => (
    <div>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <h1>Sign Up</h1>
                <SignUpForm /> 
            </FlexboxGrid.Item>
        </FlexboxGrid> 
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null
};

class SignUpFormBase extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...INITIAL_STATE };
      }

    onSubmit = event => {
        const {username, email, passwordOne} = this.state;

        this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
            return this.props.firebase
                .user(authUser.user.uid)
                .set({
                    username,
                    email
                });
                if(authUser) {
                    authUser.updateProfile({
                        displayName: username
                    })
                }
                
        })
        .then(() => {
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
            this.setState({ error });
        });
        event.preventDefault();
    }

    onChange = event => {
        this.setState({ [event.target.name]: event.target.value});
    };

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error
        } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';

        return(
            <Form onSubmit={this.onSubmit}>
            <FormGroup>
                <ControlLabel>Full Name</ControlLabel>
                <input
                name="username"
                value={username}
                onChange={this.onChange}
                type="text"
                placeholder="Full Name"
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Email Address</ControlLabel>
                <input
                name="email"
                value={email}
                onChange={this.onChange}
                type="text"
                placeholder="Email Address"
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Password</ControlLabel>
                <input
                name="passwordOne"
                value={passwordOne}
                onChange={this.onChange}
                type="password"
                placeholder="Password"
                />
            </FormGroup>
            <FormGroup>
                <ControlLabel>Confirm Password</ControlLabel>
                <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={this.onChange}
                type="password"
                placeholder="Confirm Password"
                />
            </FormGroup>
                <Button disabled={isInvalid} type="submit">Sign Up</Button>
                {error && <p>{error.message}</p>}
            </Form>
        );
    }
}

const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUp;
export { SignUpForm, SignUpLink };
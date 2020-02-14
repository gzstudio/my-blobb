import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp/signup';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

import { FlexboxGrid, Button, Form, FormGroup, ControlLabel, FormControl, Input } from 'rsuite'
import './form.css';
const SignIn = () => (
    <div>
        <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <h1>Sign In</h1>
                <SignInForm />
                <SignUpLink />
                </FlexboxGrid.Item>
        </FlexboxGrid>
    </div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null
};

class SignInFormBase extends React.Component {
    constructor(props) {
        super(props);

        this.state = { ...INITIAL_STATE };
    }

    onSubmit = event => {
        const {email, password} = this.state;

        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then((a1, a2, a3) => {
                console.log(a1);
                console.log(a2);
                console.log(a3);
                this.setState({ ...INITIAL_STATE});
                this.props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                this.setState({ error });
            });

            event.preventDefault();
    };

    onChange = event => {

        this.setState({ [event.target.name]: event.target.value });
    };

    render() {
        const { email, password, error } = this.state;
        const isInvalid = password === '' || email === '';

        return(
            
            <Form onSubmit={this.onSubmit}>
                <FormGroup>
                    <ControlLabel>Email</ControlLabel>
                    <input name="email" value={email} onChange={this.onChange} type="text" placeholder="Email Address" />
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Password</ControlLabel>
                    <input name="password" value={password} onChange={this.onChange} type="password" placeholder="Password" />
                </FormGroup>
                <Button color="blue" disabled={isInvalid} type="submit">
                Sign In
                </Button>
                {error && <p>{error.message}</p>}
                   
            </Form>
            
        );
    }
}

const SignInForm = compose(
    withRouter,
    withFirebase,
  )(SignInFormBase);
  
export default SignIn;
  
export { SignInForm };
import React from 'react';

import { withFirebase } from '../Firebase'
import withAuthorization from '../Session/withAuthorization';

import { Button, Container, Grid, Row, Col } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: ''
        }
    }

    componentDidMount() {
        
    }
    render() {
        return (
            <div>
                <Container>
                <Grid>
                <Row>
                    <Col>
                    <h1>Hello {this.state.currentUser} </h1>
                    <p>The Home Page is accessible by every signed in user.</p>
                    <Button>Adopt a pet</Button>
                    </Col>
                </Row>
                </Grid>
               
                
                </Container>

            </div>
        )
    }
}
// const HomePage = () => (
//   <div>
//     <h1>Hello</h1>
//     <p>The Home Page is accessible by every signed in user.</p>
//   </div>
// );

const condition = authUser => !!authUser;

export default withAuthorization(condition)(home);
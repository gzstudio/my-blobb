import React from 'react';

import firebase from 'firebase';
import withAuthorization from '../Session/withAuthorization';

import { Link } from 'react-router-dom';

import { FlexboxGrid, Button, Modal,Input, Form } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

class home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: '',
            isOpen: false,
            backdrop: false,
            petname: '',
            redirect: false,
            age: '',
            id: '',
            petExist: false
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        this.setState({
            currentUser: user.email
        })
        this.checkPetExist(user.email);
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.petname !== this.state.petname) {
            this.writeData();
        }
    }
    
    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log("toggle")
    }

    handleChange = (petname) => {
        console.log(petname);
        this.setState({
            petname: petname
        });
    }
 
    checkPetExist = (user) => {
        let self = this;
        firebase.firestore().collection('blobbs').where('owner', '==', user).get().then(function(querySnapShot) {
            querySnapShot.forEach(function(doc) {
                console.log(doc.exists)
                if(doc.exists) {
                    console.log(doc.id, " => ", doc.data())
                    self.setState({petExist: true});
                    console.log(doc.id)
                    self.setState({id: doc.id.toString()})            
                } else {
                    console.log('pet not exist');
                }
            })
        }).catch(function(error) {
            console.log("Error getting documents: ", error);
        });
    }

    writeData = () => {
        let petname = this.state.petname;
        firebase.firestore().collection('blobbs').add({
            owner: this.state.currentUser,
            petname: this.state.petname,
            created_at: firebase.firestore.FieldValue.serverTimestamp(),
            mood: 'happy',
            hp: 100,
            status: 'baby',
            food: 100,
            fun: 100,
            color: Math.floor(Math.random()*16777215).toString(16),
        }).then(result => {
            let id = result.id;
            this.setState({id: id})
        })
    }

    handleSubmit = (e) => {
        this.writeData();
        this.setState({redirect:true})
        e.preventDefault();
        this.props.history.push("/blobb-home/" + this.state.id)
    }

    render() {
        const { petname, backdrop, show } = this.state;
        const petExist = this.state.petExist
        return (
            <div>
                <FlexboxGrid justify="center">
                    <FlexboxGrid.Item colspan={12} classPrefix="text-center">
                    
                    {petExist ? (
                        <div><h1><Link to={`/blobb-home/` + this.state.id}>Visit your pet</Link></h1></div>
                        ) : ( <div>
                        <h1>👋🏼 Hello!</h1>
                        <p>Welcome to My Blobb app.<br/> Would you like to adop a lovely pet today?</p>
                        <br />
                        <Button size="lg" color="blue" onClick={this.toggleModal}>Adopt a pet</Button>
                        </div> ) 
                    }
                        
                    
                    <Modal show={this.state.isOpen} backdrop={backdrop} onHide={this.toggleModal}>
                        <Modal.Header>
                            <Modal.Title>What do you like to name your pet?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form 
                                id="petname-form" 
                                onSubmit={this.handleSubmit}>
                                    <Input 
                                    type="text" 
                                    size="lg" 
                                    placeholder="Enter your pet name"
                                    onChange={this.handleChange}          
                                    />
                            </Form>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button form="petname-form" type="submit" value="submit" appearance="primary">
                            Ok
                            </Button>
                            <Button onClick={this.toggleModal} appearance="subtle">
                            Cancel
                            </Button>
                        </Modal.Footer>
                    
                    </Modal>
                    
                    </FlexboxGrid.Item>
              
                </FlexboxGrid>
                
                
            </div>
        )
    }
    
}


const condition = authUser => !!authUser;

export default withAuthorization(condition)(home);

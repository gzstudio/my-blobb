import React from 'react'
import Blobb from '../Blobb/blobb'
import Letter from '../Blobb/letter'
import firebase from 'firebase';
import { Progress, Button, FlexboxGrid, ButtonToolbar } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';
import withAuthorization from '../Session/withAuthorization';
import './blobb.css';

class BlobbHome extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            petname: '',
            petId: '',
            petdata: {},
            petRanAway: false
        }
    }

    getPetData = () => {
        const petId = this.props.match.params.petId;

        let ref = firebase.firestore().collection("blobbs");
        
        this.setState({
            petId: petId
        });

        ref.doc(petId).onSnapshot(async (doc) => {
            let data = await doc.data();
            console.log(data);
            this.setState((state, props) => ({petdata: data}) );
            // this.forceUpdate();
        })
    }

    petLiving = () => {
        const myInteval = setInterval(() => {
            let petData = JSON.parse(JSON.stringify(this.state.petdata));
            if(this.state.petdata.food >= 0) {
                petData.food = this.state.petdata.food - 2.5
            }
            if(this.state.petdata.fun >=0) {
                petData.fun = this.state.petdata.fun - 3
            }
            if(this.state.petdata.food <= 0 || this.state.petdata.fun <= 0) {            
                console.log("ran away")
                this.state.petRanAway = true
                clearInterval(myInteval);
            }

            this.setState((state, props) => ({
                petdata: petData    
            })
            
        )},1000)
    }

    updatePetData = () => {
        const petId = this.props.match.params.petId;
        let ref = firebase.firestore().collection("blobbs");

        const myInteval = setInterval(() => {
            ref.doc(petId).update({
                "fun": this.state.petdata.fun,
                "food": this.state.petdata.food
            })
            .then(function() {
                console.log("document updated")
            })
            if(this.state.petRanAway === true) {
                clearInterval(myInteval);
            }
        },5000)

        
    }
    
    feed = () => {
        let petData = JSON.parse(JSON.stringify(this.state.petdata))
        petData.food = this.state.petdata.food+10

        this.setState ({
            petdata: petData
        })
    }

    play = () => {
        let petData = JSON.parse(JSON.stringify(this.state.petdata))
        petData.fun = this.state.petdata.fun+10

        this.setState ({
            petdata: petData
        })
    }

    componentDidMount() {
        this.getPetData();
        this.petLiving();
        this.updatePetData();
    }

   
    render() {
        const petRanAway = this.state.petRanAway
        return (
            <div>
            <FlexboxGrid justify="center">
            <FlexboxGrid.Item colspan={12}>
                <h1>{this.state.petdata.petname}</h1>
                <div className="box">
                {petRanAway ? ( <Letter/> ) : ( <Blobb /> ) }
                </div>

                
                <p>Hunger</p><Progress.Line percent={this.state.petdata.food} strokeColor="#ffc107" showInfo={false}/>
                <p>Fun</p><Progress.Line percent={this.state.petdata.fun} strokeColor="#3498ff" showInfo={false}/> 
                    
                <br />
                <ButtonToolbar>
                
                {petRanAway ? (
                    <Button size="lg" color="blue" onClick={this.feed} disabled>Feed</Button>
                    ) : (
                    <Button size="lg" color="blue" onClick={this.feed} >Feed</Button>
                    ) 
                } 
                
                {petRanAway ? (
                    <Button size="lg" color="blue" onClick={this.play} disabled>Play</Button>
                    ) : (
                    <Button size="lg" color="blue" onClick={this.play}>Play</Button>
                    ) 
                }                   
                </ButtonToolbar>
                    
                    
                </FlexboxGrid.Item>
            </FlexboxGrid>
            </div>
        )
    }

}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(BlobbHome);
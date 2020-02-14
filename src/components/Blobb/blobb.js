import React from 'react'
import './blobb.css';

class Blobb extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            petname: '',
            owner: '',
            age: '',
            hunger: '',
            mood:'',
        }
    }

    render() {
        return (
            <div>
                <img src="../img/blobb.svg" className="bounce"></img>
            </div>
        )
    }

}
export default Blobb;
import React from 'react'
import { Modal } from 'rsuite'
import 'rsuite/dist/styles/rsuite-default.css';

class Letter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isOpen: false,
            backdrop: false,         
        }
    }

    toggleModal = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
        console.log("toggle")
    }

    render() {
        const { backdrop, show } = this.state;
        return (
            <React.Fragment>
            <div>
                <img onClick={this.toggleModal} src="../img/letter.svg"></img>
            </div>
            <Modal show={this.state.isOpen} backdrop={backdrop} onHide={this.toggleModal}>
                        <Modal.Header>
                            <Modal.Title>Bye!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                        <p>Since you do not take care of me well, I've decided to run away.</p>
                        <p>
                        Good luck finding new pet.
                        </p>
                        
            </Modal.Body>
            </Modal>
            </React.Fragment>
        )
    }

}
export default Letter;
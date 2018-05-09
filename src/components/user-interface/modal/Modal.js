import React, { Component } from 'react';
import Aux from '../../hoc/aux';

import classes from './modal.css'



class Modal extends Component {

    state = {
        visible: true  
    }

    toggleModal = (place)=> {
        console.log(place+'toggle-modal called'); 
        const currVisibileState = this.state.visible;
        this.setState({visible:!currVisibileState})
    }

    render() {
        const modalClasses = this.state.visible  ? [classes.modal, classes.show_modal].join(' ') : classes.modal;
        const modalContentClass = this.state.visible  ? classes.modal_content : classes.hide;
        return( 
        <Aux>
            <div className={modalClasses} onClick={()=>{this.toggleModal('outer div')}}>
            </div>
            <div className={modalContentClass}>
                <span className={classes.close_button} onClick={()=>{this.toggleModal('inner div')}}>&times;</span>
                {this.props.children}
            </div>
        </Aux>
        )
    }
}


export default Modal;
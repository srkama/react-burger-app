import React, { Component } from 'react';
import Aux from './aux';
import Modal from '../user-interface/modal/Modal';


const errorHandler = (WrappedComponent, axios) => {
    return class  extends Component {
        state = {
            error: null
        }

        componentWillMount () {
            this.reqInterceptor = axios.interceptors.request.use( req => {
                this.setState( { error: null } );
                return req;
            } );
            this.resInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState( { error: error } );
            });
        }

        componentWillUnmount () {
            axios.interceptors.request.eject( this.reqInterceptor );
            axios.interceptors.response.eject( this.resInterceptor );
        }

        showError() {
            if (this.state.error) {
                return ( 
                    <Modal>
                        <h1>{this.state.error.message}</h1>
                    </Modal>
                    
                )
            }
        }

        render() {
            return(
                <Aux>
                    { this.showError() }
                    <WrappedComponent {...this.props}/>
                </Aux>
            )
        }
    }
}


export default errorHandler;
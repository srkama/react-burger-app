import React, { Component } from 'react';
import Aux from './aux';
import Modal from '../user-interface/modal/Modal';


const errorHandler = (WrappedComponent, axois) => {
    return class  extends Component {
        state = {
            error: null
        }

        componentWillMount() {
            axois.interceptors.request.use(request=>{
                this.setState({
                    error:null
                })
                return request;
            });
            axois.interceptors.response.use(response=>{
                return response;
            }, error=>{
                this.setState({
                    error:error
                })
            });
        }

        showError() {
            if (this.state.error) {
                return ( 
                    <Modal>
                        {this.state.error.status} {this.state.error.message}
                    </Modal>
                )
            }
        }

        render() {
            return(
                <Aux>
                    { this.showError() }
                    <WrappedComponent {...this.props}/>>
                </Aux>
            )
        }
    }
}


export default errorHandler;
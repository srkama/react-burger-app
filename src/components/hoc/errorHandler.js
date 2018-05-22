import React, { Component } from 'react';
import Aux from './aux';
import Modal from '../user-interface/modal/Modal';


const errorHandler = (WrappedComponent, axois) => {
    return class  extends Component {
        state = {
            error: null
        }

        componentDidMount() {
            console.log("Mounting Error handler")
            this.setState({
                error:null
            })
            axois.interceptors.request.use(request=>{
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

        componentWillUnmount() {
            console.log("Unmounting Error Handler")
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
            console.log
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
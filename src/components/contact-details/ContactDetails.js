import React, { Component } from 'react';
import { withRouter } from  'react-router-dom';
import { connect } from 'react-redux';
import Button from '../user-interface/button/Button';
import _ from 'lodash';
import Input from '../user-interface/input/Input';
import classes from './contact-details.css'
import axiosInstance from '../../axios';


class ContactDetails extends Component {

    state = {
        burger: {},
        deliveryDetailsForm: {
            name: {
                elementType:'text',
                value:'',
                isValid: true,
                isFocused:false,
                options:{
                    placeholder:'Name',
                    label:"Name"
                },
                validationRules:{
                    required: true,
                    minLength: 4
                }
            },
            email: {
                elementType:'text',
                value:'text',
                isValid: true,
                isFocused:false,
                options:{
                    placeholder:'Email',
                    label:"Email"
                },
                validationRules:{
                    required: true,
                    maxLength: 50,
                    minLength: 10
                }
            },
            phone: {
                elementType:'text',
                value:'',
                isValid: true,
                isFocused:false,
                options:{
                    placeholder:'Phone No',
                    label:'Phone'
                },
                validationRules:{
                    required: true,
                    maxLength: 10,
                    minLength: 10
                }
            },
            delivery: {
                elementType: 'select',
                value:'takin',
                isValid: true,
                isFocused:true,
                options:{
                    values:[
                        {value:'takin', display:'takin'},
                        {value:'dinein', display:'dinein'},
                        {value:'home delivery', display:'home delivery'},     
                    ],
                    label:'Delivery Type'
                },
                validationRules:{
                }
            }
        },
        orderState: 0,
        isFormValid:false
    }

    checkValidity (value, rules) {
        let isValid = true;

        if(rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }

        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        return isValid;
    }

    componentDidMount () {
        this.setState({burger:this.props.ingredient})
    }

    changeValue = (event,key) => {
        const modifiedDeliveryDetailsForm = {...this.state.deliveryDetailsForm}
        const modifiedElement = {...modifiedDeliveryDetailsForm[key]}
        
        modifiedElement.value = event.target.value;
        modifiedElement.isFocused = true;
        modifiedElement.isValid = this.checkValidity(modifiedElement.value, modifiedElement.validationRules);
        modifiedDeliveryDetailsForm[key] = modifiedElement; 
        let isFormValid = true;

        this.setState({deliveryDetailsForm:modifiedDeliveryDetailsForm}, ()=>{
            _.forEach(this.state.deliveryDetailsForm,(config, key)=>{
                isFormValid = config.isValid && config.isFocused && isFormValid;
            })
        });
        this.setState({isFormValid});   
    }

    completePurchase = () => {
        this.setState({orderState:1})
        let deliveryDetails = {};
        _.forEach(this.state.deliveryDetailsForm, (config, key)=> deliveryDetails[key]=config.value);
        const order = {
            burger:this.props.burger,
            totalCost: this.props.toalCost,
            deliveryDetails
        }
        axiosInstance.post('/orders.json', order)
            .then(response=>{
                this.setState({orderState:2})

                this.props.history.push("/")
            }).catch(response=>{
                this.setState({orderState:3})
            });
    }

    render() {

        let formElements = [];
        const formChangeValue = this.changeValue;
        _.forEach(this.state.deliveryDetailsForm, function(config, key) {
              formElements.push(
                   <Input 
                    key={key} 
                    elementType={config.elementType} 
                    config={config.options} 
                    valid={config.isValid}
                    onChange={(event)=>formChangeValue(event, key)}/>
              );
        })

        return(
            <div className={classes.contactDetailsForm}>
                {formElements}
                <div className={classes.contactDetailsInput}>
                    <Button type="success" disabled={!this.state.isFormValid} className={classes.button_pay_cancel} clicked={this.completePurchase}>
                        {this.state.orderState === 0 ? 'proceed to pay' : this.state.orderState === 1 ? 'Order in Process' : 'Order Success'}
                    </Button>
                    <Button type="cancel" className={classes.button_pay_cancel}>
                        Cancel                        
                    </Button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        burger:state.burger,
        toalCost:state.toalCost
    }
}

export default connect(mapStateToProps)(withRouter(ContactDetails));
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../user-interface/button/Button';
import _ from 'lodash';
import Input from '../user-interface/input/Input';
import classes from './contact-details.css'
import { orderActions } from '../../store/actions/actions';
import axiosInstance from '../../axios';
import errorHandler from '../hoc/errorHandler';


class ContactDetails extends Component {

    state = {
        burger: {},
        deliveryDetailsForm: {
            name: {
                elementType:'text',
                value:'kamal',
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
                value:'kamal@gai.com',
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
                value:'1234567832',
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

        let deliveryDetails = {};
        _.forEach(this.state.deliveryDetailsForm, (config, key)=> deliveryDetails[key]=config.value);

        const order = {
            burger:this.props.burger,
            totalCost: this.props.toalCost,
            deliveryDetails
        }

        this.props.purchaseBurger(order);

        console.log("completeing the Purchase")
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
                        {this.props.purchaseStatus === 0 ? 'proceed to pay' : this.props.purchaseStatus === 1 ? 'Order in Process' : 'Order Success'}
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
        toalCost:state.toalCost,
        purchaseStatus:state.purchaseStatus
    }
}

const mapDispatchToProps = dispatch => {
    return {
        purchaseBurger: (order) => dispatch(orderActions.orderBurger(order))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactDetails, axiosInstance));
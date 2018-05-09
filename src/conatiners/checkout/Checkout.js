import React, { Component } from 'react';
import queryString from 'query-string';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/checkout-summary/CheckoutSummary';
import Button from '../../components/user-interface/button/Button';
import ContactDetails from '../../components/contact-details/ContactDetails';
import classes from './checkout.css'



class Checkout extends Component {

    state = {
        ingredients:{},
    }

    componentWillMount() {
        const parsedObject=queryString.parse(this.props.location.search)
        this.setState({
            ingredients: parsedObject
        })
    }

    proceedToContact() {
        console.log(this.props);
        this.props.history.push(this.props.match.path+'/contact-details');
    }


    render() {
        console.log(this.props.match.path+'/contact-details');
        
        return(
            <div className={classes.checkout}>
                <CheckoutSummary ingredients={this.state.ingredients}></CheckoutSummary>
                <div className={classes.ctaSection}>
                    <Button type="cancel">
                        Cancel
                    </Button>
                    <Button type="success" clicked={()=>{this.proceedToContact()}}>
                        Proceed
                    </Button>
                </div>
                <Route path={this.props.match.path + '/contact-details'} exact render={()=><ContactDetails ingredient={this.state.ingredients}/>}/>
            </div>
        )
    }
}


export default Checkout;
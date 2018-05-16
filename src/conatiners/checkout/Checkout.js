import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/checkout-summary/CheckoutSummary';
import Button from '../../components/user-interface/button/Button';
import ContactDetails from '../../components/contact-details/ContactDetails';
import classes from './checkout.css'



class Checkout extends Component {

    state = {
        ingredients:{},
    }

    proceedToContact() {
        this.props.history.push(this.props.match.path+'/contact-details');
    }


    render() {
        return(
            <div className={classes.checkout}>
                <CheckoutSummary ingredients={this.props.burger}></CheckoutSummary>
                <div className={classes.ctaSection}>
                    <Button type="cancel">
                        Cancel
                    </Button>
                    <Button type="success" clicked={()=>{this.proceedToContact()}}>
                        Proceed
                    </Button>
                </div>
                <Route path={this.props.match.path + '/contact-details'} exact component={ContactDetails}/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        burger: state.burger
    }
}


export default connect(mapStateToProps)(Checkout);
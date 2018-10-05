import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

// This component is used in header, that will trigger the payment form
// It is a class component since redux is used
class Payments extends Component {
  render() {
    return ( 
      // amount in cents
      // token mean callback from stripe API
      // stripeKey taken from .env.development or .env.production, but react knows where we are now (this is pk)
      <StripeCheckout 
        name="Emaily"
        description="5$ for 5 email credits"
        amount={500}
        token={token => this.props.handleToken(token)} // here is the moment to react on successful or unsuccessful payment, calling action creator
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
      >
        <button className="btn">Add Credits</button>
      </StripeCheckout>
    );
  }
}

export default connect(null, actions)(Payments);
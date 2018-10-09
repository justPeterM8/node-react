import React, { Component } from "react";
import { reduxForm, Field } from 'redux-form';

class SurveyForm extends Component {
  render() {
    return(
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          <Field 
            type="text" 
            name="surveyTitle" // key that tells redux form what data it is
            component="input" // tell what type of html tag it is
          />
          <button type="submit">Submit</button>
        </form>  
      </div>
    );
  }
}

export default reduxForm({
  form: 'surveyForm'
})(SurveyForm);
import React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from '../../actions';

import formFields from "./formFields";

const SurveyFormReview = props => {
  console.log(props.surveyForm);
  const reviewFields = _.map(formFields, field => (
    <div key={field.name}>
      <label>{field.label}</label>
      <div>{props.formValues[field.name]}</div>
    </div>
  ));

  return (
    <div>
      <h5>Please confirm your entries</h5>
      <div>{reviewFields}</div>
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={props.onSurveyCancel}
      >
        Back
      </button>
      <button 
        onClick={actions.submitSurvey(props.formValues)}
        className="green white-text btn-flat right">
          Send Survey
        <i className="material-icons right">email</i>
      </button>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    formValues: state.form.surveyForm.values
  };
}
export default connect(mapStateToProps, actions)(SurveyFormReview);

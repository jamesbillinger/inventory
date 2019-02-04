import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import moment from 'moment/moment';
import { AutoSizer, Table, Column } from 'react-virtualized';
import Modal from 'components/modal';
import FormInput from 'components/formInput';
import FatButton from '../components/fatButton';
import Button from 'components/button';
import _ from 'lodash';
import FormDate from 'components/formDate';

class reportForm extends Component {
  constructor() {
    super();
    this.state = {
      startDate: new Date()
    }
  }
  render() {
    return (
      <div>
        <Field name="reportBegin" component={FormDate} label="Report Begin" selected={this.state.startDate} />
        <Field name="reportEnd" component={FormDate} label="Report End" selected={this.state.startDate}/>
      </div>
    );
  }
}

export default reduxForm({
  form: 'reportForm'
})(reportForm);

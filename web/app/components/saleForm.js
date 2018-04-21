import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FormDate from './formDate';
import FormInput from './formInput';
import FormSelect from './formSelect';

class SaleForm extends Component {
  submit = (data) => {
    const { actions, closeAction } = this.props;
    if (data._id) {
      actions.updateSale(data, closeAction);
    } else {
      actions.addSale(data, closeAction);
    }
  };

  render() {
    const { handleSubmit, closeAction } = this.props;
    return (
      <div>
        <div style={{display:'flex'}}>
          <div style={{display:'flex', flexWrap:'wrap', flex:'1 1 auto'}} >
            <Field name='Date' component={FormDate} label='Sale Date' />
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
          <RaisedButton primary={true} onClick={handleSubmit(this.submit)}>Submit</RaisedButton>
          <RaisedButton secondary={true} onClick={closeAction}>Cancel</RaisedButton>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'saleForm'
})(SaleForm);
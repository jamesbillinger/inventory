import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

class MyTextField extends Component {
  render() {
    const { label, input } = this.props;
    return (
      <TextField floatingLabelText={label} defaultValue={input.value} onChange={input.onChange} style={{display:'block'}} />
    );
  }
}

class inventoryForm extends Component {
  submit(data) {
    console.log(data);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <div >
          <div style={{display:'flex', flexWrap:'wrap'}}>
            <Field name='_id' component={MyTextField} label='ID' />
            <Field name='make' component={MyTextField} label='Make' />
            <Field name='model' component={MyTextField} label='Model' />
            <Field name='calibre' component={MyTextField} label='Calibre' />
            <Field name='category' component={MyTextField} label='Category' />
            <Field name='purchasePrice' component={MyTextField} label='Purchase Price' />
            <DatePicker name='purchaseDate' component={MyTextField} placeholderText='Purchase Date' />
            <Field name='salePrice' component={MyTextField} label='Sale Price' />
            <Field name='saleDate' component={MyTextField} label='Sale Date' />
            <Field name='owner' component={MyTextField} label='Owner' />
            <Field name='quantity' component={MyTextField} label='Quantity' />
            <Field name='barcode' component={MyTextField} label='Barcode' />
            <Field name='lowStock' component={MyTextField} label='Low stock level' />
          </div>
          <RaisedButton primary={true} onClick={handleSubmit(this.submit)}>Submit</RaisedButton>
        </div>
    )
  }
}

export default reduxForm({
  form: 'inventoryForm'
})(inventoryForm);
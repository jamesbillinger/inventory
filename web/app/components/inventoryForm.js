import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FormDate from './formDate';
import FormInput from './formInput';


class inventoryForm extends Component {
  submit(data) {
    console.log(data);
  }

  render() {
    const { handleSubmit } = this.props;
    return (
        <div >
          <div style={{display:'flex', flexWrap:'wrap'}} >
            <Field name='_id' component={FormInput} label='ID' />
            <Field name='make' component={FormInput} label='Make' />
            <Field name='model' component={FormInput} label='Model' />
            <Field name='calibre' component={FormInput} label='Calibre' />
            <Field name='category' component={FormInput} label='Category' />
            <Field name='purchasePrice' component={FormInput} label='Purchase Price' />
            <Field name='purchaseDate' component={FormDate} label='Purchase Date' />
            <Field name='salePrice' component={FormInput} label='Sale Price' />
            <Field name='saleDate' component={FormDate} label='Sale Date' />
            <Field name='owner' component={FormInput} label='Owner' />
            <Field name='quantity' component={FormInput} label='Quantity' />
            <Field name='barcode' component={FormInput} label='Barcode' />
            <Field name='lowStock' component={FormInput} label='Low stock level' />
          </div>
          <RaisedButton primary={true} onClick={handleSubmit(this.submit)}>Submit</RaisedButton>
        </div>
    )
  }
}

export default reduxForm({
  form: 'inventoryForm'
})(inventoryForm);
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import FormDate from './formDate';
import FormInput from './formInput';
import FormSelect from './formSelect';

const categoryOptions = ['Firearm','Ammo','Misc'];

class inventoryForm extends Component {
  constructor() {
    super();
    this._submit = ::this.submit;
  }

  submit(data) {
    const { actions, closeAction } = this.props;
    if (data._id) {
      actions.updateItem(data, closeAction);
    } else {
      actions.addItem(data, closeAction);
    }
  }

  render() {
    const { handleSubmit, closeAction } = this.props;
    return (
      <div>
        <div style={{display:'flex'}}>
          <div style={{display:'flex', flexWrap:'wrap', flex:'1 1 auto'}} >
            <Field name='make' component={FormInput} label='Make' />
            <Field name='model' component={FormInput} label='Model' />
            <Field name='calibre' component={FormInput} label='Calibre' />
            <Field name='category' component={FormSelect} label='Category' options={categoryOptions} />
            <Field name='purchaseDate' component={FormDate} label='Purchase Date' />
            <Field name='saleDate' component={FormDate} label='Sale Date' />
            <Field name='owner' component={FormInput} label='Owner' />
            <Field name='barcode' component={FormInput} label='Barcode' />
            <Field name='quantity' component={FormInput} label='Quantity' type='number' style={{width:'100px'}} />
            <Field name='lowStock' component={FormInput} label='Low stock level' type='number' style={{width:'120px'}} />
          </div>
          <div style={{display:'flex', flexDirection:'column'}}>
            <div style={{backgroundColor:'#f2f2f2', borderRadius:'6px', paddingBottom:'10px', marginTop:'10px'}}>
              <Field name='purchasePrice' component={FormInput} label='Purchase Price' type='number' style={{width:'120px'}} />
              <Field name='salePrice' component={FormInput} label='Sale Price' type='number' style={{width:'120px'}} />
            </div>
          </div>
        </div>
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
          <RaisedButton primary={true} onClick={handleSubmit(this._submit)}>Submit</RaisedButton>
          <RaisedButton secondary={true} onClick={closeAction}>Cancel</RaisedButton>
          <RaisedButton label={'Sell'} />
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'inventoryForm'
})(inventoryForm);
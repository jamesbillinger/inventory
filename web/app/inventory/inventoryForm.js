import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Button from 'components/button';
import FormDate from 'components/formDate';
import FormInput from 'components/formInput';
import FormSelect from 'components/formSelect';
import QRCode from 'qrcode.react';


const categoryOptions = ['Firearm', 'Ammo', 'Misc', 'Custom Shop'];

class inventoryForm extends Component {
  submit = (data) => {
    const { actions, closeAction } = this.props;
    if (data._id) {
      actions.updateItem(data, closeAction);
    } else {
      actions.addItem(data, closeAction);
    }
  };

  render() {
    const { handleSubmit, closeAction } = this.props;
    return (
      <div>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', flex: '1 1 auto' }}>
            <Field name="make" component={FormInput} label="Make" />
            <Field name="model" component={FormInput} label="Model" type="phone" />
            <Field name="calibre" component={FormInput} label="Calibre" />
            <Field name="category" component={FormSelect} label="Category" options={categoryOptions} />
            <Field name="purchaseDate" component={FormDate} label="Purchase Date" />
            <Field name="saleDate" component={FormDate} label="Sale Date" />
            <Field name="owner" component={FormInput} label="Owner" />
            <Field name="barcode" component={FormInput} label="Barcode" />
            <Field name="quantity" component={FormInput} label="Quantity" type="number" style={{ width: '100px' }} />
            <Field
              name="lowStock"
              component={FormInput}
              label="Low stock level"
              type="number"
              style={{ width: '120px' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                backgroundColor: '#f2f2f2',
                borderRadius: '6px',
                paddingBottom: '10px',
                marginTop: '10px'
              }}>
              <Field
                name="purchasePrice"
                component={FormInput}
                label="Purchase Price"
                type="currency"
                style={{ width: '120px' }}
              />
              <Field
                name="salePrice"
                component={FormInput}
                label="Sale Price"
                type="currency"
                style={{ width: '120px' }}
              />
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <Button primary={true} onClick={handleSubmit(this.submit)}>
            Submit
          </Button>
          <Button secondary={true} onClick={closeAction}>
            Cancel
          </Button>
          <Button label={'Sell'} onClick={this.sell} />
          <QRCode value={this.props.initialValues._id} />

        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'inventoryForm'
})(inventoryForm);

import React, { Component } from 'react';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import FormDate from 'components/formDate';
import FormInput from 'components/formInput';
import FormSelect from 'components/formSelect';
import Button from 'components/button';
import Totals from './posTotals';
import POSItems from './posItems';
import GridCustomer from 'components/gridCustomer';
import LabelledText from 'components/labelledText';

class SaleForm extends Component {
  state = {};

  submit = (data) => {
    const { actions, closeAction } = this.props;
    if (data._id) {
      actions.updateSale(data, closeAction);
    } else {
      actions.addSale(data, closeAction);
    }
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode ? undefined : 'edit'
    });
  };

  render() {
    const { handleSubmit, closeAction, initialValues } = this.props;
    const { mode } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '400px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: '0 0 auto' }}>
          <Field name="createdAt" component={FormDate} label="Sale Date" labelledTextMode={!mode} />
          <Field name="createdBy" component={FormInput} label="Sold By" labelledTextMode={!mode} />
        </div>
        {mode ? (
          <Field name="customer" component={FormInput} label="Sold To" labelledTextMode={!mode} />
        ) : (
          <LabelledText label={'Customer'}>
            <GridCustomer value={initialValues.customer} />
          </LabelledText>
        )}
        <div
          style={{
            flex: '1 0 auto',
            padding: '5px 10px',
            borderRadius: '6px',
            backgroundColor: '#f9f9f9'
          }}>
          <FieldArray name="items" component={POSItems} labelledTextMode={true} />
        </div>
        <div style={{ flex: '1 0 auto', paddingTop: '10px' }}>
          <Fields names={['items', 'discount', 'total', 'taxRate']} component={Totals} labelledTextMode={true} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          {mode && (
            <Button primary={true} onClick={handleSubmit(this.submit)}>
              Submit
            </Button>
          )}

        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'saleForm'
})(SaleForm);

import React, { Component } from 'react';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import FormDate from 'components/formDate';
import FormInput from 'components/formInput';
import FormSelect from 'components/formSelect';
import Button from 'components/button';

class CustomerForm extends Component {
  state = {
    mode: 'edit'
  };

  submit = (data) => {
    const { actions, closeAction, onSubmit, onAdd } = this.props;
    if (data._id) {
      actions.updateCustomer(data, closeAction);
    } else {
      actions.addCustomer(data, (newCustomer) => {
        if (onAdd) {
          onAdd(newCustomer);
        }
        closeAction();
      });
    }
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode ? undefined : 'edit'
    });
  };

  click = () => {
    const { initialValues } = this.props;
    console.log(initialValues);
  };

  render() {
    const { handleSubmit, closeAction } = this.props;
    const { mode } = this.state;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '200px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', flex: '0 0 auto' }}>
          <Field name="createdAt" component={FormDate} label="Customer Date" labelledTextMode={!mode} />
          <Field name="name" component={FormInput} label="Name" labelledTextMode={!mode} />
          <Field name="phone" component={FormInput} label="Phone" labelledTextMode={!mode} />
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end'
          }}>
          <Button onClick={this.click}>Sales History</Button>
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
          <Button secondary={true} onClick={closeAction}>
            {mode ? 'Cancel' : 'Close'}
          </Button>
        </div>
      </div>
    );
  }
}

export default reduxForm({
  form: 'customerForm'
})(CustomerForm);

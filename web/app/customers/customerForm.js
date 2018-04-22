import React, { Component } from 'react';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import FormDate from 'components/formDate';
import FormInput from 'components/formInput';
import FormSelect from 'components/formSelect';
import Button from 'components/button';

class CustomerForm extends Component {
  state = {};

  submit = (data) => {
    const { actions, closeAction } = this.props;
    if (data._id) {
      actions.updateCustomer(data, closeAction);
    } else {
      actions.addCustomer(data, closeAction);
    }
  };

  toggleMode = () => {
    this.setState({
      mode: this.state.mode ? undefined : 'edit'
    });
  };

  render() {
    const { handleSubmit, closeAction } = this.props;
    const { mode } = this.state;
    return (
      <div style={{display:'flex', flexDirection:'column', minHeight:'400px'}}>
        <div style={{display:'flex', flexWrap:'wrap', flex:'0 0 auto'}} >
          <Field name='createdAt' component={FormDate} label='Customer Date' labelledTextMode={!mode} />
          <Field name='createdBy' component={FormInput} label='Sold By' labelledTextMode={!mode} />
        </div>
        <Field name='customer' component={FormInput} label='Sold To' labelledTextMode={!mode} />
        <div style={{display:'flex', alignItems:'center', justifyContent:'flex-end'}}>
          {mode && <Button primary={true} onClick={handleSubmit(this.submit)}>Submit</Button>}
          <Button secondary={true} onClick={closeAction}>{mode ? 'Cancel' : 'Close'}</Button>
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'customerForm'
})(CustomerForm);
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from 'shared/actions';
import { reduxForm, Field, Fields, FieldArray, SubmissionError } from 'redux-form';
import LabelledText from 'components/labelledText';
import FatButton from 'components/fatButton';
import Icon from 'components/icon';
import FormInput from 'components/formInput';
import FormSelect from 'components/formSelect';
import moment from 'moment';
import Button from 'components/button';

class Payment extends Component {
  render() {
    const { input, remove } = this.props;
    let icon = 'swap_vert';
    let color = 'blue';
    if (input.value.method === 'cash') {
      icon = 'attach_money';
      color = 'green';
    } else if (input.value.method === 'credit') {
      icon = 'credit_card';
      color = 'red';
    }
    return (
      <div style={{display:'flex', alignItems:'center', margin:'5px 0'}}>
        <div style={{flex:'0 0 20px'}}>
          <Icon icon='delete' secondary={true} onClick={remove} style={{fontSize:'18px'}} />
        </div>
        <div style={{flex:'0 0 80px', textAlign:'center'}}>
          <Icon icon={icon} style={{fontSize:'18px', color}} />
          <div style={{textTransform:'capitalize', fontSize:'13px', color}}>{input.value.method}</div>
        </div>
        <Field name={input.name + '.value'} component={FormInput} type='currency' style={{width:'120px'}} />
        {input.value.method === 'cash' &&
          <Field name={input.name + '.notes'} component={FormInput} placeholder='Check Number' />
        }
        {input.value.method === 'trade' &&
          <Field name={input.name + '.notes'} component={FormInput} placeholder='Trade Notes' />
        }
      </div>
    );
  }
}

class PaymentsList extends Component {
  render() {
    const { fields } = this.props;
    return (
      <div>
        {fields.map((f, fi) =>
          <Field key={f} name={f} component={Payment} remove={fields.remove.bind(this, fi)} />
        )}
      </div>
    );
  }
}

class Payments extends Component {
  state = {
    total: 0
  };

  componentDidMount() {
    const { items, taxRate, discount, actions, customers } = this.props;
    this.setState({
      total: parseFloat((((items.input.value || []).reduce((a, b) => {
        return a + parseFloat(b.totalPrice || 0);
      }, 0) - (discount.input.value || 0)) * (1 + taxRate.input.value)).toFixed(2))
    });
    if (!customers) {
      actions.fetchCustomers();
    }
  }

  addPayment(method) {
    const { payments } = this.props;
    const { total } = this.state;
    let paid = (payments.input.value || []).reduce((a, b) => {
      return a + parseFloat(b.value || 0);
    }, 0);
    payments.input.onChange([
      ...(payments.input.value || []).slice(),
      {
        method,
        value: (total - paid).toFixed(2)
      }
    ]);
  };

  submit = (data) => {
    const { actions, onSubmit, user } = this.props;
    console.log(data)
    actions.submitSale(Object.assign({}, data, {
      createdAt: moment().valueOf(),
      updatedAt: moment().valueOf(),
      createdBy: user.uid,
      updatedBy: user.uid
    }), (err, r) => {
      if (err) {
        console.log(err);
        throw new SubmissionError(err);
      } else {
        onSubmit(r);
      }
    });
  };

  render() {
    const { payments, taxRate, items, close, handleSubmit, submitting, customers } = this.props;
    const { total } = this.state;
    let paid = (payments.input.value || []).reduce((a, b) => {
      return a + parseFloat(b.value || 0);
    }, 0);
    let valid = paid === total;
    let customerOptions = (customers || []).map((c) => ({
      value: c._id,
      label: c.name
    }))
    return (
      <div style={{display:'flex', flexDirection:'column', justifyContent:'space-between', height:'80vh', width:'100%'}}>
        <div style={{flex:'0 0 auto', backgroundColor:'#f2f2f2', borderRadius:'6px', padding:'10px', position:'relative', marginTop:'20px'}}>
          <div style={{position:'absolute', top:'-20px', left:'10px', fontSize:'16px', color:'#999', fontWeight:'bold'}}>
            Customer
          </div>
          <Field name='customer' component={FormSelect} options={customerOptions} label='Customer' allowCreate={true} />
        </div>
        <div style={{flex:'0 0 auto', backgroundColor:'#f2f2f2', borderRadius:'6px', padding:'10px', position:'relative'}}>
          <div style={{position:'absolute', top:'-20px', left:'10px', fontSize:'16px', color:'#999', fontWeight:'bold'}}>
            Payment
          </div>
          <div style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
            <FatButton icon='attach_money' color='green' onClick={this.addPayment.bind(this,'cash')} disabled={valid}>
              Cash
            </FatButton>
            <FatButton icon='credit_card' color='red' onClick={this.addPayment.bind(this,'credit')} disabled={valid}>
              Credit
            </FatButton>
            <FatButton icon='swap_vert' color='blue' onClick={this.addPayment.bind(this,'trade')} disabled={valid}>
              Trade
            </FatButton>
          </div>
          <FieldArray name='payments' component={PaymentsList} />
        </div>
        <div style={{flex:'0 0 auto', display:'flex', alignItems:'flex-end', backgroundColor:'#f2f2f2', borderRadius:'6px',
                     justifyContent:'space-evenly', padding:'10px', position:'relative'}}>
          <div style={{position:'absolute', top:'-20px', left:'10px', fontSize:'16px', color:'#999', fontWeight:'bold'}}>
            Totals
          </div>
          <LabelledText label='Total Due'>
            ${total}
          </LabelledText>
          <LabelledText label='Paid'>
            ${paid}
          </LabelledText>
          <LabelledText label='Remaining'>
            <div style={valid ? {} : {color:'red'}}>${(total - paid).toFixed(2)}</div>
          </LabelledText>
        </div>
        <div style={{flex:'0 0 auto', paddingBottom:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FatButton icon='check' color='green' onClick={handleSubmit(this.submit)}
                     disabled={!valid || submitting}>
            Complete
          </FatButton>
          <FatButton icon='close' color='red' onClick={close} disabled={submitting}>
            Close
          </FatButton>
        </div>
      </div>
    )
  }
}
export default connect(
  (state) => ({
    user: state.inventory.user,
    customers: state.inventory.customers
  }), (dispatch) => ({
    actions: bindActionCreators({...InventoryActions}, dispatch)
  })
)(Payments)
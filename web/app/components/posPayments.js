import React, { Component } from 'react';
import { reduxForm, Field, Fields, FieldArray } from 'redux-form';
import LabelledText from './labelledText';
import FatButton from './fatButton';
import Icon from './icon';
import FormInput from './formInput';

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

export default class Payments extends Component {
  state = {
    total: 0
  };

  componentDidMount() {
    const { items, taxRate, discount } = this.props;
    this.setState({
      total: parseFloat((((items.input.value || []).reduce((a, b) => {
        return a + parseFloat(b.totalPrice || 0);
      }, 0) - (discount.input.value || 0)) * (1 + taxRate.input.value)).toFixed(2))
    });
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

  render() {
    const { payments, taxRate, items, close, submit } = this.props;
    const { total } = this.state;
    let paid = (payments.input.value || []).reduce((a, b) => {
      return a + parseFloat(b.value || 0);
    }, 0);
    let valid = paid === total;
    console.log(total, paid);
    return (
      <div style={{display:'flex', flexDirection:'column', height:'80vh', width:'100%'}}>
        <div style={{flex:'0 0 auto'}}>
          Select a Payment Method
        </div>
        <div style={{flex:'0 0 auto', display:'flex', alignItems:'center', justifyContent:'center'}}>
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
        <div style={{flex:'2 1 auto'}}>
          <FieldArray name='payments' component={PaymentsList} />
        </div>
        <div style={{flex:'1 1 auto', display:'flex', alignItems:'center', justifyContent:'space-evenly'}}>
          <LabelledText label='Total Due'>
            ${total}
          </LabelledText>
          <LabelledText label='Paid'>
            ${paid}
          </LabelledText>
          <LabelledText label='Remaining'>
            ${(total - paid).toFixed(2)}
          </LabelledText>
        </div>
        <div style={{flex:'0 0 auto', paddingBottom:'20px', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <FatButton icon='check' color='green' onClick={submit}
                     disabled={!valid}>
            Complete
          </FatButton>
          <FatButton icon='close' color='red' onClick={close}>
            Close
          </FatButton>
        </div>
      </div>
    )
  }
}
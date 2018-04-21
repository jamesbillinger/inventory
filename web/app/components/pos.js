import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, Fields, FieldArray, SubmissionError } from 'redux-form';
import POSSearch from './posSearch';
import LabelledText from './labelledText';
import FatButton from './fatButton';
import Totals from './posTotals';
import Dialog from 'material-ui/Dialog';
import Payments from './posPayments';
import { withRouter } from 'react-router-dom';
import POSItems from './posItems';

class POS extends Component {
  state = {
    pay: false
  };

  clear = () => {
    const { reset } = this.props;
    reset();
  };

  selectItem = (itemID) => {
    if (itemID !== this.state.itemID) {
      this.setState({
        itemID
      });
    } else {
      this.setState({
        itemID: undefined
      });
    }
  };

  pay = () => {
    this.setState({
      pay: !this.state.pay
    });
  };

  onSubmit = (r) => {
    const { reset, history } = this.props;
    this.setState({
      pay: false,
      itemID: undefined
    });
    reset();
    history.push('/sales/' + r._id);
  };

  render() {
    const { pristine, valid, submitting, handleSubmit } = this.props;
    const { itemID, pay } = this.state;
    return (
      <div style={{flex:'0 0 100%', display:'grid',
                   gridTemplateColumns:'1fr auto', gridTemplateRows:'auto 1fr auto', gridGap:'10px'}}>
        <div style={{gridColumn:'1 / 3', gridRow:'1', backgroundColor:'white', borderRadius:'6px', padding:'5px 15px'}}>
          <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}>
            <FieldArray name='items' component={POSSearch} />
            <div style={{display:'flex', alignItems:'center'}}>
              <FatButton icon='clear' secondary={true} disabled={pristine} onClick={this.clear}>Clear</FatButton>
            </div>
          </div>
        </div>
        <div style={{gridColumn:itemID ? '1' : '1 / 3', gridRow:'2', backgroundColor:'white', borderRadius:'6px', padding:'15px'}}>
          <FieldArray name='items' component={POSItems} selectItem={this.selectItem} />
        </div>
        {itemID &&
          <div style={{gridColumn:'2', gridRow:'2', backgroundColor:'white', borderRadius:'6px', padding:'10px 5px'}}>
            <LabelledText label='Make'>{itemID}</LabelledText>
          </div>
        }
        <div style={{gridColumn:'1 / 3', gridRow:'3', backgroundColor:'white', borderRadius:'6px'}}>
          <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', padding:'5px 15px'}}>
            <Fields names={['items','discount','total','taxRate']} component={Totals} />
            <div style={{display:'flex', alignItems:'center'}}>
              <FatButton icon='attach_money' color='green' onClick={this.pay} disabled={pristine || !valid || submitting}>
                Tender
              </FatButton>
            </div>
          </div>
        </div>
        <Dialog open={pay} onRequestClose={this.pay}>
          {pay && <Fields names={['payments', 'taxRate', 'items', 'discount']} component={Payments}
                          onSubmit={this.onSubmit} handleSubmit={handleSubmit} close={this.pay} submitting={submitting} />}
        </Dialog>
      </div>
    )
  }
}
export default withRouter(reduxForm({
  form: 'posForm',
  initialValues: {
    taxRate: 0.105
  }
})(POS))
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from 'shared/actions';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

class Login extends Component {
  click() {
    const { actions } = this.props;
    actions.loginWithGoogle('', (user, err) => {});
  }

  render() {
    const { handleSubmit, pristine, submitting, valid, inventory, actions, history } = this.props;
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
        <Button
          label="Sign in with Google"
          icon={<img src="images/google.svg" height="20px" width="20px" />}
          onClick={::this.click}
          primary={true}
        />
        {/*<div style={{margin:'10px 0', color:'#ddd', fontSize:'13px'}}>
          -- or --
        </div>
        <Link to='/register'><Button label='Register' labelStyle={{color:'#bbb'}} /></Link>*/}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    inventory: state.inventory
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...Actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

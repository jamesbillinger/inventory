import React, { Component } from 'react';
import Modal from 'react-modal';
import Button from 'components/button';

export default class MyModal extends Component {
  render() {
    const {
      closeAction,
      closeText,
      closeIcon = 'cancel',
      submitAction,
      submitText,
      submitIcon = 'checkbox-marked-circle-outline',
      show,
      children,
      overlayStyle,
      contentStyle,
      hideFooter,
      submitDisabled,
      noFocus,
      keyboardFocused,
      ...props
    } = this.props;
    let actions = [];
    if (closeAction) {
      actions.push(
        <Button
          key="close"
          label={closeText || (submitAction ? 'Cancel' : 'Close')}
          secondary={true}
          onClick={closeAction}
          icon={closeIcon}
        />
      );
    }
    if (submitAction) {
      actions.unshift(
        <Button
          key="submit"
          label={submitText || 'Submit'}
          primary={true}
          keyboardFocused={!noFocus}
          onClick={submitAction}
          type="submit"
          disabled={submitDisabled}
          icon={submitIcon}
          style={{ marginRight: '10px' }}
        />
      );
    }
    if (props.actions) {
      actions = props.actions;
    }
    let style = {
      overlay: Object.assign(
        {
          zIndex: '1000',
          backgroundColor: 'rgba(0,0,0,0.2)'
        },
        overlayStyle
      ),
      content: Object.assign(
        {
          display: 'flex',
          flexDirection: 'column',
          top: '5vh',
          right: '5vw',
          bottom: '5vh',
          left: '5vw',
          maxWidth: '1060px',
          background:hideFooter ? 'none' : 'white',
          alignItems:hideFooter ? 'center' : 'stretch',
          justifyContent: hideFooter ? 'center' : 'stretch',
          margin: 'auto'
        },
        contentStyle
      )
    };
    return (
      <Modal isOpen={show || props.open || false} closeAction={closeAction} style={style} {...props}>
        {hideFooter && children}
        {!hideFooter && (
          <div
            style={{
              flex: '1 1 auto',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'auto'
            }}>
            {children}
          </div>
        )}
        {!hideFooter && (
          <div
            style={{
              flex: '0 0 auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end'
            }}>
            {actions}
          </div>
        )}
      </Modal>
    );
  }
}

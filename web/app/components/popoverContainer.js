import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as GlobalActions from 'shared/actions';
import isEqual from 'lodash/isEqual';
import moment from 'moment';
import Menu from '@material-ui/core/Menu';

class Popover extends Component {
  state = {
    open: false
  };

  componentDidMount() {
    this.setState({
      open: true
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { closeAction } = this.props;
    const { open } = this.state;
    if (!open && prevState.open) {
      closeAction();
    }
  }

  close = () => {
    this.setState({
      open: false
    });
  };

  render() {
    const { anchorEl, children, zIndex, closeAction, ...props } = this.props;
    const { open } = this.state;
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={this.close}
        MenuListProps={{ style: { paddingTop: '0', paddingBottom: '0' } }}
        {...props}>
        {children}
      </Menu>
    );
  }
}

class PopoverContainer extends Component {
  constructor() {
    super();
    this.state = {
      popoverOrder: []
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { popovers } = this.props;
    return !isEqual(this.state, nextState) || (nextProps.popovers || []).length !== (popovers || []).length;
  }

  componentWillUpdate(nextProps, nextState) {
    const { popovers } = nextProps;
    const { popoverOrder } = nextState;
    if ((popovers || []).length > (this.props.popovers || []).length) {
      //we must have added one - add it to the top of popoverOrder
      let newP;
      popovers.map((p) => {
        if (!newP || p.key > newP.key) {
          newP = p;
        }
      });
      this.setState({
        popoverOrder: [newP.key, ...popoverOrder.slice()],
        reorderStamp: moment()
      });
    } else if ((popovers || []).length === 0 && popoverOrder.length > 0) {
      this.setState({ popoverOrder: [] });
    }
  }

  childClick(key) {
    const { popoverOrder, reorderStamp } = this.state;
    if (!reorderStamp || moment().diff(reorderStamp, 'seconds') >= 1) {
      let i = popoverOrder.indexOf(key);
      let newPopoverOrder = [];
      if (i > -1) {
        newPopoverOrder = [popoverOrder[i], ...popoverOrder.slice(0, i), ...popoverOrder.slice(i + 1)];
      } else {
        newPopoverOrder = [key, ...popoverOrder.slice()];
      }
      this.setState({ popoverOrder: newPopoverOrder, reorderStamp: undefined });
    }
  }

  close(key) {
    const { actions } = this.props;
    const { popoverOrder } = this.state;
    actions.closePopover(key);
    let i = popoverOrder.indexOf(key);
    if (i > -1) {
      this.setState({
        popoverOrder: [...popoverOrder.slice(0, i), ...popoverOrder.slice(i + 1)]
      });
    }
  }

  render() {
    const { actions, popovers } = this.props;
    const { popoverOrder } = this.state;
    let outerZ = 1000;
    (popovers || []).map((p) => {
      if (p.props.zIndex && p.props.zIndex > 1000) {
        outerZ = p.props.zIndex;
      }
    });
    return (
      <div style={{ display: 'inline-block', position: 'fixed', top: '72px', zIndex: outerZ, height: '0px' }}>
          {(popovers || []).map((p) => {
            let zIndex = 1001 + p.key;
            if (popoverOrder && popoverOrder.length > 0) {
              let i = popoverOrder.indexOf(p.key);
              if (i > -1) {
                zIndex = 1001 + (100 - i);
              }
            }
            if (p.props.anchorEl) {
              let closeAction = p.close || this.close.bind(this, p.key);
              return (
                <Popover
                  zIndex={p.props.zIndex || zIndex}
                  key={p.key}
                  anchorEl={p.props.anchorEl}
                  closeAction={closeAction}
                  getContentAnchorEl={null}
                  {...p.props.popoverProps}>
                  <p.component closeAction={closeAction} {...p.props} />
                </Popover>
              );
            } else {
              return React.createElement(
                p.component,
                Object.assign(
                  {
                    closeAction: p.close || this.close.bind(this, p.key),
                    overlayStyle: {
                      zIndex: p.props.zIndex || zIndex
                    },
                    key: p.key
                  },
                  p.props
                ),
                p.children
              );
            }
          })}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    popovers: state.inventory.popovers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...GlobalActions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PopoverContainer);

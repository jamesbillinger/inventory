/**
 * Created by jamesbillinger on 4/2/17.
 */
import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as Actions from "shared/actions";
import { Field, reduxForm, SubmissionError } from "redux-form";
import FormInput from "components/formInput";
import { required, minLength } from "shared/validators";
import Logo from "components/logo";
import qs from "query-string";
const minLength8 = minLength(8);
import AbsoluteWrapper from "components/absoluteWrapper";

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    this._submit = ::this.submit;
  }

  componentWillUpdate(nextProps, nextState) {
    const { submitting } = nextProps;
    const { error } = nextState;
    if (submitting && !this.props.submitting && error) {
      this.setState({ error: undefined });
    }
  }

  submit(data) {
    const { actions, location, history, inventory } = this.props;
    return new Promise((resolve, revoke) => {
      if (data.password1 !== data.password2) {
        throw new SubmissionError({ password2: "Passwords must match" });
        revoke();
      } else {
        let query = qs.parse(location.search);
        if (query && query.oobCode && query.mode === "resetPassword") {
          actions.applyActionCode(
            undefined,
            query.mode,
            query.oobCode,
            data.password1,
            err => {
              if (err) {
                //throw new SubmissionError({password2: err.message});
                this.setState({ error: err.message });
                revoke();
              } else {
                resolve();
                history.push("/passwordupdated");
              }
            }
          );
        } else if (inventory.user) {
          actions.updateUserPassword(data.password1, (user, err) => {
            if (err) {
              throw new SubmissionError({ password2: err.message });
              revoke();
            } else {
              resolve(user);
              history.push("/passwordupdated");
            }
          });
        } else {
          console.log("no user to update");
          revoke();
        }
      }
    });
  }

  render() {
    const {
      handleSubmit,
      pristine,
      submitting,
      valid,
      inventory,
      actions,
      history
    } = this.props;
    const { error } = this.state;
    let buttonStyle = {
      padding: "16px 32px",
      border: "none",
      borderRadius: "30px",
      color: "white",
      zIndex: "2",
      cursor: "pointer"
    };
    if (pristine || submitting || !valid) {
      buttonStyle.backgroundColor = "#bdbdbd";
      buttonStyle.cursor = "default";
    }
    return (
      <AbsoluteWrapper>
        <form onSubmit={handleSubmit(this._submit)}>
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div
              style={{
                height: "20px",
                width: "100%",
                maxWidth: "600px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "20px"
              }}
            >
              <Logo text="Password" />
            </div>
          </div>
          <div>
            <Field
              component={FormInput}
              name="password1"
              label="New Password"
              type="password"
              validate={[required, minLength8]}
              style={{ width: "300px" }}
              autoFocus={true}
            />
            <Field
              component={FormInput}
              name="password2"
              label="Reenter Password"
              type="password"
              validate={[required, minLength8]}
              style={{ width: "300px" }}
            />
          </div>
          {error && (
            <div
              style={{
                color: "red",
                margin: "10px",
                maxWidth: "256px",
                fontSize: "14px"
              }}
            >
              {error}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "22px 10px 0px 10px",
              alignItems: "center"
            }}
          >
            <div
              onClick={
                !pristine && !submitting && valid && handleSubmit(this._submit)
              }
              className="dashboardButton"
              style={buttonStyle}
            >
              Submit
            </div>
            <button
              style={{
                height: "0px",
                width: "0px",
                position: "absolute",
                outline: "none",
                border: "none",
                background: "none"
              }}
              type="submit"
              disabled={pristine || submitting || !valid}
            />
          </div>
        </form>
      </AbsoluteWrapper>
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

export default reduxForm({
  // a unique name for the form
  form: "ResetPasswordForm"
})(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(ResetPassword)
);

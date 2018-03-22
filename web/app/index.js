import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import materialTheme from './materialTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import 'public/styles/theme.css';
import configureStore from 'shared/store';
import Wrapper from './components/wrapper';

const store = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(materialTheme)}>
          <Wrapper />
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
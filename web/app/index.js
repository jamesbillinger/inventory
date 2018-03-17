import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import materialTheme from './materialTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Main from 'components/main';
import TopMenu from 'components/topMenu';
import LeftMenu from 'components/leftMenu';
import 'public/styles/theme.css';
import configureStore from 'shared/store';

const store  = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(materialTheme)}>
          <BrowserRouter>
            <div style={{height:'100%', width:'100%', display:'grid', gridTemplateColumns:'200px 1fr', gridTemplateRows:'64px 1fr'}}>
              <TopMenu />
              <LeftMenu />
              <Main />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
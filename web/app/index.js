import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter, Link, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import materialTheme from './materialTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MiddleMiddle from 'components/middleMiddle';
import TopRight from 'components/topRight';
import LeftTop from 'components/leftTop';
import BottomMiddle from 'components/bottomMiddle';
import BottomRight from 'components/bottomRight';
import LeftBottom from 'components/leftBottom';
import MiddleRight from 'components/middleRight';
import MiddleTop from 'components/middleTop';
import LeftMiddle from 'components/leftMiddle';
import 'public/styles/theme.css';
import configureStore from 'shared/store';

const store  = configureStore({});

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme(materialTheme)}>
          <BrowserRouter>
            <div style={{height:'100%', width:'100%', display:'grid', gridTemplateColumns:'300px 1fr', gridTemplateRows:'64px 1fr'}}>
              <BottomMiddle />
                <BottomRight />
              <LeftBottom />
                <LeftMiddle />
                <MiddleMiddle />
                <MiddleRight />
                <MiddleTop />
                <TopRight />
                <LeftTop />
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
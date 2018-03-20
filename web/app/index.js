import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter, Link, Redirect, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
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

const store = configureStore({});

class App extends Component {
  render() {
    return <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(materialTheme)}>
        <BrowserRouter>
          <div
            style={{
              height: '50%',
              width: '50%',
              display: 'grid',
              gridAutoColumns: '',
              gridAutoRows: ''
            }}>
            <LeftTop/> //put this and the next two lines in order to allow highlighting without being weird
            <MiddleTop/>
            <TopRight/>
            <BottomMiddle/>
            <BottomRight/>
            <LeftBottom/>
            <LeftMiddle/>
            <MiddleMiddle/>
            <MiddleRight/>


          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </Provider>;
  }
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
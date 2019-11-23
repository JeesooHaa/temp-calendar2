import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import Routes from './Routes.js'

import rootReducer from './src/reducers'

import { Provider } from 'react-redux'
import { createStore } from 'redux'

const store = createStore(rootReducer)

class reactTutorialApp extends Component {
   render() {
      return (
         <Provider store={store} >
            <Routes />
         </Provider>
      )
   }
}
export default reactTutorialApp
AppRegistry.registerComponent('reactTutorialApp', () => reactTutorialApp)
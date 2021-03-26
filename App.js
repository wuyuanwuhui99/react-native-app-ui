import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import React, {Component} from 'react';
import {Provider} from "react-redux";
import Store from "./src/store";
//https://oblador.github.io/react-native-vector-icons/ 图标网址
import AppRouter from "./src/router";

const AppCreateNavigator = createAppContainer(
  createSwitchNavigator(
    {
      AppRouter: AppRouter,
    },
    {
      initialRouteName: 'AppRouter',
    },
  ),
);

const store = Store()    

export default class App extends Component {
  render() {
      return (
          <Provider store={store}>
              <AppCreateNavigator />
          </Provider>
      );
  }
}
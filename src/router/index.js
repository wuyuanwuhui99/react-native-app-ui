import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MovieHomePage from '../pages/MovieHomePage';
import MoviePage from '../pages/MoviePage';
import MovieVideoPage from '../pages/MovieVideoPage';
import MovieSearchPage from '../pages/MovieSearchPage';
import DetailPage from "../pages/MovieDetaiPage";
import MovieUserPage from "../pages/MovieUserPage";
// import SearchPage from "../pages/SearchPage";
import MoviePlayerPage from "../pages/MoviePlayerPage";
import MovieLoginPage from "../pages/MovieLoginPage";
import MovieEditPage from "../pages/MovieEditPage";
import NewMoviePage from "../pages/NewMoviePage";
const BottomTab = createAppContainer(
    createBottomTabNavigator(
      {
        /*Page1路由*/
        MovieHomePage: {
          /*Page1页面*/
          screen: MovieHomePage,
          /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
          navigationOptions: {
            /*导航标签名*/
            tabBarLabel: '首页',
            /*导航呈现的图标*/
            tabBarIcon: ({tintColor, focused}) => (
              /*第三方图标库（图标名称，图标大小，图标样式*/
              <MaterialIcons name={'home'} size={26} style={{color: tintColor}} />
            ),
          },
        },
        MoviePage: {
          screen: MoviePage,
          navigationOptions: {
            tabBarLabel: '电影',
            tabBarIcon: ({tintColor, focused}) => (
              <MaterialIcons
                name={'movie'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        MovieVideoPage: {
          screen: MovieVideoPage,
          navigationOptions: {
            tabBarLabel: '电视剧',
            tabBarIcon: ({tintColor, focused}) => (
              <MaterialIcons
                name={'ondemand-video'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
        MovieSearchPage: {
          screen: MovieSearchPage,
          navigationOptions: {
            tabBarLabel: '我的',
            tabBarIcon: ({tintColor, focused}) => (
              <MaterialIcons
                name={'person'}
                size={26}
                style={{color: tintColor}}
              />
            ),
          },
        },
      },
      {
        tabBarOptions: {
          /*设置活动选项卡标签的颜色*/
          activeTintColor: Platform.OS === 'ios' ? '#ffbb15' : '#ffbb15',
        },
      },
    ),
  );

  const AppRouter = createStackNavigator({
    Home: {
      screen: BottomTab,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    MovieUserPage:{
      screen: MovieUserPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    DetailPage:{
      screen: DetailPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    // SearchPage:{
    //   screen: SearchPage,
    //   navigationOptions: {
    //     headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
    //   },
    // },
    PlayPage:{
      screen: MoviePlayerPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    MovieLoginPage:{
      screen: MovieLoginPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    MovieEditPage:{
      screen: MovieEditPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    NewMoviePage:{
      screen: NewMoviePage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    }
  });

  export default AppRouter

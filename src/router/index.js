import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Platform} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HomePage from '../pages/HomePage';
import MoviePage from '../pages/MoviePage';
import VideoPage from '../pages/VideoPage';
import MyPage from '../pages/MyPage';
import DetailPage from "../pages/DetaiPage";
import UserPage from "../pages/UserPage";
import SearchPage from "../pages/SearchPage";
import PlayerPage from "../pages/PlayerPage";
import LoginPage from "../pages/LoginPage";

const BottomTab = createAppContainer(
    createBottomTabNavigator(
      {
        /*Page1路由*/
        HomePage: {
          /*Page1页面*/
          screen: HomePage,
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
        VideoPage: {
          screen: VideoPage,
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
        MyPage: {
          screen: MyPage,
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
    UserPage:{
      screen: UserPage,
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
    SearchPage:{
      screen: SearchPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    PlayPage:{
      screen: PlayerPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
    LoginPage:{
      screen: LoginPage,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
  });

  export default AppRouter

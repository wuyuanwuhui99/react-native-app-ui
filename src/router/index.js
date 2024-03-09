import React from 'react';
import {createStackNavigator,} from 'react-navigation-stack';
import {StyleSheet,Image} from "react-native";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MovieHomePage from '../movie/pages/MovieHomePage';
import MoviePage from '../movie/pages/MoviePage';
import MovieMyPage from '../movie/pages/MovieMyPage';
import MovieVideoPage from '../movie/pages/MovieVideoPage';
import MovieSearchPage from '../movie/pages/MovieSearchPage';
import DetailPage from "../movie/pages/MovieDetaiPage";
import MovieUserPage from "../movie/pages/MovieUserPage";
import MoviePlayerPage from "../movie/pages/MoviePlayerPage";
import MovieRegisterPage from "../movie/pages/MovieRegisterPage";
import MovieLoginPage from "../movie/pages/MovieLoginPage";
import MovieEditPage from "../movie/pages/MovieEditPage";
import NewMoviePage from "../movie/pages/NewMoviePage";
import * as color from '../theme/Color';
import MusicCirclePage from "../music/pages/MusicCirclePage";
import MusicHomePage from "../music/pages/MusicHomePage";
import MusicMyPage from "../music/pages/MusicMyPage";
import MusicRecommendPage from "../music/pages/MusicRecommendPage";
import * as size from '../theme/Size';
import * as style from '../theme/Style';

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
        MovieMyPage: {
          screen: MovieMyPage,
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
          activeTintColor:color.selectColor,
        },
      },
    ),
  );

  const MusicBottomTab = createAppContainer(
      createBottomTabNavigator(
          {
            /*Page1路由*/
            MusicHomePage: {
              /*Page1页面*/
              screen: MusicHomePage,
              /*屏幕导航选项,可以定制导航器显示屏幕的方式（头部标题，选项卡标签等）*/
              navigationOptions: {
                /*导航标签名*/
                tabBarLabel: '首页',
                /*导航呈现的图标*/
                tabBarIcon: ({tintColor, focused}) => (
                    <Image source={require("../static/image/icon_home.png")} style={{...styles.tabIcon,tintColor:tintColor}}/>
                ),
              },
            },
            MusicRecommentPage: {
              screen: MusicRecommendPage,
              navigationOptions: {
                tabBarLabel: '推荐',
                tabBarIcon: ({tintColor, focused}) => (
                    <Image source={require("../static/image/icon_recomment.png")} style={{...styles.tabIcon,tintColor:tintColor}}/>
                ),
              },
            },
            MusicCirclePage: {
              screen: MusicCirclePage,
              navigationOptions: {
                tabBarLabel: '音乐圈',
                tabBarIcon: ({tintColor, focused}) => (
                    <Image source={require("../static/image/icon_music_circle.png")} style={{...styles.tabIcon,tintColor:tintColor}}/>
                ),
              },
            },
            MusicMyPage: {
              screen: MusicMyPage,
              navigationOptions: {
                tabBarLabel: '我的',
                tabBarIcon: ({tintColor, focused}) => (
                    <Image source={require("../static/image/icon_user.png")} style={{...styles.tabIcon,tintColor:tintColor}}/>
                ),
              },
            },
          },
          {
            tabBarOptions: {
              /*设置活动选项卡标签的颜色*/
              activeTintColor:color.selectColor,
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
    MovieSearchPage:{
      screen: MovieSearchPage,
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
    MoviePlayPage:{
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
    MovieRegisterPage:{
      screen: MovieRegisterPage,
      navigationOptions: {
        headerShown: false,
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
    },
    MusicHome:{
      screen: MusicBottomTab,
      navigationOptions: {
        headerShown: false, //可以通过将header设为null来禁用StackNavigator的Navigation
      },
    },
  });

export default AppRouter

const styles = StyleSheet.create({
  tabIcon:{
    width:size.middleIconSize,
    height:size.middleIconSize
  }

});




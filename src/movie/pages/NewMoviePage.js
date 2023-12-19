import React, {Component} from 'react';
import {StyleSheet,View,ScrollView} from "react-native";
import MovieRecommendComponent from '../components/MovieRecommendComponent';

export default class  NewMoviePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView>
                <View>
                    <MovieRecommendComponent classify={'电影'} direction={'vertical'} title={'电影'}/>
                    <MovieRecommendComponent classify={'电视剧'} direction={'vertical'} title={'电视剧'}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        flex:1
    }
});

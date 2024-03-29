import React, {Component} from 'react';
import {StyleSheet,View,ScrollView} from "react-native";
import RecommendComponent from '../components/RecommendComponent';
import * as style from '../../theme/Style';

export default class  NewMoviePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ScrollView style={styles.wrapper}>
                <View>
                    <RecommendComponent classify={'电影'} direction={'vertical'} title={'电影'}/>
                    <RecommendComponent classify={'电视剧'} direction={'vertical'} title={'电视剧'}/>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        flex:1,
        ...style.pageStyle
    }
});

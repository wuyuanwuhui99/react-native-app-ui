import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList,} from 'react-native';
import {connect} from 'react-redux';
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';

class  MusicRecommendPage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    initData=()=>{

    };

    render() {
        return (
          <Text>推荐</Text>
        );
    }
}

export default  connect((state)=>{
    return {}
})(MusicRecommendPage);

const styles = StyleSheet.create({

});

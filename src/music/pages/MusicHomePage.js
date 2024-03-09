import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList,} from 'react-native';
import {connect} from 'react-redux';
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';

class  MusicHomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    initData=()=>{

    };

    render() {
        return (
          <Text>首页</Text>
        );
    }
}

export default  connect((state)=>{
    return {}
})(MusicHomePage);

const styles = StyleSheet.create({

});

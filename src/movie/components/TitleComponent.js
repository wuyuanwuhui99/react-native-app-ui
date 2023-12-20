import React, {Component} from 'react';
import {StyleSheet,View,Text} from "react-native";
import PropTypes from 'prop-types'
import * as size from '../../theme/Size';
import * as color from '../../theme/Color';
export default class  TitleComponent extends Component {
    constructor(props){
        super(props);
    }

    //类型检测方法一
    static propTypes={
        title:PropTypes.string,
    };

    //设置默认属性方法一
    static defaultProps={
        categoryList:[],
    };


    render(){
        let {title} = this.props;
        return (
            <View style={styles.titleWrapper}>
                <View style={styles.line}/>
                <Text style={styles.title}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleWrapper:{
        display:"flex",
        alignItems:"center",
        flexDirection:'row',
    },
    line:{
        width:4,
        height:18,
        backgroundColor:color.activeColor
    },
    title:{
        fontSize:size.smallFontSize,
        marginLeft:size.miniMarginSize
    }
});

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Image, StyleSheet,TouchableOpacity} from 'react-native';
import {HOST} from '../../config';
import PropTypes from 'prop-types';
import {middleAvaterSize, superRadiusSize} from '../../theme/Size';

class  AvaterComponent extends Component {
    constructor(props){
        super(props);
    }

    //类型检测方法一
    static propTypes={
        style:PropTypes.object,
    };

    //设置默认属性方法一
    static defaultProps={
        style:{},
    };

    render(){
        let {avater} = this.props.userData;
        return (
            <TouchableOpacity onPress={this.goUserPage}>
                <Image roundAsCircle={true} style={[styles.imageStyle,this.props.style]} source={avater ? {uri:HOST+avater} : require('../../static/image/default_avater.png')}/>
            </TouchableOpacity>)
    }

    goUserPage=()=>{
        this.props.navigation.push('MovieUserPage');
    }
}


export default  connect((state)=>{
    let {userData} = state;
    return {userData}
})(AvaterComponent);

const styles = StyleSheet.create({
    imageStyle: {
        width: middleAvaterSize,
        height: middleAvaterSize,
        borderRadius:superRadiusSize,
        // 显示模式：缩略全显contain，拉升全显（会变形）stretch，裁剪后显示（默认）cover
        resizeMode:'cover',
    },
})

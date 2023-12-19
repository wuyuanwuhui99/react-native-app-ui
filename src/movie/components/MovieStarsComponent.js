import React, {Component} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import PropTypes from 'prop-types';

export default class  MovieStarsComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:""
        }
    }

    //类型检测方法一
    static propTypes={
        classify:PropTypes.string,
    }

    //设置默认属性方法一
    static defaultProps={
        score:null
    }

    render(){
        let {score} = this.props;
        if(!score)return null;
        let count = parseFloat(score)/2;//3.8
        let integer = Math.floor(count)
        let result = []
        let index = 0;
        for(let i = 0; i < integer; i++){//实心星星
            result.push(<Image  key={'start'+index++} style={styles.star} source={require("../../static/image/icon-full-star.png")}/>)
        }
        if(Math.round(count) - Math.floor(count*10/5)/2 == 0.5){//半个星星
            result.push(<Image  key={'start'+index++} style={styles.star} source={require("../../static/image/icon-half-star.png")}/>)
        }
        let leftover = 5-result.length
        for(let i = 0; i < leftover; i++){//空心星星
            result.push(<Image key={'start'+index++} style={styles.star} source={require("../../static/image/icon-empty-star.png")}/>)
        }
        return (
            <View style={styles.starBox}>
                {result}
                <Text style={styles.score}>{score}</Text>
            </View>
        )
    }

}


const styles = StyleSheet.create({
    starBox:{
        flexDirection:"row",
        marginTop:10,
        alignItems:"center",
    },
    star:{
        width:15,
        height:15,
        marginRight:5
    },
    score:{
        fontSize:16,
        color:"red",
        textAlignVertical:"center"
    },
})

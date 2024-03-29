import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,TouchableOpacity} from "react-native";
import {boxDecoration} from '../../theme/Style';
import {bigIconSize,smallMarginSize} from '../../theme/Size';

export default class  ClassifyComponent extends Component {
    constructor(props){
        super(props);
    }

    goNewMoviePage=()=>{
        this.props.navigation.push('NewMoviePage');
    };

    render(){
        return (
            <View style={styles.classifyWrapper}>
                <TouchableOpacity style={styles.classifyItem}>
                    <View style={styles.classifyBox}>
                        <Image style={styles.classifyImage} source={require("../../static/image/icon_hot.png")}/>
                        <Text>热门</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.classifyItem}>
                    <View style={styles.classifyBox}>
                        <Image style={styles.classifyImage} source={require("../../static/image/icon_play.png")}/>
                        <Text>预告</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.classifyItem} onPress={this.goNewMoviePage}>
                    <View style={styles.classifyBox}>
                        <Image style={styles.classifyImage} source={require("../../static/image/icon_top.png")}/>
                        <Text>最新</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.classifyItem}>
                    <View style={styles.classifyBox}>
                        <Image style={styles.classifyImage} source={require("../../static/image/icon_classify.png")}/>
                        <Text>分类</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    classifyWrapper:{
        ...boxDecoration,
        flexDirection:"row"
    },
    classifyBox:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center"
    },
    classifyItem:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    },
    classifyImage:{
        width:bigIconSize,
        height:bigIconSize,
        marginBottom:smallMarginSize
    }
});

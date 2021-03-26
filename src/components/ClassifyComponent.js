import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,TouchableOpacity} from "react-native";
export default class  ClassifyComponent extends Component {

    render(){
        return (
            <View style={styles.classifyWrapper}>
                <View style={styles.classifyItem}>
                    <TouchableOpacity>
                        <Image style={styles.classifyImage} source={require("../static/image/icon-hot.png")}></Image>
                        <Text>热门</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.classifyItem}>
                    <TouchableOpacity>
                        <Image style={styles.classifyImage} source={require("../static/image/icon-play.png")}></Image>
                        <Text>预告</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.classifyItem}>
                    <TouchableOpacity>
                        <Image style={styles.classifyImage} source={require("../static/image/icon-top.png")}></Image>
                        <Text>榜单</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.classifyItem}>
                    <TouchableOpacity>
                        <Image style={styles.classifyImage} source={require("../static/image/icon-classify.png")}></Image>
                        <Text>分类</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    classifyWrapper:{
        margin:20,
        flexDirection:"row"
    },
    classifyItem:{
        flex:1,
        alignItems:"center"
    },
    classifyImage:{
        width:50,
        height:50,
        marginBottom:10
    }
   
})
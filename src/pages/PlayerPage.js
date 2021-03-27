import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,FlatList,Dimensions} from "react-native";
import {connect} from "react-redux";
import {HOST} from "../config";
import { WebView } from 'react-native-webview';
class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList:[]
        }
    }

    render(){
        let {recommendList} = this.state;
        return(
            <ScrollView>
                <View style={styles.webView}>
                    <WebView source={{uri: "https://jiexi.bm6ig.cn/?url=http://bili.meijuzuida.com/20191012/21631_c953019f/index.m3u8"}} style={styles.playWrapper}></WebView>
                </View>
                <View style={styles.iconWrapper}>
                    <Image style={styles.iconComment} source={require("../static/image/icon-comment.png")}></Image>
                    <Text>111</Text>
                    <View style={styles.rightIcon}>
                        <Image source={require("../static/image/icon-share.png")} style={styles.iconComment}></Image>
                        <Image source={require("../static/image/icon-collection.png")} style={styles.iconComment}></Image>
                    </View>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>少年叶问之危机时刻</Text>
                    <View style={styles.subTitleWrapper}>
                        <Text style={styles.score}>9.0分</Text>
                        <Text style={styles.subTitle} numberOfLines={1}>赵文浩 / 牟凤彬 / 李浩轩 / 邵夏 / 石雨晴 / 佟小虎 / 西尔扎提 / 董崇华 / 张磊 / 许睿晗 / 曹操</Text>
                    </View>
                </View>
                <View style={styles.playNumberWrapper}>
                    <Text style={styles.title}>剧集</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.seriesWrapperActive}>
                            <Text style={styles.seriesText}>1</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>4</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>5</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>6</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>7</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>8</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>9</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>10</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>11</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>推荐</Text>
                    <FlatList
                        horizontal={true}
                        data ={recommendList}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem = {
                            ({item,index}) => this._renderItem(item,index)
                        }
                    >
                    </FlatList>

                </View>
            </ScrollView>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <View style={styles.recommondItem}>
                <Image style={styles.recommondImg} source={{uri:item.local_img?`${HOST}/movie/images/qishi/${item.local_img}`:item.img}}></Image>
                <Text numberOfLines={1}>{item.name}</Text>
            </View>
        )
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
      }
})(PlayerPage);

const styles = StyleSheet.create({
    webView:{
        height:Dimensions.get("window").width*9/16,
    },
    playWrapper:{
        position:"relative"
    },
    arrow:{
        position:"absolute",
        zIndex:1,
        width:30,
        height:30,
        left:20,
        top:20
    },
    iconWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        height:80,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:20,
        paddingRight:20
    },
    iconComment:{
       width:30,
       height:30,
       marginRight:10
    },
    rightIcon:{
        flexDirection:"row-reverse",
        flex:1
    },
    titleWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        padding:20,
    },
    title:{
        fontSize:20,
        marginBottom:10,
        fontWeight:"bold"
    },
    subTitleWrapper:{
        flexDirection:"row"
    },
    score:{
        fontWeight:"bold",
        color:"red",
        marginRight:10
    },
    subTitle:{
        flex:1,
        color:"#bbb",
    },
    playNumberWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        padding:20,
    },
    seriesWrapper:{
        width:80,
        height:80,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#bbb",
        marginRight:20
    },
    seriesWrapperActive:{
        width:80,
        height:80,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#ffbb15",
        marginRight:20
    },
    seriesText:{
        color:"#ffbb15",
    },
    rowWrapper:{
        flexDirection:"row",
        justifyContent:"center"
    },
    recommondItem:{
        width:150,
        marginRight:20
    },
    recommondImg:{
        width:150,
        height:200,
        borderRadius:10,
        marginBottom:10
    }
})

import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,FlatList,TouchableOpacity} from "react-native";
import {HOST} from "../config";
import {getHistoryService,getUserMsgService} from "../service"
import {connect} from "react-redux";
import arrow from "../static/image/icon-arrow.png"
class  MyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyList:[],
            userMsg:{}
        }
    }

    componentDidMount(){
        let {userId} = this.props.userData;
        getHistoryService(userId).then((res)=>{
            this.setState({historyList:res.data});
        });
        getUserMsgService(userId).then((res)=>{
            this.setState({userMsg:res.data});
        })
    }

    _renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={"TouchableOpacity" + index}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:item.local_img ? HOST+item.local_img : item.img}}></Image>
                    <Text numberOfLines={1} style={styles.movieName}>{item.movieName}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        let {historyList,userMsg} = this.state;
        let {userData={}} = this.props;
        let {avater,username} = userData
        let {userAge=0,recordCount=0,playCount=0,favoriteCount=0} = userMsg
        return(
            <View style={styles.wrapper}>
                <View style={styles.avaterWrapper}>
                    {avater ? <Image roundAsCircle={true} style={styles.avaterImage} source={{uri:HOST+avater}}></Image>:null}
                    <Text style={styles.username}>{username}</Text>
                    <View style={styles.myLabelWrapper}>
                        <View style={styles.myLabel}>
                            <Text style={styles.myLabelValue}>{userAge}</Text>
                            <Text style={styles.myLabelTitle}>使用天数</Text>
                        </View>
                        <View style={styles.myLabel}>
                            <Text style={styles.myLabelValue}>{favoriteCount}</Text>
                            <Text style={styles.myLabelTitle}>关注</Text>
                        </View>
                        <View style={styles.myLabel}>
                            <Text style={styles.myLabelValue}>{playCount}</Text>
                            <Text style={styles.myLabelTitle}>观看记录</Text>
                        </View>
                        <View style={{...styles.myLabel,borderRightWidth:0}}>
                            <Text style={styles.myLabelValue}>{recordCount}</Text>
                            <Text style={styles.myLabelTitle}>历史浏览</Text>
                        </View>
                    </View>
                </View>
                <ScrollView style={styles.scrollView}>
                    <View style={styles.historyWrapper}>
                        <View style={styles.headerWrapper}>
                            <Image style={styles.historyIcon} source={require("../static/image/icon-history.png")}></Image>
                            <Text>观看记录</Text>
                        </View>
                        <FlatList
                            horizontal={true}
                            data ={historyList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem = {
                                ({item,index}) => this._renderItem(item,index)
                            }
                        ></FlatList>
                    </View>
                    <View style={styles.panelWrapper}>
                        <View style={styles.panelBox}>
                            <Image style={styles.panelIcon} source={require("../static/image/icon-collection.png")}></Image>
                            <Text>我的收藏</Text>
                            <Image style={styles.arrowIcon} source={arrow}></Image>
                        </View>
                        <View style={styles.panelBox}>
                            <Image style={styles.panelIcon} source={require("../static/image/icon-record.png")}></Image>
                            <Text>我浏览过的电影</Text>
                            <Image style={styles.arrowIcon} source={arrow}></Image>
                        </View>
                        <View style={styles.panelBox}>
                            <Image style={styles.panelIcon} source={require("../static/image/icon-talk.png")}></Image>
                            <Text>电影圈</Text>
                            <Image style={styles.arrowIcon} source={arrow}></Image>
                        </View>
                    </View>

                    <View style={styles.panelWrapper}>
                        <View style={styles.panelBox}>
                            <Image style={styles.panelIcon} source={require("../static/image/icon-music.png")}></Image>
                            <Text>音乐</Text>
                            <Image style={styles.arrowIcon} source={arrow}></Image>
                        </View>
                        <View style={styles.panelBox}>
                            <Image style={styles.panelIcon} source={require("../static/image/icon-app.png")}></Image>
                            <Text>小程序</Text>
                            <Image style={styles.arrowIcon} source={arrow}></Image>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
      }
})(MyPage);

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    avaterWrapper:{
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#fff"
    },
    avaterImage:{
        width:120,
        height:120,
        marginTop:20,
        marginBottom:20,
        borderRadius:120,
        borderStyle:"solid",
        borderColor:"#eee",
        borderWidth:5
    },
    username:{
        marginBottom:20,
        fontSize:18
    },
    myLabelWrapper:{
        flexDirection:"row",
        marginBottom:20
    },
    myLabel:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        borderRightWidth:1,
        borderRightColor:"#ddd"
    },
    myLabelValue:{
        fontSize:25,
        marginBottom:10
    },
    myLabelTitle:{
        color:"#bbb"
    },
    scrollView:{
        flex:1,
        backgroundColor:"#eee",
    },
    historyWrapper:{
        margin:20
    },
    headerWrapper:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:10
    },
    historyIcon:{
        width:25,
        height:25,
        marginRight:10
    },
    categoryView:{
        marginRight:10
    },
    categoryImage:{
        width:150,
        height:200,
        borderRadius:10
    },
    movieName:{
        marginTop:10
    },
    categoryList:{
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    panelWrapper:{
        backgroundColor:"#fff",
        marginBottom:20
    },
    panelBox:{
        flexDirection:"row",
        position:"relative",
        alignItems:"center",
        padding:20,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    },
    arrowIcon:{
        width:20,
        height:20,
        position:"absolute",
        right:20
    },
    panelIcon:{
        width:25,
        height:25,
        marginRight:10
    }
});

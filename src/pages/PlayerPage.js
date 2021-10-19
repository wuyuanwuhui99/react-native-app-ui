import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,FlatList,Dimensions,TouchableOpacity} from "react-native";
import {connect} from "react-redux";
import {HOST} from "../config";
import { WebView } from 'react-native-webview';
import {
    getMovieUrlService,
    getYourLikesService,
    saveFavoriteService,
    isFavoriteService,
    deleteFavoriteeService,
    savePlayRecordService
} from "../service";
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import YourLikesComponent from "../components/YourLikesComponent";

class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourLikesList:[],//猜你喜欢的电影
            recommendList:[],//推荐的电影
            movieUrl:[],//二维数组，分组电影列表
            currentUrl:null,//当前播放的url
            isFavoriteStatus:false,//是否已经收藏
            currentPlayGroup:0
        }
    }

    componentWillMount() {
        this.getMovieUrl();
        this.isFavorite();
        savePlayRecordService(this.props.navigation.state.params);
    }

    getMovieUrl=()=>{
        let {movieId} = this.props.navigation.state.params;
        getMovieUrlService(movieId).then((res)=>{
            let movieUrl = [],currentUrl=null;
            res.data.forEach((item)=>{//分组
                let {playGroup} = item;
                if(!movieUrl[playGroup-1]) movieUrl[playGroup-1] = [];
                movieUrl[playGroup-1].push(item);
            });
            if(movieUrl.length > 0) currentUrl = movieUrl[0][0].url
            this.setState({movieUrl,currentUrl})
        });
    };


    //查询是否已经收藏
    saveFavorite=()=>{
        saveFavoriteService(this.props.navigation.state.params).then((res)=>{
            if(res.data == 1){
                this.setState({isFavoriteStatus:true});
            }
        })
    };


    /**
     * @author: wuwenqiang
     * @description: 添加收藏和取消收藏
     * @date: 2020-8-16 22:29
     */
    handleFavorite=()=>{
        if(this.state.isFavoriteStatus){//已经收藏过，点击之后取消收藏
            this.deleteFavorite()
        }else{//如果没有收藏过，点击之后添加收藏
            this.saveFavorite()
        }
    };

    //查询是否已经收藏
    deleteFavorite=()=>{
        let {movieId} = this.props.navigation.state.params;
        deleteFavoriteeService(movieId).then((res)=>{
            if(res.data >= 1){
                this.setState({isFavoriteStatus:false});
            }
        })
    };

    //查询是否已经收藏
    isFavorite=()=>{
        let {movieId} = this.props.navigation.state.params;
        isFavoriteService(movieId).then((res)=>{
            this.setState({isFavoriteStatus:res.data > 0 ? true :false})
        })
    };

    tabMovie=({url})=>{
        this.setState({currentUrl:url});
    };

    tabGroup =(index)=>{
        this.setState({currentPlayGroup:index});
    };

    render(){
        let {yourLikesList,currentUrl,movieUrl,isFavoriteStatus,currentPlayGroup} = this.state;
        let {movieName,score,star,classify,label} = this.props.navigation.state.params;
        return(
            <ScrollView>
                <View style={styles.webView}>
                    {currentUrl ? <WebView source={{uri:currentUrl}} style={styles.playWrapper}></WebView> : null}
                </View>
                <View style={styles.iconWrapper}>
                    <Image style={styles.iconComment} source={require("../static/image/icon-comment.png")}></Image>
                    <Text>0</Text>
                    <View style={styles.rightIcon}>
                        <Image source={require("../static/image/icon-share.png")} style={styles.iconComment}></Image>
                        <TouchableOpacity onPress={this.handleFavorite}>
                            <Image source={isFavoriteStatus ? require("../static/image/icon-collection-active.png") : require("../static/image/icon-collection.png")} style={styles.iconComment}></Image>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{movieName}</Text>
                    <View style={styles.subTitleWrapper}>
                        <Text style={styles.subTitle} numberOfLines={1}>{star}</Text>
                        <StarsComponent score={score}></StarsComponent>
                    </View>
                </View>
                <View style={styles.playNumberWrapper}>
                    {/*<Text style={styles.title}>剧集</Text>*/}
                    <View  style={styles.playGroup}>
                        {
                            movieUrl.map((items,aIndex)=>{
                                return (
                                    <TouchableOpacity key={'playGroupItem'+aIndex} onPress={e=>this.tabGroup(aIndex)}>
                                        <Text style={[styles.playGroupItem,currentPlayGroup == aIndex ? styles.playGroupActive: null]}>播放源{aIndex+1}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                        <View style={styles.emptyTab}></View>
                    </View>
                    {
                        movieUrl.map((items,aIndex)=>{
                            return (
                                currentPlayGroup == aIndex ?
                                    <ScrollView horizontal={true} key={'ScrollView'+aIndex}>
                                        {
                                            items.map((item, index) => {
                                                return (
                                                    <TouchableOpacity onPress={e => this.tabMovie(item)} key={'seriesText' + aIndex + index}>
                                                        <View style={{...styles.seriesWrapper, borderColor: currentUrl == item.url ? "#ffbb15" : "#333"}}>
                                                            <Text style={currentUrl == item.url ? styles.seriesTextActive : styles.seriesText}>{item.label}</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                 :null
                            )
                        })
                    }
                </View>
                <YourLikesComponent {...this.props} label={label}></YourLikesComponent>
                <RecommendComponent {...this.props} classify={classify}/>
            </ScrollView>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <View key={"recommondImg"+index} style={styles.recommondItem}>
                <Image style={styles.recommondImg} source={{uri:item.localImg? HOST + item.localImg :item.img}}></Image>
                <Text numberOfLines={1}>{item.movieName}</Text>
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
        backgroundColor:"#000"
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
    playGroup:{
        marginBottom: 10,
        display:"flex",
        flexDirection:"row",
    },
    playGroupActive:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderTopColor:"#ddd",
        borderLeftColor:"#ddd",
        borderRightColor:"#ddd",
        borderBottomColor:"#FFFFFF"
    },
    emptyTab:{
        borderBottomWidth:1,
        borderBottomColor: "#ddd",
        flex:1
    },
    playGroupItem:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    },
    title:{
        fontSize:20,
        marginBottom:10,
        fontWeight:"bold"
    },
    subTitleWrapper:{
        flexDirection:"column"
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
        marginRight:20
    },
    seriesWrapperNormal:{
        borderColor:"#bbb",
    },
    seriesWrapperActive:{
        borderColor:"#333",
    },
    seriesText:{
        color:"#333",
    },
    seriesTextActive:{
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

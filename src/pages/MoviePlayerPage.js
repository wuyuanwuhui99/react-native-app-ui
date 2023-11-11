import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,Dimensions,TouchableOpacity,TextInput} from "react-native";
import {connect} from "react-redux";
import {HOST} from "../config";
import { WebView } from 'react-native-webview';
import {
    getMovieUrlService,
    saveFavoriteService,
    isFavoriteService,
    deleteFavoriteeService,
    savePlayRecordService,
    getCommentCountService,
    getTopCommentListService,
    getReplyCommentListService,
    insertCommentService
} from "../service";
import MovieStarsComponent from "../components/MovieStarsComponent";
import MovieRecommendComponent from "../components/MovieRecommendComponent";
import MovieYourLikesComponent from "../components/MovieYourLikesComponent";

class MoviePlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourLikesList:[],//猜你喜欢的电影
            recommendList:[],//推荐的电影
            movieUrl:[],//二维数组，分组电影列表
            currentUrl:null,//当前播放的url
            isFavoriteStatus:false,//是否已经收藏
            currentPlayGroup:0,
            commentCount:0,//评论数量
            commentList:[],//评论列表
            isShowComment:false,//是否显示评论列表
            pageSize:20,
            pageNum:1,
            replyItem:null,
            replyIndex: -1,
            inputValue:""
        }
    }

    componentWillMount() {
        this.getMovieUrl();
        this.isFavorite();
        savePlayRecordService(this.props.navigation.state.params);
        getCommentCountService(this.props.navigation.state.params.movieId).then(res=>{
            this.setState({commentCount:res.data})
        });
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
            if(movieUrl.length > 0) currentUrl = movieUrl[0][0].url;
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

    /**
     * @author: wuwenqiang
     * @description: 获取评论列表
     * @date: 2021-10-20 22:02
     */
    getMoreCommentList=()=>{
        let {pageNum,commentList} = this.state;
        pageNum++;
        this.setState({pageNum});
        getTopCommentListService(this.props.navigation.state.params.movieId,this.state.pageSize,pageNum).then(res=>{
            commentList.push(...res.data);
            this.setState({commentList});
        });
    };

    /**
     * @author: wuwenqiang
     * @description: 显示或隐藏评论
     * @date: 2021-10-20 22:02
     */
    showComment=()=>{
        const {isShowComment} = this.state;
        if(!isShowComment){//如果是隐藏状态，点击后显示评论
            const {movieId} = this.props.navigation.state.params;
            this.setState({pageSize:20,pageNum:1});
            const {pageSize,pageNum} = this.state;
            getTopCommentListService(movieId,pageSize,pageNum).then(res=>{
                const commentList = res.data.map(item=>{
                    item.replyPageNum = 0;
                    item.replyList = [];
                    return item;
                });
                this.setState({commentList});
            });
        }
        this.setState({isShowComment:!isShowComment});
    };

    /**
     * @author: wuwenqiang
     * @description: 获取回复的评论
     * @date: 2021-10-21 23:12
     */
    getReplyCommentList=(e,item)=>{
        e.stopPropagation();
        item.replyPageNum++;
        getReplyCommentListService(item.id,10,item.replyPageNum).then((res)=>{
            item.replyList.push(...res.data);
            this.setState({commentList:this.state.commentList});
        })
    };

    /**
     * @author: wuwenqiang
     * @description: 回复
     * @date: 2021-10-24 18:37
     */
    onReply=(e,replyItem,replyIndex)=>{
        this.state.replyIndex = replyIndex
        e.stopPropagation();
        this.setState({replyItem})
    };

    /**
     * @author: wuwenqiang
     * @description: 发送评论
     * @date: 2021-10-24 18:37
     */
    onSend=()=>{
        const {inputValue,replyItem} = this.state;
        if(!inputValue)return;
        const params ={
            content:inputValue,
            movieId:this.props.navigation.state.params.movieId,
            parentId:replyItem ? replyItem.id : undefined,
            topId:replyItem ? replyItem.topId : undefined,
            replyUserId:replyItem ? replyItem.userId : undefined
        };
        insertCommentService(params).then((res)=>{
            let {commentList,replyIndex,commentCount} = this.state;
            if(replyItem){
                commentList[replyIndex].replyList.push(res.data)
            }else{
                res.data.replyList = [];
                res.data.replyPageNum = 0;
                commentList.push(res.data);
            }
            commentCount++;
            this.setState({commentList,replyItem:null,inputValue:'',commentCount});
        });
    };

    render(){
        let {currentUrl,movieUrl,isFavoriteStatus,currentPlayGroup,commentCount,isShowComment,commentList,replyItem,inputValue} = this.state;
        let {movieName,score,star,classify,label} = this.props.navigation.state.params;
        return(
            <View style={styles.wrapper}>
                {
                    isShowComment? (
                        <View style={styles.commentWrapper}>
                            <View style={styles.maskWrapper}>
                                <TouchableOpacity style={styles.mask} onPress={this.showComment}></TouchableOpacity>
                            </View>
                            <View style={styles.commentListWrapper}>
                                <Text style={styles.commentCount}>{commentCount}条评论</Text>
                                <TouchableOpacity style={styles.scrollWrapper} onPress={e=>this.onReply(e,null,-1)}>
                                    <ScrollView>
                                        {
                                            commentList.map((item,index)=>{
                                                return  (
                                                    <TouchableOpacity onPress={e=>this.onReply(e,item,index)}>
                                                        <View style={[styles.commentItem,{marginTop:index>0?10:0}]}>
                                                            <Image style={styles.commentAvater} source={{uri:HOST+item.avater}}></Image>
                                                            <View style={styles.commentTextWrapper}>
                                                                <Text style={styles.commentUser}>{item.username}</Text>
                                                                <Text style={styles.commentText}>{item.content}</Text>
                                                                <Text style={styles.commentTime}>{item.createTime}   回复</Text>
                                                                {
                                                                    item.replyList.map((aItem)=>{
                                                                        return (
                                                                            <TouchableOpacity onPress={e=>this.onReply(e,aItem,index)}>
                                                                                <View style={styles.replyWrapper}>
                                                                                    <Image style={styles.replyAvater} source={{uri:HOST+aItem.avater}}/>
                                                                                    <View style={styles.replyInfo}>
                                                                                        <Text style={styles.replyUserName}>{aItem.username}▶{aItem.replyUserName}</Text>
                                                                                        <Text style={styles.replyContent}>{aItem.content}</Text>
                                                                                        <Text style={styles.commentTime}>{item.createTime}  回复</Text>
                                                                                    </View>
                                                                                </View>
                                                                            </TouchableOpacity>
                                                                        )
                                                                    })
                                                                }
                                                                {
                                                                    item.replyCount > 0 && item.replyCount - 10*item.replyPageNum > 0 ? (
                                                                        <TouchableOpacity onPress={e=>this.getReplyCommentList(e,item)}>
                                                                            <Text style={[styles.commentTime,{marginTop: 10},]}>——展开{item.replyCount - 10*item.replyPageNum}条回复 ></Text>
                                                                        </TouchableOpacity>
                                                                    ) : null
                                                                }
                                                            </View>
                                                        </View>
                                                    </TouchableOpacity>
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.replyInputWrapper}>
                                <TextInput value={inputValue}  onChangeText={text=>this.setState({inputValue:text})} style={styles.replyInput} placeholder={replyItem?"回复"+replyItem.username:"有爱评论，说点好听的~"}/>
                                <TouchableOpacity onPress={this.onSend}>
                                    <Text style={styles.sendBtn}>发送</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ):null
                }
                <ScrollView>
                    <View style={styles.webView}>
                        {currentUrl ? <WebView source={{uri:currentUrl}} style={styles.playWrapper}></WebView> : null}
                    </View>
                    <View style={styles.iconWrapper}>
                        <TouchableOpacity onPress={this.showComment} style={styles.iconCommentWrapper}>
                            <Image style={styles.iconComment} source={require("../static/image/icon-comment.png")}></Image>
                            <Text>{commentCount}</Text>
                        </TouchableOpacity>
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
                            <MovieStarsComponent score={score}></MovieStarsComponent>
                        </View>
                    </View>
                    <View style={styles.playNumberWrapper}>
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
                    <MovieYourLikesComponent {...this.props} label={label}></MovieYourLikesComponent>
                    <MovieRecommendComponent {...this.props} classify={classify}/>
                </ScrollView>
            </View>
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
})(MoviePlayerPage);

//屏幕的宽度
const {width,height} = Dimensions.get('window');

const styles = StyleSheet.create({
    wrapper:{
        flex:1
    },
    commentWrapper:{
        position:'absolute',
        zIndex: 1,
        width,
        height,
        display: 'flex'
    },
    maskWrapper:{
        height:height*0.3,
        backgroundColor: "rgba(0,0,0,0.2)"
    },
    mask:{
        flex:1
    },
    iconCommentWrapper:{
        display:"flex",
        flexDirection:"row",
        alignItems:"center"
    },
    commentListWrapper:{
        flex:1,
        backgroundColor:"#fff",
        display:"flex",
        flexDirection:"column"
    },
    commentCount:{
        textAlign:"center",
        marginTop:10,
        marginBottom:10,
        color:"#bbb"
    },
    scrollWrapper:{
        flex:1
    },
    webView:{
        height:Dimensions.get("window").width*9/16,
        backgroundColor:"#000"
    },
    playWrapper:{
        position:"relative"
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
    },
    commentItem:{
        display:"flex",
        flexDirection:"row",
        marginLeft:10,
        marginRight:10
    },
    commentAvater:{
        borderRadius:50,
        width:50,
        height:50,
        marginRight:10
    },
    commentTextWrapper:{
        flex:1,
    },
    commentUser:{
        fontSize: 16,
        color:"#666"
    },
    commentText:{
        color:"#333",
        fontSize:16
    },
    commentTime:{
        fontSize: 16,
        color:"#666"
    },
    replyWrapper:{
        display:"flex",
        flexDirection:"row",
        marginTop:10
    },
    replyInfo:{
        flex:1
    },
    replyAvater:{
        width:20,
        height:20,
        borderRadius:20,
        marginRight:10
    },
    replyUserName:{
        color:"#bbb"
    },
    replyContent:{
        color:"#333",
        fontSize:16
    },
    replyInputWrapper:{
        display:"flex",
        flexDirection:"row",
        paddingLeft:10,
        paddingRight:10,
        paddingTop:10,
        paddingBottom:30,
        borderTopWidth: 1,
        borderTopColor: "#bbb",
        backgroundColor:"#fff",
    },
    replyInput:{
        flex:1,
        borderRadius:50,
        backgroundColor:"#ddd",
        height:40,
        paddingLeft:10
    },
    sendBtn:{
        backgroundColor:"#1890ff",
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        marginLeft: 10,
        color:"#fff",
        height:40
    }
});

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Alert
} from "react-native";
import {connect} from "react-redux";
import {HOST} from "../../config";
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
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import YourLikesComponent from "../components/YourLikesComponent";
import * as style from '../../theme/Style';
import * as size from '../../theme/Size';
import * as color from '../../theme/Color';

class MoviePlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            yourLikesList:[],//猜你喜欢的电影
            recommendList:[],//推荐的电影
            movieUrlGroup:[],//二维数组，分组电影列表
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
        const {params} = this.props.navigation.state;
        savePlayRecordService(params);
        // 15778为测试数据
        getCommentCountService(15778/*params.id*/).then(res=>{
            this.setState({commentCount:res.data})
        });
    }

    getMovieUrl=()=>{
        let {id} = this.props.navigation.state.params;
        id = 72667;// 测试数据
        getMovieUrlService(id).then((res)=>{
            let movieUrlGroup = [],currentUrl=null;
            res.data.forEach((dItem)=>{//分组
                const groupIdnex = movieUrlGroup.findIndex((mItem)=>{
                    return mItem[0].playGroup === dItem.playGroup
                });
                if(groupIdnex === -1){
                    movieUrlGroup.push([dItem])
                }else{
                    movieUrlGroup[groupIdnex].push(dItem)
                }
            });
            if(movieUrlGroup.length > 0) currentUrl = movieUrlGroup[0][0].url;
            this.setState({movieUrlGroup,currentUrl})
        });
    };


    //查询是否已经收藏
    saveFavorite=()=>{
        saveFavoriteService(this.props.navigation.state.params).then((res)=>{
            if(res.data === 1){
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
            this.setState({isFavoriteStatus:res.data > 0})
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
        getTopCommentListService(14692/*this.props.navigation.state.params.id*/,this.state.pageSize,pageNum).then(res=>{
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
            const {id} = this.props.navigation.state.params;
            this.setState({pageSize:20,pageNum:1});
            const {pageSize,pageNum} = this.state;
            getTopCommentListService(14692/*id*/,pageSize,pageNum).then(res=>{
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
        this.state.replyIndex = replyIndex;
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
            movieId:this.props.navigation.state.params.id,
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

    /**
     * @author: wuwenqiang
     * @description: 渲染播放按钮网格，每行5个
     * @date: 2023-12-21 23:12
     */
    _renderUrlTable(urls,index){
        const count = Math.ceil(urls.length / 5);// 每行放5个按钮
        const table = [];
        for(let i  = 0; i < count; i++){
            table.push(
                <View style={styles.urlRow}>
                    {this._renderUrlRow(urls,index,i)}
                </View>
            )

        }
        return table
    }

    /**
     * @author: wuwenqiang
     * @description: 渲染播放按钮行，每行5个
     * @date: 2023-12-21 23:12
     */
    _renderUrlRow(urls,index,i){
        const {currentUrl} = this.state;
        const rows = [];
        for(let j = 0; j < 5; j++){
            if(i * 5 + j < urls.length){
                const item = urls[i * 5 + j];
                rows.push(
                    <TouchableOpacity onPress={e => this.tabMovie(item)} key={'seriesText' + index + (i * 5 + j)} style={{...styles.urlTd,marginRight:j === 4 ? 0 : size.smallMarginSize,borderColor: currentUrl === item.url ? color.selectColor : color.mainTitleColor}}>
                        <Text style={currentUrl === item.url ? styles.seriesTextActive : styles.seriesText}>{item.label}</Text>
                    </TouchableOpacity>
                )
            }else{
                rows.push(<View style={styles.urlTdEmpty}/>)
            }
        }
        return rows
    }

    handleCancel(){
        this.setState({
            isShowComment:false
        })
    }

    render(){
        let {currentUrl,movieUrlGroup,isFavoriteStatus,currentPlayGroup,commentCount,isShowComment,commentList,replyItem,inputValue} = this.state;
        let {movieName,score,star,classify,label} = this.props.navigation.state.params;
        return(
            <View style={styles.wrapper}>
                <Modal animationType="slide"
                       transparent={true}
                       visible={isShowComment}
                       onRequestClose={() => {
                           this.handleCancel();
                       }}
                >
                    <View style={styles.commentWrapper}>
                        <View style={styles.maskWrapper}>
                            <TouchableOpacity style={styles.mask} onPress={this.showComment}/>
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
                                                        <Image style={styles.commentAvater} source={{uri:HOST+item.avater}}/>
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
                </Modal>
                <ScrollView>
                    <View style={styles.webView}>
                        {currentUrl ? <WebView source={{uri:currentUrl}} style={styles.playWrapper}/> : null}
                    </View>
                    <View style={styles.pageStyle}>
                        <View style={styles.iconWrapper}>
                            <TouchableOpacity onPress={this.showComment} style={styles.iconCommentWrapper}>
                                <Image style={styles.iconComment} source={require("../../static/image/icon-comment.png")}/>
                                <Text>{commentCount}</Text>
                            </TouchableOpacity>
                            <View style={styles.rightIcon}>
                                <Image source={require("../../static/image/icon-share.png")} style={styles.iconComment}/>
                                <TouchableOpacity onPress={this.handleFavorite}>
                                    <Image source={isFavoriteStatus ? require("../../static/image/icon-collection-active.png") : require("../../static/image/icon-collection.png")} style={styles.iconComment}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.titleWrapper}>
                            <Text style={styles.title}>{movieName}</Text>
                            <Text style={styles.subTitle} numberOfLines={1}>{star}</Text>
                            <StarsComponent score={score}/>
                        </View>
                        <View style={styles.playGroupWrapper}>
                            <ScrollView horizontal={true} style={styles.playGroup}>
                                {
                                    movieUrlGroup.map((items,aIndex)=>{
                                        return (
                                            <TouchableOpacity key={'playGroupItem'+aIndex} onPress={e=>this.tabGroup(aIndex)}>
                                                <Text style={[styles.playGroupItem,currentPlayGroup == aIndex ? styles.playGroupActive: null]}>{(isNaN(Number(items[0].playGroup)) ? '' :  '线路') + items[0].playGroup} </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                                <View style={styles.emptyTab}/>
                            </ScrollView>
                            <View>
                                {
                                    movieUrlGroup.map((items,aIndex)=>{
                                        return (
                                            currentPlayGroup === aIndex ?
                                                this._renderUrlTable(items,aIndex)
                                                :null
                                        )
                                    })
                                }
                            </View>

                        </View>
                        <YourLikesComponent {...this.props} label={label}/>
                        <RecommendComponent {...this.props} classify={classify}/>
                    </View>
                </ScrollView>
            </View>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <View key={"recommondImg"+index} style={styles.recommondItem}>
                <Image style={styles.recommondImg} source={{uri:item.localImg? HOST + item.localImg :item.img}}/>
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
        backgroundColor:color.whiteColor,
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
        backgroundColor:color.blackColor
    },
    pageStyle:{
        ...style.pageStyle
    },
    playWrapper:{
        position:"relative"
    },
    iconWrapper:{
        ...style.boxDecoration,
        display:'flex',
        flexDirection:'row'
    },
    iconComment:{
        width:size.middleIconSize,
        height:size.middleIconSize,
        marginRight:size.smallMarginSize
    },
    rightIcon:{
        flexDirection:"row-reverse",
        flex:1
    },
    titleWrapper:{
        ...style.boxDecoration
    },
    playGroup:{
        display:"flex",
        flexDirection:"row",
    },
    playGroupActive:{
        borderTopWidth:1,
        borderBottomWidth:1,
        borderLeftWidth:1,
        borderRightWidth:1,
        borderTopColor:color.disableColor,
        borderLeftColor:color.disableColor,
        borderRightColor:color.disableColor,
        borderBottomColor:color.whiteColor
    },
    urlRow:{
        display:'flex',
        flexDirection:'row',
        marginTop: size.containerPaddingSize
    },
    urlTd:{
        flex:1,
        borderColor:color.subTitleColor,
        borderWidth:1,
        borderStyle:'solid',
        marginRight:size.smallMarginSize,
        paddingTop: size.smallMarginSize,
        paddingBottom: size.smallMarginSize,
        display: 'flex',
        alignItems:'center',
        borderRadius:size.minBtnRadiusSize
    },
    urlTdEmpty:{
        flex:1,
        marginRight:size.smallMarginSize,
        paddingTop: size.smallMarginSize,
        paddingRight: size.smallMarginSize,
        opacity: 0
    },
    lastUrlTd:{
        marginRight: 0,
    },
    emptyTab:{
        borderBottomWidth:1,
        borderBottomColor: color.disableColor,
        flex:1
    },
    playGroupItem:{
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:color.disableColor
    },
    title:{
        fontSize:size.bigFontSize,
        marginBottom:size.smallMarginSize,
        fontWeight:"bold"
    },
    subTitle:{
        color:color.subTitleColor,
    },
    playGroupWrapper:{
        ...style.boxDecoration
    },
    seriesWrapper:{
        padding:size.containerPaddingSize,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
    },
    seriesText:{
        color:color.mainTitleColor,
    },
    seriesTextActive:{
        color:color.selectColor,
    },
    rowWrapper:{
        flexDirection:"row",
        justifyContent:"center"
    },
    recommondItem:{
        width:size.movieWidthSize,
        marginRight:size.columnPaddingSize
    },
    recommondImg:{
        width:size.movieWidthSize,
        height:size.movieHeightSize,
        borderRadius:size.smallMarginSize,
        marginBottom:size.smallMarginSize
    },
    commentItem:{
        display:"flex",
        flexDirection:"row",
        marginLeft:size.smallMarginSize,
        marginRight:size.smallMarginSize
    },
    commentAvater:{
        borderRadius:size.superRadiusSize,
        width:size.superRadiusSize,
        height:size.superRadiusSize,
        marginRight:size.smallMarginSize
    },
    commentTextWrapper:{
        flex:1,
    },
    commentUser:{
        fontSize: size.middleFontSize,
        color:color.mainTitleColor
    },
    commentText:{
        color:color.mainTextColor,
        fontSize:size.middleFontSize,
    },
    commentTime:{
        fontSize: size.middleFontSize,
        color:color.mainTitleColor
    },
    replyWrapper:{
        display:"flex",
        flexDirection:"row",
        marginTop:size.smallMarginSize
    },
    replyInfo:{
        flex:1
    },
    replyAvater:{
        width:size.smallIconSize,
        height:size.smallIconSize,
        borderRadius:size.smallIconSize,
        marginRight:size.smallMarginSize
    },
    replyUserName:{
        color:color.usernameColor
    },
    replyContent:{
        color:color.mainTitleColor,
        fontSize:size.middleFontSize
    },
    replyInputWrapper:{
        display:"flex",
        flexDirection:"row",
        paddingLeft:size.smallMarginSize,
        paddingRight:size.smallMarginSize,
        paddingTop:size.smallMarginSize,
        paddingBottom:size.smallMarginSize * 3,
        borderTopWidth: size.borderWidthSize,
        borderTopColor: color.borderColor,
        backgroundColor:color.whiteColor,
    },
    replyInput:{
        flex:1,
        borderRadius:size.buttonHeightSize,
        backgroundColor:color.disableColor,
        height:size.buttonHeightSize,
        paddingLeft:size.smallMarginSize
    },
    sendBtn:{
        backgroundColor:color.activeColor,
        borderRadius:size.bigRadiusSize,
        paddingLeft:size.bigRadiusSize,
        paddingRight:size.bigRadiusSize,
        paddingTop:size.smallMarginSize,
        paddingBottom:size.smallMarginSize,
        marginLeft: size.smallMarginSize,
        color:color.whiteColor,
        height:size.buttonHeightSize
    }
});

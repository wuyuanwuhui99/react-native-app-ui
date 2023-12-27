import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,FlatList,TouchableOpacity} from "react-native";
import {HOST} from "../../config";
import {
    getPlayRecordService,
    getUserMsgService,
    getMyFavoriteMovieListService,
    getMyViewsMovieListService
} from "../service"
import {connect} from "react-redux";
import arrow from "../../static/image/icon_arrow.png";
import AvaterComponent from "../components/AvaterComponent";
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';
import * as color from '../../theme/Color';

class  MovieMyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyList:[],// 历史观看留
            favoriteList:[],// 我的收藏
            viewList:[],// 我浏览过的电影
            showHistoryList:true,// 展示历史观看记录
            showFavoriteList:false,// 展示我的收藏
            showViewList:false,// 展示我浏览记录
            loading:false,
            userMsg:{}
        }
    }

    componentDidMount(){
        getPlayRecordService().then((res)=>{
            this.setState({historyList:res.data});
        });
        getUserMsgService().then((res)=>{
            this.setState({userMsg:res.data});
        })
    }

    _renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={"TouchableOpacity" + index}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:HOST + item.localImg}}/>
                    <Text numberOfLines={1} style={styles.movieName}>{item.movieName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    /**
     * @description: 显示或隐藏观看记录
     * @date: 2023-12-27 22:38
     * @author wuwenqiang
     */
    onShowHistoryList=()=>{
        if(this.state.loading)return;
        let {showHistoryList} = this.state;
        showHistoryList = !showHistoryList;
        if(showHistoryList){
            this.state.loading = true;
            getPlayRecordService().then((res)=>{
                this.setState({historyList:res.data});
            }).finally(()=>{
                this.state.loading = false
            });
        }
        this.setState({
            showHistoryList
        })
    };

    /**
     * @description: 显示或隐藏我的收藏
     * @date: 2023-12-27 22:21
     * @author wuwenqiang
     */
    onShowFavoriteList=()=>{
        if(this.state.loading)return;
        let {showFavoriteList} = this.state;
        showFavoriteList = !showFavoriteList;
        if(showFavoriteList){
            this.state.loading = true;
            getMyFavoriteMovieListService(1,20).then(res=>{
                this.setState({
                    favoriteList:res.data
                })
            }).finally(()=>{
                this.state.loading = false
            });
        }
        this.setState({
            showFavoriteList
        })
    };

    /**
     * @description: 显示或隐藏浏览记录
     * @date: 2023-12-27 22:38
     * @author wuwenqiang
     */
    onShowViewList=()=>{
        if(this.state.loading)return;
        let {showViewList} = this.state;
        showViewList = !showViewList;
        if(showViewList){
            this.state.loading = true;
            getMyViewsMovieListService().then((res)=>{
                this.setState({viewList:res.data});
            }).finally(()=>{
                this.state.loading = false
            });
        }
        this.setState({
            showViewList
        })
    };

    render() {
        let {historyList,userMsg,favoriteList,viewList,showHistoryList,showFavoriteList,showViewList} = this.state;
        let {userData={}} = this.props;
        let {username,sign} = userData;
        let {userAge=0,viewRecordCount=0,playRecordCount=0,favoriteCount=0} = userMsg;
        return(
            <ScrollView style={styles.scrollView}>
                <View style={styles.avaterWrapper}>
                    <AvaterComponent style={styles.avaterImage} {...this.props}/>
                    <View style={styles.nameWrapper}>
                        <Text style={styles.username}>{username}</Text>
                        <Text style={styles.sign}>{sign}</Text>
                    </View>
                    <Image style={styles.edit} source={require("../../static/image/icon_edit.png")}/>
                </View>

                <View style={styles.avaterWrapper}>
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
                            <Text style={styles.myLabelValue}>{playRecordCount}</Text>
                            <Text style={styles.myLabelTitle}>观看记录</Text>
                        </View>
                        <View style={{...styles.myLabel,borderRightWidth:0}}>
                            <Text style={styles.myLabelValue}>{viewRecordCount}</Text>
                            <Text style={styles.myLabelTitle}>历史浏览</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.panelWrapper}>
                    <TouchableOpacity style={styles.pannelHeader} onPress={this.onShowHistoryList}>
                        <Image style={styles.panelIcon} source={require("../../static/image/icon_history.png")}/>
                        <Text style={styles.pannelTitle}>观看记录</Text>
                        <Image style={{...styles.arrowIcon,transform:showHistoryList ? [{rotate:'90deg'}] : [{rotate:'0deg'}]}} source={arrow}/>
                    </TouchableOpacity>

                    {
                        historyList.length > 0 && showHistoryList?
                            <FlatList
                                style={styles.marginTop}
                                horizontal={true}
                                data ={historyList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            />: null
                    }

                </View>

                <View style={styles.panelWrapper}>
                    <TouchableOpacity style={styles.pannelHeader} onPress={this.onShowFavoriteList}>
                        <Image style={styles.panelIcon} source={require("../../static/image/icon_collection.png")}/>
                        <Text style={styles.pannelTitle}>我的收藏</Text>
                        <Image style={{...styles.arrowIcon,transform:showFavoriteList ? [{rotate:'90deg'}] : [{rotate:'0deg'}]}} source={arrow}/>
                    </TouchableOpacity>
                    {
                        showFavoriteList && favoriteList.length > 0 ?
                            <FlatList
                                style={styles.marginTop}
                                horizontal={true}
                                data ={favoriteList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            />: null
                    }
                </View>

                <View style={styles.panelWrapper}>
                    <TouchableOpacity style={styles.pannelHeader} onPress={this.onShowViewList}>
                        <Image style={styles.panelIcon} source={require("../../static/image/icon_record.png")}/>
                        <Text style={styles.pannelTitle}>我浏览过的电影</Text>
                        <Image style={{...styles.arrowIcon,transform:showViewList ? [{rotate:'90deg'}] : [{rotate:'0deg'}]}} source={arrow}/>
                    </TouchableOpacity>
                    {
                        showViewList && viewList.length > 0 ?
                            <FlatList
                                style={styles.marginTop}
                                horizontal={true}
                                data ={viewList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            />: null
                    }
                </View>

                <View style={{...styles.panelWrapper,...styles.lastPannelWrapper}}>
                    <View style={styles.panelBox}>
                        <Image style={styles.panelIcon} source={require("../..//static/image/icon_talk.png")}/>
                        <Text style={styles.pannelTitle}>电影圈</Text>
                        <Image style={styles.arrowIcon} source={arrow}/>
                    </View>
                    <View style={styles.panelBox}>
                        <Image style={styles.panelIcon} source={require("../../static/image/icon_music.png")}/>
                        <Text style={styles.pannelTitle}>音乐</Text>
                        <Image style={styles.arrowIcon} source={arrow}/>
                    </View>
                    <View style={{...styles.panelBox,...styles.lastPanelBox}}>
                        <Image style={styles.panelIcon} source={require("../../static/image/icon_app.png")}/>
                        <Text style={styles.pannelTitle}>小程序</Text>
                        <Image style={styles.arrowIcon} source={arrow}/>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
      }
})(MovieMyPage);

const styles = StyleSheet.create({
    noData:{
        height:100,
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    avaterWrapper:{
        ...style.boxDecoration,
        display: 'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    avaterImage:{
        width:size.bigAvaterSize,
        height:size.bigAvaterSize,
        borderRadius:size.bigAvaterSize,
    },
    marginTop:{
        marginTop:size.containerPaddingSize
    },
    nameWrapper:{
        flex:1,
        display:'flex',
        flexDirection: 'column',
        marginLeft: size.containerPaddingSize
    },
    username:{
        marginBottom:size.containerPaddingSize,
        fontSize:size.bigFontSize,
        fontWeight:'bold'
    },
    sign:{
      fontSize:size.middleFontSize,
      color: color.subTitleColor
    },
    edit:{
      width: size.bigIconSize,
      height: size.bigIconSize,
    },
    myLabelWrapper:{
        flexDirection:"row",
    },
    myLabel:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    myLabelValue:{
        fontSize:size.bigFontSize,
        marginBottom:size.smallMarginSize,
        fontWeight: 'bold'
    },
    myLabelTitle:{
        color:color.subTitleColor
    },
    scrollView:{
        ...style.pageStyle,
    },
    historyWrapper:{
        ...style.boxDecoration
    },
    historyIcon:{
        width:25,
        height:25,
        marginRight:10
    },
    categoryView:{
        marginRight:size.smallMarginSize,
        display:'flex',
        flexDirection:'column',
        alignItems:'center'
    },
    categoryImage:{
        width:size.movieWidthSize,
        height:size.movieHeightSize,
        borderRadius:size.middleRadiusSize
    },
    movieName:{
        marginTop:size.smallMarginSize
    },
    categoryList:{
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    panelWrapper:{
        ...style.boxDecoration,
        paddingTop:0
    },
    pannelHeader:{
        display: 'flex',
        flexDirection:'row',
        alignItems:'center',
        paddingTop:size.containerPaddingSize
    },
    lastPannelWrapper:{
        marginBottom:size.containerPaddingSize
    },
    panelBox:{
        flexDirection:"row",
        position:"relative",
        alignItems:"center",
        paddingTop:size.containerPaddingSize,
        paddingBottom: size.containerPaddingSize,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    },
    lastPanelBox:{
        paddingBottom:0,
        borderBottomWidth:0,
    },
    arrowIcon:{
        width:size.smallIconSize,
        height:size.smallIconSize,
    },
    panelIcon:{
        width:25,
        height:25,
        marginRight:10
    },
    pannelTitle:{
        flex:1,
        fontSize:size.middleFontSize
    }
});

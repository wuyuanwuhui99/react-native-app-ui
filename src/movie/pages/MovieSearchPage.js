import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,FlatList,ScrollView,TouchableOpacity,TextInput,ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import {searchService} from "../service";
import {HOST} from "../../config";
import StorageUtil from "../../utils/StorageUtil";
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import Loading from "../../common/Loading";
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';
import ListComponent from '../components/ListComponent';

class  MovieSearchPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyLabels:[],
            keyword:"",
            searching:false,
            loading:false,
            searchResult:[],
        }
    }

    componentDidMount(){
        StorageUtil.get("historyLabels").then((res)=>{
            if(res){
                this.setState({historyLabels:res})
            }
        });
    }

    clearInput =()=>{
        this.setState({keyword:null,searching:false})
    };

    render(){
        let {placeholder,classify} = this.props.navigation.state.params;
        let {historyLabels,searching,searchResult,keyword,loading} = this.state;
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.searchBarWrapper}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this.onChangeText}
                            placeholder={placeholder}
                            value={keyword}
                            clearButtonMode={"while-editing"}
                        />
                        {
                            keyword ?
                                <TouchableOpacity onPress={this.clearInput}>
                                    <Image style={styles.clearIcon} source={require("../../static/image/icon_clear.png")}/>
                                </TouchableOpacity> : null
                        }

                    </View>

                    <TouchableOpacity onPress={this.goSearch} >
                        <View style={styles.button}>
                            <Text style={styles.searchText}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    searching ?
                        (
                            loading ?
                                null
                            :<ListComponent direction={'vertical'} movieList={searchResult}/>
                        )
                     :
                        <View>
                            <View style={style.boxDecoration}>
                                <View style={styles.categoryHeader}>
                                    <View style={styles.categoryLine}/>
                                    <Text style={styles.categoryTitle}>历史搜索</Text>
                                </View>
                                <View style={styles.historyWrapper}>
                                    {
                                        historyLabels.length > 0 ?
                                            historyLabels.map((item,index)=>{
                                            return (
                                                <TouchableOpacity key={'historyLabels'+index} style={styles.labelWrapper} onPress={()=>this.onHistorySearch(item)}>
                                                    <Text style={styles.labelText}>{item}</Text>
                                                </TouchableOpacity>
                                            )
                                        }) :
                                            <Text style={styles.noData}>暂无搜索记录</Text>
                                    }
                                </View>
                            </View>
                            <RecommendComponent {...this.props} direction={'vertical'} classify={classify}/>
                        </View>
                }
                <Loading></Loading>
            </ScrollView>
        )
    }

    renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={"searchResult"+index} onPress={e=>this.goDetail(item)}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:item.local_img?`${HOST}/movie/images/qishi/${item.local_img}`:item.img}}/>
                    <View style={styles.movieInfo}>
                        <Text numberOfLines={1} style={styles.movieName}>{item.movieName}</Text>
                        {item.star ? <Text numberOfLines={1} style={styles.subName}>{'主演:'+item.star}</Text> : null}
                        {item.director ? <Text numberOfLines={1} style={styles.subName}>{'导演:'+item.director}</Text>: null}
                        {item.type ? <Text numberOfLines={1} style={styles.subName}>{'类型:'+item.type}</Text> : null}
                        {item.releaseTime ? <Text numberOfLines={1} style={styles.subName}>{'上映时间:'+item.releaseTime}</Text> : null}
                        <StarsComponent score={item.score}/>
                    </View>
                </View>
            </TouchableOpacity>
        )
    };

    goSearch= async () => {
        if(this.state.loading)return ;
        let kw = this.state.keyword || this.props.navigation.state.params.placeholder;
        let {historyLabels} = this.state;
        let index = historyLabels.findIndex((item) => {
            return item === kw;
        });
        if (index !== -1) {
            historyLabels.splice(index, 1)
        }
        historyLabels.unshift(kw);
        historyLabels = historyLabels.slice(0,20);
        this.state.pageNum = 1;
        await this.onSearch(kw);
        //等待请求完成再设置缓存
        this.setState({historyLabels, pageNum: 1});
        StorageUtil.set("historyLabels", this.state.historyLabels);

    };

    onHistorySearch=(keyword)=>{
        this.state.keyword = keyword;
        this.setState({keyword});
        this.goSearch();
    };


    onChangeText=(value)=>{
        this.state.keyword = value;
        this.setState({keyword:value});
        if(this.state.searching){
            this.setState({searching:false})
        }
    };

    onSearch=(kw)=>{
        let {pageNum,pageSize} = this.state;
        this.setState({loading:true});
        Loading.show();
        return searchService({keyword:kw,pageNum,pageSize}).then((res)=>{
            this.setState({
                searchResult:res.data,
                total:res.total,
                searching:true
            })
        }).finally(()=>{
            this.setState({loading:false});
            Loading.hide();
            resolve()
        });


    };

    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
      }
})(MovieSearchPage);

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        ...style.pageStyle
    },
    searchBarWrapper:{
        flexDirection:"row",
        alignItems:"center",
        ...style.boxDecoration
    },
    textInputWrapper:{
        flex:1,
        borderRadius:50,
        backgroundColor:"#ddd",
        flexDirection:"row",
        alignItems:"center"
    },
    noData:{
      textAlign:'center',
        width:'100%',
        padding: size.containerPaddingSize * 2
    },
    textInput:{
        flex:1,
        height:50,
        justifyContent:"center",
        paddingLeft:20
    },
    clearIcon:{
        width:30,
        height:30,
        marginRight:10
    },
    button:{
        borderRadius:50,
        width:70,
        alignItems:"center",
        justifyContent:"center",
        height:45,
        backgroundColor:"#1890ff",
        marginLeft:10
    },
    searchText:{
        color:"#fff"
    },
    categoryHeader:{
        display:"flex",
        alignItems:"center",
        flexDirection:'row',
    },
    categoryLine:{
        width:4,
        height:18,
        backgroundColor:"#1890ff"
    },
    categoryTitle:{
        fontSize:14,
        marginLeft:5
    },
    historyWrapper:{
        marginTop:size.containerPaddingSize,
        flexDirection:"row",
        flexWrap:"wrap"
    },
    labelWrapper:{
        backgroundColor:"#ddd",
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20,
        paddingTop:10,
        paddingBottom:10,
        marginRight:10,
        marginBottom:10
    },
    labelText:{
        color:"#333"
    },
    movieName:{
        fontSize:18
    },
    categoryView:{
        marginBottom:20,
        flexDirection:'row'
    },
    categoryImage:{
        width:150,
        height:200,
        borderRadius:10,
        marginRight:10
    },
    movieInfo:{
        flex:1
    },
    subTitle:{
        color:"#bbb",
        marginTop:10
    },
    subName:{
        marginTop:10
    }
})


import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,FlatList,ScrollView,TouchableOpacity,TextInput,ActivityIndicator} from "react-native";
import {connect} from "react-redux";
import {searchService} from "../service";
import {HOST} from "../config";
import StorageUtil from "../utils/StorageUtil";
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import Loading from "../common/Loading";

class  MyPage extends Component {
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
                this.setState({historyLabels:res.slice(0,20)})
            }
        });
    }

    clearInput =()=>{
        this.setState({keyword:null,searching:false})
    }

    render(){
        let {placeholder,classify} = this.props.navigation.state.params;
        let {historyLabels,searching,searchResult,keyword,loading} = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.searchBarWrapper}>
                    <View style={styles.textInputWrapper}>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={this._onChangeText}
                            placeholder={placeholder}
                            value={keyword}
                            clearButtonMode={"while-editing"}
                        ></TextInput>
                        {
                            keyword ?
                                <TouchableOpacity onPress={this.clearInput}>
                                    <Image style={styles.clearIcon} source={require("../static/image/icon-clear.png")}/>
                                </TouchableOpacity> : null
                        }

                    </View>

                    <TouchableOpacity onPress={this._goSearch} >
                        <View style={styles.button}>
                            <Text style={styles.searchText}>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    searching ?
                    <View style={styles.flatList}>
                        {
                            loading?
                                null
                            :<FlatList
                                keyExtractor={(item, index) => index.toString()}
                                data ={searchResult}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            ></FlatList>
                        }
                    </View>
                     :
                    <ScrollView>
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryLine}></View>
                            <Text style={styles.categoryTitle}>历史搜索</Text>
                        </View>
                        <View style={styles.historyWrapper}>
                            {
                                historyLabels.map((item,index)=>{
                                    return (
                                        <TouchableOpacity onPress={e=>this._onHistorySearch(item)}>
                                            <View key={'historyLabels'+index} style={styles.labelWrapper}>
                                                <Text style={styles.labelText}>{item}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <RecommendComponent {...this.props} direction={'horizontal'} classify={classify}/>
                    </ScrollView>
                }
                <Loading></Loading>
            </View>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={"searchResult"+index} onPress={e=>this.goDetail(item)}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:item.local_img?`${HOST}/movie/images/qishi/${item.local_img}`:item.img}}></Image>
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
    }

    _goSearch= async () => {
        let kw = this.state.keyword || this.props.navigation.state.params.placeholder
        let {historyLabels} = this.state;
        let index = historyLabels.findIndex((item) => {
            return item == kw;
        });
        if (index != -1) {
            historyLabels.splice(index, 1)
        }
        historyLabels.unshift(kw);
        historyLabels = historyLabels.slice(0,20)
        this.state.pageNum = 1;
        await this._onSearch(kw);
        //等待请求完成再设置缓存
        this.setState({historyLabels, pageNum: 1});
        StorageUtil.set("historyLabels", this.state.historyLabels);

    }

    _onHistorySearch=(keyword)=>{
        this.state.keyword = keyword;
        this.setState({keyword});
        this._goSearch();
    }


    _onChangeText=(value)=>{
        this.state.keyword = value;
        this.setState({keyword:value});
        if(this.state.searching){
            this.setState({searching:false})
        }
    }

    _onSearch=(kw)=>{
        return new Promise((resolve)=>{
            let {pageNum,pageSize} = this.state;
            this.setState({loading:true});
            Loading.show();
            searchService({keyword:kw,pageNum,pageSize}).then((res)=>{
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
        })

    }

    goDetail=(item)=>{
        console.log(item)
        this.props.navigation.push('DetailPage',item)
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
    searchBarWrapper:{
        flexDirection:"row",
        padding:20,
        alignItems:"center"
    },
    textInputWrapper:{
        flex:1,
        borderRadius:50,
        backgroundColor:"#ddd",
        flexDirection:"row",
        alignItems:"center"
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
        margin:20,
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
        flexDirection:"row",
        paddingLeft:20,
        paddingBottom:20,
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
    flatList:{
        flex:1,
        padding:20
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


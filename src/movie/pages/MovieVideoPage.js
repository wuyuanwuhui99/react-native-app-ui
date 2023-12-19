import React, {Component} from 'react';
import {StyleSheet, View,Image,Text,FlatList} from "react-native";
import {getCategoryListService,getAllCategoryByClassify} from "../service";
import MovieCarouselComponent from "../components/MovieCarouselComponent";
import MovieCategoryComponent from "../components/MovieCategoryComponent";
import SearchBarComponent from "../components/MovieSearchBarComponent";
import AvaterComponent from "../components/MovieAvaterComponent";
import {backgroundColor} from '../../theme/Color';
import {containerPaddingSize, smallMarginSize} from '../../theme/Size';
import {boxDecoration} from '../../theme/Style';

export default class  MovieVideoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData:[],//轮播数据
            allCategoryListByPageName:[],//按页面名称获取所有小类
            dataSource:[[]],//当前显示的小类，懒加载
            pageNum:1,//分类的数量
            loading:false
        }
    }

    initData=()=>{
        this.state.dataSource = [[]];//当前显示的小类，懒加载
        //获取轮播数据
        getCategoryListService("电视剧","轮播").then((res)=>{
            let {dataSource} = this.state;
            dataSource[0] = res.data;
            this.setState({dataSource});
        });

        getAllCategoryByClassify("电视剧").then((res)=>{
            let {allCategoryListByPageName,dataSource} = this.state;
            allCategoryListByPageName.push(...res.data);
            let temp = res.data.slice(0,2);
            let count = 0;
            temp.forEach(({classify,category},index)=>{
                getCategoryListService(classify,category).then((res)=>{
                    dataSource[index+2] = res.data;
                }).finally(()=>{
                    count++;
                    if(count === temp.length){
                        this.setState({dataSource});
                    }
                })
            });
            this.setState({allCategoryListByPageName});
        });
    };

    componentDidMount(){
        this.initData();
    }

    getCategoryListData=({classify,category})=>{
        let {dataSource} = this.state;
        this.state.loading = true;
        this.setState({loading:true});
        getCategoryListService(classify,category).then((res)=>{
            dataSource.push(res.data)
        }).finally(()=>{
            this.state.loading = false;
            this.setState({
                loading:false,
                dataSource
            })
        })
    };

    _renderItem=({item,index})=>{
        if(index === 0){
            return <MovieCarouselComponent carouselData={item}/>
        }else if(item && item.length>0){
            return <MovieCategoryComponent categoryList={item}/>
        }else{
            return null;
        }
    };

    _onRefresh=()=>{
        this.initData();
    };

    _onEndReached=()=>{
        let {pageNum,allCategoryListByPageName} = this.state;
        if(pageNum < allCategoryListByPageName.length-1){
            pageNum++;
            this.state.pageNum = pageNum;
            this.setState({pageNum});
            this.getCategoryListData(allCategoryListByPageName[pageNum]);
        }
    };

    _renderFooter=()=>{
        let {pageNum,allCategoryListByPageName} = this.state;
        if(pageNum < allCategoryListByPageName.length-1){
            return  <View style={styles.footer}><Text>正在加载中</Text></View>
        }else if(pageNum >= allCategoryListByPageName.length-1 && allCategoryListByPageName.length !== 0){
            return <View style={styles.footer}><Text>没有更多了</Text></View>
        }else{
            return null;
        }
    };

    render() {
        let {loading,dataSource} = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                    <AvaterComponent {...this.props}/>
                    <View style={styles.searchWrapper}>
                        <SearchBarComponent classify={"电视剧"}/>
                    </View>
                </View>
                <FlatList
                    data={dataSource}
                    style={styles.scrollViewWrapper}
                    onRefresh={this._onRefresh}
                    refreshing={loading}
                    onEndReached={this._onEndReached}
                    onEndReachedThreshold={0.1}  // 这里取值0.1，可以根据实际情况调整，取值尽量小
                    ListFooterComponent={this._renderFooter}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    //设置下拉加载更多的指示器的位置
                    progressViewOffset={50}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        flex:1,
        ...backgroundColor
    },
    headerWrapper: {
        display:"flex",
        justifyContent:"center",
        flexDirection:'row',
        ...boxDecoration
    },
    searchWrapper:{
        flex:1,
        marginLeft:smallMarginSize
    },
    scrollViewWrapper:{
        flex:1,
    },
    footer:{
        margin:containerPaddingSize,
        justifyContent:"center",
        alignItems:"center"
    },
});

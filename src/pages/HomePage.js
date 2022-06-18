import React, {Component} from 'react';
import {StyleSheet, View, Text, FlatList,} from 'react-native';
import {getUserDataService,getCategoryListService,getAllCategoryListByPageNameService} from "../service";
import CarouselComponent from "../components/CarouselComponent";
import CategoryComponent from "../components/CategoryComponent";
import SearchBarComponent from "../components/SearchBarComponent";
import ClassifyComponent from "../components/ClassifyComponent";
import AvaterComponent from "../components/AvaterComponent";
import {getUserData,getToken} from "../store/actions";
import StorageUtil from "../utils/StorageUtil";
import {connect} from 'react-redux';
import {backgroundColor} from '../theme/Color';
import {smallMarginSize, middleAvaterSize, containerPaddingSize} from '../theme/Size';
import {boxDecoration} from '../theme/Style';

class  HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData:[],//轮播数据
            allCategoryListByPageName:[],//按页面名称获取所有小类
            dataSource:[[],{name:"classify"}],//当前显示的小类，懒加载
            pageNum:1,//分类的数量
            loading:false
        }
    }

    initData=()=>{
        this.state.dataSource = [[],{name:"classify"}];//当前显示的小类，懒加载
        let loadCarousel = false,loadCategoryList = false;

        //获取轮播数据
        getCategoryListService("电影","轮播").then((res)=>{
            let {dataSource} = this.state;
            dataSource[0] = res.data;
        }).finally(()=>{
            loadCarousel = true;
            if(loadCarousel && loadCategoryList){
                this.setState({dataSource});
            }
        });

        getAllCategoryListByPageNameService("首页").then((res)=>{
            let {allCategoryListByPageName,dataSource} = this.state;
            allCategoryListByPageName.push(...res.data);
            let temp = res.data.slice(0,2);
            let count = 0;
            temp.forEach(({classify,category},index)=>{
                getCategoryListService(classify,category).then((res)=>{
                    dataSource[index+2] = res.data;
                }).finally(()=>{
                    count++;
                    if(count == temp.length){
                        loadCategoryList = true;
                        if(loadCarousel && loadCategoryList){
                            this.setState({dataSource});
                        }
                    }
                })
            });
            this.setState({allCategoryListByPageName});
        });
    };

    async componentDidMount() {
        let token = await StorageUtil.get("token");
        if(token){
            this.props.dispatch(getToken(token));
        }
        //获取用户数据
        await getUserDataService().then((res) => {
            this.props.dispatch(getUserData(res.data))
        });
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
        if (!item)return null;
        if(index == 0){
            return <CarouselComponent {...this.props} carouselData={item}></CarouselComponent>
        }else if(item.name == "classify"){
            return <ClassifyComponent {...this.props}></ClassifyComponent>
        }else{
            return <CategoryComponent {...this.props} categoryList={item}></CategoryComponent>
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
            return <View style={styles.footer}><Text>正在加载中</Text></View>
        }else if(pageNum >= allCategoryListByPageName.length-1 && allCategoryListByPageName.length != 0){
            return <View style={styles.footer}><Text>没有更多了</Text></View>
        }else{
            return null
        }
    };

    render() {
        let {loading,dataSource} = this.state;
        return (
            <View style={styles.wrapper}>
                <View style={styles.headerWrapper}>
                    <AvaterComponent style={{width:middleAvaterSize,height:middleAvaterSize,marginRight:smallMarginSize}} {...this.props}/>
                    <View style={styles.searchWrapper}>
                        <SearchBarComponent {...this.props} classify={"电影"}></SearchBarComponent>
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
                    keyExtractor={(item,index)=>index.toString()}
                    //设置下拉加载更多的指示器的位置
                    progressViewOffset={50}
                ></FlatList>
            </View>
        );
    }
}

export default  connect((state)=>{
    return {}
})(HomePage);

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'column',
        flex:1,
        ...backgroundColor
    },
    searchWrapper:{
      flex:1
    },
    headerWrapper: {
        display:"flex",
        justifyContent:"center",
        flexDirection:'row',
        ...boxDecoration,
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

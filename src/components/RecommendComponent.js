import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Image,Dimensions} from 'react-native';
import {getKeyWordService, getRecommendService} from '../service';
import PropTypes from 'prop-types'
import {HOST} from '../config';

export default class  RecommendComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            recommendList:[]
        }
    }

    //类型检测方法一
    static propTypes={
        classify:PropTypes.string,
        horizontal:PropTypes.bool
    }

    //设置默认属性方法一
    static defaultProps={
        classify:"",
        horizontal:true
    }

    componentWillMount() {
       this.getRecommend()

    }

    getRecommend=()=>{
        let {classify} = this.props;
        getRecommendService(classify).then((res)=>{
            this.setState({recommendList:res.data});
        });
    }

    render(){
        let {recommendList} = this.state;
        return (
            recommendList.length > 0
                ? <View style={styles.titleWrapper}>
                    <Text style={styles.title}>推荐</Text>
                    {
                        this.props.horizontal ?
                            <FlatList
                            horizontal={true}
                            data ={recommendList}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem = {
                                ({item,index}) => this._renderItem(item,index)
                            }
                        >
                        </FlatList>
                        : <View style={styles.gridWrapper}>
                                {
                                    recommendList.map((item,index)=>{
                                        return this._renderItem(item,index);
                                    })
                                }
                        </View>
                    }


                </View>
                : null
        )
    }

    componentDidMount(){
        getKeyWordService(this.props.classify).then((res)=>{
            this.setState({keyword:res.data.name});
        });
    }

    _renderItem=(item,index)=>{
        return (
            <View key={"recommondImg"+index} style={[styles.recommondItem,this.props.horizontal ? null : styles.gridItem]}>
                <Image style={styles.recommondImg} source={{uri:item.localImg? HOST + item.localImg :item.img}}></Image>
                <Text numberOfLines={1}>{item.name}</Text>
            </View>
        )
    }

    goSearch=()=>{
        this.props.navigation.push('SearchPage',{placeholder:this.state.keyword,classify:this.props.classify});
    }
}

// //屏幕的宽度
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    recommondItem:{
        width:150,
        marginRight:20,
        display:"flex",
        alignItems:"center"
    },
    recommondImg:{
        width:150,
        height:200,
        borderRadius:10,
        marginBottom:10
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
    gridWrapper:{
        display: "flex",
        flexDirection:"row",
        flexWrap: 'wrap'
    },
    gridItem:{
        // width:width/2 - 30
    }
})

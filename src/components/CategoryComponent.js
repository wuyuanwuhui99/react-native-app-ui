import React, {Component} from 'react';
import {StyleSheet,Image,View,Text,FlatList,TouchableOpacity} from "react-native";
import {host} from "../config";
import PropTypes from 'prop-types'
import {getCategoryList} from "../service";
//https://github.com/ant-design/ant-design-mobile-rn/blob/master/rn-kitchen-sink/components/index.js
export default class  CategoryComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            categoryList:[]
        }
    }

     //类型检测方法一
    static propTypes={
        categoryList:PropTypes.array,
    }

    //设置默认属性方法一
    static defaultProps={
        categoryList:[],
    }
    
    
    render(){
        let {categoryList} = this.props;
        return (
            <View>
                <View style={styles.categoryHeader}>
                    <View style={styles.categoryLine}></View>
                    <Text style={styles.categoryTitle}>{categoryList[0] ? categoryList[0].category : null}</Text>
                </View>
                <View style={styles.categoryList}>
                    <FlatList
                        horizontal={true}
                        data ={categoryList}
                        renderItem = {
                            ({item,index}) => this._renderItem(item,index)
                        }
                    >   
                    </FlatList>
                </View>
            </View>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={item.category + index} onPress={e=>this.goDetail(item)}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:item.local_img ? host+item.local_img : item.img}}></Image>
                    <Text numberOfLines={1} style={styles.movieName}>{item.name}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    goDetail=(item)=>{
        console.log(item)
        this.props.navigation.push('DetailPage',item)
    }
}

const styles = StyleSheet.create({
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
    movieName:{
        marginTop:10,
        width:150
    },
    categoryView:{
        marginRight:10
    },
    categoryImage:{
        width:150,
        height:200,
        borderRadius:10
    },
    categoryList:{
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    }
});  
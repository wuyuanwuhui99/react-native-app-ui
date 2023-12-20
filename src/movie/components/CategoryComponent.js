import React, {Component} from 'react';
import {StyleSheet,Image,View,Text,FlatList,TouchableOpacity} from "react-native";
import {HOST} from "../../config";
import PropTypes from 'prop-types'
import * as style from '../../theme/Style';
import * as size from '../../theme/Size';
import TitleComponent from './TitleComponent';
export default class  CategoryComponent extends Component {
    constructor(props){
        super(props);
    }

     //类型检测方法一
    static propTypes={
        categoryList:PropTypes.array,
    };

    //设置默认属性方法一
    static defaultProps={
        categoryList:[],
    };


    render(){
        let {categoryList} = this.props;
        return (
            <View style={styles.wrapper}>
                <TitleComponent title={categoryList[0] ? categoryList[0].category : null}/>
                <View style={styles.categoryList}>
                    <FlatList
                        horizontal={true}
                        data ={categoryList}
                        keyExtractor={(item, index) => index.toString()}
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
                    <Image style={styles.categoryImage} source={{uri:item.local_img ? HOST+item.local_img : item.img}}/>
                    <Text numberOfLines={1} style={styles.movieName}>{item.movieName}</Text>
                </View>
            </TouchableOpacity>
        )
    };

    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    };
}

const styles = StyleSheet.create({
    wrapper:{
        ...style.boxDecoration
    },
    movieName:{
        marginTop:size.smallMarginSize,
        width:size.movieWidthSize
    },
    categoryView:{
        marginRight:size.middleRadiusSize
    },
    categoryImage:{
        width:size.movieWidthSize,
        height:size.movieHeightSize,
        borderRadius:size.middleRadiusSize
    },
    categoryList:{
        marginTop:size.containerPaddingSize
    }
});

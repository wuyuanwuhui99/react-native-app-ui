import React, {Component} from 'react';
import {StyleSheet,Image,View,Text,FlatList,TouchableOpacity} from "react-native";
import {HOST} from "../../config";
import PropTypes from 'prop-types'
import {boxDecoration} from '../../theme/Style';
import {
    miniMarginSize,
    smallMarginSize,
    middleRadiusSize,
    movieWidthSize,
    movieHeightSize,
    containerPaddingSize, smallFontSize,
} from '../../theme/Size';
import {activeColor} from '../../theme/Color';
export default class  MovieCategoryComponent extends Component {
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
                <View style={styles.categoryHeader}>
                    <View style={styles.categoryLine}></View>
                    <Text style={styles.categoryTitle}>{categoryList[0] ? categoryList[0].category : null}</Text>
                </View>
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
                    <Image style={styles.categoryImage} source={{uri:item.local_img ? HOST+item.local_img : item.img}}></Image>
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
        ...boxDecoration
    },
    categoryHeader:{
        display:"flex",
        alignItems:"center",
        flexDirection:'row',
    },
    categoryLine:{
        width:4,
        height:18,
        ...activeColor
    },
    categoryTitle:{
        fontSize:smallFontSize,
        marginLeft:miniMarginSize
    },
    movieName:{
        marginTop:smallMarginSize,
        width:movieWidthSize
    },
    categoryView:{
        marginRight:middleRadiusSize
    },
    categoryImage:{
        width:movieWidthSize,
        height:movieHeightSize,
        borderRadius:middleRadiusSize
    },
    categoryList:{
        marginTop:containerPaddingSize
    }
});

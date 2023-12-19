import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, FlatList, Image,Dimensions} from 'react-native';
import PropTypes from 'prop-types'
import {HOST} from '../../config';

export default class  MovieListComponent extends Component {
    constructor(props){
        super(props);
    }

    //类型检测方法一
    static propTypes={
        title:PropTypes.string,
        direction:PropTypes.string,
        movieList:PropTypes.array
    };

    //设置默认属性方法一
    static defaultProps={
        title:"",
        direction: "horizontal",
        movieList:[]
    };

    //点击跳转到详情
    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    };

    render(){
        let {movieList,title,direction} = this.props;
        return (
            movieList.length > 0
                ? <View style={styles.titleWrapper}>
                    {title ?
                        <View style={styles.categoryHeader}>
                            <View style={styles.categoryLine}/>
                            {title ? <Text style={styles.categoryTitle}>{title}</Text> : null}
                        </View>
                        : null
                    }
                    {
                        direction == "horizontal" ?
                            <FlatList
                                horizontal={true}
                                data ={movieList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            >
                            </FlatList>
                            : <View style={styles.gridWrapper}>
                                {
                                    movieList.map((item,index)=>{
                                        return this._renderItem(item,index);
                                    })
                                }
                            </View>
                    }
                </View>
                : null
        )
    }

    _renderItem=(item,index)=>{
        let {direction} = this.props;
        return (
            <TouchableOpacity onPress={()=>this.goDetail(item)} key={"_renderItem"+index}>
                <View key={"movieImg"+index} style={direction == 'horizontal' ? styles.movieItem : [styles.movieItemVertical,{marginTop: index>2? 20 : 0,marginRight:index%3==2?0:10}]}>
                    <Image resizeMode='cover' style={styles.movieImg} source={{uri:item.localImg ? HOST + item.localImg :item.img}}/>
                    <View style={styles.movieNameWrapper}><Text numberOfLines={1}>{item.movieName}</Text></View>
                </View>
            </TouchableOpacity>
        )
    };

    goSearch=()=>{
        this.props.navigation.push('SearchPage',{placeholder:this.state.keyword,classify:this.props.classify});
    }
}

// //屏幕的宽度
const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    categoryHeader:{
        display:"flex",
        alignItems:"center",
        flexDirection:'row',
        paddingBottom:10
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
    movieItem:{
        width:150,
        marginRight:20,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        overflow:"hidden"
    },
    movieImg:{
        width:150,
        height:200,
        borderRadius:10,
        marginBottom:10
    },
    movieNameWrapper:{
        width:150,
        overflow:"hidden",
        alignItems:"center"
    },
    movieItemVertical:{
        width:(width - 60)/3,
        justifyContent:"center",
        display:"flex",
        alignItems:"center",
        overflow:"hidden"
    },
    movieItemWrapper:{
        width: (width - 40)/2,
    },
    titleWrapper:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20
    },
    title:{
        fontSize:20,
        marginBottom:10,
        borderLeftWidth:3,
        borderLeftColor:"#1890ff",
        paddingLeft:10
    },
    gridWrapper:{
        display: "flex",
        flexDirection:"row",
        flexWrap: 'wrap'
    },
});

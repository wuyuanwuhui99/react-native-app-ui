import React, {Component} from 'react';
import {StyleSheet, View,Image,Text,TouchableOpacity,FlatList,ImageBackground,Dimensions,ScrollView} from "react-native";
import {host} from "../config";
export default class DetaiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performerList:[]
        }
    }

    componentDidMount(){
        console.log(this.props.navigation.state.params)
    }

    _renderItem=(item,index)=>{
        return (
            <TouchableOpacity key={"TouchableOpacity" + index}>
                <View  style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri:item.img}}></Image>
                    <Text numberOfLines={1} style={styles.movieName}>{item.star}</Text>
                    <Text numberOfLines={1} style={styles.subName}>{item.role}</Text>
                </View>
            </TouchableOpacity>
        )
    }

    _renderStar=(score)=>{
        let count = parseFloat(score)/2;//3.8
        let integer = Math.floor(count)
        let result = []
        for(let i = 0; i < integer; i++){//实心星星
            result.push(<Image style={styles.star} source={require("../static/image/icon-full-star.png")}></Image>)
        }
        if(Math.round(count) - Math.floor(count*10/5)/2 == 0.5){//半个星星
            result.push(<Image style={styles.star} source={require("../static/image/icon-half-star.png")}></Image>)
        }
        let leftover = 5-result.length
        for(let i = 0; i < leftover; i++){//空心星星
            result.push(<Image style={styles.star} source={require("../static/image/icon-empty-star.png")}></Image>)
        }
        return (
            <View style={styles.starBox}>
                {result}
                <Text style={styles.score}>{score}</Text>
            </View>
        )
    }

    goPlay(params){
        this.props.navigation.push('PlayPage',params)
    }

    render() {
        let {local_img,img,name,score,plot,star_group} = this.props.navigation.state.params;
        if(star_group){
            star_group = JSON.parse(star_group.replace(/'/g,'"'));
        }else{
            star_group = [];
        }
        return (
            <ScrollView>
                <View style={styles.imageBackground}>
                    <TouchableOpacity onPress={e=>this.goPlay(this.props.navigation.state.params)}>
                        <ImageBackground 
                            style={styles.imageBackground}
                            source={{uri:local_img?`${host}/movie/images/qishi/${local_img}`:img}}
                        >
                        <Image style={styles.playIcon} source={require("../static/image/icon-detail-play.png")}></Image>
                    </ImageBackground>
                    </TouchableOpacity>
                
                </View>
                <View style={styles.movieInfo}>
                    <View style={styles.portrait}>
                        <Image style={styles.movieImage} source={{uri:local_img?`${host}/movie/images/qishi/${local_img}`:img}}></Image>
                    </View>
                    <View style={styles.titleWrapper}>
                        <View style={styles.nameWrapper}>
                            <View style={styles.nameBox}>
                                <Text numberOfLines={2} style={styles.name}>{name}</Text>
                                <Text numberOfLines={1} style={styles.subName}>111</Text>
                            </View>
                            {
                                score ? this._renderStar(score):null
                            }
                            
                        </View>
                    </View>
                </View>
                {
                    plot ? 
                    <View style={styles.slotWrapper}>
                        <View style={styles.categoryWrapper}>
                            <View style={styles.line}></View>
                            <Text style={styles.categoryText}>剧情</Text>
                        </View>
                        <Text style={styles.slotContent}> &emsp;&emsp;{plot}</Text>
                    </View>
                    :null
                }
                {
                    star_group.length > 0 ? 
                        <View style={styles.groupWrapper}>
                        <View style={styles.categoryWrapper}>
                            <View style={styles.line}></View>
                            <Text style={styles.categoryText}>演员</Text>
                        </View>
                        <View>
                            <FlatList
                                horizontal={true}
                                data ={star_group}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            ></FlatList>
                        </View>
                    </View>
                    :null
                }
            </ScrollView>    
        )
    }    
}

const styles = StyleSheet.create({
    imageBackground:{
        width:Dimensions.get("window").width,
        height:250,
        justifyContent:"center",
        alignItems:"center"
    },
    playIcon:{
        width:40,
        height:40
    },
    movieInfo:{
        flexDirection:"row",
        height:150
    },  
    portrait:{
        width:178,
        position:"relative",
    },
    movieImage:{
        width:150,
        height:200,
        position:"absolute",
        left:25,
        top:-50,
        borderRadius:20,
        borderWidth:3,
        borderColor:"#fff",
        borderStyle:"solid"
    },
    titleWrapper:{
        flex:1
    },
    nameWrapper:{
        flexDirection:"column",
        padding:20
    },  
    starBox:{
        flexDirection:"row",
        marginTop:10,
        alignItems:"center",
    },
    nameBox:{
        marginRight:20,
    },
    name:{
        fontSize:20,
    },
    subName:{
        paddingTop:5,
        color:"#bbb"
    },
    star:{
        width:15,
        height:15,
        marginRight:5    
    },
    score:{
        fontSize:16,
        color:"red",
        textAlignVertical:"center"
    },
    slotWrapper:{
        padding:20
    },  
    categoryText:{
        fontSize:16,
    },
    slotContent:{
        color:"#aaa"
    },
    groupWrapper:{
        paddingLeft:20,
        paddingRight:20,
        paddingTop:20
    },
    tabGroup:{
        flexDirection:"row"
    },
    categoryWrapper:{
        flexDirection:"row",
        alignItems:"center",
        marginBottom:10
    },
    line:{
        width:3,
        height:16,
        marginRight:10,
        backgroundColor:"#1890ff"
    },
    categoryView:{
        marginRight:15,
        justifyContent:"center",
        alignItems:"center"
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
    },
    
})
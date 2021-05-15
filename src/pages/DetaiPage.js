import React, {Component} from 'react';
import {StyleSheet, View,Image,Text,TouchableOpacity,FlatList,ImageBackground,Dimensions,ScrollView} from "react-native";
import {HOST} from "../config";
import {saveViewRecordService,getStarsService} from "../service"
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import YourLikesComponent from "../components/YourLikesComponent";

export default class DetaiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performerList:[],
            stars:[]
        }
    }

    componentWillMount(){
        const params = this.props.navigation.state.params;
        const {movieId} = params
        if(movieId){
            getStarsService(movieId).then((res)=>{
                this.setState({stars:res.data})
            })
        };
        saveViewRecordService(params);//浏览记录
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

    goPlay(params){
        this.props.navigation.push('PlayPage',params)
    }


    render() {
        const {localImg,img,name,score,plot,star,classify,label} = this.props.navigation.state.params;
        const {stars} = this.state;
        return (
            <ScrollView>
                <View style={styles.imageBackground}>
                    <TouchableOpacity onPress={e=>this.goPlay(this.props.navigation.state.params)}>
                        <ImageBackground
                            style={styles.imageBackground}
                            source={{uri:localImg? HOST + localImg:img}}
                        >
                        <Image style={styles.playIcon} source={require("../static/image/icon-detail-play.png")}></Image>
                    </ImageBackground>
                    </TouchableOpacity>

                </View>
                <View style={styles.movieInfo}>
                    <View style={styles.portrait}>
                        <Image style={styles.movieImage} source={{uri:localImg?HOST+localImg:img}}></Image>
                    </View>
                    <View style={styles.titleWrapper}>
                        <View style={styles.nameWrapper}>
                            <View style={styles.nameBox}>
                                <Text numberOfLines={2} style={styles.name}>{name}</Text>
                                <Text numberOfLines={1} style={styles.subName}>{star}</Text>
                            </View>
                            <StarsComponent score={score}></StarsComponent>
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
                    stars.length > 0 ?
                        <View style={styles.groupWrapper}>
                        <View style={styles.categoryWrapper}>
                            <View style={styles.line}></View>
                            <Text style={styles.categoryText}>演员</Text>
                        </View>
                        <View>
                            <FlatList
                                horizontal={true}
                                data ={stars}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            ></FlatList>
                        </View>
                    </View>
                    :null
                }
                <YourLikesComponent  {...this.props} label={label}></YourLikesComponent>
                <RecommendComponent  {...this.props} classify={classify}></RecommendComponent>
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
    slotWrapper:{
        paddingLeft:20,
        paddingRight: 20,
        paddingTop:20
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

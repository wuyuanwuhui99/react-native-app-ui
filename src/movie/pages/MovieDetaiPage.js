import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
    FlatList,
    ImageBackground,
    Dimensions,
    ScrollView
} from "react-native";
import {HOST} from "../../config";
import {saveViewRecordService, getStarsService} from "../service"
import StarsComponent from "../components/StarsComponent";
import RecommendComponent from "../components/RecommendComponent";
import YourLikesComponent from "../components/YourLikesComponent";
import * as style from '../../theme/Style';
import * as size from '../../theme/Size';
import * as color from '../../theme/Color';
import TitleComponent from '../components/TitleComponent';

export default class MovieDetaiPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            performerList: [],
            stars: []
        }
    }

    componentWillMount() {
        const params = this.props.navigation.state.params;
        const {movieId} = params;
        if (movieId) {
            getStarsService(16575).then((res) => {
                this.setState({stars: res.data})
            })
        }
        saveViewRecordService(params);//浏览记录
    }

    _renderItem = (item, index) => {
        return (
            <View key={"TouchableOpacity" + index} style={styles.categoryView}>
                <Image style={styles.categoryImage} source={{uri: HOST + item.localImg}}/>
                <Text numberOfLines={1} style={styles.movieName}>{item.star}</Text>
                <Text numberOfLines={1} style={styles.subName}>{item.role}</Text>
            </View>
        )
    };

    goPlay(params) {
        this.props.navigation.push('PlayPage', params)
    };


    render() {
        const {localImg, img, name, score, plot, star, classify, label, movieName, description} = this.props.navigation.state.params;
        const {stars} = this.state;
        return (
            <ScrollView style={styles.wrapper}>
                <View style={styles.boxDecoration}>
                    <View style={styles.movieImgWrapper}>
                        <Image style={styles.movieImg} source={{uri: localImg ? HOST + localImg : img}}/>
                        <Image style={styles.playIcon} source={require("../../static/image/icon-detail-play.png")}/>
                    </View>
                    <View style={styles.movieInfoWrapper}>
                        <Text style={styles.headerMovieName}>{movieName}</Text>
                        {description ? <Text style={styles.subTitle}>{description.replace(/\n|\s/g, '')}</Text> : null}
                        <Text style={styles.subTitle}>{star}</Text>
                        {score ? <StarsComponent score={score}/> : null}
                    </View>
                </View>
                {
                    plot ?
                        <View style={styles.moduleWrapper}>
                            <TitleComponent title={'剧情'}/>
                            <Text style={styles.plot}>{plot}</Text>
                        </View> : null

                }
                {
                    stars.length > 0 ?
                        <View style={styles.moduleWrapper}>
                            <TitleComponent title={'演员'}/>
                            <FlatList
                                style={styles.starList}
                                horizontal={true}
                                data ={stars}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem = {
                                    ({item,index}) => this._renderItem(item,index)
                                }
                            />
                        </View>
                        :null
                }
                <YourLikesComponent  {...this.props} label={label}/>
                <RecommendComponent  {...this.props} classify={classify}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        ...style.pageStyle,
    },
    boxDecoration: {
        ...style.boxDecoration,
        display: 'flex',
        flexDirection: 'row',
    },
    movieImgWrapper: {
        height: size.movieHeightSize,
        width: size.movieWidthSize,
        position: 'relative',
        borderRadius: size.middleRadiusSize,
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    movieImg: {
        height: size.movieHeightSize,
        width: size.movieWidthSize,
        position: 'absolute',
    },
    playIcon: {
        width: size.bigIconSize,
        height: size.bigIconSize
    },
    movieInfoWrapper: {
        marginLeft: size.pageSize,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent:'flex-start'
    },
    headerMovieName:{
        fontSize: size.bigFontSize,
        fontWeight: 'bold'
    },
    subTitle:{
        marginTop:size.smallMarginSize,
        color:color.subTitleColor
    },
    moduleWrapper:{
        ...style.boxDecoration,
        display:'flex',
        flexDirection:'column'
    },
    plot:{
        paddingTop:size.smallMarginSize,
        color:color.subTitleColor
    },
    categoryView:{
        marginRight:size.containerPaddingSize,
        justifyContent:"center",
        alignItems:"center"
    },
    categoryImage:{
        width:size.movieWidthSize,
        height:size.movieHeightSize,
        borderRadius:size.middleRadiusSize
    },
    categoryList:{
        marginLeft:20,
        marginRight:20,
        marginBottom:20
    },
    starList:{
        marginTop: size.containerPaddingSize
    }
});

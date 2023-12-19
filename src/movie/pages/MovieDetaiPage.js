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
import MovieStarsComponent from "../components/MovieStarsComponent";
import MovieRecommendComponent from "../components/MovieRecommendComponent";
import MovieYourLikesComponent from "../components/MovieYourLikesComponent";
import * as style from '../../theme/Style';
import * as size from '../../theme/Size';
import * as color from '../../theme/Color';

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
            getStarsService(movieId).then((res) => {
                this.setState({stars: res.data})
            })
        }
        ;
        saveViewRecordService(params);//浏览记录
    }

    _renderItem = (item, index) => {
        return (
            <View key={"TouchableOpacity" + index}>
                <View style={styles.categoryView}>
                    <Image style={styles.categoryImage} source={{uri: item.img}}></Image>
                    <Text numberOfLines={1} style={styles.movieName}>{item.star}</Text>
                    <Text numberOfLines={1} style={styles.subName}>{item.role}</Text>
                </View>
            </View>
        )
    }

    goPlay(params) {
        this.props.navigation.push('PlayPage', params)
    }


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
                        {score ? <MovieStarsComponent score={score}/> : null}
                    </View>
                </View>
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
        color:color.disableColor
    }
})

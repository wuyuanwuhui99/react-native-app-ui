import React, {Component,Fragment} from 'react';
import {StyleSheet,Image,TouchableHighlight} from "react-native";
import {Carousel} from "@ant-design/react-native";
import {HOST} from "../config";
import PropTypes from 'prop-types'
import {boxDecoration} from '../theme/Style';
import {middleRadiusSize,containerPaddingSize} from '../theme/Size';
import {Dimensions} from 'react-native';

export default class  CarouselComponent extends Component {
    constructor(props){
        super(props);
    }

     //类型检测方法一
    static propTypes={
        carouselData:PropTypes.array//轮播的图片的json数组
    };

    //设置默认属性方法一
    static defaultProps={
        carouselData:[]
    };


    render(){
        let {carouselData} = this.props;
        return (
            <Fragment>
            {
                carouselData.length > 0 ?
                <Carousel autoplay={true} infinite={true} style={styles.carouseImageWrapStyle}>
                    {
                        carouselData.map((item,index)=>{
                            return <TouchableHighlight key={'carouselData'+index} onPress={e=>this.goDetail(item)}>
                                <Image key={"carouselItem"+index} style={styles.carouseImageStyle} source={{uri:item.local_img ? HOST+item.local_img : item.img}}></Image>
                             </TouchableHighlight>

                        })
                    }
                </Carousel>
                : null
            }
            </Fragment>
        )
    }

    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    }
}
const width = Dimensions.get('window').width - containerPaddingSize *2;
const styles = StyleSheet.create({
    carouseImageWrapStyle:{
        ...boxDecoration,
        backgroundColor:'transparent',
        height: width * 7 / 16,
    },
    carouseImageStyle:{
        width:width,
        height:width * 7 / 16,
        borderRadius:middleRadiusSize,
    }
});

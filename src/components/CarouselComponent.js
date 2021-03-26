import React, {Component,Fragment} from 'react';
import {StyleSheet,Image,Dimensions,TouchableOpacity,TouchableHighlight} from "react-native";
import {Carousel} from "@ant-design/react-native";
import {host} from "../config";
import PropTypes from 'prop-types'
// import { TouchableHighlight } from 'react-native-gesture-handler';

export default class  CarouselComponent extends Component {
    constructor(props){
        super(props);
    }

     //类型检测方法一
    static propTypes={
        carouselData:PropTypes.array//轮播的图片的json数组
    }

    //设置默认属性方法一
    static defaultProps={
        carouselData:[]
    }
    
   
    render(){
        let {carouselData} = this.props;
        return (
            <Fragment>
            {
                carouselData.length > 0 ? 
                <Carousel autoplay={true} infinite={true} style={styles.carouseImageStyle}>
                    {
                        carouselData.map((item,index)=>{
                            return <TouchableHighlight onPress={e=>this.goDetail(item)}>
                                <Image key={"carouselItem"+index} style={styles.carouseImageStyle} source={{uri:item.local_img ? host+item.local_img : item.img}}></Image>
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
        console.log(item)
        this.props.navigation.push('DetailPage',item)
    }
}

const styles = StyleSheet.create({
    carouseImageStyle:{
        width:Dimensions.get('window').width,
        height:220
    }
});  
import React, {Component} from 'react';
import {StyleSheet, View,Text,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getKeyWordService} from "../service"
import PropTypes from 'prop-types'
import * as size from '../../theme/Size';
import * as color from '../../theme/Color'
export default class  SearchBarComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            keyword:""
        }
    }

     //类型检测方法一
     static propTypes={
        classify:PropTypes.string,
    }

    //设置默认属性方法一
    static defaultProps={
        classify:""
    }

    render(){
        let {keyword} = this.state;
        return (
            <TouchableOpacity onPress={this.goSearch}>
                <View style={styles.searchBarWrapper}>
                <Text style={styles.searchText}>{keyword}</Text>
                <MaterialIcons name={'search'} size={30} style={styles.searchIcon}/>
            </View>
            </TouchableOpacity>

        )
    }

    componentDidMount(){
        getKeyWordService(this.props.classify).then((res)=>{
            this.setState({keyword:res.data.movieName});
        });
    }

    goSearch=()=>{
        this.props.navigation.push('SearchPage',{placeholder:this.state.keyword,classify:this.props.classify});
    }
}


const styles = StyleSheet.create({
    searchBarWrapper:{
        height:size.buttonHeightSize,
        borderRadius:size.superRadiusSize,
        backgroundColor:color.backgroundColor,
        position:"relative",
        justifyContent:"center",
    },
    searchText:{
        color:"gray",
        marginLeft:size.containerPaddingSize
    },
    searchIcon:{
        color:"gray",
        position:"absolute",
        right:size.smallMarginSize
    }
});

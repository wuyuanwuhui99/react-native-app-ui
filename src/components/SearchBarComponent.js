import React, {Component} from 'react';
import {StyleSheet, View,Text,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getKeyWordService} from "../service"
import PropTypes from 'prop-types'
export default class  CategoryComponent extends Component {
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
                <MaterialIcons name={'search'} size={30} style={styles.searchIcon}></MaterialIcons>
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
        height:50,
        borderRadius:50,
        backgroundColor:"#ddd",
        position:"relative",
        justifyContent:"center"
    },
    searchText:{
        color:"gray",
        marginLeft:20
    },
    searchIcon:{
        color:"gray",
        position:"absolute",
        right:10
    }
})

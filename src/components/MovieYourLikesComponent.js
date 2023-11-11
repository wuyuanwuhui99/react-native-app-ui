import React, {Component} from 'react';
import {getYourLikesService} from '../service';
import PropTypes from 'prop-types'
import MovieListComponent from "./MovieListComponent";

export default class  MovieYourLikesComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            movieList:[]
        }
    }

    //类型检测方法一
    static propTypes={
        label:PropTypes.string,
        direction:PropTypes.string
    }

    //设置默认属性方法一
    static defaultProps={
        label:"",
        direction: "horizontal"
    }

    componentWillMount() {
        this.getYourLikes()

    }

    getYourLikes=()=>{
        let {label} = this.props;
        if(!label)return;
        getYourLikesService(label).then((res)=>{
            this.setState({movieList:res.data});
        });
    }
    //点击跳转到详情
    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    }

    render(){
        let {movieList} = this.state;
        return <MovieListComponent {...this.props} direction={"horizontal"} title={"猜你想看"} movieList={movieList}></MovieListComponent>
    }
}

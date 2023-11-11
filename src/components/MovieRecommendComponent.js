import React, {Component} from 'react';
import { getRecommendService} from '../service';
import PropTypes from 'prop-types'
import MovieListComponent from "./MovieListComponent";

export default class  MovieRecommendComponent extends Component {
    constructor(props){
        super(props);
        this.state = {
            recommendList:[]
        }
    }

    //类型检测方法一
    static propTypes={
        classify:PropTypes.string,
        direction:PropTypes.string,
        title:PropTypes.title
    };

    //设置默认属性方法一
    static defaultProps={
        classify:"",
        direction: "horizontal",
        title:'推荐'
    };

    componentWillMount() {
       this.getRecommend()

    }

    getRecommend=()=>{
        let {classify} = this.props;
        getRecommendService(classify).then((res)=>{
            this.setState({recommendList:res.data});
        });
    };
    //点击跳转到详情
    goDetail=(item)=>{
        this.props.navigation.push('DetailPage',item)
    };

    render(){
        let {recommendList} = this.state;
        return <MovieListComponent {...this.props} movieList={recommendList}></MovieListComponent>
    }
}

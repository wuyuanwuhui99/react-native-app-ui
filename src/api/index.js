import {HOST} from '../config';

export default {
    getUserData: `${HOST}/service/movie/getUserData`, // 获取用户信息
    getCategoryList: `${HOST}/service/movie/getCategoryList`, //获取分类影片
    getKeyWord: `${HOST}/service/movie/getKeyWord`, //按照classify查询搜索栏的关键词
    getAllCategoryByClassify: `${HOST}/service/movie/getAllCategoryByClassify`, //按classify大类查询所有catory小类
    getAllCategoryListByPageName: `${HOST}/service/movie/getAllCategoryListByPageName`, //按页面获取要展示的category小类
    getUserMsg: `${HOST}/service/movie-getway/getUserMsg`,////获取用户四个指标信息，使用天数，关注，观看记录，浏览记录
    search: `${HOST}/service/movie/search`,//电影搜索
    saveViewRecord: `${HOST}/service/movie-getway/saveViewRecord`,//浏览记录
    savePlayRecord: `${HOST}/service/movie-getway/savePlayRecord`,//播放记录
    getPlayRecord: `${HOST}/service/movie-getway/getPlayRecord`,//获取播放记录
    getStars: `${HOST}/service/movie/getStar/`,//获取演员列表
    getMovieUrl: `${HOST}/service/movie/getMovieUrl`,//获取电影播放地址
    getRecommend: `${HOST}/service/movie/getRecommend`,//根据标签获取相对应的影片
    deleteFavorite: `${HOST}/service/movie-getway/deleteFavorite`,//取消收藏
    saveFavorite: `${HOST}/service/movie-getway/saveFavorite`,//保存收藏
    isFavorite: `${HOST}/service/movie-getway/isFavorite`,//是否已经收藏
    getYourLikes: `${HOST}/service/movie/getYourLikes`,//猜你想看
    login: `${HOST}/service/movie/login`,//登录
    updateUser : `${HOST}/service/movie-getway/updateUser`,//更新用户信息
    getCommentCount:`${HOST}/service/movie/getCommentCount`,//获取评论总数
    getTopCommentList:`${HOST}/service/movie/getTopCommentList`,//获取评论列表
    getReplyCommentList:`${HOST}/service/movie/getReplyCommentList`,//获取回复列表
};




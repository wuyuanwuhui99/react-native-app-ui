import {HOST} from "../config";
export default {
    getUserData: HOST + '/service/movie/getUserData', // 获取用户信息
    getCategoryList: HOST + "/service/movie/getCategoryList", //获取分类影片
    getKeyWord: HOST + "/service/movie/getKeyWord", //按照classify查询搜索栏的关键词
    getAllCategoryByClassify: HOST + "/service/movie/getAllCategoryByClassify", //按classify大类查询所有catory小类
    getAllCategoryListByPageName: HOST + "/service/movie/getAllCategoryListByPageName", //按页面获取要展示的category小类
    getHistory: HOST+"/service/movie/getHistory",//获取历史记录
    getUserMsg: HOST+"/service/movie/getUserMsg",////获取用户四个指标信息，使用天数，关注，观看记录，浏览记录
    search:HOST+"/service/movie/search",//电影搜索
    saveViewRecord:HOST+"/service/movie-getway/saveViewRecord",//浏览记录
    savePlayRecord:HOST+"/service/movie-getway/savePlayRecord",//播放记录
    getStars:HOST+"/service/movie/getStar",//获取演员列表
};




import {host} from "../config";
export default {
    getUserData: host + '/service/movie/getUserData', // 获取用户信息
    getCategoryList: host + "/service/movie/getCategoryList", //获取分类影片
    getKeyWord: host + "/service/movie/getKeyWord", //按照classify查询搜索栏的关键词
    getAllCategoryByClassify: host + "/service/movie/getAllCategoryByClassify", //按classify大类查询所有catory小类
    getAllCategoryListByPageName: host + "/service/movie/getAllCategoryListByPageName", //按页面获取要展示的category小类
    getHistory: host+"/service/movie/getHistory",//获取历史记录
    getUserMsg: host+"/service/movie/getUserMsg",////获取用户四个指标信息，使用天数，关注，观看记录，浏览记录
    search:host+"/service/movie/search",//电影搜索
};
      



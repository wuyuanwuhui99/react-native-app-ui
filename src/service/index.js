import api from "../api";
import HttpUtil from "../utils/HttpUtil";
import md5 from "md5";
/**
 * @author: wuwenqiang
 * @description: 获取用户信息
 * @date: 2020-8-15 22:29
 */
export const getUserDataService = async()=>{
    return HttpUtil.get(api.getUserData);
};

/**
 * @author: wuwenqiang
 * @description: 按照大类获取小类
 * @date: 2020-8-15 22:29
 */
export const getCategoryListService = async (classify,category)=>{
    return HttpUtil.get(`${api.getCategoryList}?classify=${classify}&category=${category}`);
};

/**
 * @author: wuwenqiang
 * @description: 按页面获取所有小类
 * @date: 2020-8-15 22:29
 */
export const getAllCategoryListByPageNameService = async(pageName)=>{
    return HttpUtil.get(`${api.getAllCategoryListByPageName}?pageName=${pageName}`);
};


/**
 * @author: wuwenqiang
 * @description: 按页面获取所有小类
 * @date: 2020-8-15 22:29
 */
export const getAllCategoryByClassify = async(classify)=>{
    return HttpUtil.get(`${api.getAllCategoryByClassify}?classify=${classify}`);
};


/**
 * @author: wuwenqiang
 * @description: 获取搜索栏里面的关键词
 * @date: 2020-8-15 22:29
 */
export const getKeyWordService = async(classify)=>{
    return HttpUtil.get(`${api.getKeyWord}?classify=${classify}`);
};

/**
 * @author: wuwenqiang
 * @description: 获取播放记录
 * @date: 2020-8-15 22:29
 */
export const getPlayRecordService = async()=>{
    return HttpUtil.get(api.getPlayRecord)
};

/**
 * @author: wuwenqiang
 * @description: 保存播放记录
 * @date: 2020-8-15 22:29
 */
export const savePlayRecordService = async()=>{
    return HttpUtil.get(api.savePlayRecord);
};

/**
 * @author: wuwenqiang
 * @description: 获取用户数据
 * @date: 2020-8-15 22:29
 */
export const getUserMsgService = async(userId)=>{
    return HttpUtil.get(`${api.getUserMsg}?userId=${userId}`);
};

/**
 * @author: wuwenqiang
 * @description: 搜索
 * @date: 2020-8-15 22:29
 */
export const searchService=({keyword="",pageName=1,pageSize=20})=>{
    return HttpUtil.get(`${api.search}?keyword=${keyword}&pageNum=${pageName}&pageSize=${pageSize}`);
};

/**
 * @author: wuwenqiang
 * @description: 添加浏览记录
 * @date: 2020-8-15 22:29
 */
export const saveViewRecordService=(movieItem)=>{
    return HttpUtil.post(api.saveViewRecord,movieItem)
};

/**
 * @author: wuwenqiang
 * @description: 获取演员列表
 * @date: 2020-8-15 22:29
 */
export const getStarsService=(movieId)=>{
    return HttpUtil.get(`${api.getStars}/${movieId}`)
};

/**
 * @author: wuwenqiang
 * @description: 获取电影播放地址
 * @date: 2020-8-15 22:29
 */
export const getMovieUrlService = (movieId)=>{
    return HttpUtil.get(`${api.getMovieUrl}?movieId=${movieId}`)
};

/**
 * @author: wuwenqiang
 * @description: 获取猜你想看电影
 * @date: 2020-8-16 22:29
 */
export const getYourLikesService = (labels)=>{
    return HttpUtil.get(`${api.getYourLikes}?labels=${labels}`);
};

/**
 * @author: wuwenqiang
 * @description: 查询是否已经收藏
 * @date: 2020-8-16 22:29
 */
export const isFavoriteService = (movieId)=>{
    return HttpUtil.get(`${api.isFavorite}?movieId=${movieId}`)
};

/**
 * @author: wuwenqiang
 * @description: 添加搜索
 * @date: 2020-8-16 22:29
 */
export const saveFavoriteService = (movieItem)=>{
    return HttpUtil.post(api.saveFavorite,movieItem)
};

/**
 * @author: wuwenqiang
 * @description: 添加搜索
 * @date: 2020-8-16 22:29
 */
export const deleteFavoriteeService = (movieId)=>{
    return HttpUtil.delete(`${api.deleteFavorite}?movieId=${movieId}`);
};


/**
 * @author: wuwenqiang
 * @description: 获取推荐的电影
 * @date: 2020-8-16 22:29
 */
export const getRecommendService = (classify)=>{
    return HttpUtil.get(`${api.getRecommend}?classify=${classify}`);
};


/**
 * @author: wuwenqiang
 * @description: 登录
 * @date: 2021-04-04 22:29
 */
export const loginService = (userId,password)=>{
    password = md5(password);
    return HttpUtil.post(api.login,{userId,password});
};

/**
 * @author: wuwenqiang
 * @description: 登录
 * @date: 2021-04-04 22:29
 */
export const updateUserService = (userData)=>{
    return HttpUtil.put(api.updateUser,userData)
};

/**
 * @author: wuwenqiang
 * @description: 获取影片评论总数
 * @date: 2021-10-20 20:43
 */
export const getCommentCountService = (movieId)=>{
    return HttpUtil.get(`${api.getCommentCount}?movieId=${movieId}`)
};

/**
 * @author: wuwenqiang
 * @description: 获取评论列表
 * @date: 2021-10-20 21:36
 */
export const getTopCommentListService = (movieId,pageSize,pageNum)=>{
    return HttpUtil.get(`${api.getTopCommentList}?movieId=${movieId}&pageSize=${pageSize}&pageNum=${pageNum}`)
};

/**
 * @author: wuwenqiang
 * @description: 获取回复的评论
 * @date: 2021-10-20 21:36
 */
export const getReplyCommentListService = (topId,pageSize,pageNum)=>{
    return HttpUtil.get(`${api.getReplyCommentList}?topId=${topId}&pageSize=${pageSize}&pageNum=${pageNum}`)
};


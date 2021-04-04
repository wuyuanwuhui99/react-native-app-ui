import api from "../api";
import HttpUtil from "../utils/HttpUtil";
import {SUCCESS} from "../config"

/**
 * @author: wuwenqiang
 * @description: 获取用户信息
 * @date: 2020-8-15 22:29
 */
export const getUserDataService = async()=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(api.getUserData).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    })
}

/**
 * @author: wuwenqiang
 * @description: 按照大类获取小类
 * @date: 2020-8-15 22:29
 */
export const getCategoryListService = async (classify,category)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getCategoryList}?classify=${classify}&category=${category}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 按页面获取所有小类
 * @date: 2020-8-15 22:29
 */
export const getAllCategoryListByPageNameService = async(pageName)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getAllCategoryListByPageName}?pageName=${pageName}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}


/**
 * @author: wuwenqiang
 * @description: 按页面获取所有小类
 * @date: 2020-8-15 22:29
 */
export const getAllCategoryByClassify = async(classify)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getAllCategoryByClassify}?classify=${classify}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}


/**
 * @author: wuwenqiang
 * @description: 获取搜索栏里面的关键词
 * @date: 2020-8-15 22:29
 */
export const getKeyWordService = async(classify)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getKeyWord}?classify=${classify}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 获取播放记录
 * @date: 2020-8-15 22:29
 */
export const getPlayRecordService = async()=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(api.getPlayRecord).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 保存播放记录
 * @date: 2020-8-15 22:29
 */
export const savePlayRecordService = async()=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(api.savePlayRecord).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 获取用户数据
 * @date: 2020-8-15 22:29
 */
export const getUserMsgService = async(userId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getUserMsg}?userId=${userId}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 搜索
 * @date: 2020-8-15 22:29
 */
export const searchService=({keyword="",pageName=1,pageSize=20})=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.search}?keyword=${keyword}&pageNum=${pageName}&pageSize=${pageSize}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 添加浏览记录
 * @date: 2020-8-15 22:29
 */
export const saveViewRecordService=(movieItem)=>{
    return new Promise((resolve)=>{
        HttpUtil.post(api.saveViewRecord,movieItem).finally(()=>{
            resolve()
        })
    });
}

/**
 * @author: wuwenqiang
 * @description: 获取演员列表
 * @date: 2020-8-15 22:29
 */
export const getStarsService=(movieId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getStars}?movieId=${movieId}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 获取电影播放地址
 * @date: 2020-8-15 22:29
 */
export const getMovieUrlService = (movieId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getMovieUrl}?movieId=${movieId}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 获取猜你想看电影
 * @date: 2020-8-16 22:29
 */
export const getYourLikesService = (labels)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getYourLikes}?labels=${labels}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 查询是否已经收藏
 * @date: 2020-8-16 22:29
 */
export const isFavoriteService = (movieId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.isFavorite}?movieId=${movieId}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 添加搜索
 * @date: 2020-8-16 22:29
 */
export const saveFavoriteService = (movieItem)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.post(api.saveFavorite,movieItem).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

/**
 * @author: wuwenqiang
 * @description: 添加搜索
 * @date: 2020-8-16 22:29
 */
export const deleteFavoriteeService = (movieId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.delete(`${api.deleteFavorite}?movieId=${movieId}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}


/**
 * @author: wuwenqiang
 * @description: 获取推荐的电影
 * @date: 2020-8-16 22:29
 */
export const getRecommendService = (classify)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getRecommend}?classify=${classify}`).then((res)=>{
            if(res.status == SUCCESS){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

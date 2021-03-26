import api from "../api";
import HttpUtil from "../utils/HttpUtil";
//获取用户信息
export const getUserData = async()=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(api.getUserData).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    }) 
}

//按照大类获取小类
export const getCategoryList = async (classify,category)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getCategoryList}?classify=${classify}&category=${category}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

//按页面获取所有小类
export const getAllCategoryListByPageName = async(pageName)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getAllCategoryListByPageName}?pageName=${pageName}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

//获取搜索栏里面的关键词
export const getKeyWord = async(classify)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getKeyWord}?classify=${classify}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

export const getHistory = async(userId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getHistory}?userId=${userId}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}

export const getUserMsg = async(userId)=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.getUserMsg}?userId=${userId}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}


export const search=({keyword="",pageName=1,pageSize=20})=>{
    return new Promise((resolve,reject)=>{
        HttpUtil.get(`${api.search}?keyword=${keyword}&pageNum=${pageName}&pageSize=${pageSize}`).then((res)=>{
            if(res.status == "success"){
                resolve(res);
            }else{
                reject()
            }
        }).catch(reject);
    });
}
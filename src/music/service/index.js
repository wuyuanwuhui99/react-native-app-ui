import api from "../api";
import HttpUtil from "../../utils/HttpUtil";

/**
 * @description: 获取推荐的音乐
 * @date: 2024-03-02 22:44
 * @author wuwenqiang
 */
export const getKeyWordMusicService = () => {
    return HttpUtil.get(api.getKeywordMusic);
}

/**
 * @description: 获取模块分类
 * @date: 2024-03-02 22:44
 * @author wuwenqiang
 */
export const getMusicClassifyService = () => {
    return HttpUtil.get(api.getMusicClassify);
}

/**
 * @description: 获取模块分类
 * @date: 2024-03-03 11:50
 * @author wuwenqiang
 */
export const getMusicListByClassifyIdService = (classifyId,pageNum,pageSize)=> {
    return HttpUtil.get(`${api.getMusicListByClassifyId}?classifyId=${classifyId}&pageNum=${pageNum}&pageSize=${pageSize}`);
}

/**
 * @description: 获取推荐的歌手
 * @date: 2024-03-03 18:23
 * @author wuwenqiang
 */
export const getSingerListService = (category,pageNum,pageSize) => {
    return HttpUtil.get(`${api.getSingerList}?${category != '' && category != null ? "category=" + category + "&" : ""}pageNum=${pageNum}&pageSize=${pageSize}`);
}



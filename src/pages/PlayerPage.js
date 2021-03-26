import React, {Component} from 'react';
import {StyleSheet, View,Text,Image,ScrollView,FlatList,TouchableOpacity,Dimensions} from "react-native";
import {connect} from "react-redux";
import {host} from "../config";
import { WebView } from 'react-native-webview';
class PlayerPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recommendList:[{"id":"14256","director":"李立铭","star":"赵文浩 / 牟凤彬 / 李浩轩 / 邵夏 / 石雨晴 / 佟小虎 / 西尔扎提 / 董崇华 / 张磊 / 许睿晗 / 曹操","type":"剧情 / 动作 / 传记","country_language":"中国大陆国语","viewing_state":"高清国语","release_time":"2020-10-08","plot":"1917年，踌躇满志的少年叶问（赵文浩 饰）初到香港求学，平静的校园生活却意外被打破。一桩惊天绑架案件在学校举行英文演讲赛的当天发生，全校同学都被挟持，一分钟一条人命。面对眼前的危机，叶问挺身而出，却意外发现绑匪是自己的师父（牟凤彬 饰），而自己的好兄弟（李浩轩 饰）竟然也成为绑匪的帮凶。面对眼前的一切，他该何去何从……一代宗师的成长第一战由此正式打响！","update_time":"2020-10-07T16:00:00.000Z","name":"少年叶问之危机时刻","is_recommend":"0","img":"http://tva2.sinaimg.cn/bmiddle/006RRb27ly1gji0q8b4g3j307i0acjrw.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2031.com/","create_time":"2020-10-10T12:59:20.000Z","local_img":"少年叶问之危机时刻.jpg","url":"[[{'href': '/play/14256/0/0.html', 'label': '高清国语', 'url': 'https://api.52wyb.com/webcloud/?v=https://douban.donghongzuida.com/20201008/10683_4925175e/index.m3u8'}], [{'href': '/play/14256/1/0.html', 'label': '高清国语', 'url': 'https://api.52wyb.com/webcloud/?v=https://www.iqiyi.com/v_2f4xwhbi1x0.html'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null},{"id":"10442","director":"叶伟信","star":"甄子丹 / 吴樾 / 吴建豪 / 斯科特·阿金斯 / 李宛妲 / 郑则仕 / 陈国坤 / 敖嘉年 / 克里斯·柯林斯 / 熊黛林 / 吴千语","type":"动作 / 传记 / 历史","country_language":"中国大陆 / 香港国语","viewing_state":"高清中字","release_time":"2019-12-20","plot":"　　因故来到美国唐人街的叶问，意外卷入一场当地军方势力与华人武馆的纠纷，面对日益猖狂的民族歧视与压迫，叶问挺身而出，在美国海军陆战队军营拼死一战，以正宗咏春，向世界证明了中国功夫。","update_time":"2020-02-09T16:00:00.000Z","name":"叶问4：完结篇","is_recommend":"0","img":"http://tva4.sinaimg.cn/bmiddle/006RRb27ly1g8ppg9y2jgj309i0daaaf.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2032.com","create_time":"2020-02-14T14:44:51.000Z","local_img":"叶问4：完结篇.jpg","url":"[[{'label': '高清国语', 'href': '/play/10442/0/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://bili.meijuzuida.com/20191220/22118_d031b52c/index.m3u8'}, {'label': '高清粤语', 'href': '/play/10442/0/1.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://hong.tianzhen-zuida.com/20200209/19970_977bdfe0/index.m3u8'}], [{'label': '高清粤语', 'href': '/play/10442/1/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=https://www.ziboshishen.com/20191221/Ve0jhbXt/index.m3u8'}, {'label': '高清国语', 'href': '/play/10442/1/1.html', 'url': 'https://jiexi.bm6ig.cn/?url=https://www.166796.com/20200209/LpqeCiM3/index.m3u8'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null},{"id":"11128","director":"李立铭","star":"杜宇航 / 宛立若心 / 佟小虎 / 岳东峰 / 常沁源 / 王敏德","type":"剧情 / 动作 / 传记","country_language":"中国大陆国语","viewing_state":"高清国语","release_time":"2019-12-23","plot":"　　日本军方为侵华做准备，派遣日本商会进驻广州，一面贿赂军阀，收集情报，成立杀手组织暗杀反日人士，一面走私鸦片，大肆敛财，叶问继任佛山警察局侦缉队队长，立案侦查，本以为依靠法律可以匡扶正义，却遭受上级和日本商会的打压，叶问只能晚上化身黑衣侠维持正义，然而日本商会已然发现叶问身份，布下天罗地网......","update_time":"2019-12-22T16:00:00.000Z","name":"叶问·宗师/宗师叶问 ","is_recommend":"0","img":"http://tva2.sinaimg.cn/bmiddle/006RRb27ly1ga6vrf80zyj307i0b9q3b.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2032.com","create_time":"2019-12-24T17:24:33.000Z","local_img":"叶问·宗师 宗师叶问.jpg","url":"[[{'label': '高清国语', 'href': '/play/11128/0/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=https://v.youku.com/v_show/id_XNDQ3NjM3NzA1Mg==.html'}], [{'label': '高清国语', 'href': '/play/11128/1/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://mei.huazuida.com/20191223/19770_0a895d77/index.m3u8'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null},{"id":"10443","director":"叶伟信","star":"甄子丹 / 熊黛林","type":"剧情 / 动作 / 传记 / 历史","country_language":"中国大陆国语","viewing_state":"高清中字","release_time":"0000-00-00","plot":"叶问 3部合集","update_time":"2019-11-06T16:00:00.000Z","name":"叶问 3部合集 ","is_recommend":"0","img":"http://tva1.sinaimg.cn/bmiddle/006RRb27ly1g8ppjtdzh2j307i0armxn.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2032.com","create_time":"2019-12-24T19:54:33.000Z","local_img":"叶问 3部合集.jpg","url":"[[{'label': '第一部', 'href': '/play/10443/0/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://yi.jingdianzuida.com/20190908/5kD9AEWf/index.m3u8'}, {'label': '第二部', 'href': '/play/10443/0/1.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://yanzishan.shuhu-zuida.com/20190809/6574_2dcd8f30/index.m3u8'}, {'label': '第三部高清国语', 'href': '/play/10443/0/2.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://haoa.haozuida.com/20171122/LABXyqST/index.m3u8'}, {'label': '第三部高清粤语', 'href': '/play/10443/0/3.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://yiyi.55zuiday.com/20171122/jgoiv4L0/index.m3u8'}, {'label': '叶问前传', 'href': '/play/10443/0/4.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://yi.jingdianzuida.com/20191010/iwFkZRsN/index.m3u8'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null},{"id":"10207","director":"付利伟","star":"唐文龙 / 楼南光 / 林枫烨 / 赵琳 / 陈玉勇","type":"动作","country_language":"中国大陆国语","viewing_state":"高清国语","release_time":"2019-10-24","plot":"　　1950年，大批武师进入香港开设拳馆，其中叶问(唐文龙饰)竟无一败绩名气大涨，引起九龙城寨现寨主郑德隆(林枫烨饰)的注意，郑德隆恐叶问对自己产生威胁，就将方家灭门案栽赃在叶问身上，想借警察之手除掉叶问。突现神秘人救出了叶问。叶问为自证清白带着徒弟阿民阿强闯入九龙城寨地界，谁承想城寨内早以埋伏无数高手，叶问能否顺利将郑德隆绳之于法，还自己一份清白！","update_time":"2019-10-23T16:00:00.000Z","name":"叶问之九龙城寨 ","is_recommend":"0","img":"http://tva2.sinaimg.cn/bmiddle/006RRb27ly1g89jbh5yjej306o0a074i.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2032.com","create_time":"2019-12-24T20:44:33.000Z","local_img":"叶问之九龙城寨.jpg","url":"[[{'label': '高清国语', 'href': '/play/10207/0/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=https://v.youku.com/v_show/id_XNDM2NTc1NDA0MA==.html'}], [{'label': '高清国语', 'href': '/play/10207/1/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=http://meng.wuyou-zuida.com/20191024/20706_382438a3/index.m3u8'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null},{"id":"6763","director":"袁和平","star":"张晋 / 戴夫·巴蒂斯塔 / 柳岩 / 杨紫琼 / 托尼·贾 / 郑嘉颖 / 周秀娜 / 谭耀文 / 释彦能 / 姜皓文 / 栢天男 / 元华","type":"动作","country_language":"中国大陆 / 香港国语","viewing_state":"高清国语","release_time":"2018-12-21","plot":"　　作为《叶问》系列影片，电影《叶问外传：张天志》延续了《叶问3》的故事，讲述了同为咏春传人的张天志在比武惜败叶问后，决意放下功夫、远离江湖纷争，但面对接踵而至的连番挑衅，面对家国大义遭受的恶意侵犯，决定重拾咏春惩戒毒贩、“以武之道”捍卫民族道义尊严的故事。","update_time":"2019-02-06T16:00:00.000Z","name":"叶问外传：张天志 葉問外傳：張天志  ","is_recommend":"0","img":"http://tva4.sinaimg.cn/mw690/006RRb27ly1fyelfxg2pfj309i0da0tn.jpg","classify":"电影","source_name":"骑士影院","source_url":"http://www.q2032.com","create_time":"2019-12-25T07:04:33.000Z","local_img":"叶问外传：张天志 葉問外傳：張天志 .jpg","url":"[[{'label': '高清国语', 'href': '/play/6763/0/0.html', 'url': 'https://jiexi.bm6ig.cn/?url=https://www.mgtv.com/b/326060/5089187.html'}], [{'label': '高清国语', 'href': '/play/6763/1/0.html', 'url': 'https://www.playm3u8.cn/jiexi.php?url=https://www.mgtv.com/b/326060/5089187.html'}]]","label":null,"original_href":null,"item_group":null,"description":null,"target_href":null,"use_status":null,"score":null,"category":null,"star_group":null}]
        }
    }

    render(){
        let {recommendList} = this.state;
        return(
            <ScrollView>
                <View style={styles.webView}>
                    <WebView source={{uri: "https://jiexi.bm6ig.cn/?url=http://bili.meijuzuida.com/20191012/21631_c953019f/index.m3u8"}} style={styles.playWrapper}></WebView> 
                </View>
                <View style={styles.iconWrapper}>
                    <Image style={styles.iconComment} source={require("../static/image/icon-comment.png")}></Image>
                    <Text>111</Text>
                    <View style={styles.rightIcon}>
                        <Image source={require("../static/image/icon-share.png")} style={styles.iconComment}></Image>
                        <Image source={require("../static/image/icon-collection.png")} style={styles.iconComment}></Image>
                    </View>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>少年叶问之危机时刻</Text>
                    <View style={styles.subTitleWrapper}>
                        <Text style={styles.score}>9.0分</Text>
                        <Text style={styles.subTitle} numberOfLines={1}>赵文浩 / 牟凤彬 / 李浩轩 / 邵夏 / 石雨晴 / 佟小虎 / 西尔扎提 / 董崇华 / 张磊 / 许睿晗 / 曹操</Text>
                    </View>
                </View>
                <View style={styles.playNumberWrapper}>
                    <Text style={styles.title}>剧集</Text>
                    <ScrollView horizontal={true}>
                        <View style={styles.seriesWrapperActive}>
                            <Text style={styles.seriesText}>1</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>2</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>3</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>4</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>5</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>6</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>7</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>8</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>9</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>10</Text>
                        </View>
                        <View style={styles.seriesWrapper}>
                            <Text>11</Text>
                        </View>
                    </ScrollView>
                </View>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>推荐</Text>
                    <FlatList
                        horizontal={true}
                        data ={recommendList}
                        renderItem = {
                            ({item,index}) => this._renderItem(item,index)
                        }
                    >
                    </FlatList>
                        
                </View>
            </ScrollView>
        )
    }

    _renderItem=(item,index)=>{
        return (
            <View style={styles.recommondItem}>
                <Image style={styles.recommondImg} source={{uri:item.local_img?`${host}/movie/images/qishi/${item.local_img}`:item.img}}></Image>
                <Text numberOfLines={1}>{item.name}</Text>
            </View>
        )
    }
}

export default  connect((state)=>{
    let {userInfo} = state;
    return {
        userInfo
      }
})(PlayerPage);

const styles = StyleSheet.create({
    webView:{
        height:Dimensions.get("window").width*9/16,
    },
    playWrapper:{
        position:"relative"
    },
    arrow:{
        position:"absolute",
        zIndex:1,
        width:30,
        height:30,
        left:20,
        top:20
    },
    iconWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        height:80,
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:20,
        paddingRight:20
    },
    iconComment:{
       width:30,
       height:30,
       marginRight:10 
    },
    rightIcon:{
        flexDirection:"row-reverse",
        flex:1
    },
    titleWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        padding:20,
    },
    title:{
        fontSize:20,
        marginBottom:10,
        fontWeight:"bold"
    },
    subTitleWrapper:{
        flexDirection:"row"
    },
    score:{
        fontWeight:"bold",
        color:"red",
        marginRight:10
    },
    subTitle:{
        flex:1,
        color:"#bbb",
    },
    playNumberWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        padding:20,
    },
    seriesWrapper:{
        width:80,
        height:80,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#bbb",
        marginRight:20
    },
    seriesWrapperActive:{
        width:80,
        height:80,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#ffbb15",
        marginRight:20
    },
    seriesText:{
        color:"#ffbb15",
    },
    rowWrapper:{
        flexDirection:"row",
        justifyContent:"center"
    },
    recommondItem:{
        width:150,
        marginRight:20
    },
    recommondImg:{
        width:150,
        height:200,
        borderRadius:10,
        marginBottom:10
    }
})

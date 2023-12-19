import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {HOST} from '../../config';
import {getUserData} from '../../store/actions';
import StorageUtil from "../../utils/StorageUtil";
import {Modal,Provider} from "@ant-design/react-native";
class  MovieUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData:[],//轮播数据
            allCategoryListByPageName:[],//按页面名称获取所有小类
            dataSource:[[]],//当前显示的小类，懒加载
            pageNum:1,//分类的数量
            loading:false
        }
    }

    /**
     * @author: wuwenqiang
     * @description: 退出登录弹窗
     * @date: 2021-04-13 00:04
     */
    logout=()=>{
        Modal.alert('', '是否退出', [
            {
                text: '取消',
                onPress: () => console.log('cancel'),
                style: 'cancel',
            },
            { text: '确定', onPress: () => this.doLogout() },
        ]);
    }

    /**
     * @author: wuwenqiang
     * @description: 退出登录
     * @date: 2021-04-13 00:04
     */
    doLogout=()=>{
        this.props.dispatch(getUserData({}));
        StorageUtil.delete("token");
        this.props.navigation.push('MovieLoginPage');
    }

    /**
     * @author: wuwenqiang
     * @description: 进入编辑也
     * @date: 2021-05-15 21:04
     * @param title:编辑的标题
     * @param type:编辑框的类型
     * @param value: 输入框的值
     * @param field 对应的userInfo字段
     * @param isAllowEmpty: 是否允许为空
     */
    goEditPage=(title,type,value,field,isAllowEmpty)=>{
        this.props.navigation.push('MovieEditPage',{title,type,value,field,isAllowEmpty});
    }

    render() {
        let {userData={}} = this.props;
        let {avater,username,sex,telephone,email,birthday} = userData
        return (
            <Provider>
                <View>
                    <View style={styles.row}>
                        <Text style={styles.title}>头像</Text>
                        <Image roundAsCircle={true} style={styles.avater} source={{uri:HOST+avater}}/>
                        <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                    </View>
                    <TouchableOpacity onPress={()=>{this.goEditPage("昵称","input",username,"username",false)}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>昵称</Text>
                            <Text>{username}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.goEditPage("性别","radio",sex,"sex",true)}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>性别</Text>
                            <Text>{sex}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.goEditPage("电话","input",telephone,"telephone",true)}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>电话</Text>
                            <Text>{telephone}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.goEditPage("邮箱","input",email,"email",false)}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>邮箱</Text>
                            <Text>{email}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.goEditPage("出生日期","date",birthday,"birthday",true)}}>
                        <View style={styles.row}>
                            <Text style={styles.title}>出生日期</Text>
                            <Text>{birthday}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon-arrow.png")}/>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.logout}>
                        <View style={styles.logoutBtn}><Text style={styles.textBtn}>退出登录</Text></View>
                    </TouchableOpacity>
                </View>
            </Provider>
        );
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
    }
})(MovieUserPage);

const styles = StyleSheet.create({
    row:{
        flexDirection:'row',
        display:"flex",
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor:"#ddd",
        padding:20,
        backgroundColor: "#fff"
    },
    avater:{
        width: 70,
        height: 70,
        backgroundColor: '#C0C0C0',
        borderRadius:50,
        // 显示模式：缩略全显contain，拉升全显（会变形）stretch，裁剪后显示（默认）cover
        resizeMode:'cover',
    },
    title:{
        flex:1
    },
    arrow:{
        width: 20,
        height: 20,
        marginLeft:20
    },
    logoutBtn:{
        margin:20,
        padding:10,
        backgroundColor:"#f7453b",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 10,
    },
    textBtn:{
        color:"#fff"
    }
});

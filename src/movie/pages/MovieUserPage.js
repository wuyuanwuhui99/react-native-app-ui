import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,TouchableOpacity,Modal} from 'react-native';
import {connect} from "react-redux";
import {HOST} from '../../config';
import {getUserData} from '../../store/actions';
import StorageUtil from "../../utils/StorageUtil";
import {Provider,DatePicker} from "@ant-design/react-native";
import * as style from '../../theme/Style';
import * as size from '../../theme/Size';
import * as color from '../../theme/Color';
import {zerofull} from '../../utils/common';

class  MovieUserPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            carouselData:[],//轮播数据
            allCategoryListByPageName:[],//按页面名称获取所有小类
            dataSource:[[]],//当前显示的小类，懒加载
            pageNum:1,//分类的数量
            loading:false,
            visibleSexDialog:false,
            visibleDatePicker:false
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
    };

    /**
     * @author: wuwenqiang
     * @description: 退出登录
     * @date: 2021-04-13 00:04
     */
    doLogout=()=>{
        this.props.dispatch(getUserData({}));
        StorageUtil.delete("token");
        this.props.navigation.push('MovieLoginPage');
    };

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
    };

    setVisibleSexDialog = (visibleSexDialog)=>{
        this.setState({visibleSexDialog});
    };

    /**
     * @author: wuwenqiang
     * @description: 选择性别
     * @date: 2024-1-1 18:31
     */
    useCheckSex=(sex)=>{
        let myUserData = JSON.parse(JSON.stringify(this.props.userData));
        myUserData.sex = sex;
        this.props.dispatch(getUserData(myUserData));//更新用户信息
        this.setState({visibleSexDialog:false});
    };

    /**
     * @author: wuwenqiang
     * @description: 日期选择
     * @date: 2024-1-1 18:31
     */
    useCheckDate=(date)=>{
        let myUserData = JSON.parse(JSON.stringify(this.props.userData));
        myUserData.birthday = `${date.getFullYear()}-${zerofull(date.getMonth() + 1)}-${zerofull(date.getDate())}`;
        this.props.dispatch(getUserData(myUserData));//更新用户信息
        this.setState({visibleDatePicker:false});
    };

    render() {
        let {avater,username,sex,telephone,email,birthday} = this.props.userData;
        let {visibleSexDialog,visibleDatePicker} = this.state;
        return (
            <Provider>
                <Modal
                    animationType="slide"
                    transparent={true}
                    onRequestClose={() => {
                        this.setVisibleSexDialog(false)
                    }}
                    visible={visibleSexDialog}
                    style={styles.modalWrapper}
                >
                    <TouchableOpacity onPress={(e)=>this.setVisibleSexDialog(false)} style={styles.modalMask}/>
                    <View style={styles.contentWrapper}>
                        <TouchableOpacity style={styles.mask} onPress={(e)=>this.setVisibleSexDialog(false)}/>
                        <View style={styles.modalContent}>
                            <View style={styles.actionWrap}>
                                <TouchableOpacity onPress={(e)=>this.useCheckSex('男')} style={{...styles.option,...styles.divider}}>
                                    <Text>男</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={(e)=>this.useCheckSex('女')} style={styles.option}>
                                    <Text>女</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.cancelBtn} onPress={(e)=> this.setVisibleSexDialog(false)}><Text>取消</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
                <DatePicker
                    visible={visibleDatePicker}
                    mode="date"
                    minDate = {new Date('1970-01-01')}
                    maxDate = {new Date()}
                    value={new Date(birthday)}
                    format="YYYY-MM-DD"
                    confirmBtnText="确定"
                    cancelBtnText="取消"
                    onChange={value=>this.useCheckDate(value)}
                />
                <View style={styles.pageStyle}>
                    <View style={styles.boxDecoration}>
                        <View style={styles.row}>
                            <Text style={styles.title}>头像</Text>
                            <Image roundAsCircle={true} style={styles.avater} source={{uri:HOST+avater}}/>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </View>
                        <TouchableOpacity style={styles.row} onPress={()=>{this.goEditPage("昵称","input",username,"username",false)}}>
                            <Text style={styles.title}>昵称</Text>
                            <Text>{username}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={()=>{this.setVisible(true)}}>
                            <Text style={styles.title}>性别</Text>
                            <Text>{sex}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={()=>{this.goEditPage("电话","input",telephone,"telephone",true)}}>
                            <Text style={styles.title}>电话</Text>
                            <Text>{telephone}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.row} onPress={()=>{this.goEditPage("邮箱","input",email,"email",false)}}>
                            <Text style={styles.title}>邮箱</Text>
                            <Text>{email}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={{...styles.row,...styles.lastRow}} onPress={()=>{this.setState({visibleDatePicker:true})}}>
                            <Text style={styles.title}>出生日期</Text>
                            <Text>{birthday}</Text>
                            <Image style={styles.arrow} source={require("../../static/image/icon_arrow.png")}/>
                        </TouchableOpacity>
                    </View>


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
    modalWrapper:{
      position: 'relative',
        display:'flex',
    },
    modalMask:{
        flex: 1,
        backgroundColor: color.blackColor,
        opacity: 0.2,
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    contentWrapper:{
        display: 'flex',
        flexDirection: 'column',
        position:'relative',
        zIndex: 1,
        width: '100%',
        height: '100%'
    },
    mask:{
        flex: 1
    },
    modalContent:{
        display: 'flex',
        flexDirection: 'column',
        padding: size.containerPaddingSize
    },
    cancelBtn:{
        backgroundColor:color.whiteColor,
        borderRadius:size.middleRadiusSize,
        fontSize:size.middleFontSize,
        padding:size.containerPaddingSize,
        display:'flex',
        justifyContent: 'center',
        alignItems:'center'
    },
    actionWrap:{
      ...style.boxDecoration,
        marginBottom:size.containerPaddingSize,
        paddingTop: 0,
        paddingBottom: 0
    },
    option:{
        padding:size.containerPaddingSize,
        display:'flex',
        alignItems:'center'
    },
    divider:{
      borderBottomWidth:1,
      borderBottomColor: color.borderColor
    },
    pageStyle:{
        ...style.pageStyle
    },
    boxDecoration:{
        ...style.boxDecoration,
        paddingTop: 0
    },
    dateInput:{
        borderWidth:0,
        paddingLeft:0,
        marginLeft: 0,
        alignItems:"flex-end",
    },
    row:{
        flexDirection:'row',
        display:"flex",
        alignItems:"center",
        borderBottomWidth:1,
        borderBottomColor: color.disableColor,
        paddingTop: size.containerPaddingSize,
        paddingBottom: size.containerPaddingSize,
    },
    lastRow:{
        borderBottomWidth: 0,
        paddingBottom: 0
    },
    avater:{
        width: size.bigAvaterSize,
        height: size.bigAvaterSize,
        borderRadius:size.bigAvaterSize,
        // 显示模式：缩略全显contain，拉升全显（会变形）stretch，裁剪后显示（默认）cover
        resizeMode:'cover',
    },
    title:{
        flex:1
    },
    arrow:{
        width: size.smallIconSize,
        height: size.smallIconSize,
        marginLeft:size.smallIconSize
    },
    logoutBtn:{
        marginTop: size.containerPaddingSize,
        padding:size.containerPaddingSize,
        backgroundColor: color.warnColor,
        alignItems: "center",
        justifyContent:"center",
        borderRadius: size.middleRadiusSize,
    },
    textBtn:{
        color:color.whiteColor
    }
});

import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,TouchableOpacity,TextInput} from 'react-native';
import {ActivityIndicator, Button} from '@ant-design/react-native';
import {updateUserService} from "../service";
import {connect} from 'react-redux';
import {getUserData} from '../../store/actions';
import DatePicker from "react-native-datepicker";

class  MovieEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.navigation.state.params.value,
            loading:false,
        }
    }

    /**
     * @author: wuwenqiang
     * @description: 点击放回按钮
     * @date: 2021-05-15 21:04
     */
    goBack=()=>{
        this.props.navigation.goBack();
    };


    /**
     * @author: wuwenqiang
     * @description: 渲染编辑框
     * @date: 2021-05-15 21:04
     */
    renderWidget(){
        const {type} = this.props.navigation.state.params;
        const {value} = this.state;
        switch(type){
            case "input":
                return (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={value}
                            style={styles.input}
                            onChangeText={value=>this.setState({value})}
                            value={value}
                        />
                    </View>
                );
            case "radio"://性别
                return (
                    <View style={styles.radioBody}>
                        <TouchableOpacity onPress={()=>this.setState({value:"男"})}>
                            <View style={[styles.radio,styles.radioLine]}>
                                <Text style={styles.radioText}>男</Text>
                                {value == "男" ? <Image style={styles.yesIcon} source={require("../../static/image/icon_yes.png")}/>:null}
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>this.setState({value:"女"})}>
                            <View style={styles.radio}>
                                <Text style={styles.radioText}>女</Text>
                                {value == "女" ? <Image style={styles.yesIcon} source={require("../../static/image/icon_yes.png")}/>:null}
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            case "date":
                return (
                    <View style={styles.dateInputWrapper}>
                        <DatePicker
                            customStyles={{dateInput:styles.dateInput}}
                            date={value}
                            mode="datetime"
                            format="YYYY-MM-DD"
                            confirmBtnText="确定"
                            cancelBtnText="取消"
                            showIcon={false}
                            onDateChange={value=>this.setState({value})}
                        />
                    </View>
                );
            default :
                return null
        }
    }

    /**
     * @author: wuwenqiang
     * @description: 保存用户信息
     * @date: 2021-05-17 11:10
     */
    onSave=()=>{
        const {field} = this.props.navigation.state.params;
        const {value} = this.state;
        const {userData} = this.props;
        let myUserData = JSON.parse(JSON.stringify(userData));
        myUserData[field] = value;
        this.setState({loading:true});
        updateUserService(myUserData).then(()=>{
            this.props.dispatch(getUserData(myUserData));//更新用户信息
            this.props.navigation.goBack();
        }).finally(()=>{
            this.setState({loading:false});
        });
    };

    render() {
        const {title,isAllowEmpty,value:primaryValue} = this.props.navigation.state.params;
        const {value,loading} = this.state;
        return (
            <View>
                <View style={styles.headers}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require("../../static/image/icon_back.png")} style={styles.backIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <Button type="primary" disabled={!isAllowEmpty && !value || primaryValue == value} onPress={this.onSave} >保存</Button>
                </View>
                {
                    this.renderWidget()
                }
                {loading ? <ActivityIndicator color="#1890ff" size="large"></ActivityIndicator> : null}
            </View>
        )
    }
}

export default  connect((state)=>{
    let {userData} = state;
    return {
        userData
    }
})(MovieEditPage);

const styles = StyleSheet.create({
    radioBody:{
        backgroundColor:"#fff",
        marginTop: 20
    },
    headers:{
        paddingTop:20,
        display: "flex",
        flexDirection:"row",
        position:"relative",
        alignItems:"center",
        paddingLeft: 20,
        paddingRight: 20
    },
    backIcon:{
        width: 25,
        height: 25
    },
    title:{
        flex:1,
        textAlign:"center",
        fontSize:14
    },
    inputWrapper:{
        paddingLeft: 20,
        paddingRight: 20
    },
    input:{
        borderBottomColor:"#ddd",
        borderBottomWidth:1,
    },
    radio:{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 20,
        height: 60
    },
    radioLine:{
        borderBottomColor: "#eee",
        borderBottomWidth: 1,
    },
    radioText:{
        flex: 1
    },
    yesIcon:{
        width: 25,
        height: 25
    },
    dateWrapper:{
        height: 40,
        alignItems: "center"
    },
    dateInput:{
        borderWidth:0,
        paddingLeft:0,
        marginLeft: 0,
        alignItems:"flex-start",
        height:20
    },
    dateInputWrapper:{
        height:50 ,
        marginLeft:20,
        marginRight:20,
        borderBottomWidth:1,
        borderBottomColor:"#ddd"
    }
});

import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import {connect} from "react-redux";
import {loginService} from "../service"
import {getToken, getUserData} from '../../store/actions';
import StorageUtil from "../../utils/StorageUtil";
import {Toast,Provider,ActivityIndicator} from '@ant-design/react-native';
class  MovieLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId:"吴时吴刻",
            password:"123456",
            loading: false
        }
    }

    render() {
        const {password,userId,loading} = this.state;
        return (
            <Provider>
                <View style={styles.wrapper}>
                    <View style={styles.form}>
                        <Text>账号:</Text>
                        <TextInput
                            onChangeText={text=>this.setState({userId:text})}
                            placeholder="请输入账号"
                            style={styles.input}
                            value={userId}
                        />
                    </View>

                    <View style={styles.form}>
                        <Text>密码:</Text>
                        <TextInput
                            textContentType="password"
                            keyboardType="default"
                            secureTextEntry={true}
                            onChangeText={text=>this.setState({password:text})}
                            placeholder="请输入密码"
                            password={true}
                            style={styles.input}
                            value={password}
                        />
                    </View>

                    <TouchableOpacity onPress={this.login}>
                        <View style={styles.logoutBtn}><Text style={styles.textBtn}>登录</Text></View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.register}>
                        <View style={styles.registerBtn}><Text>注册</Text></View>
                    </TouchableOpacity>
                    {loading ? <ActivityIndicator color="#1890ff" size="large"/> : null}
                </View>
            </Provider>
        );
    }

    login=()=>{
        const {userId,password,loading} = this.state;
        if(loading)return ;
        if(!userId){
            return Toast.fail('请输入账号');
        }else if(!password){
            return Toast.fail('请输入密码');
        }
        this.setState({loading:true});
        loginService(userId,password).then((res)=>{
            this.props.dispatch(getToken(res.token));
            this.props.dispatch(getUserData(res.data));
            StorageUtil.set("token",res.token);
            this.setState({loading:false});
            Toast.success('登录成功');
            setTimeout(()=>{
                this.props.navigation.push('Home');
            },1000);
        }).catch(()=>{
            Toast.fail('失败成功');
        }).finally(()=>{
            this.setState({loading:false});
        })
    }

    registerBtn=()=>{

    }
}

export default  connect((state)=>{
   return {}
})(MovieLoginPage);

const styles = StyleSheet.create({
    wrapper:{
        paddingTop: 150,
        flex: 1
    },
    form:{
        display:"flex",
        flexDirection:"row",
        marginLeft: 20,
        marginRight: 20,
        marginTop:20,
        justifyContent:"center",
        alignItems:"center"
    },
    input:{
        flex:1,
        marginLeft: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd"
    },
    logoutBtn:{
        margin:20,
        padding:10,
        backgroundColor:"#f7453b",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 10,
    },
    registerBtn:{
        marginLeft:20,
        marginRight:20,
        padding:10,
        borderWidth: 1,
        borderColor:"#ddd",
        alignItems: "center",
        justifyContent:"center",
        borderRadius: 10,
    },
    textBtn:{
        color:"#fff"
    }
});

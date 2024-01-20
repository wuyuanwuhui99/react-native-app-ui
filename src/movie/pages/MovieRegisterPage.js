import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button} from 'react-native';
import {connect} from "react-redux";
import {registerService,verifyUserIdService} from "../service"
import {getToken, getUserData} from '../../store/actions';
import StorageUtil from "../../utils/StorageUtil";
import {Toast, Provider, ActivityIndicator} from '@ant-design/react-native';
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';
import * as color from '../../theme/Color';

class MovieRegisterPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            password: "",
            comfirmPassword:'',
            username:'',
            sex:'',
            telephone:'',
            email:'',
            borthday:'',
            region:'',
            sign:'',
            loading: false
        }
    }

    async componentDidMount() {
        let password = await StorageUtil.get(this.props.userData.userId);
        this.setState({
            password
        });
    }

    render() {
        const {
            userId,
            password,
            comfirmPassword,
            username,
            sex,
            telephone,
            email,
            borthday,
            region,
            sign,
            loading
        } = this.state;
        return (
            <Provider>
                <View style={styles.pageWrapper}>
                    <View style={styles.boxDecoration}>
                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.requireText}>*</Text>
                                <Text>账号:</Text>
                            </View>
                            <TextInput
                                onChangeText={text => this.setState({userId: text})}
                                onBlur = {this.verifyUserId}
                                placeholder="请输入账号"
                                style={styles.input}
                                value={userId}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.requireText}>*</Text>
                                <Text>密码:</Text>
                            </View>
                            <TextInput
                                textContentType="password"
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={text => this.setState({password: text})}
                                placeholder="请输入密码"
                                password={true}
                                style={styles.input}
                                value={password}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.requireText}>*</Text>
                                <Text>确认密码:</Text>
                            </View>
                            <TextInput
                                textContentType="password"
                                keyboardType="default"
                                secureTextEntry={true}
                                onChangeText={text => this.setState({comfirmPassword: text})}
                                placeholder="请输入确认密码"
                                password={true}
                                style={styles.input}
                                value={comfirmPassword}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text style={styles.requireText}>*</Text>
                                <Text>昵称:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({username: text})}
                                placeholder="请输入昵称"
                                style={styles.input}
                                value={username}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>性别:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({sex: text})}
                                placeholder="请选择性别"
                                style={styles.input}
                                value={sex}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>手机号码:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({telephone: text})}
                                placeholder="请输入手机号码"
                                style={styles.input}
                                value={telephone}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>邮箱:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({email: text})}
                                placeholder="请输入邮箱"
                                style={styles.input}
                                value={email}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>出生日期:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({borthday: text})}
                                placeholder="请选择出生日期"
                                style={styles.input}
                                value={borthday}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>地区:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({region: text})}
                                placeholder="请输入地区"
                                style={styles.input}
                                value={region}
                            />
                        </View>

                        <View style={styles.form}>
                            <View style={styles.titleWrapper}>
                                <Text>个性签名:</Text>
                            </View>

                            <TextInput
                                onChangeText={text => this.setState({sign: text})}
                                placeholder="请输入个性签名"
                                style={styles.input}
                                value={sign}
                            />
                        </View>
                    </View>
                    {loading ? <ActivityIndicator color="#1890ff" size="large"/> : null}
                    <TouchableOpacity onPress={this.register} style={styles.registerBtn}>
                        <Text style={styles.registerBtnColor}>登录</Text>
                    </TouchableOpacity>
                </View>
            </Provider>
        );
    }

    /**
     * @author: wuwenqiang
     * @description: 注册
     * @date: 2024-1-20 13:02
     */
    register = async () => {
        let {userId, password, loading, comfirmPassword, username} = this.state;
        if (!userId) {
            Toast.fail('请输入账号');
        } else if (!password) {
            Toast.fail('请输入密码');
        } else if (password.length < 6) {
            Toast.fail('请输入大于或等于6位数的密码');
        } else if (password.length > 18) {
            Toast.fail('请输入小于或等于18位数的密码');
        } else if (!comfirmPassword) {
            Toast.fail('请输入确认密码');
        } else if (!username) {
            Toast.fail('请输入昵称');
        } else if (comfirmPassword !== password) {
            Toast.fail('确认密码不一致');
        } else {
            if(loading)return ;
            const pass = await this.verifyUserId();
            if(!pass){
                return loading = false;
            }
            this.setState({loading: true});
            registerService(this.state).then((res) => {
                this.props.dispatch(getToken(res.token));
                this.props.dispatch(getUserData(res.data));
                StorageUtil.set("token", res.token);
                StorageUtil.set(userId, password);
                this.setState({loading: false});
                Toast.success('登录成功');
                this.props.navigation.replace('Home');
            }).catch(() => {
                Toast.fail('失败成功');
            }).finally(() => {
                this.setState({loading: false});
            })
        }

    };

    /**
     * @author: wuwenqiang
     * @description: 校验账号是否存在
     * @date: 2024-1-20 13:02
     */
    verifyUserId = async () => {
        return verifyUserIdService(this.state.userId).then((res)=>{
            if(res.data > 0){
                Toast.fail('账号已存在');
                return false
            }else{
                return true
            }
        }).catch((e)=>{
            console.log(e)
        })
    }
}

export default connect((state) => {
    return {}
})(MovieRegisterPage);

const styles = StyleSheet.create({
    pageWrapper: {
        ...style.pageStyle,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
    },
    boxDecoration: {
        ...style.boxDecoration,
        display: 'flex',
        alignItems: 'center',
        paddingTop:0
    },
    form: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    titleWrapper:{
        width: '20%',
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    requireText:{
        color:color.warnColor
    },
    input: {
        flex: 1,
        marginLeft: size.smallMarginSize,
        borderBottomWidth: 1,
        borderBottomColor: color.borderColor
    },
    registerBtn: {
        marginTop: size.containerPaddingSize,
        padding: size.containerPaddingSize,
        backgroundColor: color.warnColor,
        alignItems: "center",
        width: '100%',
        justifyContent: "center",
        borderRadius: size.bigRadiusSize * 2,
    },
    registerBtnColor: {
        color: color.whiteColor,
    },
});

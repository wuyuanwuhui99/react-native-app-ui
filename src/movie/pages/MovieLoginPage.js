import React, {Component} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Button} from 'react-native';
import {connect} from "react-redux";
import {loginService} from "../service"
import {getToken, getUserData} from '../../store/actions';
import StorageUtil from "../../utils/StorageUtil";
import {Toast, Provider, ActivityIndicator} from '@ant-design/react-native';
import * as size from '../../theme/Size';
import * as style from '../../theme/Style';
import * as color from '../../theme/Color';

class MovieLoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: this.props.userData.userId,
            password: "123456",
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
        const {password, userId, loading} = this.state;
        return (
            <Provider>
                <View style={styles.pageWrapper}>
                    <View style={styles.boxDecoration}>
                        <Image style={styles.logo} source={require('../../static/image/icon_logo.png')}/>
                        <View style={styles.form}>
                            <Text>账号:</Text>
                            <TextInput
                                onChangeText={text => this.setState({userId: text})}
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
                                onChangeText={text => this.setState({password: text})}
                                placeholder="请输入密码"
                                password={true}
                                style={styles.input}
                                value={password}
                            />
                        </View>

                        <TouchableOpacity style={styles.loginBtn} onPress={this.login}>
                            <Text style={styles.loginBtnColor}>登录</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.register} style={styles.registerBtn}>
                            <Text>注册</Text>
                        </TouchableOpacity>
                    </View>
                    {loading ? <ActivityIndicator color="#1890ff" size="large"/> : null}
                </View>
            </Provider>
        );
    }

    login = () => {
        const {userId, password, loading} = this.state;
        if (loading) return;
        if (!userId) {
            return Toast.fail('请输入账号');
        } else if (!password) {
            return Toast.fail('请输入密码');
        }
        this.setState({loading: true});
        loginService(userId, password).then((res) => {
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
    };

    register = () => {
        this.props.navigation.replace('MovieRegisterPage');
    }
}

export default connect((state) => {
    let {userData} = state;
    return {
        userData
    }
})(MovieLoginPage);

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
        flex: 1,
        marginBottom: size.containerPaddingSize
    },
    logo: {
        width: size.bigAvaterSize,
        height: size.bigAvaterSize,
        marginTop: size.containerPaddingSize
    },
    form: {
        display: "flex",
        flexDirection: "row",
        marginTop: size.containerPaddingSize,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        flex: 1,
        marginLeft: size.smallMarginSize,
        borderBottomWidth: 1,
        borderBottomColor: color.borderColor
    },
    loginBtn: {
        marginTop: size.containerPaddingSize,
        padding: size.containerPaddingSize,
        backgroundColor: color.warnColor,
        alignItems: "center",
        width: '100%',
        justifyContent: "center",
        borderRadius: size.bigRadiusSize,
    },
    loginBtnColor: {
        color: color.whiteColor,
    },
    registerBtn: {
        width: '100%',
        marginTop: size.containerPaddingSize,
        padding: size.containerPaddingSize,
        borderWidth: 1,
        borderColor: color.disableColor,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: size.bigRadiusSize,
    },
});

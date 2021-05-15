import React, {Component} from 'react';
import {StyleSheet, View, Text, Image,TouchableOpacity,TextInput} from 'react-native';
import {Button} from '@ant-design/react-native';
export default class  EditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value:this.props.navigation.state.params.value
        }
    }

    /**
     * @author: wuwenqiang
     * @description: 点击放回按钮
     * @date: 2021-05-15 21:04
     */
    goBack=()=>{
        this.props.navigation.goBack();
    }

    /**
     * @author: wuwenqiang
     * @description: 输入框改变事件
     * @date: 2021-05-15 21:04
     */
    changeValue=(value)=>{
        this.setState({value});
    }

    /**
     * @author: wuwenqiang
     * @description: 渲染编辑框
     * @date: 2021-05-15 21:04
     */
    renderWidge(){
        const {type} = this.props.navigation.state.params;
        const {value} = this.state;
        switch(type){
            case "input":
                return (
                    <View style={styles.inputWrapper}>
                        <TextInput
                            value={value}
                            style={styles.input}
                            onChangeText={this.changeValue}
                            value={value}
                        ></TextInput>
                    </View>
                )
            default :
                return null
        }
    }

    onSave=()=>{
        const {title,isAllowEmpty} = this.props.navigation.state.params;
        const {value} = this.state;

    }

    render() {
        const {title,isAllowEmpty} = this.props.navigation.state.params;
        const {value} = this.state;
        return (
            <View>
                <View style={styles.headers}>
                    <TouchableOpacity onPress={this.goBack}>
                        <Image source={require("../static/image/icon-back.png")} style={styles.backIcon}/>
                    </TouchableOpacity>
                    <Text style={styles.title}>{title}</Text>
                    <Button type="primary" disabled={!isAllowEmpty && !value} onPress={this.onSave} >保存</Button>
                </View>
                {
                    this.renderWidge()
                }
            </View>
        )
    }
}


const styles = StyleSheet.create({
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
        width: 30,
        height: 30
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
    }
});

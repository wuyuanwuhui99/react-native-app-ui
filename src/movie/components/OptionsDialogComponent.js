import React, {Component} from 'react';
import {StyleSheet, View, Text,TouchableOpacity,Modal} from 'react-native';
import PropTypes from 'prop-types';
import * as color from "../../theme/Color";
import * as size from "../../theme/Size";
import * as style from "../../theme/Style";

export default class  OptionsDialogComponent extends Component {
    constructor(props){
        super(props);
    }

    //类型检测方法一
    static propTypes={
        options:PropTypes.array,
        onCheck:PropTypes.function,
        onCancle:PropTypes.function,
        visibleDialog:PropTypes.boolean
    };

    //设置默认属性方法一
    static defaultProps={
        options:[],
        onCheck:()=>{},
        onCancle:()=>{},
        visibleDialog:false
    };

    componentDidMount() {
        this.setState({visibleDialog:this.props.visibleDialog})
    }

    /**
     * @author: wuwenqiang
     * @description: 点击选中
     * @date: 2024-1-1 18:31
     */
    useCheck = (item)=>{
        this.setState({visibleDialog:false});
        this.props.onCheck(item);
        this.props.onCancle();
    };

    render(){
        const {options,onCancle,visibleDialog} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                onRequestClose={() => {
                    onCancle()
                }}
                visible={visibleDialog}
                style={styles.modalWrapper}
            >
                <TouchableOpacity onPress={onCancle} style={styles.modalMask}/>
                <View style={styles.contentWrapper}>
                    <TouchableOpacity style={styles.mask} onPress={onCancle}/>
                    <View style={styles.modalContent}>
                        <View style={styles.actionWrap}>
                            {
                                options.map((item,index)=>{
                                    return (
                                        <TouchableOpacity onPress={()=>this.useCheck(item)} style={{...styles.option,...(index === options.length -1 ? {} :styles.divider)}}>
                                            <Text>{item}</Text>
                                        </TouchableOpacity>
                                    )
                                })
                            }
                        </View>
                        <TouchableOpacity style={styles.cancelBtn} onPress={onCancle}><Text>取消</Text></TouchableOpacity>
                    </View>
                </View>
            </Modal>
        )
    }

    goUserPage=()=>{
        this.props.navigation.push('MovieUserPage');
    }
}


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
    alignment:{
        justifyContent:'center',
        alignItems:'center'
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
    }
});

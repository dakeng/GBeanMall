import React, { Component } from 'react';
import {Text, Image, View, TextInput, TouchableOpacity} from 'react-native';
import {styles, deviceWidth, deviceHeight} from './../../common/modules/styles';

class Header extends Component {
    render(){
        return (
            <Image source={require('./../../img/left.png')} style={{width: 20,height: 20}}/>
        );
    }
}

export default class SignInOrUp extends Component {
    static navigationOptions = ({navigation}) => {
       return {
            signIn: navigation.state.params.signIn,
            headerStyle: {
                backgroundColor: '#e94f37',
                elevation: 0,
            },
            headerTitleStyle: {
                fontSize: 20,
            },
            headerTintColor: '#fff',
        };
    }

    setStyle = () => {
        let defaultStyle = [pageStyles.input];
        if(this.props.navigation.state.params.signIn){
            defaultStyle.push(pageStyles.pwInput);
        }else{
            defaultStyle.push(pageStyles.middleInput);
        }
        //console.log(defaultStyle);
        return defaultStyle;
    }

    constructor(props){
        super(props);
        this.state = {
            username: '',
            password: '',
            ensurePassword: '',
        }
    }

    render(){
        //console.log(this.props);
        return (
            <View style={[pageStyles.container]}>
                <View style={[pageStyles.inputContainer, styles.verticalAlign]}>
                    <TextInput
                        style={[pageStyles.input, pageStyles.unInput]}
                        placeholder="用户名"
                        placeholderTextColor="#bcbcbc"
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => this.setState({username: text})}
                    />
                    <TextInput
                        secureTextEntry={true}
                        style={this.setStyle()}
                        placeholder="密码"
                        placeholderTextColor="#bcbcbc"
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => this.setState({password: text})}
                    />
                    {
                        !this.props.navigation.state.params.signIn &&
                        <TextInput
                            secureTextEntry={true}
                            style={[pageStyles.input, pageStyles.pwInput]}
                            placeholder="确认密码"
                            placeholderTextColor="#bcbcbc"
                            underlineColorAndroid={'transparent'}
                            onChangeText={text => this.setState({ensurePassword: text})}
                        />
                    }
                    {
                        this.props.navigation.state.params.signIn ?
                        <TouchableOpacity
                            style={[pageStyles.btn, styles.verticalAlign]}>
                            <Text style={pageStyles.btnText}>登录</Text>
                        </TouchableOpacity> : 
                        <TouchableOpacity style={[pageStyles.btn, styles.verticalAlign]}>
                            <Text style={pageStyles.btnText}>注册</Text>
                        </TouchableOpacity>
                    }
                    {
                        this.props.navigation.state.params.signIn && 
                        <View style={[styles.spaceBetween, pageStyles.subContainer]}>
                            <TouchableOpacity>
                                <Text style={[pageStyles.subText, pageStyles.leftText]}>忘记密码？</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={e => this.props.navigation.navigate('SignInOrUp', {signIn: false})}>
                                <Text style={[pageStyles.subText]}>注册账户</Text>
                            </TouchableOpacity>
                        </View>
                    }
                </View>
            </View>
        );
    }
}

let pageStyles = {
    headerContainer: {

    },
    container: {
        width: deviceWidth,
        height: deviceHeight,
        backgroundColor: '#e94f37',
    },
    inputContainer:{
        marginTop: 12,
    },
    input: {
        width: deviceWidth/1.12,
        height: 54,
        backgroundColor: '#fff',
        padding: 16,
        fontSize: 16
    },
    unInput: {
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
    },
    middleInput: {
        marginTop: -0.7,
        borderTopWidth: 0.3,
        borderTopColor: '#dcdcdc',
    },
    pwInput: {
        marginTop: -0.7,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2,
        borderTopWidth: 0.3,
        borderTopColor: '#dcdcdc',
    },
    btn: {
        width: deviceWidth/1.12,
        height: 48,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        marginTop: 12,
        borderRadius: 2,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
    },
    subContainer: {
        width: deviceWidth/1.12,
        marginTop: 12,
    },
    subText: {
        color: '#fff',
        fontSize: 14,
    },
    leftText: {
        color: 'rgba(255, 255, 255, 0.5)',
    }
}
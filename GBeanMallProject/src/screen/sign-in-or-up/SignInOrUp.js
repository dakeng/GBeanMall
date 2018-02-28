import React, { Component } from 'react';
import {Text, Image, View} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

class Header extends Component {
    render(){
        return (
            <Image source={require('./../../img/left.png')} style={{width: 20,height: 20}}/>
        );
    }
}

export default class SignInOrUp extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#e94f37',
        },
        headerTitleStyle: {
            fontSize: 20,
        },
        headerTintColor: '#fff',
    }

    render(){
        return (
            <View style={pageStyles.container}>
                <Text>登录</Text>
            </View>
        );
    }
}

let pageStyles = {
    headerContainer: {

    },
    container: {
        backgroundColor: '#e94f37',
    }
}
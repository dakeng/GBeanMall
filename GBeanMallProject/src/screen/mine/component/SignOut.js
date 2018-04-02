import React, {Component} from 'react';
import {View, Text, TouchableHighlight} from 'react-native';
import testHost from './../../../cfg/const';

import requestSignOut from  './../../sign-in-or-up/modules/request-sign-up';

export default class SignOut extends Component{
    constructor(props){
        super(props);
    }

    signOut = () => {
        let data = {
            operate: 2, //0：注册，1：登录，2：退出登录
        };
        requestSignOut(data, this.props.refreshData);
    }

    render (){
        return (
            <TouchableHighlight
                style={signOutStyle.container}
                onPress={() =>  this.signOut()}
            >
                <View style={signOutStyle.viewContainer}>
                    <Text style={signOutStyle.text}>退出登录</Text>
                </View>
            </TouchableHighlight>
        );
    }
}

let signOutStyle = {
    container: {
        backgroundColor: '#fff',
        marginTop: 12,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#434343',
        fontSize: 16,
    }
}
import React, {Component} from 'react';
import {Text, Image, Button, View, StyleSheet} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

export default class MineScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../../img/account.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        header: null,
    };

    render(){
        return(
            <View>
                <View style={MineStyles.accountContainer}>
                    <Image source={require('./../../img/head.png')}/>
                    <Text>登录</Text>
                </View>
            </View>
        );
    }
}

const MineStyles = StyleSheet.create({
    accountContainer: {
        padding: 16,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    }
});
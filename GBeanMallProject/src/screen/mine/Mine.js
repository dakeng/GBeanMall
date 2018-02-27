import React, {Component} from 'react';
import {Text, Image, Button, View, StyleSheet, TouchableHighlight} from 'react-native';
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
                    <Image source={require('./../../img/head.png')} style={MineStyles.headPic}/>
                    <View style={MineStyles.signInBtn}>
                        <Button title="登录" onPress={e => console.log('点击登录')} color='#e94f37'/>
                    </View>
                </View>
            </View>
        );
    }
}

const MineStyles = StyleSheet.create({
    accountContainer: {
        paddingTop: 36,
        paddingBottom: 24,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headPic: {
        width: deviceWidth/6,
        height: deviceWidth/6,
    },
    signInBtn: {
        width: deviceWidth/4,
        margin: 16,
    },
    btnText: {
        color: '#fff',
    }
});
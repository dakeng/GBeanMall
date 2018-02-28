import React, {Component} from 'react';
import {Text, Image, Button, View, StyleSheet, TouchableHighlight} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

class MineTitle extends Component {
    render() {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: deviceWidth,
                }}
            >
                <Text style={{fontSize: 20, color: '#fff'}}>我</Text>
            </View>
        );
    }
}

export default class MineScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../../img/account.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerStyle: {
            elevation: 0,
            backgroundColor: '#e94f37',
        },
        headerTitle: <MineTitle/>
    };

    render(){
        return(
            <View>
                <TouchableHighlight onPress={e => this.props.navigation.navigate('SignInOrUp')}>
                    <View style={MineStyles.accountContainer}>
                        <View style={MineStyles.leftContainer}>
                            <Image source={require('./../../img/head.png')} style={MineStyles.headPic}/>
                            <Text style={MineStyles.btnText}>登录/注册</Text>
                        </View>
                        <Image source={require('./../../img/enter.png')} style={MineStyles.enterIcon}/>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const MineStyles = StyleSheet.create({
    accountContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: 8,
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headPic: {
        margin: 10,
        width: deviceWidth/6,
        height: deviceWidth/6,
    },
    signInBtn: {
        width: deviceWidth/4,
        marginRight: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#434343',
        fontSize: 18,
    },
    enterIcon: {
        width: 22,
        height: 22,
        margin: 10,
    },
});
import React, {Component} from 'react';
import {View, Image, Text, Dimensions, TouchableHighlight, DeviceEventEmitter} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

class Title extends Component {
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
                <Image source={require('./../../img/game-title.png')} style={{width: 22,height: 22, marginRight: 8}}/>
                <Text style={{fontSize: 20, color: '#fff'}}>游戏中心</Text>
            </View>
        );
    }
}

export default class GameCentre extends Component{
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#e94f37',
            elevation: 0,
        },
        headerLeft: null,
        headerTitle: <Title/>
    };

    render() {
        return (
            <View></View>
        );
    }
}

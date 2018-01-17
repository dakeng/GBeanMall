import React, {Component} from 'react';
import {Text, Image} from 'react-native';
import styles from './modules/styles';

export default class MineScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../img/account.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <Text>Mine</Text>
        )
    }
}
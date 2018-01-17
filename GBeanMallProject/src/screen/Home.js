import React, {Component} from 'react';
import {Text, Image} from 'react-native';
import styles from './modules/styles';

export default class HomeScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../img/all.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <Text>Home</Text>
        )
    }
}
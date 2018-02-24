import React, {Component} from 'react';
import {Text, Image, Button} from 'react-native';
import {styles} from './../../common/modules/styles';

export default class CartScreen extends Component{
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
            <Text>Mine</Text>
        )
    }
}
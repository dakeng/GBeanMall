import React, {Component} from 'react';
import {Text, Image} from 'react-native';
import styles from './modules/styles';

export default class CartScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '购物车',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../img/cart.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    render(){
        return(
            <Text>Cart</Text>
        )
    }
}
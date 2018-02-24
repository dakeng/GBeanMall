import React, {Component} from 'react';
import {Text, Image, Button} from 'react-native';
import styles from './../../common/modules/styles';

class CartTitle extends Component {
    render() {
        return (
            <View>
                <Text>购物车</Text>
                <image source={require('./../../img/position.png')} />
            </View>
        );
    }
}

export default class CartScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '购物车',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../../img/cart.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerTitle: <CartTitle />,
        headerRight: (
            <Button
                onPress={() => alert('This is a button!')}
                title="Info"
                color="#fff"
            />
        ),
    };

    render(){
        return(
            <Text>Cart</Text>
        )
    }
}
import React, {Component} from 'react';
import {View, Text, Image, Button} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

class CartTitle extends Component {
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
                <Text style={{fontSize: 20, color: '#333'}}>购物车</Text>
                <Image style={{width: 18, height: 18}} source={require('./../../img/position.png')} />
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
        headerTitleStyle: {
            alignSelt: 'center',
        }
    };

    render(){
        return(
            <Text>Cart</Text>
        )
    }
}
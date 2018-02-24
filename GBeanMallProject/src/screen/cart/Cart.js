import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet} from 'react-native';
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
        headerStyle: {
            borderBottomColor: '#dcdcdc',
            borderBottomWidth: 0.5,
            elevation: 0,
        },
        headerTitle: <CartTitle />,
    };

    render(){
        return(
            <View style={CartStyles.container}>
                <Text>您的购物车空空如也~</Text>
            </View>
        )
    }
}

const CartStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 28,
        flexDirection: 'column',
        alignItems: 'center',
    },
    textCenter: {
        textAlign: 'center',
    }
});
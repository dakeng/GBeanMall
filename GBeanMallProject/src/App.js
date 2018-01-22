import React from 'react';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import HomeScreen from './screen/Home';
import CartScreen from './screen/Cart';
import MineScreen from './screen/Mine';

const Tab = TabNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: HomeScreen.navigationOptions,
        },
        Cart: {
            screen: CartScreen,
            navigationOptions: CartScreen.navigationOptions,
        },
        Mine: {
            screen: MineScreen,
            navigationOptions: MineScreen.navigationOptions,
        },
    },
    {
        tabBarComponent: TabBarBottom,
        tabBarPosition: 'bottom',
        swipeEnabled: false,
        animationEnabled: true,
        lazyLoad: true,
        tabBarOptions: {
            activeTintColor: '#1296db',
            activeBackgroundColor: '#fff',
            inactiveTintColor: '#333',
            inactiveBackgroundColor: '#fff',
            showLabel: true,
            style: {
                backgroundColor: '#fff',
            },
            labelStyle: {
                fontSize: 12,
            },
        }
    },
);

export default Tab;
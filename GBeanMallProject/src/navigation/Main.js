import React from 'react';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Tab from './Tab';
import CommodityDetail from './../screen/commodity-detail/CommodityDetail';

const Main = StackNavigator(
    {
        Tab: {
            screen: Tab,
        },
        CommodityDetail: {
            screen: CommodityDetail,
            navigationOptions: ({navigation}) => ({
                title: navigation.state.params.title,
            }),
        },
    },
);

export default Main;
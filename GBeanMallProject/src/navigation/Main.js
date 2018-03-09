import React from 'react';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Tab from './Tab';
import CommodityDetail from './../screen/commodity-detail/CommodityDetail';
import SignInOrUp from './../screen/sign-in-or-up/SignInOrUp';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'

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
        SignInOrUp: {
            screen: SignInOrUp,
            navigationOptions: SignInOrUp.navigationOptions,
        },
    },
    {
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),
    }
);

export default Main;
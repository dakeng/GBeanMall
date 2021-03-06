import React from 'react';
import {StackNavigator,TabNavigator,TabBarBottom} from 'react-navigation';
import Tab from './Tab';
import CommodityDetail from './../screen/commodity-detail/CommodityDetail';
import TaskCentre from './../screen/task-centre/TaskCentre';
import GameCentre from './../screen/game-centre/GameCentre';
import SignInOrUp from './../screen/sign-in-or-up/SignInOrUp';
import Order from './../screen/order/Order';
import MyOrder from './../screen/order/MyOrder';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

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
        TaskCentre: {
            screen: TaskCentre,
            navigationOptions: TaskCentre.navigationOptions
        },
        GameCentre: {
            screen: GameCentre,
            navigationOptions: GameCentre.navigationOptions
        },
        SignInOrUp: {
            screen: SignInOrUp,
            navigationOptions: SignInOrUp.navigationOptions,
        },
        Order: {
            screen: Order,
            navigationOptions: Order.navigationOptions,
        },
        MyOrder: {
            screen: MyOrder,
            navigationOptions: MyOrder.navigationOptions,
        }
    },
    {
        transitionConfig: () => ({
            screenInterpolator: CardStackStyleInterpolator.forHorizontal,
        }),
    }
);

export default Main;
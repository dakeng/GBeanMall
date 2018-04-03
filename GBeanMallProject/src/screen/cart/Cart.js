import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, ScrollView, RefreshControl} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';
import utils from './../../common/modules/utils';
import request from './modules/request';
import testHost from './../../cfg/const';

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

    constructor(props){
        super(props);
        this.state = {
            isRefreshing: false,
            commoditys: [],
        }
    }

    _onRefresh = () => {
        this.setState({
            isRefreshing: true,
        })
        this.reloadData();
    }

    reloadData = () => {
        request('GET', {}, (data) => this.setState({
            commoditys: data || [],
            isRefreshing: false
        }));
    }

    componentWillMount(){
        this.reloadData();
    }

    render(){
        //console.log(this.state.commoditys);
        let commoditys = this.state.commoditys;
        return(
            <ScrollView style={CartStyles.container}
                refreshControl={
                    <RefreshControl
                    refreshing={this.state.isRefreshing}
                    onRefresh={this._onRefresh}
                    tintColor="#fff"
                    colors={['#fff']}
                    progressBackgroundColor="#e94f37"
                    />
                }
            >
                {
                    ! utils.isLogin() ? <Text>请先登录~</Text> : 
                        commoditys.length === 0 ? <Text>您的购物车空空如也~</Text> : 
                            commoditys.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <Text>{item.commodity_name}</Text>
                                        <Text>{item.commodity_price}</Text>
                                    </View>
                                );
                            })
                }
            </ScrollView>
        )
    }
}

const CartStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 28,
        flexDirection: 'column',
    },
    textCenter: {
        textAlign: 'center',
    }
});
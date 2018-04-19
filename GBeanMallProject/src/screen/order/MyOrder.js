import React, { Component } from 'react';
import { Text, Image, ScrollView, View, Button, TextInput, TouchableOpacity, ToastAndroid, DeviceEventEmitter } from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';
import toast from './../../common/modules/toast';
import requestGetOrder from './modules/request-get-order';

class Title extends Component {
    render() {
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Text style={{fontSize: 20, color: '#000'}}>我的订单</Text>
            </View>
        );
    }
}

export default class Order extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            title: '我的订单',
            headerStyle: {
                backgroundColor: '#fff',
                elevation: 0,
            },
            headerTitle: <Title/>
        };
    }

    constructor(props){
        super(props);
        this.state = {
            orders: [],
        }
    }

    componentWillMount(){
        requestGetOrder((_orders) => {
            this.setState({
                orders: _orders,
            })
        });
    }

    render() {
        let orders = this.state.orders;
        console.log(orders);
        if (orders.length > 0) {
            return (
                <ScrollView>
                    {
                        orders.map((order, index) => {
                            return (
                                <TouchableOpacity key={index}>
                                    <View style={pageStyles.orderContainer}>
                                        <View style={pageStyles.addressContainer}>
                                            <Text style={[pageStyles.text, pageStyles.addressee]}>{order.addressee}       {order.phone}</Text>
                                            <Text>地址：{order.address}</Text>
                                        </View>
                                        <View style={pageStyles.imgContainer}>
                                        {
                                            order.commoditys.map((commodity, index) => {
                                                return (
                                                    <Image key={index} source={{uri: commodity.commodity_imgs[0]}} style={pageStyles.img}/>
                                                )
                                            })
                                        }
                                        </View>
                                        <View style={pageStyles.payContainer}>
                                            <Text style={[pageStyles.text]}>共{order.commoditys.length}件商品</Text>
                                            <Text style={[pageStyles.text, pageStyles.realPayment]}>实付款：</Text>
                                            <Text style={[pageStyles.text, pageStyles.price]}>￥{order.realPayment}</Text>
                                        </View>
                                        <Text style={{
                                            backgroundColor: '#fff',
                                            color: '#000',
                                            fontSize: 16,
                                            padding: 8,
                                            textAlign: 'right',
                                        }}>{order.state == 0 ? '未付款' : '已付款'}</Text>
                                    </View>
                                </TouchableOpacity>
                            );
                        })
                    }
                </ScrollView>
            );
        }else{
            return(
                <View
                    style={{
                        backgroundColor: '#fff',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Text style={{
                        fontSize: 18,
                        lineHeight: 100,
                    }}>无订单！</Text>
                </View>
            );
        }
    }
}

let pageStyles = {
    text: {
        fontSize: 16,
        color: '#000',
    },
    price:{
        fontSize: 20,
    },
    orderContainer: {
        flexDirection: 'column',
        marginTop: 8,
    },
    addressContainer: {
        padding: 8,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    addressee: {
        marginBottom: 8,
    },
    imgContainer: {
        padding: 8,
        backgroundColor: '#fafafa',
    },
    img: {
        width: deviceWidth/6,
        height: deviceWidth/6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#fff',
    },
    payContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 8,
    },
    realPayment: {
        marginLeft: 8,
    }
}
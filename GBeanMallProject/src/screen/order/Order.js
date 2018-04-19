import React, { Component } from 'react';
import { Text, Image, View, Button, TextInput, TouchableOpacity, ToastAndroid, DeviceEventEmitter } from 'react-native';
import toast from './../../common/modules/toast';
import request from './modules/request';

export default class Order extends Component{

    static navigationOptions = ({navigation}) => {
        return {
            title: '确认订单',
            commoditys: navigation.state.params.commoditys,
            headerStyle: {
                backgroundColor: '#e94f37',
                elevation: 0,
            },
            headerTitleStyle: {
                fontSize: 20,
            },
            headerTintColor: '#fff',
        };
    }

    constructor(props){
        super(props);
        this.state = {
            addressee: '',
            phone: '',
            address: '',
        }
    }

    sum = () => {
        let sum = 0;
        let commoditys = this.props.navigation.state.params.commoditys;
        for(let i = 0; i < commoditys.length; i++){
            sum += commoditys[i].commodity_price;
        }
        return sum;
    }

    pay = () => {
        let commoditys = this.props.navigation.state.params.commoditys;
        if(this.state.addressee.replace(/\s/g, '') == ''){
            toast('请输入收件人姓名');
            return ;
        }else if(!/^\d+$/g.test(this.state.phone) || this.state.phone.length < 6){
            toast('请输入正确的号码');
            return ;
        }else if(this.state.address.replace(/\s/g, '') == ''){
            toast('请输入收件人地址');
            return ;
        }
        let requestData = {
            commodity_ids: commoditys.map((item, index) => {
                return item._id;
            }),
            address: this.state.address,
            addressee: this.state.addressee,
            phone: this.state.phone,
        }
        request(requestData, this.paySuccess);
    }

    paySuccess = () => {
        this.props.navigation.goBack();
        DeviceEventEmitter.emit('refresh');
    }

    render() {
        //console.log(this.props.navigation.state.params.commoditys);
        let commoditys = this.props.navigation.state.params.commoditys;
        return(
            <View>
                <View style={pageStyles.textContainer}>
                    <Text style={pageStyles.textLabel}>收件人：</Text>
                    <TextInput
                        style={pageStyles.textInput}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => this.setState({addressee: text})}
                        maxLength={20}
                    />
                </View>
                <View style={pageStyles.line} scaleY={0.3333}></View>
                <View style={pageStyles.textContainer}>
                    <Text style={pageStyles.textLabel}>联系号码：</Text>
                    <TextInput
                        style={pageStyles.textInput}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => this.setState({phone: text})}
                        maxLength={11}
                    />
                </View>
                <View style={pageStyles.line} scaleY={0.3333}></View>
                <View style={pageStyles.textContainer}>
                    <Text style={pageStyles.textLabel}>收件地址：</Text>
                    <TextInput
                        style={pageStyles.textInput}
                        multiline={true}
                        numberOfLines={3}
                        underlineColorAndroid={'transparent'}
                        onChangeText={text => this.setState({address: text})}
                    />
                </View>
                {
                    commoditys.length > 0 ? 
                    commoditys.map((item, index) => {
                        return (
                            <View key={index} style={pageStyles.goodContainer}>
                                <Image source={{uri: item.commodity_imgs[0]}} style={pageStyles.img}/>
                                <View style={pageStyles.info}>
                                    <Text style={pageStyles.infoName}>{item.commodity_name}</Text>
                                    <Text style={pageStyles.price}>￥{item.commodity_price}</Text>
                                </View>
                            </View>
                        );
                    }) : <View></View>
                }
                <View
                    style={
                        {
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginTop: 8,
                        }
                    }
                >
                    <Text
                        style={
                            {
                                paddingLeft: 10,
                                fontSize: 18,
                            }
                        }
                    >总计：￥{this.sum()}</Text>
                    <TouchableOpacity style={pageStyles.payBtn}
                        onPress={this.pay}
                    >
                        <Text style={pageStyles.payBtnText}>付款</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

let pageStyles = {
    textContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        height: 48,
    },
    textLabel: {
        width: 86,
        fontSize: 16,
        lineHeight: 48,
        paddingLeft: 10,
    },
    textInput: {
        flex: 1,
        fontSize: 16,
    },
    payBtn: {
        backgroundColor: '#e94f37',
        width: 72,
        height: 48,
    },
    payBtnText: {
        fontSize: 18,
        lineHeight: 48,
        textAlign: 'center',
        color: '#fff',
        textAlign: 'center',
    },
    goodContainer: {
        marginTop: 8,
        flexDirection: 'row',
        backgroundColor: '#fff',
    },
    img: {
        width: 72,
        height: 72,
    },
    info: {
        height: 56,
        flexDirection: 'column',
        marginLeft: 8,
    },
    infoName: {
        fontSize: 16,
    },
    price: {
        marginTop: 8,
        fontSize: 16,
        color: 'red',
    },
    line: {
        height: 1,
        backgroundColor: '#dedede',
    }
}
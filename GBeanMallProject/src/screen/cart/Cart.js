import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, ScrollView, RefreshControl, TouchableHighlight, DeviceEventEmitter} from 'react-native';
import {styles, deviceWidth, deviceHeight} from './../../common/modules/styles';
import utils from './../../common/modules/utils';
import request from './modules/request';
import testHost from './../../cfg/const';
import toast from './../../common/modules/toast';

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
            selectedIndex: []
        }
    }

    _onRefresh = () => {
        this.setState({
            isRefreshing: true,
        })
        this.reloadData();
    }

    reloadData = () => {
        request('GET', {}, (data) => {
            /* data = data.map((item, index) => {
                item.isSelected = false;
                return item;
            }); */
            this.setState({
                commoditys: data || [],
                isRefreshing: false
            });
        })
    }

    select = (index) => {
        console.log(index);
        let selectedIndex = this.state.selectedIndex;
        let indexPos = selectedIndex.indexOf(index);
        if(indexPos < 0){
            selectedIndex.push(index);
        }else{
            selectedIndex = selectedIndex.slice(0, indexPos).concat(selectedIndex.slice(indexPos + 1));
        }
        
        this.setState({
            selectedIndex: selectedIndex,
        })
    }

    //购物车合计
    sum = () => {
        let sum = 0;
        for(let i = 0; i < this.state.selectedIndex.length; i++){
            sum += this.state.commoditys[this.state.selectedIndex[i]].commodity_price;
        }
        return sum;
    }

    //去结算
    toCreateOrder = () => {
        if(this.state.selectedIndex.length == 0){
            toast('您未选中要购买的商品')
            return;
        }
        let selectCommoditys = [];
        for(let i = 0; i < this.state.selectedIndex.length; i++){
            selectCommoditys.push(this.state.commoditys[this.state.selectedIndex[i]]);
        }
        console.log(selectCommoditys);
        this.props.navigation.navigate('Order', {commoditys: selectCommoditys});
    }

    delete = (id) => {
        request('POST', {
            operate: 2,
            commodity_id: id,
        }, this.reloadData);
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('refreshCart', this.reloadData)
        this.reloadData();
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    render(){
        let commoditys = this.state.commoditys;
        return(
            <ScrollView
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
                    ! utils.isLogin() ? <Text style={[CartStyles.textCenter, CartStyles.text]}>请先登录~</Text> : 
                        commoditys.length === 0 ? <Text style={[CartStyles.textCenter, CartStyles.text]}>您的购物车空空如也~</Text> : 
                            <View style={CartStyles.container}>
                                <ScrollView style={CartStyles.middleContainer}>
                                {
                                    commoditys.map((item, index) => {
                                        return (
                                            <View key={index} style={CartStyles.goodContainer}>
                                                    <TouchableHighlight
                                                        onPress={() => this.select(index)}
                                                    >
                                                        {
                                                            this.state.selectedIndex.indexOf(index) > -1 ? 
                                                            <Image source={require('./../../img/selected.png')} style={CartStyles.selectIcon}/> : 
                                                            <Image source={require('./../../img/unselected.png')} style={CartStyles.selectIcon}/>
                                                        }
                                                    </TouchableHighlight>
                                                <Image source={{uri: item.commodity_imgs[0]}} style={CartStyles.img}/>
                                                <View style={CartStyles.info}>
                                                    <Text>{item.commodity_name}</Text>
                                                    <Text style={CartStyles.price}>￥{item.commodity_price}</Text>
                                                </View>
                                                <TouchableHighlight
                                                    style={{position: 'absolute',
                                                    top: 8,
                                                    right: 8,}}
                                                    onPress={() => this.delete(item._id)}
                                                >
                                                    <Image style={CartStyles.deleteIcon} source={require('./../../img/delete.png')}/>
                                                </TouchableHighlight>
                                            </View>
                                        );
                                    })
                                }
                                </ScrollView>
                                <View style={CartStyles.acountContainer}>
                                    <Text style={CartStyles.amount}>合计：￥{this.sum()}</Text>
                                    <TouchableHighlight style={CartStyles.accountBtn} onPress={this.toCreateOrder}>
                                        <Text style={{color: '#fff', fontSize: 18, lineHeight: 48, textAlign: 'center'}}>去结算</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>    
                }
            </ScrollView>
        )
    }
}

const CartStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    middleContainer: {
        flex: 1,
    },
    goodContainer: {
        backgroundColor: '#fff',
        marginTop: 8,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    selectIcon: {
        margin: 8,
        width: deviceWidth/14,
        height: deviceWidth/14,
    },
    img: {
        margin: 8,
        marginLeft: 0,
        width: deviceWidth/4,
        height: deviceWidth/4,
    },
    info: {
        flexDirection: 'column',
        height: deviceWidth/4,
        alignContent: 'space-between',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 14,
        color: '#e94f37',
        alignSelf: 'flex-end',
    },
    deleteIcon: {
        width: deviceWidth/18,
        height: deviceWidth/18,
    },
    text: {
        padding: 28,
    },
    textCenter: {
        fontSize: 14,
        textAlign: 'center',
    },
    line: {
        backgroundColor: '#dedede',
        height: 1,
    },
    acountContainer: {
        marginTop: 8,
        height: 48,
        width: deviceWidth,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
    },
    amount: {
        fontSize: 18,
        padding: 10,
    },
    accountBtn: {
        width: 72,
        height: 48,
        backgroundColor: '#e94f37',
    }
});
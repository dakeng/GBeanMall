import React, {Component} from 'react';
import {View, Text, Image, Button, StyleSheet, ScrollView, RefreshControl, TouchableHighlight, DeviceEventEmitter} from 'react-native';
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
                    ! utils.isLogin() ? <Text style={[CartStyles.textCenter, CartStyles.text]}>请先登录~</Text> : 
                        commoditys.length === 0 ? <Text style={[CartStyles.textCenter, CartStyles.text]}>您的购物车空空如也~</Text> : 
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
                                            <Text style={CartStyles.price}>{item.commodity_price}</Text>
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
        )
    }
}

const CartStyles = StyleSheet.create({
    container: {
        
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
        margin: 10,
        marginLeft: 0,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignSelf: 'flex-start',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    price: {
        fontSize: 14,
        marginTop: 10,
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
});
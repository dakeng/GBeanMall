import React, {Component} from 'react';
import {Text, Image, Button, View, StyleSheet, TouchableHighlight, DeviceEventEmitter, AsyncStorage} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

import SignOut from './component/SignOut';
import utils from '../../common/modules/utils';

class MineTitle extends Component {
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
                <Text style={{fontSize: 20, color: '#fff'}}>我</Text>
            </View>
        );
    }
}

export default class MineScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../../img/account.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        headerStyle: {
            elevation: 0,
            backgroundColor: '#e94f37',
        },
        headerTitle: <MineTitle/>
    };

    constructor(props){
        super(props);
        this.state = {
            isLogin: '',
            userData: '',
        }
    }

    refreshData = () => {
        console.log('刷新')
        AsyncStorage.getItem('userData', (err, result) => {
            console.log(result);
            if(err){
                console.log(err);
            }else{
                this.setState({
                    isLogin: utils.isLogin(),
                    userData: JSON.parse(result)
                },() => {
                    console.log(this.state)
                })
            }
        })
    }

    componentWillMount(){
        this.refreshData();
    }

    componentDidMount(){
        this.subscription = DeviceEventEmitter.addListener('refresh', this.refreshData)
    }

    componentWillUnmount(){
        this.subscription.remove();
    }

    render(){
        return(
            <View>
                {
                    ! this.state.isLogin ? 
                    <TouchableHighlight onPress={e => this.props.navigation.navigate('SignInOrUp',{signIn: true})} style={MineStyles.touchContainer}>
                        <View style={MineStyles.accountContainer}>
                            <View style={MineStyles.leftContainer}>
                                <Image source={require('./../../img/head.png')} style={MineStyles.headPic}/>
                                <Text style={MineStyles.btnText}>登录/注册</Text>
                            </View>
                            <Image source={require('./../../img/enter.png')} style={MineStyles.enterIcon}/>
                        </View>
                    </TouchableHighlight>
                    :
                    <TouchableHighlight style={MineStyles.touchContainer}>
                        <View style={MineStyles.accountContainer}>
                            <View style={MineStyles.leftContainer}>
                                <Image source={require('./../../img/head.png')} style={MineStyles.headPic}/>
                                <Text style={MineStyles.btnText}>{this.state.userData && this.state.userData.username}</Text>
                            </View>
                            <View style={MineStyles.rightContainer}>
                                <Image source={require('./../../img/glodenBean.png')} style={MineStyles.gbIcon}/>
                                <Text style={MineStyles.wallet}>{this.state.userData.wallet || 0}</Text>
                            </View>
                        </View>
                    </TouchableHighlight>
                }
                <View
                    style={{
                        backgroundColor: '#dedede',
                        height: 1,
                    }}
                    scaleY={0.333}
                ></View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    height: deviceWidth/4,
                }}>
                    <TouchableHighlight
                        
                    >
                        <View
                            style={{
                                width: deviceWidth/4,
                                height: deviceWidth/4,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Text
                                style={{
                                    color: '#000',
                                    fontSize: 16,
                                    lineHeight: deviceWidth/12,
                                }}
                            >{this.state.userData.wallet || 0}</Text>
                            <Text>金豆</Text>
                        </View>
                    </TouchableHighlight>
                    <View style={{
                        height: deviceWidth/6,
                        width: 1,
                        backgroundColor: '#000',
                    }} scaleX={0.33}></View>
                    <TouchableHighlight
                        onPress={e => {
                            if(this.state.isLogin){
                                this.props.navigation.navigate('MyOrder');
                            }else{
                                this.props.navigation.navigate('SignInOrUp',{signIn: true});
                            }
                        }}
                    >
                        <View
                            style={{
                                width: deviceWidth/4,
                                height: deviceWidth/4,
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Image source={require('./../../img/order.png')} style={{
                                width: deviceWidth/12,
                                height: deviceWidth/12,
                            }}/>
                            <Text>我的订单</Text>
                        </View>
                    </TouchableHighlight>
                </View>
                <SignOut refreshData={this.refreshData.bind(this)}/>
            </View>
        );
    }
}

const MineStyles = StyleSheet.create({
    touchContainer: {
        marginTop: 12,
    }, 
    accountContainer: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    gbIcon: {
        width: 30,
        height: 30,
    },
    headPic: {
        margin: 10,
        width: deviceWidth/6,
        height: deviceWidth/6,
    },
    signInBtn: {
        width: deviceWidth/4,
        marginRight: 10,
    },
    btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: '#434343',
        fontSize: 16,
    },
    enterIcon: {
        width: 22,
        height: 22,
        margin: 10,
    },
});
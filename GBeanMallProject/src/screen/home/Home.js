import React, {Component} from 'react';
import {View, Text, Image, Button, Alert, ScrollView, StyleSheet, StatusBar, Dimensions, RefreshControl, TouchableHighlight} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';
import Swiper from 'react-native-swiper';
import testHost from './../../cfg/const';

import request from './modules/request';
import GoodInfoCard from './component/GoodInfoCard';

const icon = [
    {
        source: require('./../../img/task.png'),
        text: '任务'
    },
    {
        source: require('./../../img/game.png'),
        text: '游戏'
    },
    {
        source: require('./../../img/search.png'),
        text: '搜索'
    }
];

const banner = [
    {
        source: require('./../../img/1.png')
    },
    {
        source: require('./../../img/2.png')
    },
    {
        source: require('./../../img/4.jpg')
    },
]

export default class HomeScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../../img/all.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
        header: null,
    };

    constructor(props){
        super(props);
        this.state = {
            visibleSwiper: false,
            data: [],
            isRefreshing: false
        }
    }

    loadData = (_data) => {
        this.setState({
            data: _data,
            isRefreshing: false
        });
    }

    jumpPage = (_title) => {
        this.props.navigation.navigate('CommodityDetail', {title: _title});
    }

    _onRefresh = () => {
        this.setState({
            isRefreshing: true
        })
        request({
            method: 'get',
            url: `http://${testHost}/commodity`
        }, this.loadData);
    }

    componentWillMount(){
        request({
            method: 'get',
            url: `http://${testHost}/commodity`
        }, this.loadData);
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                visibleSwiper: true
            })
        }, 0);
    }

    render(){
        if(this.state.visibleSwiper){
            return(
                <ScrollView 
                    style={styles.container}
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
                    <StatusBar
                        backgroundColor="#e94f37"
                        barStyle="light-content"
                    />
                    <Swiper 
                        style={homeStyle.wrapper}
                        autoplayTimeout={4}
                        paginationStyle={homeStyle.paginationStyle}
                        dot={<View style={{backgroundColor:'rgba(255, 255, 255, 0.2)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                        activeDot={<View style={{backgroundColor: 'rgb(233, 79, 55)', width: 6, height: 6, borderRadius: 3, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}
                    >
                        {
                            banner && banner.length > 0 &&
                            banner.map((item, index) => {
                                return (
                                    <TouchableHighlight style={homeStyle.item} key={index}>
                                        <Image source={item.source} style={homeStyle.banner}/>
                                    </TouchableHighlight>
                                );
                            })
                        }
                    </Swiper>
                    <View style={homeStyle.iconContainer}>
                        {
                            icon && icon.length > 0 &&
                            icon.map((item, index) => {
                                return (
                                    <View style={homeStyle.icon} key={index}>
                                        <Image source={item.source} style={homeStyle.iconImg}/>
                                        <Text style={homeStyle.iconText}>{item.text}</Text>
                                    </View> 
                                );
                            }) 
                        }
                    </View>
                    <View style={homeStyle.goodsContainer}>
                    {
                        this.state.data && this.state.data.length > 0 && 
                        this.state.data.map((item, index) => {
                            /* console.log(item); */
                            return (
                                <GoodInfoCard 
                                    data={item} 
                                    key={item._id}
                                    jumpPage={this.jumpPage}
                                />
                            );
                        })
                    }
                    </View>
                </ScrollView>
            );
        }else{
            return (
                <View></View>
            );
        }
        
    }
}

const homeStyle = StyleSheet.create({
    wrapper: {
        width: deviceWidth,
        height: 200,
        backgroundColor: '#fff',
        
    },
    paginationStyle: {
        bottom: 10,
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#fff',
    },
    icon: {
        width: deviceWidth/4,
        height: deviceWidth/5,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        color: '#434343',
    },
    iconImg: {
        width: deviceWidth/10,
        height: deviceWidth/10,
    },
    item: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
    },
    banner: {
        maxWidth: deviceWidth,
        maxHeight: 200,
        resizeMode: 'cover',
    },
    slide1: {
        backgroundColor: '#9DD6EB',
    },
    slide2: {
        backgroundColor: '#97CAE5',
    },
    slide3: {
        backgroundColor: '#92BBD9',
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
    },
    goodsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    }
})

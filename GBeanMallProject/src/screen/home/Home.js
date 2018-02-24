import React, {Component} from 'react';
import {View, Text, Image, Button, Alert, ScrollView, StyleSheet, Dimensions} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';
import Swiper from 'react-native-swiper';

import request from './modules/request';
import GoodInfoCard from './component/GoodInfoCard';

const icon = [
    {
        source: require('./../../img/task.png'),
        text: '任务'
    },
    {
        source: require('./../../img/glodenBean.png'),
        text: '金豆'
    },
    {
        source: require('./../../img/search.png'),
        text: '搜索'
    }
];

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
            data: []
        }
    }

    loadData = (_data) => {
        this.setState({
            data: _data
        });
    }

    jumpPage = (_title) => {
        this.props.navigation.navigate('CommodityDetail', {title: _title});
    }

    componentWillMount(){
        request({
            method: 'get',
            url: 'http://192.168.0.5:4000/commodity'
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
                <ScrollView style={styles.container}>
                    <Swiper 
                        style={homeStyle.wrapper}
                        autoplayTimeout={4}    
                    >
                        <View style={[homeStyle.item, homeStyle.slide1]}>
                            <Text style={homeStyle.text}>one</Text>
                        </View>
                        <View style={[homeStyle.item, homeStyle.slide2]}>
                            <Text style={homeStyle.text}>two</Text>
                        </View>
                        <View style={[homeStyle.item, homeStyle.slide3]}>
                            <Text style={homeStyle.text}>three</Text>
                        </View>
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
        height: 200
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#FFF',
    },
    icon: {
        width: deviceWidth/8,
        height: deviceWidth/6,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
    },
    iconImg: {
        width: deviceWidth/12,
        height: deviceWidth/12,
    },
    item: {
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
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

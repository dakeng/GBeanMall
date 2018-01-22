import React, {Component} from 'react';
import {View, Text, Image, Button, Alert, ScrollView, StyleSheet, Dimensions} from 'react-native';
import styles from './modules/styles';
import Swiper from 'react-native-swiper';

export default class HomeScreen extends Component{
    static navigationOptions = {
        tabBarLabel: '首页',
        tabBarIcon: ({tintColor}) => (
            <Image 
                source={require('./../img/all.png')}
                style={[styles.icon, {tintColor: tintColor}]}
            />
        ),
    };

    constructor(props){
        super(props);
        this.state = {
            visibleSwiper: false
        }
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
                <ScrollView>
                    <Swiper 
                        style={homeStyle.wrapper}
                        autoplay={true}
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
                    <Image 
                        source={{uri: 'http://tp.lingyu.me/wp-content/uploads/2016/01/4V6GIKLIDIVBAW6MFT.jpg'}}
                        style={{width: 400, height: 400}}    
                    />    
                </ScrollView>
            );
        }else{
            return (
                <View>
                    <Text>ceshi</Text>
                </View>
            );
        }
        
    }
}

const deviceWidth = Dimensions.get('window').width;
const homeStyle = StyleSheet.create({
    wrapper: {
        width: deviceWidth,
        height: 200
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
    }
})

import React, {Component} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

export default class GoodInfoCard extends Component{
    constructor(props){
        super(props);

    }

    render (){
        return (
            <View style={styles.container}>
                <Image style={styles.goodImg} source={{uri: 'https://shop.r10s.jp/motherskitchen/cabinet/02613141/imgrc0072707396.jpg'}}/>
                <View style={styles.info}>
                    <Text style={styles.title}>商品名称</Text>
                    <Text style={styles.des}>商品价格</Text>
                </View>
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = {
    container: {
        width: deviceWidth/2.1,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    goodImg: {
        width: deviceWidth/2.1,
        height: deviceWidth/2.1,
    },
    info: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    title: {
        fontSize: 12,
    },
    des: {
        fontSize: 14,
        color: 'red',
    },
}
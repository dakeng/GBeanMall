import React, {Component} from 'react';
import {View, Image, Text, Dimensions} from 'react-native';

export default class GoodInfoCard extends Component{
    constructor(props){
        super(props);

    }

    render (){
        return (
            <View style={styles.container}>
                <Image style={styles.goodImg} source={{uri: this.props.data.commodity_imgs[0]}}/>
                <View style={styles.info}>
                    <Text style={styles.title}>{this.props.data.commodity_name}</Text>
                    <Text style={styles.des}><Text style={styles.unit}>￥</Text>{this.props.data.commodity_price}</Text>
                </View>
            </View>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = {
    container: {
        width: deviceWidth/2.05,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    goodImg: {
        width: deviceWidth/2.05,
        height: deviceWidth/2.05,
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
    unit: {
        fontSize: 8,
    }
}
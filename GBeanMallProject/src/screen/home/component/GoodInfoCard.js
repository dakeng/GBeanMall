import React, {Component} from 'react';
import {View, Image, Text, Dimensions, TouchableHighlight, DeviceEventEmitter} from 'react-native';
import request from './../../cart/modules/request';

export default class GoodInfoCard extends Component{
    constructor(props){
        super(props);
    }

    add = (id) => {
        request('POST', {
            operate: 1,
            commodity_id: id,
        }, () => {DeviceEventEmitter.emit('refreshCart')});
    }

    render (){
        return (
            <TouchableHighlight
                style={{marginBottom: deviceWidth/10*0.16}}
            >
                <View style={styles.container}>
                    <Image style={styles.goodImg} source={{uri: this.props.data.commodity_imgs[0]}}/>
                    <Text style={styles.title}>{this.props.data.commodity_name}</Text>
                    <View style={styles.info}>
                        <Text style={styles.des}><Text style={styles.unit}>￥</Text>{this.props.data.commodity_price}</Text>
                        <TouchableHighlight
                            onPress={() => this.add(this.props.data._id)}
                        >
                            <Image source={require('./../../../img/add.png')} style={styles.addIcon}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const deviceWidth = Dimensions.get('window').width;
const styles = {
    container: {
        width: deviceWidth/10*4.92,
        backgroundColor: '#fff',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    goodImg: {
        width: deviceWidth/10*4.92,
        height: deviceWidth/10*4.92,
        alignSelf: 'center',
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
    },
    title: {
        alignSelf: 'center',
        fontSize: 14,
        margin: 10,
    },
    des: {
        fontSize: 14,
        color: 'red',
    },
    unit: {
        fontSize: 8,
    },
    addIcon: {
        width: 20,
        height: 20,
    },
}
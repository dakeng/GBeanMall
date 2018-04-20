import React, {Component} from 'react';
import {ScrollView, View, Image, Text, Dimensions, TouchableHighlight, DeviceEventEmitter} from 'react-native';
import {styles, deviceWidth} from './../../common/modules/styles';

import request from './modules/request';

class Title extends Component {
    render() {
        console.log(this.props);
        return (
            <View 
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: deviceWidth,
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1,
                        marginLeft: 0,
                    }}
                >
                    <Image source={require('./../../img/gbicon.png')} style={{width: 22,height: 22, marginRight: 8}}/>
                    <Text style={{fontSize: 20, color: '#fff'}}>金豆任务</Text>
                </View>
            </View>
        );
    }
}

export default class TaskCentre extends Component{
    static navigationOptions = {
        title: '金豆任务',
        headerStyle: {
            backgroundColor: '#e94f37',
            elevation: 0,
        },
        headerLeft: null,
        headerTitle: <Title/>
    };

    back = () => {
        this.props.navigation.goBack();
    }

    constructor(props){
        super(props);
        this.state = {
            tasks: []
        }
    }

    reloadData = () => {
        let config = {
            method: 'get',
        }
        request(config, (data) => {
            this.setState({
                tasks: data,
            })
        });
    }

    componentWillMount(){
        this.reloadData();
    }

    componentDidMount(){
        this.event = DeviceEventEmitter.addListener('goBack', this.back);
    }

    componentWillUnmount(){
        this.event.remove();
    }

    render() {
        console.log(this.state.tasks);
        let tasks = this.state.tasks;
        return (
            <ScrollView>
                {
                    tasks && tasks.map((task, index) => {
                        return (
                            <View key={task._id}>
                                <View style={pageStyles.taskContainer}>
                                    <Image source={require('./../../img/todo.png')} style={pageStyles.taskImg}/>
                                    <View style={pageStyles.taskInfoBox}>
                                        <Text style={pageStyles.name}>{task.task_name}</Text>
                                        <Text style={pageStyles.info}>{task.task_des}</Text>
                                        <Text style={pageStyles.reward}>完成任务奖励<Text style={pageStyles.amount}>{task.task_reward}</Text>金豆</Text>
                                    </View>
                                    <TouchableHighlight
                                        style={pageStyles.todoBtn}
                                        onPress={() => {
                                            this.props.navigation.navigate(task.task_screen);
                                        }}
                                    >
                                        <Text style={pageStyles.btnText}>做任务</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={pageStyles.line} scaleY={0.3333}></View>
                            </View>
                        )
                    })
                }
            </ScrollView>
        );
    }
}

let pageStyles = {
    taskContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 20,
        backgroundColor: '#fff',
    },
    taskImg: {
        width: 80,
        height: 80,
        marginRight: 8,
    },
    taskInfoBox: {
        flexDirection: 'column',
        height: 80,
        justifyContent: 'space-between',
        flex: 1,
        paddingRight: 8,
    },
    name: {
        fontWeight: 'bold',
        color: '#000',
    },
    info: {
        flex: 1,
        fontSize: 12,
    },
    reward: {
        color: '#000',
    },
    amount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#e94f37',
    },
    todoBtn: {
        backgroundColor: '#e94f37',
        width: 62,
        height: 36,
        borderRadius: 2,
    },
    btnText: {
        lineHeight: 36,
        color: '#fff',
        textAlign: 'center',
    },
    line: {
        width: deviceWidth,
        height: 1,
        backgroundColor: '#dedede',
    },
}
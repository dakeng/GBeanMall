import axios from 'axios';
import toast from './../../../common/modules/toast';
import { AsyncStorage } from 'react-native';

import testHost from './../../../cfg/const';

const request = function(data, callback) {
    let postData = Object.assign(
        {
            token: token
        },
        data
    )
    let config = {
        method: 'post',
        url: `http://${testHost}/user`,
        data: postData
    }
    axios(config)
        .then(res => {
            console.log(res);
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                toast(res.data.data.msg);
                if(res.data.status === 1){
                    console.log(res.data.data.token, res.data.data.userData)
                    AsyncStorage.multiSet([['token', res.data.data.token], ['userData', JSON.stringify(res.data.data.userData)]],() => {
                        global.token = res.data.data.token;
                        console.log(token);
                        callback && callback();
                    });
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
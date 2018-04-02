import axios from 'axios';
import toast from './../../../common/modules/toast';
import { AsyncStorage } from 'react-native';

import testHost from './../../../cfg/const';

const request = function(data, callback) {
    let postData = Object.assign(
        {
            tooken: tooken
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
                    console.log(res.data.data.tooken, res.data.data.userData)
                    AsyncStorage.multiSet([['tooken', res.data.data.tooken], ['userData', JSON.stringify(res.data.data.userData)]],() => {
                        global.tooken = res.data.data.tooken;
                        console.log(tooken);
                        callback && callback();
                    })
                    /* storage.save('tooken', res.data.data.tooken).then(() => {
                        global.tooken = res.data.data.tooken;
                        console.log(tooken);
                    }); */
                    /* storage.save('userData', res.data.data.userData).then(() => {
                        console.log(userData);
                    }); */
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
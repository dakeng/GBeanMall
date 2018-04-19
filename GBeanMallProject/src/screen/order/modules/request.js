import axios from 'axios';
import toast from './../../../common/modules/toast';
import { AsyncStorage } from 'react-native';

import testHost from './../../../cfg/const';

const request = function(data, callback) {
    let config = {
        method: 'post',
        url: `http://${testHost}/pay`,
        data: data
    }
    axios(config)
        .then(res => {
            console.log(res);
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                console.log(res.data);
                toast(res.data.data.msg);
                if(res.data.status === 1){
                    console.log(res.data.data.userData)
                    AsyncStorage.setItem('userData', JSON.stringify(res.data.data.userData),() => {
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
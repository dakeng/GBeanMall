import axios from 'axios';
import {AsyncStorage} from 'react-native';
import toast from './../../../common/modules/toast';

const request = function(config, callback) {
    axios(config)
        .then(res => {
            console.log(res);
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                toast(res.data.data.msg);
                if(res.data.status === 1){
                    //await AsyncStorage.setItem()
                    callback && callback();
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
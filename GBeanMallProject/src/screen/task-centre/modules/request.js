import axios from 'axios';
import toast from './../../../common/modules/toast';
import { AsyncStorage } from 'react-native';

import testHost from './../../../cfg/const';

const requestGetOrder = function(config, callback) {
    config = Object.assign({
        url: `http://${testHost}/task`,
    }, config);
    axios(config)
        .then(res => {
            console.log(res);
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                //console.log(res.data);
                //toast(res.data.data.msg);
                if(res.data.status === 1){
                    callback && callback(res.data.data.data);
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default requestGetOrder;
import axios from 'axios';
import toast from './../../../common/modules/toast';

import testHost from './../../../cfg/const';

const request = function(method, data, callback) {
    let config = {
        method: method,
        url: `http://${testHost}/cart`,
    };
    if(method === 'POST'){
        config.data = data;
    }
    console.log(config);
    axios(config)
        .then(res => {
            console.log(res);
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                //toast(res.data.data.msg);
                callback && callback(res.data.data.commoditys);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
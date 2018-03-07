import axios from 'axios';

const request = function(config, callback) {
    axios(config)
        .then(res => {
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                callback && callback(res.data.msg);
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
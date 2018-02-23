import axios from 'axios';

const request = function(config, callback) {
    axios(config)
        .then(res => {
            if(res.status > 400){
                throw new Error('Bad response from server');
            }else{
                //console.log(res.data);
                if(res.data.status === 1){
                    callback && callback(res.data.data);
                }else{
                    console.log(res.data.msg);
                }
            }
        })
        .catch(err => {
            console.log(err);
        });
}

export default request;
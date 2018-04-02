import { AsyncStorage } from 'react-native';
global.token = null;

AsyncStorage.getItem('token', (err, result) => {
    if(err){
        console.log(err);
    }else{
        global.token = result;
    }
})
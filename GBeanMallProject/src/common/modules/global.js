import { AsyncStorage } from 'react-native';
global.token = '';

AsyncStorage.getItem('token', (err, result) => {
    if(err){
        console.log(err);
    }else{
        global.token = result;
        console.log('token', token);
    }
})
import { AsyncStorage } from 'react-native';

let utils = {
    isLogin: () => {
        console.log(token);
        if(token !== '' && token !== null){
            return true;
        }else{
            return false;
        }
    }
}

export default utils;
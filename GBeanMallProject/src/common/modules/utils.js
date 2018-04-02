import { AsyncStorage } from 'react-native';

let utils = {
    isLogin: () => {
        if(token !== ''){
            return true;
        }else{
            return false;
        }
    }
}

export default utils;
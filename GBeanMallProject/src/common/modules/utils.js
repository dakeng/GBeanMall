import { AsyncStorage } from 'react-native';

let utils = {
    isLogin: () => {
        if(tooken !== ''){
            return true;
        }else{
            return false;
        }
    }
}

export default utils;
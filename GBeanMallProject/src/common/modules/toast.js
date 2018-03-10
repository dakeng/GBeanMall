import {ToastAndroid} from 'react-native';

function toast(msg){
    ToastAndroid.showWithGravityAndOffset(
        msg,
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
        0,
        100,
    );
}

export default toast;
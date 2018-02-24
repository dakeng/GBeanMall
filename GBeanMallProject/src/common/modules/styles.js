import {StyleSheet, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebeb',
    },
    icon: {
        width: 20,
        height: 20,
    },
});

export {styles, deviceWidth};
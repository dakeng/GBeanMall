import {StyleSheet, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ebebeb',
    },
    icon: {
        width: 20,
        height: 20,
    },
    verticalAlign: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    spaceBetween: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});

export {styles, deviceWidth, deviceHeight};
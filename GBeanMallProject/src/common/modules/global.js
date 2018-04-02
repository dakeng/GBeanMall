import { AsyncStorage } from 'react-native';
global.tooken = null;

AsyncStorage.getItem('tooken', (err, result) => {
    if(err){
        console.log(err);
    }else{
        global.tooken = result;
    }
})

/* storage.get('tooken').then(result => {
    global.tooken = result;
}).catch(err => {
    global.tooken = null;
    console.log(err);
}) */
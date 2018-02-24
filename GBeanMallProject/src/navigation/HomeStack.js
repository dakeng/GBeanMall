import {StackNavigator} from 'react-navigation';
import HomeScreen from './../screen/home/Home';
import CommodityDetail from './../screen/commodity-detail/CommodityDetail';

const HomeStack = StackNavigator(
    {
        Home: {
            screen: HomeScreen
        },
        CommodityDetail: {
            screen: CommodityDetail
        },
    },
    {
        mode: 'modal',
        headerMode: 'none',
    }
);

export default HomeStack;
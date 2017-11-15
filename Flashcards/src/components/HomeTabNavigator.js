import { Dimensions } from 'react-native';
import { NavigationComponent } from 'react-native-material-bottom-navigation';
import { TabNavigator } from 'react-navigation';
import DeckListScreen from './screens/DeckListScreen';
import NewDeckScreen from './screens/NewDeckScreen';
import { green_00796B, gray_37474F } from '../utils/colors';

const deviceScreenWidth = Dimensions.get('window').width;

export const HomeTabNavigator = TabNavigator({
    DeckListScreen: { screen: DeckListScreen },
    NewDeckScreen: { screen: NewDeckScreen }
}, {
        tabBarComponent: NavigationComponent,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            bottomNavigationOptions: {
                labelColor: 'white',
                rippleColor: 'white',
                tabs: {
                    DeckListScreen: {
                        barBackgroundColor: gray_37474F
                    },
                    NewDeckScreen: {
                        barBackgroundColor: green_00796B
                    }
                },
                style: {
                    width: deviceScreenWidth,
                },
            }
        }
    });


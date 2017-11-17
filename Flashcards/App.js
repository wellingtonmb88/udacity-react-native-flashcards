import React from 'react';
import { StyleSheet, View, StatusBar, ToolbarAndroid, Platform, Text } from 'react-native';
import { HomeTabNavigator } from './src/components/HomeTabNavigator';
import DeckScreen from './src/components/screens/DeckScreen';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo';
import { purple_292477, white_fff, blue_4e4cb8 } from './src/utils/colors';
import { reducer } from './src/reducers/DeckReducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(logger, thunk)
  )
);

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

const MainNavigator = StackNavigator({
  Home: {
    screen: HomeTabNavigator,
    navigationOptions: {
      title: 'Flashcards',
      headerTintColor: white_fff,
      headerStyle: {
        backgroundColor: blue_4e4cb8,
      }
    }
  },
  DeckScreen: {
    screen: DeckScreen,
  }
});

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <CustomStatusBar backgroundColor={blue_4e4cb8} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white_fff,
    justifyContent: 'center',
  }
});

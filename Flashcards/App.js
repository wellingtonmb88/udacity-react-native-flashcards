import React from 'react';
import { StyleSheet, View, StatusBar, ToolbarAndroid, Platform, Text } from 'react-native';
import { HomeTabNavigator } from './src/components/HomeTabNavigator';
import DeckScreen from './src/components/screens/DeckScreen';
import AddCardScreen from './src/components/screens/AddCardScreen';
import QuizScreen from './src/components/screens/QuizScreen';
import { StackNavigator } from 'react-navigation'
import { Constants } from 'expo';
import { purple_292477, white_fff, blue_4e4cb8 } from './src/utils/colors';
import { reducer } from './src/reducers/DeckReducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import * as DeckApi from './src/utils/DeckApi';
import * as NotificationUtils from './src/utils/NotificationUtils';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
  const store = createStore(
    reducer,
    composeEnhancers(
      applyMiddleware(logger, thunk)
    )
  );

  store.subscribe(() => {
    DeckApi.saveDeck(store.getState().decks)
  });

  return store;
};

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
  },
  AddCardScreen: {
    screen: AddCardScreen
  },
  QuizScreen: {
    screen: QuizScreen
  }
});

export default class App extends React.Component {

  componentDidMount() {
    NotificationUtils.setLocalNotification();
  };

  render() {
    return (
      <Provider store={configureStore()}>
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

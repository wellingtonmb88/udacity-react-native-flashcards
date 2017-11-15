import React from 'react';
import { StyleSheet, View, StatusBar, Platform, Text } from 'react-native';
import { HomeTabNavigator } from './src/components/HomeTabNavigator';
import { Constants } from 'expo';
import { purple_292477, white_fff } from './src/utils/colors';

const CustomStatusBar = ({ backgroundColor, ...props }) => {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomStatusBar backgroundColor={purple_292477} barStyle="light-content" />
        <HomeTabNavigator />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white_fff,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

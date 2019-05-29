/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import { createAppContainer } from 'react-navigation';

import Navigation from './components/Navigation/Navigation'

const AppContainer = createAppContainer(Navigation);
class PedaBook extends Component {
  render() {
    return <AppContainer />;
  }
}
export default PedaBook;
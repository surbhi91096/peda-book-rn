/**
 * @format
 */

import {AppRegistry,NativeModules,YellowBox} from 'react-native';
import PedaBook from './App';
NativeModules.ExceptionsManager = null;
console.reportErrorsAsExceptions = false;
YellowBox.ignoreWarnings([
    'Require cycle:',
  ]);
AppRegistry.registerComponent('pedabook', () => PedaBook);

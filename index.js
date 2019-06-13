/**
 * @format
 */

import {AppRegistry,NativeModules} from 'react-native';
import PedaBook from './App';
NativeModules.ExceptionsManager = null;
console.reportErrorsAsExceptions = false;
AppRegistry.registerComponent('pedabook', () => PedaBook);

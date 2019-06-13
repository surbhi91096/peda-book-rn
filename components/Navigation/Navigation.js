/**
 * PedaBook App
 * http://pedabook.com
 *
 * @format
 * @flow
 */
import React from 'react';
import { ScrollView, TouchableOpacity,View,SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createDrawerNavigator, DrawerItems, createStackNavigator } from 'react-navigation';
import DrawerBody from './DrawerBody';
import SplashScreen from '../Splash';
import Registration from '../Registration';
import Login from '../SignScreens/Login';
import ForgotPassword from '../SignScreens/ForgotPassword';
import Logout from '../SignScreens/Logout';
import Profile from'../Profile';
import Profilesecond from'../Profilesecond';
import Allitems from'../Allitems';
const drawerItemStyle = { 
    borderBottomWidth: 1, 
    borderBottomColor: '#147dbf', 
    height: 60, 
    textAlign: 'left' 
};
const drawerLabelStyle = { 
    margin: 0, 
    fontSize: 15, 
    fontFamily: 'AvenirLTStd-Medium',
    paddingHorizontal:20
};
const Drawer = createDrawerNavigator({
    Home:{
        screen:Allitems
    }
},
    {
        initialRouteName: 'Home',
        overlayColor: 'rgba(0, 0, 0, 0.5)',
        drawerWidth: 250,
        style:{marginTop:20},
        contentComponent: props =>(
            <DrawerBody props={props} />
        )
});
const shadow = {
    shadowColor: '#000', shadowRadius: 5, shadowOpacity: 0.6, shadowOffset: {
        width: 5, height: 0
    }
}
const Navigation = createStackNavigator({
    Splash: {
        screen: SplashScreen
    },
    Home: {
        screen: Drawer,
    },
    Registration: {
        screen: Registration,
    },
    Profile:{
      screen:Profile
    },
    Login:{
        screen:Login
    },
    Logout:{
        screen:Logout
    },
    Profilesecond:{
        screen:Profilesecond
    },
    Allitems:{
        screen:Allitems
    },
    ForgotPassword:{
        screen:ForgotPassword
    }
   
}, {
    headerMode: 'none',
    initialRouteName: 'Login',
    containerOptions: {
        style: {
            backgroundColor: '#147dbf',
            flex: 1

            }
        }
    });
export default Navigation;





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
import { DashboardScreen } from './Screens';
import SplashScreen from '../Splash';
import LocumReg1Screen from '../LocumReg1';
import LocumReg2Screen from '../LocumReg2';
/**Employer Screens Starts */
import EmployerScreen from '../SignScreens/EmployerReg';
import NewLocumShiftScreen from '../Employer/NewLocumShift';
import NLSFormScreen from '../Employer/NLSForm';
import NewPermScreen from '../Employer/NewPermShift';
import NPSFormScreen from '../Employer/NPSForm';
import JobListE from '../Employer/JobList';
import LocumListScreen from '../Employer/LocumList';
import LocumDetailScreen from '../Employer/LocumDetails';
import EChatListScreen from '../Employer/EChatList';
import ChatScreen from '../Employer/ChatSingle';
import Reviews from '../Employer/Reviews';
/**Employer Screens ends */
import AboutScreen from '../About';
import Registration from '../Registration';
import Login from '../SignScreens/Login';
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
        contentComponent: props =>
            <SafeAreaView>
            <ScrollView style={{marginTop:10,padding:0}}>
                <TouchableOpacity style={{ paddingLeft: 20,justifyContent:'flex-end' }} onPress={props.navigation.closeDrawer}>
                    <Icon name="bars" style={{ fontSize: 20, color: '#147dbf' }} />
                </TouchableOpacity>
                <DrawerItems
                    {...props}
                    itemStyle={drawerItemStyle}
                    inactiveTintColor={'#147dbf'}
                    itemsContainerStyle={{ paddingHorizontal: 0 }}
                    labelStyle={drawerLabelStyle}
                    iconContainerStyle={{ marginHorizontal: 0, marginLeft: 16 }}
                    activeBackgroundColor={'#fff'}
                />

            </ScrollView>
            </SafeAreaView>
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
    LocumReg1:{
        screen:LocumReg1Screen
    },
    LocumReg2:{
        screen:LocumReg2Screen
    },
    /*Employer Navigations Starts */
    EmployerReg:{
        screen:EmployerScreen
    },
    NewLocumShift:{
        screen:NewLocumShiftScreen
    },
    NLSForm:{
        screen:NLSFormScreen
    },
    NewPermShift:{
        screen:NewPermScreen
    },
    NPSForm:{
        screen:NPSFormScreen
    },
    JobListE:{
        screen:JobListE
    },
    LocumList:{
        screen:LocumListScreen
    },
    LocumDetails:{
        screen:LocumDetailScreen
    },
    EChatList:{
        screen:EChatListScreen
    },
  
    ChatScreen:{
        screen:ChatScreen
    },
    Reviews:{
        screen:Reviews
    },
    /*Employer Navigations Ends */
    About:{
        screen:AboutScreen
    },
    Profile:{
      screen:Profile
    },
    Login:{
        screen:Login
    },
    Profilesecond:{
        screen:Profilesecond
    },
    Allitems:{
        screen:Allitems
    },
   
}, {
    headerMode: 'none',
    initialRouteName: 'Splash',
    containerOptions: {
        style: {
            backgroundColor: '#147dbf',
            flex: 1

            }
        }
    });
export default Navigation;





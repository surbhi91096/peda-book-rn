/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Text, View,SafeAreaView,Image } from 'react-native';
import Dashboard from '../Employer/Dashboard';
import Pharmacy from '../Employer/Pharmacy';
import Notifications from '../Employer/Notifications';
import About from '../About';
const assetsPath = '../../assets/';
function createEmptyScreen(label, icon) {
    return class extends React.Component {
        static navigationOptions = {
            drawerLabel: label,
            drawerIcon: () => (
                <Icon name={icon} solid={true} style={{ fontSize: 20, color: '#147dbf' }} />
            )
        };
        render() {
            return <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}><Text>{label}</Text></View>;
        }
    }
}

function createScreen(label, Icon, Component) {    
    return class extends React.Component {
        static navigationOptions = ({ navigation }) =>  {
            const { params } = navigation.state;
            return {
                drawerLabel: ()=>{
                    return label
                },
                drawerIcon: () => (
                    Icon
                )
            }
        };
        render() {
            return <Component {...this.props} />;
        }
    }
}

export const DashboardScreen = createScreen('Home',<Image source={require(assetsPath+'home-d-icon.png')} style={{width:18,height:16}} />,Dashboard);
export const PharmacyScreen = createScreen('Pharmacy',<Image source={require(assetsPath+'phar-d-icon.png')} style={{width:18,height:15}} />,Pharmacy);
export const NotificationsScreen = createScreen('Notifications',<Image source={require(assetsPath+'noti-d-icon.png')} style={{width:18,height:17}} />,Notifications);
export const AboutScreen = createScreen('About',<Image source={require(assetsPath+'about-d-icon.png')} style={{width:18,height:11}} />,About);
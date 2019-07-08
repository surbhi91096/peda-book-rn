import React,{Component} from 'react';
import {ImageBackground, StyleSheet,AsyncStorage,BackHandler } from 'react-native';
class SplashScreen extends Component{
    constructor(props) {
        super(props);
        this.state={loading:false}
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus',payload=>{
            if((payload.context).search('Navigation/BACK_Root') != -1){
                BackHandler.exitApp();
            }
        });
        setTimeout(()=>{
            this.authenticateSession();
            //navigation.navigate('Login');
        },2500)
        //
    }
    authenticateSession = async()=> {
        const { navigation } = this.props;
        let isUserLoggedIn = await AsyncStorage.getItem('isUserLoggedIn');
        if(isUserLoggedIn == "true"){
            let userDataStringfy = await AsyncStorage.getItem('userData');
            let userData = JSON.parse(userDataStringfy);
            if(userData){
                navigation.navigate('Home');
            }
            else{
                navigation.navigate('Login');
            }
        }
        else{
            navigation.navigate('Login');
        }
    }
    render(){
        return (
            <ImageBackground source={require('../assets/screen-bg.jpg')} style={{flex:1,alignItems:'center'}}>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

});
export default SplashScreen;
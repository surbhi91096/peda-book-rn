import React,{Component} from 'react';
import {View,ImageBackground, Image,Text, StyleSheet } from 'react-native';
import Loader from './Loader';
class SplashScreen extends Component{
    constructor(props) {
        super(props);
        this.state={loading:false}
    }
    componentDidMount(){
        const { navigation } = this.props;
        setTimeout(()=>{
            navigation.navigate('Login');
        },2500)
        
    }
    render(){
        return (
            <ImageBackground source={require('../assets/screen-bg.png')} style={{flex:1,backgroundColor:'#FFFFFF'}}>
               
               
               
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

});
export default SplashScreen;
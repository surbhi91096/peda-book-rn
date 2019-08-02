import React,{Component} from 'react';
import {ImageBackground, StyleSheet,AsyncStorage,BackHandler } from 'react-native';
import { SERVER_URL } from '../Constants';
class SplashScreen extends Component{
    constructor(props) {
        super(props);
        this.state={loading:false}
    }
    async saveDetails(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    componentDidMount(){
        this.props.navigation.addListener('willFocus',payload=>{
            if((payload.context).search('Navigation/BACK_Root') != -1){
                BackHandler.exitApp();
            }
        });
        //setTimeout(()=>{
            this.authenticateSession();
            //navigation.navigate('Login');
        //},2500)
        //
    }
    authenticateSession = async()=> {
        const { navigation } = this.props;
        await AsyncStorage.getItem('isUserLoggedIn').then(async (isUserLoggedIn)=>{
            if(isUserLoggedIn == "true"){
                await AsyncStorage.getItem('userData').then(async (userDataStringfy)=>{
                    let userData = JSON.parse(userDataStringfy);
                    console.log(userData);
                    if(userData){
                        var fd = new FormData();
                        if(typeof(userData.accessCode) != "undefined"){
                            var accessCode = userData.accessCode;
                            var jsonArray = {
                                AccessCode: accessCode
                            };
                            fetch(SERVER_URL+'access_code_login',{
                                method:'POST',
                                headers: {
                                    //Accept: 'application/json',
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(jsonArray)
                            })
                            .then((res)=>res.json())
                            .then((response)=>{
                                if(response.Status == 1){
                                    navigation.navigate('Home');
                                }
                                else{
                                    this.saveDetails("isUserLoggedIn","false");
                                    this.saveDetails("userData","");
                                    navigation.navigate('Login');
                                }
                            })
                            .catch((err)=>{
                                this.saveDetails("isUserLoggedIn","false");
                                this.saveDetails("userData","");
                                navigation.navigate('Login');
                            });
                        }
                        else{
                            var userId = userData.UserId;
                            fd.append('ReaderId',userId);
                            fetch(SERVER_URL+'check_reader',{
                                method:'POST',
                                body:fd
                            })
                            .then(res=>res.json())
                            .then(response=>{
                                if(response.Status == 1){
                                    navigation.navigate('Home');
                                }
                                else{
                                    navigation.navigate('Login');
                                    this.saveDetails("isUserLoggedIn","false");
                                    this.saveDetails("userData","");
                                }
                            })
                            .catch(err=>{
                                this.saveDetails("isUserLoggedIn","false");
                                this.saveDetails("userData","");
                                navigation.navigate('Login');
                                console.log(err);
                            });
                        }
                    }
                });
            }
            else{
                navigation.navigate('Login');
            }
        });
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
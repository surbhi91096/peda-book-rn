import React, {Component} from 'react';
import {View,AsyncStorage,Image,ImageBackground,Platform} from 'react-native';
import Loader from '../Loader';
import { SERVER_URL,SENDER_ID } from '../../Constants';
class Logout extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading:true,
        }
        //this.authenticateSession = this._authenticateSession.bind(this);
    }
    async saveDetails(key,value){
        await AsyncStorage.setItem(key,value);
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData});
    }
    authenticateSession(){
        //this.getToken(this.logoutFromServer.bind(this));
        this.logoutFromServer();
    }
    logoutFromServer(){
        // var tokenGenerated = (typeof(token) != "undefined")?token.token:'';
        // fetch(SERVER_URL+'user_logout',{
        //     method:'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         user_id: this.state.userData.id,
        //         device_key:tokenGenerated
        //     })
        // })
        // .then(res=>res.json())
        // .then(response=>{
        //     console.log(response);
        //     if(response.status == 200){
                this.saveDetails('isUserLoggedIn',"false");
                this.saveDetails('userData',"");
                setTimeout(()=>{
                    this.setState({loading:false});
                    this.props.navigation.navigate('Login');
                },1000);
        //     }
        // });
    }
    
    componentDidMount(){
        this.listner = this.props.navigation.addListener("didFocus", this.onFocus);
    }
    onFocus = ()=>{
        this.setUserData();
        setTimeout(()=>{
            this.authenticateSession();
        },1500);
    }
    render(){
        return(
            <ImageBackground source={require('../../assets/screen-bg.jpg')} style={{flex:1,alignItems:'center'}}>
            <Loader loading={this.state.loading} />
            </ImageBackground>
        );
    }
}
export default Logout;

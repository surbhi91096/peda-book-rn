import React, { Component } from 'React';
import {
    View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, StyleSheet, KeyboardAvoidingView,
    AsyncStorage, Platform, NetInfo
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
import { ScrollView } from 'react-native-gesture-handler';
export default class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isOtpField: false,
            changePassField:false,
            mobileNumber: '',
            newPassword: '',
            cPass:''
        }
    }
    checkMobile = ()=>{
        console.log('Login');
        if(this.state.mobileNumber == ''){
            Toast.show("Mobile number should not be blank",Toast.SHORT);
            return false;
        }
        this.setState({loading:true});
        var fd = new FormData();
        fd.append('ContactNo',this.state.mobileNumber);
        fetch(SERVER_URL+'user_forgot_password',
        {
            method:'POST',
            body:fd
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            this.setState({loading:false});
            if(response.Status == 1){
                this.setState({isOtpField:true,serverOtp:response.Result.otp,user_id:response.Result.UserId});
                setTimeout(()=>{
                    Toast.show(''+response.Result.otp+'',Toast.LONG);
                },150)
            }
            else{
                Toast.show(response.Message,Toast.SHORT);
            }
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false});
        })
    }
    checkOtp = ()=>{
        if(this.state.otp == ''){
            Toast.show("OTP should not be blank",Toast.SHORT);
            return false;
        }
        if(this.state.otp != this.state.serverOtp){
            Toast.show("OTP not matched",Toast.SHORT);
            return false;
        }
        this.setState({isOtpField:false,changePassField:true});
    }
    resetPass = ()=>{
        if(this.state.newPassword == ''){
            Toast.show("New password should not be blank",Toast.SHORT);
            return false;
        }
        if(this.state.cPass == ''){
            Toast.show("Confirm password should not be blank",Toast.SHORT);
            return false;
        }
        if(this.state.newPassword != this.state.cPass){
            Toast.show("Password not matched",Toast.SHORT);
            return false;
        }
        this.setState({loading:true});
        var fd = new FormData();
        fd.append('UserId',this.state.user_id);
        fd.append('NewPass',this.state.newPassword);
        fd.append('ConfirmPass',this.state.cPass);
        fetch(SERVER_URL+'user_reset_password',
        {
            method:'POST',
            body:fd
            // JSON.stringify({
            //     UserId:this.state.UserId,
            //     NewPass:this.state.newPassword,
            //     ConfirmPass:this.state.cPass
            // })
        })
        .then(res=>{console.log(res);return res.json()})
        .then(response=>{
            console.log(response);
            if(response.Status == 1){
                this.setState({isOtpField:false,serverOtp:'',user_id:'',changePassField:false});
                this.props.navigation.navigate('Login');
            }
            this.setState({loading:false});
            Toast.show(response.Message,Toast.SHORT);
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false});
        })
    }
    render() {
        var behavoir = (Platform.OS == 'ios')?'padding':'';
        return (
            <ImageBackground source={require('../../assets/l-bg.jpg')} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Loader loading={this.state.loading} />
                <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 25, alignItems: 'center' }} behavior={behavoir}>
                    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{flex:1,justifyContent: 'center', alignItems: 'center',width:'100%'}} style={{ flex: 1, width: '100%', paddingHorizontal: 15, }}>
                        <Image source={require('../../assets/pb-logo.png')} style={{ width: 280, height: 48,marginBottom:15 }} />
                        <View style={{marginVertical:20}}></View>
                        <View style={{ paddingHorizontal: 20, width: '100%',justifyContent:'center',alignItems:'center',flex:1}}>
                            {
                                this.state.isOtpField == false && this.state.changePassField == false && 
                                <View style={{ width: '100%', marginBottom: 22.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.TextInputStyle}
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ mobileNumber: text })}
                                        keyboardType="phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#FFFFFF"
                                        underlineColorAndroid="transparent"
                                        value={this.state.mobileNumber}
                                        placeholder="Mobile Number"
                                    />
                                    <TouchableOpacity style={[MainStyles.psosBtn,{marginTop:30}]} onPress={() => {console.log('Pressing'); this.checkMobile() }}>
                                        <Text style={MainStyles.psosBtnText}>Submit</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                this.state.isOtpField == true && this.state.changePassField == false && 
                                <View style={{ width: '100%', marginBottom: 22.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.TextInputStyle}
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ otp: text })}
                                        keyboardType="number-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#FFFFFF"
                                        underlineColorAndroid="transparent"
                                        value={this.state.otp}
                                        placeholder="OTP"
                                    />
                                    <TouchableOpacity style={[MainStyles.psosBtn,{marginTop:30}]} onPress={() => { this.checkOtp() }}>
                                        <Text style={MainStyles.psosBtnText}>Check OTP</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                                this.state.isOtpField == false && this.state.changePassField == true && 
                                <View style={{ width: '100%', marginBottom: 22.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.TextInputStyle}
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ newPassword: text })}
                                        keyboardType="name-phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#FFFFFF"
                                        underlineColorAndroid="transparent"
                                        value={this.state.newPassword}
                                        placeholder="New Password"
                                    />
                                    <TextInput
                                        style={[styles.TextInputStyle,{marginTop:20}]}
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ cPass: text })}
                                        keyboardType="name-phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#FFFFFF"
                                        underlineColorAndroid="transparent"
                                        value={this.state.cPass}
                                        placeholder="Confirm Password"
                                    />
                                    <TouchableOpacity style={[MainStyles.psosBtn,{marginTop:30}]} onPress={() => { this.resetPass() }}>
                                        <Text style={MainStyles.psosBtnText}>Reset Password</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                            <View style={{ width: '100%', alignItems: 'center', marginTop: 15 }}>
                                <TouchableOpacity onPress={() => {this.props.navigation.navigate('Login')}}>
                                    <Text style={{
                                        color: '#f88937',
                                        fontSize:17,
                                        fontFamily: 'AvenirLTStd-Roman'
                                    }}>Login</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{alignItems: 'center',width:'100%',justifyContent:'center',marginTop:35}}>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    tabItem: {
        width: '50%',
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabItemText: {
        fontFamily: 'AvenirLTStd-Medium',
        color: '#FFFFFF',
        fontSize: 17
    },
    TextInputStyle: {
        width:'100%',
        textAlign: 'left',
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius:10,
        fontSize: 17,
        fontFamily: 'AvenirLTStd-Medium',
        backgroundColor: 'rgba(255,255,255,0.5)'
    }
});
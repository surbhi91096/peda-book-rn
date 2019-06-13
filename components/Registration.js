import React, { Component } from 'React';
import {
    View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, ImageBackground, KeyboardAvoidingView,
    AsyncStorage, Platform, NetInfo, ScrollView,StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from './Styles';
import Toast from 'react-native-simple-toast';
import Loader from './Loader';
import { SERVER_URL } from '../Constants';
import PhoneInput from 'react-native-phone-input';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            registertingFrom: '',
            name: '',
            username: '',
            email: '',
            mobileCode:'+961',
            contact: '',
            password: '',
            c_password: '',
            showPass:false,
            showCPass:false
        }
        this.signUp = this._signUp.bind(this);
    }
    _signUp = () => {
        //console.log('token');
        if (this.state.password != this.state.c_password) {
            Toast.show('Password not match', Toast.SHORT);
            return false;
        }
        if (this.state.name == '') {
            Toast.show('Name should not be blank', Toast.SHORT);
            return false;
        }
        if (this.state.username == '') {
            Toast.show('Username should not be blank', Toast.SHORT);
            return false;
        }
        if (this.state.email == '') {
            Toast.show('Email should not be blank', Toast.SHORT);
            return false;
        }
        if (this.state.contact == '') {
            Toast.show('Contact should not be blank', Toast.SHORT);
            return false;
        }
        if (this.state.password == '') {
            Toast.show('Password should not be blank', Toast.SHORT);
            return false;
        }
        if (this.state.c_password == '') {
            Toast.show('Confirm Password should not be blank', Toast.SHORT);
            return false;
        }
        this.sendDataToServer();
    }


    sendDataToServer() {
        this.setState({loading:true});
        fetch(SERVER_URL+'reader_signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Name: this.state.name,
                Username: this.state.username,
                Email: this.state.email,
                ContactNo: this.state.contact,
                Password: this.state.password,
            })
        })
        .then((res) => res.json())
        .then((response) => {
            console.log(response);
            this.setState({ loading: false });
            if (response.Status == 1) {
                this.props.navigation.navigate("Login");
            }
            Toast.show(response.Message, Toast.SHORT);
        })
        .catch((err) => {
            console.log(err);
            this.setState({ loading: false });
        });
    }

    render() {
        var showPassWord = (this.state.showPass == false)?true:false;
        var showCPassWord = (this.state.showCPass == false)?true:false;
        var behavoir = (Platform.OS == 'ios')?'padding':'';
        return (
            <ImageBackground source={require('../assets/l-bg.jpg')} style={{ flex: 1, backgroundColor: '#FFFFFF',paddingVertical:5 }}>
                <Loader loading={this.state.loading} />
                <KeyboardAvoidingView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 25 }} behavior={behavoir}>
                    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{justifyContent: 'center', alignItems: 'center',width:'100%',zIndex:10090}} style={{ width: '100%' }}>
                        <View style={{paddingHorizontal: 50}}>
                            <Image source={require('../assets/pb-logo.png')} style={{ width: 200, height: 35, marginBottom: 10, }} />
                            <Text style={{ color: '#ffffff', fontSize: 17, textAlign: "center" }}>Registration</Text>
                        </View>
                        <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}} style={{position:'absolute',left:8,top:8,paddingLeft:10,paddingRight:15,paddingVertical:15,}}>
                            <Image source={require('../assets/back-icon.png')} style={{width:10,height:19}}/>
                        </TouchableOpacity>
                        <View style={{paddingHorizontal: 15,width:'100%'}}>
                            <View style={{borderWidth: 1.5,borderColor: '#9e2d41',marginTop: 10}}></View>
                        </View>
                        <View style={{marginBottom: 22.5,justifyContent: 'center',alignItems: 'center',}}>
                        </View>
                        <View style={{paddingLeft: 30,paddingRight: 30}}>
                            <View style={{width: '100%',flexDirection: 'row',marginBottom: 22.5,justifyContent: 'center',alignItems: 'center',}} >
                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Name"
                                    returnKeyType={"next"}
                                    ref={(input) => { this.name = input; }}
                                    onSubmitEditing={() => { this.username.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ name: text })}
                                    autoCapitalize='none'
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.name}
                                />
                            </View>
                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: 22.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Username"
                                    returnKeyType={"next"}
                                    ref={(input) => { this.username = input; }}
                                    onSubmitEditing={() => { this.email.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ username: text })}
                                    autoCapitalize='none'
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.username}
                                />
                            </View>

                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: 22.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Email"
                                    returnKeyType={"next"}
                                    ref={(input) => { this.email = input; }}
                                    onSubmitEditing={() => { this.contact.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ email: text })}
                                    keyboardType="email-address"
                                    autoCapitalize='none'
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.email}
                                />
                            </View>

                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: 22.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >
                                <PhoneInput
                                    ref={(ref) => { this.mobileCode = ref; }}
                                    style={{
                                        textAlign: 'left',
                                        height: 50,
                                        fontSize: 17,
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        borderTopLeftRadius:12,
                                        borderBottomLeftRadius:12,
                                        color: '#FFFFFF',
                                        paddingLeft:12,
                                        width:92
                                    }} 
                                    textStyle={{color:'#FFFFFF',fontSize:17}}
                                    contentContainerStyle={{color:'#FFFFFF'}}
                                    initialCountry={"au"}
                                    onChangePhoneNumber={(number)=>this.setState({mobileCode:number})}
                                    value={this.state.mobileCode}
                                    editable={false}
                                />
                                <TextInput
                                    style={[styles.textInput,{
                                        borderTopLeftRadius:0,
                                        borderBottomLeftRadius:0,
                                        paddingLeft:0,
                                        textAlign:'left'
                                    }]}
                                    placeholder="Contact No."
                                    returnKeyType={"next"}
                                    ref={(input) => { this.contact = input; }}
                                    onSubmitEditing={() => { this.password.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ contact: text })}
                                    keyboardType="number-pad"
                                    autoCapitalize='none'
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.contact}
                                />
                            </View>


                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: 22.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            >

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Password"
                                    returnKeyType={"next"}
                                    secureTextEntry={showPassWord}
                                    ref={(input) => { this.password = input; }}
                                    onSubmitEditing={() => { this.c_password.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.password}
                                />
                                <TouchableOpacity
                                    style={{position: 'absolute',right: 15,top: 18}}
                                    onPress={()=>{
                                        if(this.state.showPass){
                                            this.setState({showPass:false});
                                        }
                                        else{
                                            this.setState({showPass:true});
                                        }
                                    }}
                                >
                                    <Image source={require('../assets/eye.png')} style={{ width: 30, height: 16, }} />

                                </TouchableOpacity>
                            </View>

                            <View style={{
                                width: '100%',
                                flexDirection: 'row',
                                marginBottom: 22.5,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>

                                <TextInput
                                    style={styles.textInput}
                                    placeholder="Confirm Password"
                                    returnKeyType={"go"}
                                    secureTextEntry={showCPassWord}
                                    ref={(input) => { this.c_password = input; }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ c_password: text })}
                                    placeholderTextColor="#ffffff"
                                    underlineColorAndroid="transparent"
                                    value={this.state.c_password}


                                />
                                <TouchableOpacity style={{position: 'absolute',right: 15,top: 18,}} onPress={()=>{
                                    if(this.state.showCPass){
                                        this.setState({showCPass:false});
                                    }
                                    else{
                                        this.setState({showCPass:true});
                                    }
                                }}>
                                    <Image source={require('../assets/eye.png')} style={{ width: 30, height: 16, }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={MainStyles.psosBtn} onPress={() => { this.signUp() }}>
                                <Text style={MainStyles.psosBtnText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                            
                    </ScrollView>
                </KeyboardAvoidingView>

            </ImageBackground>

        );
    }
}
const styles = StyleSheet.create({
    textInput : {
        flex: 1,
        textAlign: 'left',
        paddingLeft: 10,
        height: 50,
        fontSize: 17,
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: 12,
        paddingHorizontal: 12,
        color: '#ffffff',
    }
});
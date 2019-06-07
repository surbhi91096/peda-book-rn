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
//import PushNotification from 'react-native-push-notification';
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            accessField: false,
            emailAddress: '',
            password: ''
        }
        this.signIn = this._signIn.bind(this);
    }
    async saveDetails(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    _signIn = () => {
        if(this.state.emailAddress == ''){
             Toast.show('username should not be blank',Toast.SHORT)
             return false;
        }
        if(this.state.password == ''){
             Toast.show('Password should not be blank',Toast.SHORT)
             return false;
         }
         //this.getToken(this.sendDataToServer.bind(this));
         this.sendDataToServer();
    }
    sendDataToServer() {
        var jsonArray = {
            Username: this.state.emailAddress,
            Password:this.state.password
        };
        fetch(SERVER_URL+'reader_login',{
            method:'POST',
            headers: {
                //Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonArray)
        })
        .then((res)=>{console.log(res._bodyInit);return res.json()})
        .then((response)=>{
            console.log(response);
            if(response.status == 200){
                //Toast.show(''+response.result.otp,Toast.SHORT);
                //this.setState({otpField:true,serverOtp:response.result.otp,userId:response.result.id});
            }
            else{
                Toast.show(response.message,Toast.SHORT);
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            this.props.navigation.navigate('Home');
            console.log(err);
            this.checkNetInfo();
            this.setState({loading:false});
        });
    }
    componentDidMount = () => {
        this.checkNetInfo();
    }
    checkNetInfo = () => {
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (!isConnected) {
                    Toast.show("Please connect to internet!", Toast.LONG);
                }
            });
        } else {
            // For iOS devices
            NetInfo.isConnected.addEventListener(
                "connectionChange",
                this.handleFirstConnectivityChange
            );
        }
    };
    handleFirstConnectivityChange = isConnected => {
        NetInfo.isConnected.removeEventListener(
            "connectionChange",
            this.handleFirstConnectivityChange
        );
        if (isConnected === false) {
            Toast.show("Please connect to internet!", Toast.LONG);
        }
    };
    render() {
        return (
            <ImageBackground source={require('../../assets/l-bg.jpg')} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Loader loading={this.state.loading} />
                <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 25, alignItems: 'center' }}>
                    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{justifyContent: 'center', alignItems: 'center',width:'100%'}} style={{ flex: 1, width: '100%', paddingHorizontal: 15, }}>
                        <Image source={require('../../assets/pb-logo.png')} style={{ width: 280, height: 48 }} />
                        <View style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            marginBottom: 20,
                            borderBottomWidth: 1,
                            borderBottomColor: '#971c2e',
                            justifyContent: 'space-evenly'
                        }}>
                            <TouchableOpacity style={[{ borderBottomColor: '#971c2e', borderBottomWidth: 2 }, styles.tabItem]} onPress={() => {

                            }}>
                                <Text style={styles.tabItemText}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.tabItem}
                                onPress={() => {

                                }}>
                                <Text style={styles.tabItemText}>Access Code</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ paddingHorizontal: 20, width: '100%' }}>
                            <View style={{ width: '100%', marginBottom: 22.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.TextInputStyle}
                                    returnKeyType={"next"}
                                    ref={(input) => { this.emailAddress = input; }}
                                    onSubmitEditing={() => { this.password.focus(); }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ emailAddress: text })}
                                    keyboardType="email-address"
                                    autoCapitalize='none'
                                    placeholderTextColor="#FFFFFF"
                                    underlineColorAndroid="transparent"
                                    value={this.state.emailAddress}
                                    placeholder="Username"
                                />
                            </View>
                            <View style={{ marginBottom: 22.5, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <TextInput
                                    style={styles.TextInputStyle}
                                    placeholder="Password"
                                    returnKeyType={"go"}
                                    secureTextEntry={true}
                                    ref={(input) => { this.password = input; }}
                                    blurOnSubmit={false}
                                    onChangeText={(text) => this.setState({ password: text })}
                                    placeholderTextColor="#FFFFFF"
                                    underlineColorAndroid="transparent"
                                    value={this.state.password}
                                />
                            </View>
                            <TouchableOpacity style={MainStyles.psosBtn} onPress={() => { this.signIn() }}>
                                <Text style={MainStyles.psosBtnText}>Sign In</Text>
                            </TouchableOpacity>
                            <View style={{ width: '100%',flexDirection:'row', alignItems: 'center', justifyContent:'space-between', marginTop: 15 }}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Remember Me</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {}}>
                                    <Text style={{
                                        color: '#f88937',
                                        fontSize:17,
                                        fontFamily: 'AvenirLTStd-Roman'
                                    }}>Forgot Password ?</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection:'row',
                                alignItems: 'center',
                                width:'100%',
                                justifyContent:'center',
                                marginTop:35
                            }}>
                                <Text style={{color:'#FFFFFF',fontFamily:'AvenirLTStd-Roman'}}>Don’t have an Account ?</Text>
                                <TouchableOpacity style={{
                                    marginLeft:5
                                }}
                                onPress={()=>{this.props.navigation.navigate('Registration')}}
                                >
                                    <Text style={{color: '#f88937',fontSize:17,fontFamily: 'AvenirLTStd-Roman'}}>Register.</Text>
                                </TouchableOpacity>
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
        flex: 1,
        width:'100%',
        textAlign: 'left',
        paddingVertical: 10,
        paddingHorizontal: 10,
        height: 50,
        borderRadius:10,
        fontSize: 17,
        fontFamily: 'AvenirLTStd-Medium',
        backgroundColor: 'rgba(255,255,255,0.5)'
    }
})
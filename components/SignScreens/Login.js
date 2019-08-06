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
export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            accessField: false,
            emailAddress: '',
            password: '',
            showPass:false,
            remMe:false,
            curTab:'sign'
        }
        this.signIn = this._signIn.bind(this);
    }
    async saveDetails(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    _signIn = () => {
        if(this.state.emailAddress == ''){
             Toast.show('username should not be blank',Toast.SHORT);
             return false;
        }
        if(this.state.password == ''){
             Toast.show('Password should not be blank',Toast.SHORT);
             return false;
         }
         //this.getToken(this.sendDataToServer.bind(this));
         this.sendDataToServer();
    }
    sendDataToServer() {
        this.setState({loading:true});
        var jsonArray = {
            Username: this.state.emailAddress,
            Password:this.state.password
        };
        console.log(jsonArray);
        fetch(SERVER_URL+'reader_login',{
            method:'POST',
            headers: {
                //Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonArray)
        })
        .then((res)=>{console.log(res);return res.json()})
        .then((response)=>{
            console.log(response);
            if(response.Status == 1){
                this.saveDetails('isUserLoggedIn',"true");
                this.saveDetails('userData',JSON.stringify(response.Result));
                this.props.navigation.navigate('Home');
                //Toast.show(''+response.result.otp,Toast.SHORT);
                //this.setState({otpField:true,serverOtp:response.result.otp,userId:response.result.id});
            }
            setTimeout(()=>{
                Toast.show(response.Message,Toast.SHORT);
            },200);
            this.setState({loading:false});
        })
        .catch((err)=>{
            //this.props.navigation.navigate('Home');
            console.log(err);
            this.checkNetInfo();
            this.setState({loading:false});
        });
    }
    loginWithAccessCode = ()=>{
        if(this.state.acode == ''){
            Toast.show('Access code should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.acode.length < 8){
            Toast.show('Access code should 8 characters long',Toast.SHORT);
            return false;
        }
        var jsonArray = {
            AccessCode: this.state.acode
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
            console.log(response);
            if(response.Status == 1){
                this.saveDetails('isUserLoggedIn',"true");
                this.saveDetails('userData',JSON.stringify({'accessCode':response.Result.AccessCode}));
                this.props.navigation.navigate('Home');
            }
            Toast.show(response.Message,Toast.LONG);
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
        var behavoir = (Platform.OS == 'ios')?'padding':'';
        var showPass = (this.state.showPass == false)?true:false;
        return (
            <ImageBackground source={require('../../assets/l-bg.jpg')} style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
                <Loader loading={this.state.loading} />
                <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 25, alignItems: 'center' }} behavior={behavoir}>
                    <ScrollView keyboardShouldPersistTaps="always" contentContainerStyle={{justifyContent: 'center', alignItems: 'center',width:'100%'}} style={{ flex: 1, width: '100%', paddingHorizontal: 15, }}>
                        <Image source={require('../../assets/pb-logo.png')} style={{ width: 200, height: 35 }} />
                        <View style={{flexDirection: 'row',marginTop: 20,marginBottom: 20,borderBottomWidth: 1,borderBottomColor: '#971c2e',justifyContent: 'space-evenly'}}>
                            <TouchableOpacity style={[(this.state.curTab == 'sign')?{ borderBottomColor: '#971c2e', borderBottomWidth: 2 }:'', styles.tabItem]} onPress={() => {
                                this.setState({curTab:'sign'});
                            }}>
                                <Text style={styles.tabItemText}>Sign In</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[(this.state.curTab == 'acode')?{ borderBottomColor: '#971c2e', borderBottomWidth: 2 }:'',styles.tabItem]}
                                onPress={() => {this.setState({curTab:'acode'});}}>
                                <Text style={styles.tabItemText}>Access Code</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.curTab == 'sign' && 
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
                                        placeholder="Email"
                                    />
                                </View>
                                <View style={{ marginBottom: 22.5, width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.TextInputStyle}
                                        placeholder="Password"
                                        returnKeyType={"go"}
                                        secureTextEntry={showPass}
                                        ref={(input) => { this.password = input; }}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ password: text })}
                                        placeholderTextColor="#FFFFFF"
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
                                        <Image source={require('../../assets/eye.png')} style={{ width: 30, height: 16, }} />
                                    </TouchableOpacity>
                                </View>
                                <TouchableOpacity style={MainStyles.psosBtn} onPress={() => { this.signIn() }}>
                                    <Text style={MainStyles.psosBtnText}>Sign In</Text>
                                </TouchableOpacity>
                                <View style={{ width: '100%',flexDirection:'row', alignItems: 'center', justifyContent:'space-between', marginTop: 15 }}>
                                    <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{
                                        if(this.state.remMe == true){this.setState({remMe:false});}
                                        else{this.setState({remMe:true});}
                                    }}>
                                        <View style={[MainStyles.checkBoxStyle]}>
                                        {this.state.remMe == true &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                        </View>
                                        <Text style={[MainStyles.checkBoxLabel]}>Remember Me</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {this.props.navigation.navigate('ForgotPassword')}}>
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
                        }
                        {
                            this.state.curTab == 'acode' && 
                            <View style={{ paddingHorizontal: 20, width: '100%' }}>
                                <View style={{width:'100%',justifyContent:'center',alignItems:'center',marginBottom:20}}>
                                    <Text style={{fontSize:20,color:'#FFFFFF'}}>Redeem Access Code</Text>
                                </View>
                                <View style={{ width: '100%', marginBottom: 22.5, justifyContent: 'flex-start', alignItems: 'center' }}>
                                    <TextInput
                                        style={styles.TextInputStyle}
                                        returnKeyType={"go"}
                                        ref={(input) => { this.acode = input; }}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ acode: text })}
                                        keyboardType="default"
                                        autoCapitalize='none'
                                        placeholderTextColor="#FFFFFF"
                                        underlineColorAndroid="transparent"
                                        value={this.state.acode}
                                        placeholder="Enter Access Code"
                                        maxLength={8}
                                    />
                                </View>
                                <TouchableOpacity style={MainStyles.psosBtn} onPress={() => { this.loginWithAccessCode(); }}>
                                    <Text style={MainStyles.psosBtnText}>Send</Text>
                                </TouchableOpacity>
                            </View>
                        }
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
        backgroundColor: 'rgba(255,255,255,0.5)',
        color:'#FFFFFF'
    }
})
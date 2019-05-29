import React,{Component} from 'React';
import {View,Text,Image,TextInput,TouchableOpacity,SafeAreaView,ImageBackground,
    AsyncStorage,Platform,NetInfo} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            loading:false,
            registertingFrom:'',
            emailAddress:'',
            password:''
        }
        this.signIn = this._signIn.bind(this);
    }
    async saveDetails(key,value){
        await AsyncStorage.setItem(key,value);
    }
    _signIn = () =>{
        this.props.navigation.navigate('Home');
       /* if(this.state.emailAddress == ''){
            Toast.show('Email address should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.password == ''){
            Toast.show('Password should not be blank',Toast.SHORT)
            return false;
        }
        this.sendDataToServer();*/
    }
    sendDataToServer(){
        this.setState({loading:true});
        console.log('token');
        fetch(SERVER_URL+'user_login',{
            method:'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.emailAddress,
                password: this.state.password,
                device_type:Platform.OS,
                device_key:''
            })
        })
        .then((res)=>res.json())
        .then((response)=>{
            console.log(response);
            if(response.status == 200){
                Toast.show(response.message,Toast.SHORT)
            }
            else{
                Toast.show(response.message,Toast.SHORT)
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            console.log(err);
            this.checkNetInfo();
            this.setState({loading:false});
        });
    }
    componentDidMount = ()=>{
        this.checkNetInfo();
    }
    checkNetInfo = ()=>{
        if (Platform.OS === "android") {
            NetInfo.isConnected.fetch().then(isConnected => {
              if (!isConnected) {
                Toast.show("Please connect to internet!",Toast.LONG);
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
            Toast.show("Please connect to internet!",Toast.LONG);
        }
    };
    render(){
        return(
            <ImageBackground source={require('../../assets/l-bg.jpg')} style={{flex:1,backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center'}}>
                <Loader loading={this.state.loading} />
                <Image source={require('../../assets/web-logo.png')} style={{width:280,height:48}} />
                <View style={{
                    marginTop: 60,
                    width:'100%',
                    maxWidth:'70%'
                }}>
                    <View 
                        style={{
                        borderRadius: 35,
                        borderStyle:"dashed",
                        borderWidth: 3,
                        borderColor: '#147dbf',
                        width:'100%',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        flexDirection: 'row',
                        marginBottom: 22.5,
                        justifyContent:'center',
                        alignItems: 'center',
                        }}
                    >
                        <Image source={require('../../assets/lock-disable.png')} width={18} height={14} style={{width:18,height:14}}/>
                        <TextInput 
                        style={{
                            flex:1,
                            textAlign:'left',
                            paddingLeft: 10,
                            height:40,
                            fontSize:17,
                            fontFamily:'AvenirLTStd-Medium'
                        }} 
                        placeholder="Email *" 
                        returnKeyType={"next"} 
                        ref={(input) => { this.emailAddress = input; }} 
                        onSubmitEditing={() => { this.password.focus(); }} 
                        blurOnSubmit={false}
                        onChangeText={(text)=>this.setState({emailAddress:text})} 
                        keyboardType="email-address" 
                        autoCapitalize='none' 
                        placeholderTextColor="#147dbf" 
                        underlineColorAndroid="transparent" 
                        value={this.state.emailAddress}
                        />
                    </View>
                    <View style={{
                        borderRadius: 35,
                        borderStyle:"dashed",
                        borderWidth: 3,
                        borderColor: '#bebebe',
                        width:'100%',
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        flexDirection: 'row',
                        justifyContent:'center',
                        alignItems: 'center',
                        }}
                    >
                        <Image source={require('../../assets/lock-disable.png')} width={18} height={24} style={{width:18,height:24}}/>
                        <TextInput 
                            style={{
                                flex:1,
                                textAlign:'left',
                                paddingLeft: 10,
                                height:40,
                                fontSize:17,
                                fontFamily:'AvenirLTStd-Medium',
                            }} 
                            placeholder="Password *" 
                            returnKeyType={"go"} 
                            secureTextEntry={true} 
                            ref={(input) => { this.password = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({password:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.password}
                        />
                    </View>
                    <View style={{width:'100%',alignItems:'flex-end',marginTop:15}}>
                        <TouchableOpacity onPress={()=>{}}>
                            <Text style={{
                                color:'#ed1d24',
                                fontFamily:'AvenirLTStd-Roman'
                            }}>Forgot Password ?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent:'center',
                        alignItems:'center',
                        marginTop:26
                    }}>
                        <TouchableOpacity style={MainStyles.psosBtn} onPress={()=>{this.signIn()}}>
                            <Text style={MainStyles.psosBtnText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                    {/* <View style={{
                        marginTop:25
                    }}>
                        <Image source={require('../../assets/or-strip.png')} width={'100%'} style={{width:'100%'}}/>
                    </View> */}
                    {/* <View style={{
                        flexDirection:'row',
                        justifyContent:'center',
                        alignItems:'center',
                        marginTop:20
                    }}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/fb-icon.png')} width={40} height={40} style={{
                                width:40,
                                height:40
                            }}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            marginLeft:24
                        }}>
                            <Image source={require('../../assets/g-icon.png')} width={40} height={40} style={{
                                width:40,
                                height:40
                            }}/>
                        </TouchableOpacity>
                    </View> */}
                    <View style={{
                        flexDirection:'row',
                        alignItems: 'center',
                        width:'100%',
                        justifyContent:'center',
                        marginTop:35
                    }}>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Roman'}}>Don’t have an Account ?</Text>
                        <TouchableOpacity style={{
                            marginLeft:5
                        }}
                        onPress={()=>{this.props.navigation.navigate('Registration')}}
                        >
                            <Text style={{color:'#147dbf',fontFamily:'AvenirLTStd-Roman'}}>Register.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}
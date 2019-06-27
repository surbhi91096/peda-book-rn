import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, 
    Dimensions, ScrollView, TouchableOpacity, SafeAreaView,AsyncStorage } from 'react-native';
import MainStyles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../Constants';
import Toast from 'react-native-simple-toast';
import Loader from './Loader';
import ImagePicker from 'react-native-image-picker';
const { height, width } = Dimensions.get('window');
class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            isEditing: false,
            Name:'',
            userPic :require('../assets/user.png'),
            changeingPass:false
        }
    }
    async saveDetails(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData,Name:userData.Name,userPic:{uri:userData.ProfileImage}});
    }
    saveProfile=()=>{
        this.setState({loading:true});
        var fd = new FormData();
        fd.append('UserId',this.state.userData.UserId);
        fd.append('Name',this.state.Name);
        var data = JSON.stringify({
            UserId:this.state.userData.UserId,
            Name:this.state.Name
        });
        fetch(SERVER_URL+'user_save_profile',{
            method:'POST',
            body:fd
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.Status == 1){
                this.saveDetails('userData',JSON.stringify(response.Result));
            }
            console.log(response);
            Toast.show(response.Message,Toast.SHORT);
            this.setState({loading:false, isEditing: false });
        })
        .catch(err=>{
            console.log(err);
        })
        
    }
    componentDidMount() {
        this.setUserData()
    }
    uploadPic = ()=>{
        this.setState({loading:true});
        var fd = new FormData();
        fd.append('UserId',this.state.userData.UserId);
        fd.append('ProfileImage',this.state.fileData.data);
        fetch(SERVER_URL+'user_update_profile_pic',
        {
            method:'POST',
            body:fd
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            if(response.Status == 1){
                this.saveDetails('userData',JSON.stringify(response.Result));
            }
            console.log(response);
            Toast.show(response.Message,Toast.SHORT);
            this.setState({loading:false});
        })
        .catch(err=>{
            console.log(err);
        })
    }
    pickFile = ()=>{
        const options = {
            title: 'Select File',
            storageOptions: {
              skipBackup: false,
              path: 'images',
            },
            maxWidth:400,
            maxHeight:400,
            mediaType:'photo',
            quality:1,
            allowsEditing:true,
          };
          
          /**
           * The first arg is the options object for customization (it can also be null or omitted for default options),
           * The second arg is the callback which sends object: response (more info in the API Reference)
           */
          ImagePicker.showImagePicker(options, (response) => {
            //console.log('Response = ', response);
          
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              
              this.setState({
                profilePicName:response.fileName,
                fileData:{data:response.data,name:response.fileName},
                userPic: {uri:response.uri},
              });
              this.uploadPic();
            }
          });
    }
    render() {
        const RemoveHiehgt = height - 50;
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                 <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} style={{ paddingHorizontal: 10 }}>
                        <Image source={require('../assets/left-ar.png')} style={{ width: 10, height: 19 }} />
                    </TouchableOpacity>

                    <Text style={{ fontFamily: 'AvenirLTStd-Roman', color: '#403f41', fontSize: 16, paddingRight: 120 }}>Profile Setting</Text>

                </View>

                <ScrollView keyboardShouldPersistTaps="always" style={{paddingBottom:10}}>

                    <View style={{ backgroundColor: '#ededee', paddingHorizontal: 10, alignItems: 'center' }}>
                        <View style={{ paddingVertical: 20,marginTop:20,borderRadius:100,overflow:'hidden',width:100,height:100,justifyContent:'center',alignItems:'center' }}>
                            <Image source={this.state.userPic} width={20} height={30} style={{ width: 100, height: 100 }} />
                        </View>
                        <TouchableOpacity onPress={()=>{
                            this.pickFile();
                        }}>
                            <Text style={{ color: '#971a31', fontSize: 17, }}>Change Profile Picture</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flexDirection: 'row',
                        borderWidth: 1,
                        borderColor: '#971a31',
                        marginHorizontal: 100,
                        marginVertical: 3,

                    }}></View>

                    <View>
                        <View style={{ paddingVertical: 20 }}>
                            <Image source={require('../assets/dashed-b-s.png')} width={10} height={10} style={{ width: '100%', height: 1 }} />

                        </View>

                        <View style={{ flexDirection: 'row',width:'100%',justifyContent:'space-around',alignItems:'center' }}>

                            <View style={{ width: '75%', paddingVertical: 0, marginHorizontal: 15,alignItems:'center',justifyContent:'center' }}>
                                {
                                    this.state.isEditing == false &&
                                    <Text style={{
                                        textAlignVertical: 'center',
                                        flex: 1,
                                        textAlign: 'left',
                                        height: 50,
                                        fontSize: 17,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        borderRadius: 2,
                                        borderWidth: 2,
                                        width:'100%',
                                        lineHeight:50,
                                        borderColor: '#595453',
                                        paddingHorizontal: 12,
                                    }}>{this.state.Name}</Text>
                                }
                                {
                                    this.state.isEditing &&
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            height: 50,
                                            fontSize: 17,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            borderRadius: 2,
                                            borderWidth: 2,
                                            borderColor: '#971a31',
                                            paddingHorizontal: 12,
                                            width:'100%'
                                        }}
                                        placeholder="Name"
                                        returnKeyType={"default"}
                                        ref={(input) => { this.name = input; }}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ Name: text })}
                                        autoCapitalize='none'
                                        placeholderTextColor="#665e5c"
                                        underlineColorAndroid="transparent"
                                        value={this.state.Name}
                                    />
                                }
                            </View>
                            <View style={{width:'25%', justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    this.state.isEditing == false &&
                                    <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => {
                                        this.setState({ isEditing: true });
                                    }}>
                                        <Image source={require('../assets/edit-pencil.png')} style={{ width: 40, height: 40, }} />
                                    </TouchableOpacity>
                                }
                                {
                                    this.state.isEditing == true &&
                                    <View style={{flexDirection:'row',justifyContent:'space-evenly',alignItems:'center'}}>
                                        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() => {this.saveProfile()}}>
                                            <Icon name="check" style={{ fontSize: 20, color: '#971a31' }} />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ paddingHorizontal: 10 }} onPress={() =>this.setState({isEditing:false})}>
                                            <Icon name="times" style={{ fontSize: 20, color: '#971a31' }} />
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                        </View>
                        <View style={{ flex: 1, marginVertical: 10, }}></View>
                        <View style={{ flexDirection: 'row' }}>
                        </View>
                        <View style={{
                            flex: 1,
                            marginVertical: 10,
                        }}></View>
                        <View style={{ flexDirection: 'row', marginBottom: 15, paddingHorizontal: 15, }}>
                            <Text style={{
                                color: '#889292',
                            }}>Email ID :</Text>
                            {
                                this.state.userData && 
                                <Text style={{
                                    color: '#971a31',
                                    paddingLeft: 5,
                                }}>{this.state.userData.Email}</Text>
                            }
                        </View>
                        <View>
                            <Image source={require('../assets/dashed-b-s.png')} width={20} height={30} style={{ width: '100%', height: 1, }} />
                        </View>
                        <View style={{
                            flex: 1,
                            marginVertical: 10,
                        }}></View>
                        {
                            this.state.changeingPass == false && 
                            <View style={{flex: 1,paddingHorizontal: 50}}>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#971a31',
                                        height: 40,
                                        justifyContent: 'center',
                                        borderRadius: 2,
                                    }}
                                    onPress={()=>{
                                        this.setState({changeingPass:true});
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 16,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        color: '#ffffff',
                                        justifyContent: 'center',
                                        textAlign: "center",

                                    }}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={{marginVertical: 25}}></View>
                        {
                            this.state.changeingPass == true && 
                            <View style={{flex: 1}}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 18,
                                    color: '#5a6565',
                                }}>Reset Password</Text>
                                <View style={{flex: 1,marginVertical: 10}}></View>
                                <View style={{paddingVertical: 0,marginHorizontal: 15}} >
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            height: 40,
                                            fontSize: 17,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            borderRadius: 2,
                                            borderWidth: 2,
                                            borderColor: '#595453',
                                            paddingHorizontal: 12,
                                        }}
                                        placeholder="Current Password"
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ oldPass: text })}
                                        keyboardType="name-phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#665e5c"
                                        underlineColorAndroid="transparent"
                                        value={this.state.oldPass}
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginVertical: 10,
                                }}></View>
                                <View
                                    style={{


                                        paddingVertical: 0,
                                        marginHorizontal: 15,

                                    }}
                                >
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            height: 40,
                                            fontSize: 17,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            borderRadius: 2,
                                            borderWidth: 2,
                                            borderColor: '#595453',
                                            paddingHorizontal: 12,
                                        }}
                                        placeholder="New Password"
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ newPass: text })}
                                        keyboardType="name-phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#665e5c"
                                        underlineColorAndroid="transparent"
                                        value={this.state.newPass}
                                    />
                                </View>
                                <View style={{
                                    flex: 1,
                                    marginVertical: 10,
                                }}></View>
                                <View
                                    style={{


                                        paddingVertical: 0,
                                        marginHorizontal: 15,

                                    }}
                                >
                                    <TextInput
                                        style={{
                                            flex: 1,
                                            textAlign: 'left',
                                            height: 40,
                                            fontSize: 17,
                                            fontFamily: 'AvenirLTStd-Medium',
                                            borderRadius: 2,
                                            borderWidth: 2,
                                            borderColor: '#595453',
                                            paddingHorizontal: 12,
                                        }}
                                        placeholder="Confirm Password"
                                        returnKeyType={"next"}
                                        blurOnSubmit={false}
                                        onChangeText={(text) => this.setState({ newCPass: text })}
                                        keyboardType="name-phone-pad"
                                        autoCapitalize='none'
                                        placeholderTextColor="#665e5c"
                                        underlineColorAndroid="transparent"
                                        value={this.state.newCPass}
                                    />
                                </View>
                                <View style={{
                                    paddingVertical: 10,
                                }}></View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingHorizontal: 15,
                                        justifyContent: "space-evenly",
                                        flex: 1,



                                    }}>
                                    <View style={{


                                        width: '50%',
                                        paddingRight: 10,

                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#971a31',
                                                paddingVertical: 10,
                                                borderColor: '#971a31',
                                                borderStyle: 'solid',
                                                borderWidth: 1,
                                            }}
                                            onPress={()=>{
                                                this.setState({loading:true});
                                                var fd = new FormData();
                                                fd.append('UserId',this.state.userData.UserId);
                                                fd.append('OldPass',this.state.oldPass);
                                                fd.append('NewPass',this.state.newPass);
                                                fd.append('ConfirmPass',this.state.newCPass);
                                                fetch(SERVER_URL+'user_change_password',
                                                {
                                                    method:'POST',
                                                    body:fd
                                                })
                                                .then(res=>res.json())
                                                .then(response=>{
                                                    console.log(response);
                                                    Toast.show(response.Message,Toast.SHORT);
                                                    this.setState({loading:false,changeingPass:false});
                                                })
                                                .catch(err=>{
                                                    console.log(err);
                                                })
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: '#ffffff',
                                                    textAlign: 'center',
                                                    fontSize: 16,
                                                    fontFamily: 'AvenirLTStd-Medium',
                                                }}>Change</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{

                                        width: '50%',
                                        paddingLeft: 10,
                                    }}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: '#ffffff',
                                                paddingVertical: 10,
                                                borderColor: '#cacbcd',
                                                borderStyle: 'solid',
                                                borderWidth: 1,

                                            }}
                                            onPress={()=>{
                                                this.setState({changeingPass:false});
                                            }}
                                        >
                                            <Text style={{
                                                color: '#c1cac9',
                                                textAlign: 'center',
                                                fontSize: 16,
                                                fontFamily: 'AvenirLTStd-Medium',
                                            }}>Cancel</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </View>
                        }
                        <View style={{marginVertical: 25}}></View>
                        <View style={{
                            flex: 1,

                        }}>
                            <TouchableOpacity onPress={()=>{this.props.navigation.navigate('About')}}>
                                <Text style={{
                                    textAlign: 'center',
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    textDecorationLine: 'underline',
                                    color: '#232323',
                                }}>About Us</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: "row",
                            justifyContent: 'center',
                            marginTop: 15,

                        }}>
                            <View style={{
                                paddingHorizontal: 25,
                            }}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Privacy')}}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        textDecorationLine: 'underline',
                                        color: '#232323',
                                    }}>Privacy Policy</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                borderRightWidth: 1,
                                borderRightColor: '#999999',
                            }}></View>
                            <View style={{ paddingHorizontal: 25, }}>
                                <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Terms')}}>
                                    <Text style={{
                                        textAlign: 'center',
                                        fontSize: 16,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        textDecorationLine: 'underline',
                                        color: '#232323',
                                    }}>Terms &amp; Conditions</Text>
                                </TouchableOpacity>
                            </View>

                        </View>


                        <View style={{ marginTop: 25, }}>
                            <Image source={require('../assets/dashed-b-s.png')} width={20} height={30} style={{ width: '100%', height: 1, }} />
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingHorizontal: 50,
                                marginTop: 25,

                            }}>
                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#971a31',
                                    height: 40,
                                    justifyContent: 'center',
                                    borderRadius: 2,


                                }}
                                onPress={()=>this.props.navigation.navigate('Logout')}
                            >
                                <Text style={{
                                    fontSize: 16,
                                    fontFamily: 'AvenirLTStd-Medium',
                                    color: '#ffffff',

                                    justifyContent: 'center',
                                    textAlign: "center",

                                }}>Sign Out</Text>
                            </TouchableOpacity>
                        </View>


                    </View>


                    <View>
                    </View>
                </ScrollView>
                <View style={{justifyContent:'flex-end',flexDirection:'row',paddingHorizontal:20,paddingVertical:10,backgroundColor:'#FFFFFF'}}>
                    <Text style={{fontSize:11,marginRight:2}}>Powered By</Text> 
                    <Text style={{color:'#971a31',fontSize:11}}>Pedabook</Text>
                </View>

            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

});
export default Profile;
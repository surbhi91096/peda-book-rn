import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, 
    Dimensions, ScrollView,Platform,KeyboardAvoidingView,AsyncStorage,
    TouchableOpacity, SafeAreaView } from 'react-native';
import { DrawerActions,NavigationActions,withNavigation } from 'react-navigation';
import MainStyles from '../Styles';
import Dialog, { DialogContent,SlideAnimation } from 'react-native-popup-dialog';
import Icon from 'react-native-vector-icons/FontAwesome';
class HeaderMenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            isAccessModalOpen:false,
            userPic: require('../../assets/user.png')
        }
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData,Name:userData.Name,userPic:{uri:userData.ProfileImage}});
    }
    componentDidMount(){
        this.props.navigation.addListener('didFocus',this.onFocus);
    }
    onFocus = ()=>{
        this.setUserData();
    }
    render(){
        var behavior = (Platform.OS == 'ios')?'padding':'';
        return(
            <View style={MainStyles.navHeaderWrapper}>
                <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())}}>
                    <Icon name="bars" style={{fontSize:20,color:'#971a31'}} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'AvenirLTStd-Roman', color: '#971a31', fontSize: 16 }}>Pedabook</Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={()=>{this.setState({isAccessModalOpen:true})}}>
                        <Image source={require('../../assets/key.png')} style={{width:25,height:25}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft:15,width:25,height:25,overflow:"hidden",borderRadius:50}} onPress={()=>{this.props.navigation.navigate('Profile');}}>
                        <Image source={this.state.userPic} style={{width:25,height:25}} />
                    </TouchableOpacity>
                </View>
                <Dialog
                    visible={this.state.isAccessModalOpen}
                    dialogStyle={{ padding:0,
                        marginTop:30}}
                    dialogAnimation={new SlideAnimation()}
                    dialogStyle={{width:300,padding:0}} 
                    containerStyle={{zIndex: 10}}
                    rounded={true}
                >
                    <View style={[{
                        height:50,
                        backgroundColor:'#FFFFFF',
                        padding:10,
                        width:'100%',
                        flexDirection:'row',
                    },{alignItems:'center',justifyContent:'space-between',flexDirection:'row'}]}>
                        <Text style={{color:'#971a31',fontFamily: 'Roboto-Medium',fontSize:16}}>Access Code</Text>
                        <TouchableOpacity onPress={()=>{this.setState({isAccessModalOpen:false})}}>
                            <Image source={require('../../assets/close.png')} style={{width:15,height:15}}/>
                        </TouchableOpacity>
                    </View>
                    <DialogContent style={{padding:0,borderWidth: 0,backgroundColor:'#971a31'}}>
                        <View style={[{ width:'100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop:20,
                                paddingVertical:10,
                                paddingBottom:20
                        ,justifyContent:'center',flexDirection: 'row'}]}>
                            <TextInput style={{
                                flex: 1,
                                textAlign: 'left',
                                height: 40,
                                fontSize: 17,
                                fontFamily: 'AvenirLTStd-Medium',
                                borderRadius: 2,
                                paddingHorizontal: 7,
                                width:'100%',
                                top:0,
                                position:'absolute',
                                backgroundColor:'#FFFFFF'
                            }}
                            placeholder="Access Code"
                            ref={(input) => { this.searchInput = input; }}
                            onChangeText={(text) => this.searchBooks(text)}
                            autoCapitalize='none'
                            keyboardType="web-search"
                            placeholderTextColor="#971a31"
                            underlineColorAndroid="transparent" />
                            <TouchableOpacity style={[{marginBottom:0,position:'absolute',top:13,right:10}]} onPress={()=>{}}>
                                <Image source={require('../../assets/right-arrow.png')} style={{width:15,height:15}}/>
                            </TouchableOpacity>
                        </View>
                    </DialogContent>
                </Dialog>
            </View>
        );
    }
}
export default withNavigation(HeaderMenu);
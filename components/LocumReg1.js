import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,
    ActionSheetIOS,Platform } from 'react-native';
import Loader from './Loader';
import MainStyles from './Styles';
import countryList from 'react-select-country-list';
const { height, width } = Dimensions.get('window');
class LocumReg1Screen extends Component{
    constructor(props) {
        super(props);
        var cOptionsList = countryList().getLabels();
        cOptionsList.unshift('Cancel');
        this.state={
            loading:false,
            CountryList:countryList().getLabels(),
            cOptions:cOptionsList,
        }
    }
    componentDidMount(){

    }
    pickerIos = ()=>{
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.state.cOptions,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if(buttonIndex != 0){
              this.setState({country: this.state.cOptions[buttonIndex]})
            }
          });
    }
    render(){
        const RemoveHiehgt = height - 66;
        var behavior = (Platform.OS == 'ios')?'padding':'';
        return (
            <SafeAreaView style={{flexDirection:'column',flex:1}}>
                <Loader loading={this.state.loading} />
                <View style={{
                    paddingTop: 15,
                    alignItems:'center',
                    justifyContent:'center'
                }}>
                    <Image source={require('../assets/web-logo.png')} style={{width:200,height:34}}/>
                    <Image source={require('../assets/header-b.png')} style={{width:'100%',marginTop:15}}/>
                </View>
                <KeyboardAvoidingView style={{flex:1,}} enabled behavior={behavior}>
                    <ScrollView style={{
                        paddingHorizontal:15,
                        height:RemoveHiehgt
                        }}
                    >
                        <View style={{
                            paddingVertical:20,
                        }}>
                            <Text style={{
                                fontFamily:'AvenirLTStd-Heavy',
                                color:'#151515',
                                fontSize:16
                            }}>Locum Registration Form</Text>
                            <Text style={{
                                marginTop:5,
                                fontFamily:'AvenirLTStd-Medium',
                                color:'#676767',
                                fontSize:13,
                                marginBottom:5,
                            }}>
                                To register and benefit from becoming a Pharmacy SOS locum, please use this form to register.
                            </Text>
                        </View>
                        {/* Locum Registration Heading Ends */}
                        <Image source={require('../assets/dashed-border.png')} width={'100%'} height={2} />
                        <View style={{
                            justifyContent:'center',
                            alignItems: 'center',
                            paddingVertical:18,
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                paddingVertical:10,
                                paddingHorizontal:10,
                                backgroundColor:'#1476c0',
                                borderRadius:10
                            }}>
                                <Text style={{
                                    fontFamily:'AvenirLTStd-Medium',
                                    color:'#FFFFFF',
                                    fontSize:12,
                                }}>Contact Details</Text>
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                <Image source={require('../assets/dashed-b-s.png')} width={100} style={{width:50}}/>
                            </View>
                            <View style={{
                                paddingVertical:10,
                                paddingHorizontal:10,
                                backgroundColor:'#959595',
                                borderRadius:10
                            }}>
                                <Text style={{
                                    fontFamily:'AvenirLTStd-Medium',
                                    color:'#FFFFFF',
                                    fontSize:12,
                                }}>Professional Details</Text>
                            </View>
                        </View>
                        <Image source={require('../assets/dashed-border.png')} width={'100%'} height={2}/>
                        {/* BreadCrumbs Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Name
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:10}}>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="First Name" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.firsName = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({firsName:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.firsName}
                            />
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="Last Name" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.lastName = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({lastName:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.lastName}
                            />
                        </View>
                        {/* First & Last Name Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Phone
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            style={MainStyles.TInput} 
                            placeholder="Phone Number" 
                            returnKeyType={"go"} 
                            ref={(input) => { this.phoneNo = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({phoneNo:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.phoneNo}
                        />
                        {/* Phone Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            E-mail
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            style={MainStyles.TInput} 
                            placeholder="E-mail" 
                            returnKeyType={"go"} 
                            ref={(input) => { this.emailAddress = input; }} 
                            blurOnSubmit={false}
                            keyboardType="email-address"
                            onChangeText={(text)=>this.setState({emailAddress:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.emailAddress}
                        />
                        {/* Email Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Address
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            style={MainStyles.TInput} 
                            placeholder="Street Address" 
                            returnKeyType={"go"} 
                            ref={(input) => { this.emailAddress = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({emailAddress:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.emailAddress}
                        />
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="City" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.city = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({city:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.city}
                            />
                            <View style={{paddingHorizontal:5}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="State/Province/Region" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.spr = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({spr:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.spr}
                            />
                        </View>
                        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:15}}>
                            <TextInput 
                                style={MainStyles.TInput} 
                                placeholder="Postal / Zipcode" 
                                returnKeyType={"go"} 
                                ref={(input) => { this.pz = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({pz:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.pz}
                            />
                            <View style={{paddingHorizontal:5}}></View>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.country}
                                    style={{
                                        flex:1,
                                        paddingLeft: 10,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
                                        <Picker.Item label="Choose " value="" />
                                        {
                                        this.state.CountryList.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={item} value={item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.country}</Text>
                                </TouchableOpacity>
                                
                            }
                        </View>
                        {/* Address Ends */}
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:26
                        }}>
                            <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.props.navigation.navigate('LocumReg2')}}>
                                <Text style={MainStyles.psosBtnText}>Continue</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20}}></View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
export default LocumReg1Screen;
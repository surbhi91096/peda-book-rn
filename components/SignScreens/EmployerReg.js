import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,
    ActionSheetIOS,Platform } from 'react-native';
import Loader from '../Loader';
import MainStyles from '../Styles';
import countryList from 'react-select-country-list';
import Dialog, { SlideAnimation } from "react-native-popup-dialog";
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
const { height, width } = Dimensions.get('window');
class EmployerScreen extends Component{
    constructor(props) {
        super(props);
        var cOptionsList = countryList().getLabels();
        cOptionsList.unshift('Cancel');
        this.state={
            loading:false,
            CountryList:countryList().getLabels(),
            cOptions:cOptionsList,
            showTerms:false,
            firsName:'',
            lastName:'',
            phoneNo:'',
            emailAddress:'',
            city:'',
            spr:'',
            pz:'',
            country:'',
        }
        this.singup = this._signup.bind(this);
    }
    componentDidMount = () => {

    }
    _signup = () => {
        
        if(this.state.firsName == ''){
            Toast.show('First name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.lastName == ''){
            Toast.show('Last name should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.phoneNo == ''){
            Toast.show('Phone number should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.emailAddress == ''){
            Toast.show('Email ID should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.streetAddress == ''){
            Toast.show('Email ID should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.city == ''){
            Toast.show('City should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.spr == ''){
            Toast.show('State/Provision/Region should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.pz == ''){
            Toast.show('Postal/Zipcode should not be blank',Toast.SHORT)
            return false;
        }
        if(this.state.country == ''){
            Toast.show('Country should not be blank',Toast.SHORT)
            return false;
        }
        this.setState({loading:true});
        var formdata = new FormData();
        formdata.append('fname',this.state.firsName);
        formdata.append('lname',this.state.lastName);
        formdata.append('phone',this.state.phoneNo);
        formdata.append('email',this.state.emailAddress);
        formdata.append('city',this.state.city);
        formdata.append('state',this.state.spr);
        formdata.append('postal',this.state.pz);
        formdata.append('country',this.state.country);
        formdata.append('device_type',Platform.OS);
        formdata.append('device_key','');
        fetch(SERVER_URL+'emp_reg',{
            method:'POST',
            headers: {
                Accept: 'application/json',
            },
            body: formdata
        })
        .then((res)=>res.json())
        .then((response)=>{
            if(response.status == 200){
                Toast.show(response.message,Toast.SHORT);
            }
            else{
                Toast.show(response.message,Toast.SHORT);
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            console.log(err);
            this.setState({loading:false});
        });
    }
    pickerIos = () => {
        ActionSheetIOS.showActionSheetWithOptions({
            options: this.state.cOptions,
            cancelButtonIndex: 0,
          },
          (buttonIndex) => {
            if(buttonIndex != 0){
              this.setState({country: this.state.cOptions[buttonIndex]});
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
                    <Image source={require('../../assets/web-logo.png')} style={{width:200,height:34}}/>
                    <Image source={require('../../assets/header-b.png')} style={{width:'100%',marginTop:15}}/>
                </View>
                <KeyboardAvoidingView style={{flex:1,}} enabled behavior={behavior}>
                    <ScrollView style={{paddingHorizontal:15,height:RemoveHiehgt}} keyboardShouldPersistTaps="always">
                        <View style={{paddingVertical:20,}}>
                            <Text style={{
                                fontFamily:'AvenirLTStd-Heavy',
                                color:'#151515',
                                fontSize:16
                            }}>Employer Registration</Text>
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
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2} />
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
                            ref={(input) => { this.streetAddress = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({streetAddress:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.streetAddress}
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
                            <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.singup()}}>
                                <Text style={MainStyles.psosBtnText}>Submit</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:20}}></View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <Dialog
                    visible={this.state.showTerms}
                    dialogStyle={{ width: "95%", padding: 0, maxHeight: "95%" }}
                    dialogAnimation={new SlideAnimation()}
                    containerStyle={{
                        zIndex: 10,
                        flex: 1,
                        justifyContent: "space-between"
                    }}
                    rounded={false}
                    >
                    <View
                        style={MainStyles.modalHeader}
                    >
                        <Text style={MainStyles.modalHeaderHeading}>Terms and Conditions</Text>
                        <TouchableOpacity onPress={() =>{this.setState({showTerms:false})}}>
                            <Image source={require('../../assets/cross-icon.png')} width={21} height={21} style={{height:21,width:21}} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView contentContainerStyle={{paddingHorizontal: 10,paddingVertical:10}}>
                        <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#1476c0',fontSize:15}}>
                            Our Terms and Conditions
                        </Text>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>1. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>2. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>3. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>4. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>5. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>6. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                    </ScrollView>
                    <View style={MainStyles.modalFooter}>
                        <TouchableOpacity style={[MainStyles.psosBtn, MainStyles.psosBtnXm]} onPress={()=>{
                            this.setState({showTerms:false});
                            this.props.navigation.navigate('Home');
                        }}>
                            <Text style={[MainStyles.psosBtnText,MainStyles.psosBtnXsText]}>I Agree</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </SafeAreaView>
        );
    }
}
export default EmployerScreen;
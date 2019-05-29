import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,
    ActionSheetIOS,Platform } from 'react-native';
import Loader from './Loader';
import MainStyles from './Styles';
import countryList from 'react-select-country-list';
import Dialog, { SlideAnimation } from "react-native-popup-dialog";
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
            showTerms:false
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
                                backgroundColor:'#1476c0',
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
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13}}>
                                Please upload your resume 
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TouchableOpacity style={MainStyles.selectFilesBtn}>
                                <Text style={{
                                    color:'#FFFFFF'
                                }}>Select Files</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Resume Field Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13}}>
                                Professional Portrait image
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TouchableOpacity style={MainStyles.selectFilesBtn}>
                                <Text style={{
                                    color:'#FFFFFF'
                                }}>Select Files</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Picture Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,width:'50%'}}>
                                Date of Birth
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-around',width:'50%'}}>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="DD" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.phoneNo = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({phoneNo:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.phoneNo}
                                />
                                <View style={{paddingHorizontal:4}}></View>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="MM" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.phoneNo = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({phoneNo:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.phoneNo}
                                />
                                <View style={{paddingHorizontal:4}}></View>
                                <TextInput 
                                    style={MainStyles.TInput} 
                                    placeholder="YYYY" 
                                    returnKeyType={"go"} 
                                    ref={(input) => { this.phoneNo = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({phoneNo:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.phoneNo}
                                />
                            </View>
                        </View>
                        {/* DOB Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13}}>
                                Your AHPRA Registration number
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                returnKeyType={"go"} 
                                ref={(input) => { this.phoneNo = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({phoneNo:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.phoneNo}
                            />
                        </View>
                        {/* AHPRA Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13}}>
                                Initial year of registration in Australia 
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                returnKeyType={"go"} 
                                ref={(input) => { this.phoneNo = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({phoneNo:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.phoneNo}
                            />
                        </View>
                        {/* Initial Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap',width:'60%'}}>
                            Have any restrictions been imposed on your registration?
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                returnKeyType={"go"} 
                                ref={(input) => { this.phoneNo = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({phoneNo:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.phoneNo}
                            />
                        </View>
                        {/* Restriction Ends */}
                        <View style={{flexDirection:'column',marginTop:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap'}}>
                                Which dispensing software are you familiar with:
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>WiniFRED</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>FredNXT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>LOTS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Simple</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{flexDirection:'row',justifyContent:'space-between',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[,MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>MINFOS</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View> 
                                    <Text style={[MainStyles.checkBoxLabel]}>Merlin</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Quickscript</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Other</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Fimiliar Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'column',marginTop:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap'}}>
                                Pharmacotherapy
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'column',marginTop:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap'}}>
                                Accredited Pharmacist
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'column',marginTop:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap'}}>
                                Vaccination Pharmacist
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'column',marginTop:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap'}}>
                                Are you accredited to administer Vaccinations? 
                                <Text style={{color:'#ee1b24'}}> *</Text>
                            </Text>
                            <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap',marginTop:10}}>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]}>
                                    <View style={[MainStyles.checkBoxStyle]}></View>
                                    <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        {/* Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap',width:'60%'}}>
                                I am comfortable with administering pharmacotherapy
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                returnKeyType={"go"} 
                                ref={(input) => { this.phoneNo = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({phoneNo:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.phoneNo}
                            />
                        </View>
                        {/* Comfortable Ends */}
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginTop:10}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:13,flexWrap:'wrap',width:'60%'}}>
                                I am accredited for medication review services
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{paddingHorizontal:10}}></View>
                            <TextInput 
                                style={MainStyles.TInput} 
                                returnKeyType={"go"} 
                                ref={(input) => { this.phoneNo = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({phoneNo:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.phoneNo}
                            />
                        </View>
                        {/* Accredited Ends */}
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:26
                        }}>
                            <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{
                                this.setState({showTerms:true});
                            }}>
                                <Text style={MainStyles.psosBtnText}>Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginTop:5}} onPress={()=>{
                                this.props.navigation.goBack();
                            }}>
                                <Text style={{color:'#1476c0',textDecorationLine:'underline',textDecorationColor:'#1476c0',textDecorationStyle:'solid'}}>Previous</Text>
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
                            <Image source={require('../assets/cross-icon.png')} width={21} height={21} style={{height:21,width:21}} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                    contentContainerStyle={{paddingHorizontal: 10,paddingVertical:10}}
                    >
                        <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#1476c0',fontSize:15}}>
                            Our Terms and Conditions
                        </Text>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>1. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>2. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>3. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>4. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>5. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                        <View style={MainStyles.tacItems}>
                            <Text style={MainStyles.tacItemsH}>6. Lorem Ipsum has been</Text>
                            <Text style={MainStyles.tacItemsSH}> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</Text>
                            <Image source={require('../assets/bd-tc.png')} width={'100%'} style={MainStyles.tacItemsImage}/>
                        </View>
                    </ScrollView>
                    <View style={MainStyles.modalFooter}>
                        <TouchableOpacity style={[MainStyles.psosBtn, MainStyles.psosBtnXm]}>
                            <Text style={[MainStyles.psosBtnText,MainStyles.psosBtnXsText]}>I Agree</Text>
                        </TouchableOpacity>
                    </View>
                </Dialog>
            </SafeAreaView>
        );
    }
}
export default LocumReg1Screen;
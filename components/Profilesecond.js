import React,{Component} from 'react';
import {View,ImageBackground, Image,Text,StyleSheet,TextInput,Dimensions,ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import MainStyles from './Styles';
const { height, width } = Dimensions.get('window');
class Profilesecond extends Component{
    constructor(props) {
        super(props);

        this.state={loading:false}
    }
    componentDidMount(){
    }
    render(){

        const RemoveHiehgt = height - 50;
        return (

        <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>

                      <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../assets/left-ar.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#403f41',fontSize:16,paddingRight:120}}>Profile Setting</Text>
                    
                         </View>

                         <ScrollView style={{}}>

                          <View style={{backgroundColor:'#ededee',paddingHorizontal:10,alignItems:'center'}}>
                        <View style={{paddingVertical:20}}>
                        <Image source={require('../assets/user.png')} width={20} height={30} style={{width:100,height:100}} />
                         
                        </View>
                        <TouchableOpacity>
                        <Text style={{fontFamily:'AvenirLTStd-Meduim',color:'#971a31',fontSize:17,}}>Change Profile Picture</Text>
</TouchableOpacity>

                        
                        </View>
                    <View style={{
                   flexDirection:'row',
                    borderWidth: 1,
                    borderColor: '#971a31',
                    marginHorizontal:100,
                    marginVertical:3,
                    
                  }}></View>
               
                        <View>
                        <View style={{paddingVertical:20}}>
                        <Image source={require('../assets/dashed-b-s.png')} width={10} height={10} style={{width:360,height:1}} />
                         
                        </View>

                    <View style={{ flexDirection:'row'}}>
                      
                       <View 
                             style={{
                             
                             width:'70%',
                             paddingVertical:0,
                             marginHorizontal:15,
                            
                             }}
                         >
                         <TextInput 
                             style={{
                                 flex:1,
                                 textAlign:'left',
                                 height:50,
                                 fontSize:17,
                                 fontFamily:'AvenirLTStd-Medium',
                                 borderRadius: 2,
                                 borderWidth: 2,
                                 borderColor:'#595453',
                                 paddingHorizontal: 12,
                             }} 
                             placeholder="First Name" 
                             returnKeyType={"next"} 
                             ref={(input) => { this.emailAddress = input; }} 
                             onSubmitEditing={() => { this.password.focus(); }} 
                             blurOnSubmit={false}
                             onChangeText={(text)=>this.setState({emailAddress:text})} 
                             keyboardType="name-phone-pad" 
                             autoCapitalize='none' 
                             placeholderTextColor="#665e5c" 
                             underlineColorAndroid="transparent" 
                             value={this.state.emailAddress}
                             />
                             </View>   
                           
                           <View style={{
                            
                            justifyContent:'center',
                            alignItems:'center',
                           }}>
                             <TouchableOpacity
                             style={{
                                 paddingHorizontal:10,
                                
                             }}
                             >
                             <Image source={require('../assets/edit-pencil.png')}  style={{width:40,height:40,}} />
                           </TouchableOpacity>
                           </View>
                           </View> 
                           <View style={{
                               flex:1,
                               marginVertical:10,
                           }}></View>
     
                           <View style={{ flexDirection:'row'}}>
                      
                           <View 
                                 style={{
                                 
                                 width:'70%',
                                 paddingVertical:0,
                                 marginHorizontal:15,
                                
                                 }}
                             >
                             <TextInput 
                                 style={{
                                     flex:1,
                                     textAlign:'left',
                                     height:50,
                                     fontSize:17,
                                     fontFamily:'AvenirLTStd-Medium',
                                     borderRadius: 2,
                                     borderWidth: 2,
                                     borderColor:'#595453',
                                     paddingHorizontal: 12,
                                 }} 
                                 placeholder="First Name" 
                                 returnKeyType={"next"} 
                                 ref={(input) => { this.emailAddress = input; }} 
                                 onSubmitEditing={() => { this.password.focus(); }} 
                                 blurOnSubmit={false}
                                 onChangeText={(text)=>this.setState({emailAddress:text})} 
                                 keyboardType="name-phone-pad" 
                                 autoCapitalize='none' 
                                 placeholderTextColor="#665e5c" 
                                 underlineColorAndroid="transparent" 
                                 value={this.state.emailAddress}
                                 />
                                 </View>   
                               
                               <View style={{
                                
                                justifyContent:'center',
                                alignItems:'center',
                               }}>
                                 <TouchableOpacity
                                 style={{
                                     paddingHorizontal:10,
                                     
                                 }}
                                 >
                                 <Image source={require('../assets/edit-pencil.png')}  style={{width:40,height:40,}} />
                               </TouchableOpacity>
                               </View>
                               </View> 
                               <View style={{
                                   flex:1,
                                   marginVertical:10,
                               }}></View>
                               <View style={{flexDirection:'row',marginBottom:15,paddingHorizontal:15,}}>
                               <Text style={{
                                   color:'#889292',
                               }}>Email ID :</Text>
                               <Text style={{
                                   color:'#971a31',
                                   paddingLeft:5,
                               }}>demouser@pedbook.com</Text>
                               </View>
                     <View>
                       <Image source={require('../assets/dashed-b-s.png')} width={20} height={30} style={{width:350,height:1,}} />
                     </View>  
                     <View style={{
                        flex:1,
                        marginVertical:10,
                    }}></View>
                    <View
                    style={{
                        flex:1,
                    }}>
                    <Text style={{
                        textAlign:'center',
                        fontSize:18,
                        color:'#5a6565',
                        fontFamily:'AvenirLTStd-Meduim',
                    }}>Reset Password</Text>
                    <View style={{
                                   flex:1,
                                   marginVertical:10,
                               }}></View> 
                    <View 
                                 style={{
                                 
                                 
                                 paddingVertical:0,
                                 marginHorizontal:15,
                                
                                 }}
                             >
                             <TextInput 
                                 style={{
                                     flex:1,
                                     textAlign:'left',
                                     height:40,
                                     fontSize:17,
                                     fontFamily:'AvenirLTStd-Medium',
                                     borderRadius: 2,
                                     borderWidth: 2,
                                     borderColor:'#595453',
                                     paddingHorizontal: 12,
                                 }} 
                                 placeholder="Current Password" 
                                 returnKeyType={"next"} 
                                 ref={(input) => { this.emailAddress = input; }} 
                                 onSubmitEditing={() => { this.password.focus(); }} 
                                 blurOnSubmit={false}
                                 onChangeText={(text)=>this.setState({emailAddress:text})} 
                                 keyboardType="name-phone-pad" 
                                 autoCapitalize='none' 
                                 placeholderTextColor="#665e5c" 
                                 underlineColorAndroid="transparent" 
                                 value={this.state.emailAddress}
                                 />
                                 </View>
                                 <View style={{
                                   flex:1,
                                   marginVertical:10,
                               }}></View>
                                 <View 
                                 style={{
                                 
                                 
                                 paddingVertical:0,
                                 marginHorizontal:15,
                                
                                 }}
                             >
                             <TextInput 
                                 style={{
                                     flex:1,
                                     textAlign:'left',
                                     height:40,
                                     fontSize:17,
                                     fontFamily:'AvenirLTStd-Medium',
                                     borderRadius: 2,
                                     borderWidth: 2,
                                     borderColor:'#595453',
                                     paddingHorizontal: 12,
                                 }} 
                                 placeholder="New Password" 
                                 returnKeyType={"next"} 
                                 ref={(input) => { this.emailAddress = input; }} 
                                 onSubmitEditing={() => { this.password.focus(); }} 
                                 blurOnSubmit={false}
                                 onChangeText={(text)=>this.setState({emailAddress:text})} 
                                 keyboardType="name-phone-pad" 
                                 autoCapitalize='none' 
                                 placeholderTextColor="#665e5c" 
                                 underlineColorAndroid="transparent" 
                                 value={this.state.emailAddress}
                                 />
                                 </View>
                                 <View style={{
                                   flex:1,
                                   marginVertical:10,
                               }}></View>
                                 <View 
                                 style={{
                                 
                                 
                                 paddingVertical:0,
                                 marginHorizontal:15,
                                
                                 }}
                             >
                             <TextInput 
                                 style={{
                                     flex:1,
                                     textAlign:'left',
                                     height:40,
                                     fontSize:17,
                                     fontFamily:'AvenirLTStd-Medium',
                                     borderRadius: 2,
                                     borderWidth: 2,
                                     borderColor:'#595453',
                                     paddingHorizontal: 12,
                                 }} 
                                 placeholder="Confirm Password" 
                                 returnKeyType={"next"} 
                                 ref={(input) => { this.emailAddress = input; }} 
                                 onSubmitEditing={() => { this.password.focus(); }} 
                                 blurOnSubmit={false}
                                 onChangeText={(text)=>this.setState({emailAddress:text})} 
                                 keyboardType="name-phone-pad" 
                                 autoCapitalize='none' 
                                 placeholderTextColor="#665e5c" 
                                 underlineColorAndroid="transparent" 
                                 value={this.state.emailAddress}
                                 />
                                 </View>
                                 <View style={{
                                     paddingVertical:10, 
                                 }}></View>
                                 <View
                                 style={{
                                     flexDirection:'row',
                                     paddingHorizontal:15,
                                     justifyContent:"space-evenly", 
                                     flex:1,
                                    
                                     

                                 }}>
                                 <View style={{
                                     
                                    
                                     width:'50%',
                                     paddingRight:10, 
                                    
                                 }}>
                                     <TouchableOpacity
                                     style={{
                                         backgroundColor:'#971a31',
                                         paddingVertical:10,
                                        borderColor:'#971a31',
                                        borderStyle:'solid',
                                        borderWidth:1,
                                          
                                     }}
                                     >
                                         <Text
                                         style={{
                                             color:'#ffffff',
                                             textAlign:'center',
                                             fontSize:16,
                                             fontFamily:'AvenirLTStd-Medium',
                                             }}>Change</Text>
                                     </TouchableOpacity>
                                 </View>
                                 <View style={{
                                      
                                     width:'50%',
                                     paddingLeft:10,
                                 }}>
                                     <TouchableOpacity
                                     style={{
                                        backgroundColor:'#ffffff',
                                        paddingVertical:10,
                                        borderColor:'#cacbcd',
                                        borderStyle:'solid',
                                        borderWidth:1,
                                         
                                    }}
                                    >
                                         <Text style={{
                                             color:'#c1cac9', 
                                             textAlign:'center',
                                             fontSize:16,
                                             fontFamily:'AvenirLTStd-Medium',
                                         }}>Cancel</Text>
                                     </TouchableOpacity>
                                 </View>
                                 </View>

                    </View>
                    <View style={{
                        marginVertical:40,
                    }}></View>
                <View style={{
                    flex:1,

                }}>
<TouchableOpacity>
<Text style={{
    textAlign:'center',
    fontSize:16,
    fontFamily:'AvenirLTStd-Medium',
    textDecorationLine:'underline',
    color:'#232323',
}}>About Us</Text>
</TouchableOpacity>
                </View>
                <View style={{
                    flex:1,
                    flexDirection:"row",
                    justifyContent:'center',
                    marginTop:15,

                }}>
                <View style={{
                    paddingHorizontal:25,
                }}>
                <TouchableOpacity>
<Text style={{
    textAlign:'center',
    fontSize:16,
    fontFamily:'AvenirLTStd-Medium',
    textDecorationLine:'underline',
    color:'#232323',
}}>Privacy Policy</Text>
</TouchableOpacity>
                </View>
                <View style={{
                    borderRightWidth:1,
                    borderRightColor:'#999999',
                }}></View>
                <View style={{paddingHorizontal:25,}}>
                <TouchableOpacity>
<Text style={{
    textAlign:'center',
    fontSize:16,
    fontFamily:'AvenirLTStd-Medium',
    textDecorationLine:'underline',
    color:'#232323',
}}>Terms & Conditions</Text>
</TouchableOpacity>
                </View>

                </View>


                <View style={{marginTop:25,}}>
                <Image source={require('../assets/dashed-b-s.png')} width={20} height={30} style={{width:350,height:1,}} />
              </View> 
              <View 
                    style={{
                        flex:1,
                        paddingHorizontal:50,
                        marginTop:25,

                    }}>
                    <TouchableOpacity 
                    style={{
                        backgroundColor:'#971a31',
                        height:40,
                        justifyContent:'center',
                        borderRadius:2,
                       

                    }}
                    >
                    <Text style={{
                        fontSize:16,
                        fontFamily:'AvenirLTStd-Medium',
                        color:'#ffffff',
                        
                        justifyContent:'center',
                        textAlign:"center",

                    }}>Sign Out</Text>
                    </TouchableOpacity>
                    </View>
<View style={{
    
    textAlign:'right',
    marginBottom:15,
    paddingHorizontal:10,
    marginTop:10,
    alignItems:'flex-end',
}}>
<View style={{
    flexDirection:"row",
}}>
<Text>Powered by </Text>
<Text style={{
    color:'#971a31',
}}>Pedabook</Text>
</View>

</View>


             </View>

                 
                 <View>

                         
                    
              
               
                
             

                    
                 


                     
                      
                   
















                 </View>
            
                   
    
                        </ScrollView>
                        


             </SafeAreaView>
                      );
                   }
               }
        const styles = StyleSheet.create({
               
           });
        export default Profilesecond;
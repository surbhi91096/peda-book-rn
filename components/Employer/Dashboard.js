import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,
    ActionSheetIOS,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Loader from '../Loader';
import MainStyles from '../Styles';
import { SERVER_URL } from '../../Constants';
const { height, width } = Dimensions.get('window');
class Dashboard extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            totalJobs:0,
            totalPharmacy:0,
            totalApplications:0,
            totalBookedLocums:0
        }
    }
    componentDidMount = ()=>{
        this.fetchTotals();
    }
    fetchTotals = ()=>{
        fetch(SERVER_URL+'dashboard?user_id=1',{
            method:'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status == 200){
                Toast.show(response.message,Toast.SHORT);
                this.setState({pharmacyList:response.result});
            }
            this.setState({loading:false});
        })
        .catch((err)=>{
            this.setState({loading:false});
            console.log(err);
        });
    }
    render(){
        const RemoveHiehgt = height - 52;
        return(
            <SafeAreaView style={{flex:1}}>
                <View style={{
                    flexDirection:'row',
                    justifyContent:"space-between",
                    paddingVertical: 13,
                    paddingHorizontal: 10,
                    backgroundColor:'#1d7bc3',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())}}>
                        <Icon name="bars" style={{
                            fontSize:20,
                            color:'#FFFFFF'
                        }} />
                    </TouchableOpacity>
                    <Image source={require('../../assets/web-logo-wight.png')} width={150} height={26} style={{width:150,height:26}} />
                    <View style={{
                        flexDirection:'row',
                        alignItems:'center'
                    }}>
                        <TouchableOpacity style={{marginRight:10}}>
                            <Image source={require('../../assets/share-icon.png')} width={20} height={20} style={{width:20,height:20}} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={{
                                position:'absolute',
                                right:-5,
                                top:-5,
                                width:15,
                                height:15,
                                alignItems:'center',
                                justifyConten:'center',
                                backgroundColor:'#FFFFFF',
                                borderRadius: 35,
                            }}>
                                <Text style={{fontSize:10}}>99</Text>
                            </View>
                            <Image source={require('../../assets/noti-icon.png')} width={20} height={23} style={{width:20,height:23}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{height:RemoveHiehgt,flex:1,backgroundColor:'#f0f0f0'}}>
                    <View style={MainStyles.eDW}>
                        <TouchableOpacity style={MainStyles.eDTWI} onPress={()=>{this.props.navigation.navigate('NewLocumShift')}}>
                            <Image source={require('../../assets/locum-shift.png')} width={50} height={50} style={{width:50,height:50,marginBottom:10}} />
                            <Text style={MainStyles.eDTWIT}>NEW LOCUM SHIFT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyles.eDTWI,{backgroundColor:'#a29bfe'}]} onPress={()=>{this.props.navigation.navigate('NewPermShift')}}>
                            <Image source={require('../../assets/perm-pos.png')}  width={50} height={55} style={{width:50,height:55,marginBottom:10}} />
                            <Text style={MainStyles.eDTWIT}>NEW PERMANENT POSITION</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyles.eDTWI,{marginTop:5,backgroundColor:'#00cec9'}]} onPress={()=>{this.props.navigation.navigate('JobListE')}}>
                            <Image source={require('../../assets/job-list.png')}  width={50} height={57} style={{width:50,height:57,marginBottom:10}} />
                            <Text style={MainStyles.eDTWIT}>JOB LIST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyles.eDTWI,{marginTop:5,backgroundColor:'#0984e3'}]}>
                            <Image source={require('../../assets/pay-invoice.png')}  width={50} height={50} style={{width:50,height:50,marginBottom:10}} />
                            <Text style={MainStyles.eDTWIT}>PAY INVOICE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyles.eDTWI,{marginTop:5,backgroundColor:'#ffbe76'}]} onPress={()=>{this.props.navigation.navigate('EChatList')}}>
                            <Image source={require('../../assets/chat.png')}  width={50} height={50} style={{width:50,height:50,marginBottom:10}} />
                            <Text style={{
                                fontFamily:'AvenirLTStd-Book',
                                color:'#FFFFFF',
                                fontSize:14,
                                textAlign:'center'
                            }}>CHAT</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[MainStyles.eDTWI,{marginTop:5,backgroundColor:'#e77f67'}]}>
                            <Image source={require('../../assets/feedback.png')}  width={50} height={52} style={{width:50,height:52,marginBottom:10}} />
                            <Text style={MainStyles.eDTWIT}>FEEBACK</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[MainStyles.eDW,{marginTop:8}]}>
                        <View style={{width:'48%',height:149}}>
                            <View style={MainStyles.eDBWI}>
                                <View style={MainStyles.eDBWIIC}>
                                    <Image source={require('../../assets/total-job.png')} style={{width:30,height:27,marginBottom:8}}/>
                                    <Text style={{color:'#FFFFFF',fontFamily:'AvenirLTStd-Roman'}}>{this.state.totalJobs}</Text>
                                </View>
                                <Text style={MainStyles.eDBWIT}>Total Jobs</Text>
                            </View>
                        </View>
                        <View style={{width:'48%',height:149}}>
                            <View style={MainStyles.eDBWI}>
                                <View style={MainStyles.eDBWIIC}>
                                    <Image source={require('../../assets/total-job.png')} style={{width:30,height:27,marginBottom:8}}/>
                                    <Text style={{color:'#FFFFFF',fontFamily:'AvenirLTStd-Roman'}}>{this.state.totalPharmacy}</Text>
                                </View>
                                <Text style={MainStyles.eDBWIT}>Total Pharmacy</Text>
                            </View>
                        </View>
                        <View style={{width:'48%',height:149}}>
                            <View style={MainStyles.eDBWI}>
                                <View style={MainStyles.eDBWIIC}>
                                    <Image source={require('../../assets/total-applications.png')} style={{width:30,height:30,marginBottom:8}}/>
                                    <Text style={{color:'#FFFFFF',fontFamily:'AvenirLTStd-Roman'}}>{this.state.totalApplications}</Text>
                                </View>
                                <Text style={MainStyles.eDBWIT}>Total Applications</Text>
                            </View>
                        </View>
                        <View style={{width:'48%',height:149}}>
                            <View style={MainStyles.eDBWI}>
                                <View style={MainStyles.eDBWIIC}>
                                    <Image source={require('../../assets/total-jb.png')} style={{width:30,height:32,marginBottom:8}}/>
                                    <Text style={{color:'#FFFFFF',fontFamily:'AvenirLTStd-Roman'}}>{this.state.totalBookedLocums}</Text>
                                </View>
                                <Text style={MainStyles.eDBWIT}>Total Locum Booked</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default Dashboard;
import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,RefreshControl,ImageBackground,
    ActionSheetIOS,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
import { FlatList } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
class LocumDetails extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            locumData:{},
            isRefreshing:false,
            job_id:this.props.navigation.getParam("job_id"),
            job_type:this.props.navigation.getParam("job_type"),
            locum_id:this.props.navigation.getParam("locum_id"),
        }
        this.fetchLocumDetails = this._fetchLocumDetails.bind(this);
    }
    componentDidMount = ()=>{
        this.fetchLocumDetails();
    }
    _fetchLocumDetails = ()=>{
        fetch(SERVER_URL+'locum_detail?locum_id=14')
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                this.setState({locumData:response.result});
            }
            else{
                Toast.show(response.message,Toast.SHORT);
            }
        })
        .catch(err=>{
            console.log(err);
        });
    }
    render(){
        const RemoveHiehgt = height - 50;
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../../assets/back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Locum Detail</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/noti-icon.png')} width={20} height={23} style={{width:20,height:23}} />
                            <View style={MainStyles.nHNotiIconNum}>
                                <Text style={{fontSize:9}}>99</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{paddingHorizontal:15,height:RemoveHiehgt,flex:1}} keyboardShouldPersistTaps="always">
                    <View style={{justifyContent:'center',alignItems:'center',marginVertical: 15}}>
                        <View style={{width:100,height:100,justifyContent:'flex-start',alignItems:'center',overflow:'hidden',borderRadius: 100,marginBottom: 10,}}>
                            <Image source={require('../../assets/default.png')} />
                        </View>
                        <Text style={{fontFamily:'AvenirLTStd-Meduim',color:'#151515',fontSize:17}}>{this.state.locumData.fname+' '+this.state.locumData.lname}</Text>
                    </View>
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>Date of Birth</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_dob}</Text>
                    </View>
                    {/* Languga */}
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>AHPRA Number</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_ahpra}</Text>
                    </View>
                    {/* Languga */}
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>Dispensing Systems Used</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_software}</Text>
                    </View>
                    {/* Languga */}
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>Pharmacotherapy</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_pharma}</Text>
                    </View>
                    {/* Languga */}
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>Accredited Pharmacist</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_accredit}</Text>
                    </View>
                    {/* Languga */}
                    <View style={MainStyles.locumProfileItemWrapper}>
                        <Text style={MainStyles.LPIHeading}>Vaccination Pharmacist</Text>
                        <Text style={MainStyles.LPISubHeading}>{this.state.locumData.js_vaccin}</Text>
                    </View>
                    {/* Languga */}
                    <View style={{justifyContent:'center',alignItems:'center',marginTop: 10,marginBottom:15}}>
                        <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]}>
                            <Text style={MainStyles.psosBtnText}>Hire</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
export default LocumDetails;
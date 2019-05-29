import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,FlatList,
    ActionSheetIOS,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
const { height, width } = Dimensions.get('window');
class NewPermShift extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            pharmacyList:{}
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
    }
    componentDidMount = ()=>{
        this.fetchPharmacyList();
    }
    fetchPharmacyList = ()=>{
        fetch(SERVER_URL+'pharmacy_list?user_id=1',{
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
        var colors = ['#e67e22','#a29bfe','#00cec9','#0984e3','#febe76','#e77f67'];
        var newColors = [];
        var indexing = 0;
        const RemoveHiehgt = height - 52;
        var behavior = (Platform.OS == 'ios')?'padding':'';
        return(
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
                    <ScrollView style={{paddingHorizontal:15,height:RemoveHiehgt}}>
                        <View style={{paddingVertical:20,}}>
                            <Text style={{fontFamily:'AvenirLTStd-Heavy',color:'#151515',fontSize:16}}>New Permanent Position</Text>
                            <Text style={{
                                marginTop:5,
                                fontFamily:'AvenirLTStd-Medium',
                                color:'#676767',
                                fontSize:13,
                                marginBottom:5,
                            }}>
                               For quick, easy and efficient New Permanent Position, please use this form
                            </Text>
                        </View>
                        {/* Locum Registration Heading Ends */}
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2} />
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
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12,}}>Select Pharmacy</Text>
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                <Image source={require('../../assets/dashed-b-s.png')} width={100} style={{width:50}}/>
                            </View>
                            <View style={{paddingVertical:10,paddingHorizontal:10,backgroundColor:'#959595',borderRadius:10}}>
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12}}>Shift Details</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2}/>
                        {/* BreadCrumbs Ends */}
                        <View style={[MainStyles.eDW,{justifyContent:'space-between'}]}>
                            {
                                this.state.pharmacyList.length > 0 && 
                                this.state.pharmacyList.map((item,key)=>{
                                    indexing = key;
                                    if(!colors[key]){
                                        indexing = key - colors.length;
                                    }
                                    return(
                                        <TouchableOpacity key={'key-'+item.pharm_id} onPress={()=>{
                                            this.props.navigation.navigate('NPSForm',{pharm_id:item.pharm_id});
                                        }} style={{
                                            backgroundColor:colors[indexing],
                                            width:'47%',
                                            paddingVertical:15,
                                            paddingHorizontal:25,
                                            justifyContent:'center',
                                            alignItems:'center',
                                            borderRadius:5,
                                            marginTop:10
                                        }}>
                                            <Image source={require('../../assets/total-job.png')} width={40} height={36} style={{width:40,height:36,marginBottom:10}} />
                                            <Text style={[MainStyles.eDTWIT,{fontSize:16}]}>{item.business_name}</Text>
                                        </TouchableOpacity>
                                    )
                                    
                                })
                            }
                        </View>
                        <View style={{marginVertical:5}}></View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </SafeAreaView>
        );
    }
}
export default NewPermShift;
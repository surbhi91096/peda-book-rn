import React,{Component} from 'react';
import {View,SafeAreaView, Image,Text, ScrollView,TextInput,TouchableOpacity,KeyboardAvoidingView,
    Picker,Dimensions,RefreshControl,
    ActionSheetIOS,Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Loader from '../Loader';
import MainStyles from '../Styles';
import Toast from 'react-native-simple-toast';
import { SERVER_URL } from '../../Constants';
import { FlatList } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
class LocumList extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            locumList:{},
            isRefreshing:false,
            job_id:this.props.navigation.getParam("job_id"),
            job_type:this.props.navigation.getParam("job_type"),
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.fetchLocumList = this._fetchLocumList.bind(this);
    }
    componentDidMount(){
        this.fetchLocumList();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var paramjob_id = this.props.navigation.getParam("job_id");
        var paramjobType = this.props.navigation.getParam("job_type");
        if (paramjob_id != prevState.job_id) {
          this.setState({job_id: paramjob_id});
        }
        if (paramjobType != prevState.job_type) {
            this.setState({job_type: paramjobType});
        }
    }
    _fetchLocumList = ()=>{
        var fetchFrom = (this.state.job_type == 'perm')?'permanent_applierlist':'locumshift_applierlist';
        fetch(SERVER_URL+fetchFrom+'?job_id='+this.state.job_id+'&emp_id=1',{
            method:'GET',
            headers:{
                Accept:'application/json'
            }
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                this.setState({locumList:response.result});
            }
            Toast.show(response.message,Toast.SHORT);
            this.setState({loading:false,isRefreshing:false});
        })
        .catch(err=>{
            console.log(err);
            Toast.show('Please check ou internet connection',Toast.SHORT);
            this.setState({loading:false,isRefreshing:false});
        })
    }
    timeSince = (date) => {
        var newDateFormate = new Date(date);
        var seconds = Math.floor((new Date() - newDateFormate) / 1000);
        var interval = Math.floor(seconds / 31536000);      
        if (interval > 1) {return interval + " years ago";}
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {return interval + " months ago";}
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {return interval + " days ago";}
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {return interval + " hours ago";}
        interval = Math.floor(seconds / 60);
        if (interval > 1) {return interval + " minutes ago";}
        return Math.floor(seconds) + " seconds ago";
    }
    render (){
        const RemoveHiehgt = height - 50;
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../../assets/back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Locum List</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/noti-icon.png')} width={20} height={23} style={{width:20,height:23}} />
                            <View style={MainStyles.nHNotiIconNum}>
                                <Text style={{fontSize:9}}>99</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height:RemoveHiehgt}}>
                    {
                        this.state.locumList.length > 0 && 
                        <FlatList data={this.state.locumList} 
                            renderItem={({item}) => (
                                <TouchableOpacity style={MainStyles.JLELoopItem} onPress={()=>{
                                    console.log(item.job_id,item.locum_id);
                                }}>
                                    <View style={{flexWrap:'wrap'}}>
                                        <Text style={MainStyles.JLELoopItemName}>{item.name}</Text>
                                        <Text style={MainStyles.JLELoopItemTime}>{this.timeSince(item.applied_date)}</Text>
                                    </View>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <Image source={require('../../assets/list-fd-icon.png')} style={{width:8,height:15}}/>
                                    </View>
                                </TouchableOpacity>
                                )}
                            keyExtractor={(item) => 'key-'+item.id}
                            viewabilityConfig={this.viewabilityConfig}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshingShift}
                                    onRefresh={()=>{this.setState({isRefreshingShift:true}),this.fetchLocumShifts()}}
                                    title="Pull to refresh"
                                    colors={["#1d7bc3","red", "green", "blue"]}
                                />
                            }
                            />
                    }
                </View>
            </SafeAreaView>
        );
    }
}
export default LocumList;
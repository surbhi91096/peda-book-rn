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
class JobList extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:true,
            currentTab:'shift',
            shiftList:{},
            permList:{},
            isRefreshingPerm:false,
            isRefreshingShift:false
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.fetchLocumShifts = this._fetchLocumShifts.bind(this);
        this.fetchPermShifts = this._fetchPermShifts.bind(this);
    }
    componentDidMount = ()=>{
        this.fetchLocumShifts();
        this.fetchPermShifts();
    }
    _fetchLocumShifts = ()=>{
        fetch(SERVER_URL+'locum_shift_list?user_id=1',{
            method:'GET',
            headers:{
                Accept:'application/json'
            }
        })
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                this.setState({shiftList:response.result});
            }
            Toast.show(response.message,Toast.SHORT);
            this.setState({loading:false,isRefreshingShift:false});
        })
        .catch(err=>{
            Toast.show('Please check ou internet connection',Toast.SHORT);
            this.setState({loading:false,isRefreshingShift:false});
        })
    }
    _fetchPermShifts = ()=>{
        fetch(SERVER_URL+'permanent_list?user_id=1',{
            method:'GET',
            headers:{
                Accept:'application/json'
            }
        })
        .then(res=>res.json())
        .then(response=>{
            if(response.status == 200){
                this.setState({permList:response.result});
            }
            Toast.show(response.message,Toast.SHORT);
            this.setState({loading:false,isRefreshingPerm:false});
        })
        .catch(err=>{
            Toast.show('Please check ou internet connection',Toast.SHORT);
            this.setState({loading:false,isRefreshingPerm:false});
        })
    }
    timeSince = (date) => {
        var newDateFormate = new Date(date);
        var seconds = Math.floor((new Date() - newDateFormate) / 1000);
        var interval = Math.floor(seconds / 31536000);      
        if (interval > 1) {return interval + " years";}
        interval = Math.floor(seconds / 2592000);
        if (interval > 1) {return interval + " months";}
        interval = Math.floor(seconds / 86400);
        if (interval > 1) {return interval + " days";}
        interval = Math.floor(seconds / 3600);
        if (interval > 1) {return interval + " hours";}
        interval = Math.floor(seconds / 60);
        if (interval > 1) {return interval + " minutes";}
        return Math.floor(seconds) + " seconds";
    }
    render(){
        const RemoveHiehgt = height - 88;
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../../assets/back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Job List</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/noti-icon.png')} width={20} height={23} style={{width:20,height:23}} />
                            <View style={MainStyles.nHNotiIconNum}>
                                <Text style={{fontSize:9}}>99</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',borderBottomColor: '#bebebe',borderBottomWidth: 1}}>
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'shift')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'shift'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'shift')?MainStyles.activeJLEItemText:'']}>LOCUM SHIFT</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'perm')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'perm'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'perm')?MainStyles.activeJLEItemText:'']}>PARMANENT POSITION</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.currentTab == 'shift' && 
                    <View style={{height:RemoveHiehgt}}>
                        {
                            this.state.shiftList.length > 0 && 
                            <FlatList data={this.state.shiftList} 
                                renderItem={({item}) => (
                                    <TouchableOpacity style={MainStyles.JLELoopItem} onPress={()=>{
                                        this.props.navigation.navigate('LocumList',{job_type:'shift',job_id:item.id});
                                    }}>
                                        <View style={{flexWrap:'wrap'}}>
                                            <Text style={MainStyles.JLELoopItemName}>{item.name}</Text>
                                            <Text style={MainStyles.JLELoopItemTime}>{this.timeSince(item.created_on)}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={MainStyles.JLELoopItemCount}>{item.applier}</Text>
                                            <Icon name="eye" style={MainStyles.JLELoopItemIcon}/>
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
                }
                {/* Shift Tab Content Ends */}
                {
                    this.state.currentTab == 'perm' && 
                    <View style={{height:RemoveHiehgt}}>
                        {
                            this.state.permList.length > 0 && 
                            <FlatList data={this.state.permList} 
                                renderItem={({item}) => (
                                    <TouchableOpacity style={MainStyles.JLELoopItem} onPress={()=>{
                                        console.log(item.id);
                                        this.props.navigation.navigate('LocumList',{job_type:'perm',job_id:item.id});
                                    }}>
                                        <View style={{flexWrap:'wrap'}}>
                                            <Text style={MainStyles.JLELoopItemName}>{item.name}</Text>
                                            <Text style={MainStyles.JLELoopItemTime}>{this.timeSince(item.created_on)}</Text>
                                        </View>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <Text style={MainStyles.JLELoopItemCount}>20</Text>
                                            <Icon name="eye" style={MainStyles.JLELoopItemIcon}/>
                                        </View>
                                    </TouchableOpacity>
                                    )}
                                keyExtractor={(item) => 'key-'+item.id}
                                viewabilityConfig={this.viewabilityConfig}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshingPerm}
                                        onRefresh={()=>{this.setState({isRefreshingPerm:true}),this.fetchPermShifts()}}
                                        title="Pull to refresh"
                                        colors={["#1d7bc3","red", "green", "blue"]}
                                    />
                                }
                            />
                        }
                    </View>
                }
                {/* Shift Tab Content Ends */}
            </SafeAreaView>
        )
    }
}
export default JobList;
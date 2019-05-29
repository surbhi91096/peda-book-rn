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
class Pharmacy extends Component{
    constructor(props){
        super(props);
        /*this.state={
            loading:false,
            isRefreshing:false,
            pharmaList:{},
            currentTab:'add',
        };
        this.fetchPharma = this._fetchPharma.bind(this);
    }
    componentDidMount = ()=>{
        this.fetchPharma();
    }
    submitPharmacy = ()=>{
        if(this.state.bname == ''){
            Toast.show('Business name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.abn == ''){
            Toast.show('ABN should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.fname == ''){
            Toast.show('First name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.lname == ''){
            Toast.show('Last name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.bEmail == ''){
            Toast.show('Business E-mail should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.bPhone == ''){
            Toast.show('Business Phone should not be blank',Toast.SHORT);
            return false;
        }
        this.setState({loading:true});
        var formdata = new FormData();
        formdata.append('user_id',1);
        formdata.append('business_name',this.state.bname);
        formdata.append('abn',this.state.abn);
        formdata.append('f_name',this.state.fname);
        formdata.append('l_name',this.state.lname);
        formdata.append('email',this.state.bEmail);
        formdata.append('phone',this.state.bPhone);
        formdata.append('fax',this.state.bFax);
        formdata.append('mobile',this.state.mNumber);
        fetch(SERVER_URL+'add_pharmacy',{
            method:'POST',
            headers: {Accept: 'application/json'},
            body:formdata
        })
        .then(res=>res.json())
        .then(response=>{
            this.setState({loading:false,});
            Toast.show(response.message,Toast.SHORT);
            this.setState({bname:'',abn:'',fname:'',lname:'',bEmail:'',bPhone:'',bFax:'',mNumber:''});
        })
        .catch(err=>{
            this.setState({loading:false});
            console.log(err);
            Toast.show('Something went wrong',Toast.SHORT);
        });
    }
    _fetchPharma = ()=>{
        fetch(SERVER_URL+'pharmacy_list?user_id=1')
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            this.setState({pharmaList:response.result});
        })
        .catch(err=>{

        });
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
    }*/
    }
    render(){
        const RemoveHiehgt = height - 88;
        return (
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                
                <View style={{backgroundColor:'#FFFFFF',flexDirection:'row',borderBottomColor: '#bebebe',borderBottomWidth: 1}}>
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'add')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'add'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'add')?MainStyles.activeJLEItemText:'']}>ADD PHARMACY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'list')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'list'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'list')?MainStyles.activeJLEItemText:'']}>PHARMACY LIST</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.currentTab == 'add' && 
                    <ScrollView style={{height:RemoveHiehgt,flex:1}} keyboardShouldPersistTaps="always">
                        <View style={{backgroundColor:'#FFFFFF',flex:1,marginTop:10,paddingHorizontal:10,paddingVertical:15}}>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Business Name
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.bname = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({bname:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.bname}
                            />
                            {/* Business Name ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                ABN
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                returnKeyType={"next"} 
                                ref={(input) => { this.abn = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({abn:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.abn}
                                maxLength={10}
                            />
                            {/* ABN ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Contact Name
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                                <TextInput 
                                    style={[MainStyles.TInput]} 
                                    placeholder="First Name"
                                    returnKeyType={"next"} 
                                    ref={(input) => { this.fname = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({fname:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.fname}
                                />
                                <View style={{paddingLeft:10}}></View>
                                <TextInput 
                                    style={[MainStyles.TInput]} 
                                    placeholder="Last Name"
                                    returnKeyType={"next"} 
                                    ref={(input) => { this.lname = input; }} 
                                    blurOnSubmit={false}
                                    onChangeText={(text)=>this.setState({lname:text})} 
                                    placeholderTextColor="#bebebe" 
                                    underlineColorAndroid="transparent" 
                                    value={this.state.lname}
                                />
                            </View>
                            {/* F & L Name ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Business E-mail
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                placeholder="E-mail"
                                returnKeyType={"next"} 
                                ref={(input) => { this.bEmail = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({bEmail:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.bEmail}
                            />
                            {/* B Email ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Business Phone
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                placeholder="Phone"
                                returnKeyType={"next"} 
                                ref={(input) => { this.bPhone = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({bPhone:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.bPhone}
                            />
                            {/* B Phone ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Business Fax
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                placeholder="Fax"
                                returnKeyType={"next"} 
                                ref={(input) => { this.bFax = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({bFax:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.bFax}
                            />
                            {/* B Fax ends */}
                            <View style={{marginTop:15}}></View>
                            <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                Mobile Number
                                <Text style={{color:'#ee1b24'}}>*</Text>
                            </Text>
                            <View style={{marginTop:10}}></View>
                            <TextInput 
                                style={[MainStyles.TInput]} 
                                placeholder="Number"
                                returnKeyType={"next"} 
                                ref={(input) => { this.mNumber = input; }} 
                                blurOnSubmit={false}
                                onChangeText={(text)=>this.setState({mNumber:text})} 
                                placeholderTextColor="#bebebe" 
                                underlineColorAndroid="transparent" 
                                value={this.state.mNumber}
                            />
                            {/* B Fax ends */}
                            <View style={{justifyContent:'center',alignItems:'center',marginTop:26}}>
                                <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.submitPharmacy()}}>
                                    <Text style={MainStyles.psosBtnText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{marginTop:20}}></View>
                        </View>
                    </ScrollView>
                }
                {
                    this.state.currentTab == 'list' && 
                    this.state.pharmaList.length > 0 && 
                    <FlatList data={this.state.pharmaList} 
                        renderItem={({item}) => (
                            <TouchableOpacity style={MainStyles.JLELoopItem} onPress={()=>{}}>
                                <View style={{flexWrap:'wrap'}}>
                                    <Text style={MainStyles.JLELoopItemName}>{item.business_name}</Text>
                                    <Text style={MainStyles.JLELoopItemTime}>{this.timeSince(item.created_on)}</Text>
                                </View>
                            </TouchableOpacity>
                            )}
                        keyExtractor={(item) => 'key-'+item.pharm_id}
                        viewabilityConfig={this.viewabilityConfig}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshingShift}
                                onRefresh={()=>{this.setState({isRefreshingShift:true}),this.fetchPharma()}}
                                title="Pull to refresh"
                                colors={["#1d7bc3","red", "green", "blue"]}
                            />
                        }
                    />
                }
            </SafeAreaView>
        );
    }
}
export default Pharmacy;
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
class NLSFormScreen extends Component{
    constructor(props) {
        super(props);
        var dispensingList = ['WiniFRED','FredNXT','LOTS','Minfos','Simple','Quickscript','Merlin','Other'];
        var travelList = ['Travel and accommodation offered','Travel and accommodation NOT offered','Travel and accommodation may be negotiated'];
        this.state={
            loading:false,
            pharm_id:this.props.navigation.getParam("pharm_id"),
            timHours:{},
            timeMinutes:{},
            dateDays:{},
            dateMonth:{},
            dateYears:{},
            startDay:'01',
            startMonth:'01',
            startYear:'2019',
            endDay:'02',
            endMonth:'02',
            endYear:'2019',
            startHour:'01',
            startMinute:'01',
            endHour:'02',
            endMinute:'02',
            dispensingList:dispensingList,
            travelList:travelList,
            travelAcom:'',
            disSystem:'',
            pOffers:'',
            shiftName:''
        }
    }
    componentWillMount =()=>{
        var timHours = [];
        var timeMinutes = [];
        var dateDays = [];
        var dateMonth = [];
        var dateYears = [];
        for(var i = 1;i<25;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            timHours.push(''+k);
        }
        for(var i = 1;i<61;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            timeMinutes.push(''+k);
        }
        for(var i = 1;i<32;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            dateDays.push(''+k);
        }
        for(var i = 1;i<13;i++){
            var k = i;
            if(i < 10){k = '0'+i;}
            dateMonth.push(''+k);
        }
        for(var i = 2019;i<2031;i++){
            dateYears.push(''+i);
        }
        this.setState({timHours,timeMinutes,dateDays,dateMonth,dateYears});
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        var parampharm_id = this.props.navigation.getParam("pharm_id");
        var prevEventId = prevProps.navigation.getParam("pharm_id");
        if (parampharm_id != prevState.pharm_id) {
          this.setState({
            pharm_id: parampharm_id
          });
        }
    }
    submitLocumShift = ()=>{
        if(this.state.shiftName == ''){
            Toast.show('Shift name should not be blank',Toast.SHORT);
            return false;
        }
        if(this.state.startDay == ''){
            Toast.show('Please select start day',Toast.SHORT);
            return false;
        }
        if(this.state.startMonth == ''){
            Toast.show('Please select start month',Toast.SHORT);
            return false;
        }
        if(this.state.startYear == ''){
            Toast.show('Please select start year',Toast.SHORT);
            return false;
        }
        if(this.state.endDay == ''){
            Toast.show('Please select end year',Toast.SHORT);
            return false;
        }
        if(this.state.endMonth == ''){
            Toast.show('Please select end month',Toast.SHORT);
            return false;
        }
        if(this.state.endYear == ''){
            Toast.show('Please select end year',Toast.SHORT);
            return false;
        }
        if(this.state.startHour == ''){
            Toast.show('Please select start hour',Toast.SHORT);
            return false;
        }
        if(this.state.startMinute == ''){
            Toast.show('Please select start minute',Toast.SHORT);
            return false;
        }
        if(this.state.endHour == ''){
            Toast.show('Please select end hour',Toast.SHORT);
            return false;
        }
        if(this.state.endMinute == ''){
            Toast.show('Please select end minute',Toast.SHORT);
            return false;
        }
        if(this.state.shiftDetails == ''){
            Toast.show('Shif details should not be empty',Toast.SHORT);
            return false;
        }
        if(this.state.disSystem == ''){
            Toast.show('Please choose dispensing system',Toast.SHORT);
            return false;
        }
        if(this.state.travelAcom == ''){
            Toast.show('Please choose travel & accomodation',Toast.SHORT);
            return false;
        }
        this.setState({loading:true});
        var formdata = new FormData();
        formdata.append('pharm_id',this.state.pharm_id);
        formdata.append('user_id',1);
        formdata.append('name',this.state.shiftName);
        formdata.append('start_date',this.state.startYear+'-'+this.state.startMonth+'-'+this.state.startDay);
        formdata.append('end_date',this.state.endYear+'-'+this.state.endMonth+'-'+this.state.endDay);
        formdata.append('start_time',this.state.startHour+':'+this.state.startMinute);
        formdata.append('end_time',this.state.endHour+':'+this.state.endMinute);
        formdata.append('detail',this.state.shiftDetails);
        formdata.append('dispense',this.state.disSystem);
        formdata.append('offer',this.state.pOffers);
        formdata.append('travel',this.state.travelAcom);
        fetch(SERVER_URL+'add_locumshift',{
            method:'POST',
            headers: {
                Accept: 'application/json',
            },
            body:formdata
        })
        .then(res=>res.json())
        .then(response=>{
            this.setState({loading:false});
            Toast.show(response.message,Toast.SHORT);
        })
        .catch(err=>{
            this.setState({loading:false});
            console.log(err);
            Toast.show('Something went wrong',Toast.SHORT);
        });
    }
    render(){
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
                    <ScrollView style={{paddingHorizontal:15,height:RemoveHiehgt}} keyboardShouldPersistTaps="always">
                        <View style={{paddingVertical:20,}}>
                            <Text style={{fontFamily:'AvenirLTStd-Heavy',color:'#151515',fontSize:16}}>New Locum Shift</Text>
                            <Text style={{
                                marginTop:5,
                                fontFamily:'AvenirLTStd-Medium',
                                color:'#676767',
                                fontSize:13,
                                marginBottom:5,
                            }}>
                               For quick, easy and efficient New Locum Shift, please use this form
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
                                backgroundColor:'#959595',
                                borderRadius:100
                            }}>
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12,}}>Select Pharmacy</Text>
                            </View>
                            <View style={{paddingHorizontal:10}}>
                                <Image source={require('../../assets/dashed-b-s.png')} width={100} style={{width:50}}/>
                            </View>
                            <View style={{paddingVertical:10,paddingHorizontal:10,backgroundColor:'#1476c0',borderRadius:100}}>
                                <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:12}}>Shift Details</Text>
                            </View>
                        </View>
                        <Image source={require('../../assets/dashed-border.png')} width={'100%'} height={2}/>
                        {/* BreadCrumbs Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Shift Name
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            style={[MainStyles.TInput]} 
                            returnKeyType={"go"} 
                            ref={(input) => { this.shiftName = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({shiftName:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.shiftName}
                        />
                        {/* Shift Name ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            First Date of Shift
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                        {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.startDay}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({startDay: itemValue})}>
                                        <Picker.Item label="DD" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateDays.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.startDay}</Text>
                                </TouchableOpacity>
                                
                            }
                            <View style={{paddingHorizontal:5}}></View>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.startMonth}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({startMonth: itemValue})}>
                                        <Picker.Item label="MM" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateMonth.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.startMonth}</Text>
                                </TouchableOpacity>
                                
                            }
                            <View style={{paddingHorizontal:5}}></View>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.startYear}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({startYear: itemValue})}>
                                        <Picker.Item label="YYYY" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateYears.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.startYear}</Text>
                                </TouchableOpacity>
                                
                            }
                            {/* End Date Year End*/}
                            <View style={{paddingHorizontal:5}}></View>
                            <Image source={require('../../assets/calendar-icon.png')} style={{width:20,height:20}} />
                        </View>
                        {/* First date of shift Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Last Date of Shift
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center',marginTop:10}}>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.endDay}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({endDay: itemValue})}>
                                        <Picker.Item label="DD" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateDays.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.endDay}</Text>
                                </TouchableOpacity>
                                
                            }
                            {/* End Date Day End*/}
                            <View style={{paddingHorizontal:5}}></View>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.endMonth}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({endMonth: itemValue})}>
                                        <Picker.Item label="MM" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateMonth.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.endMonth}</Text>
                                </TouchableOpacity>
                                
                            }
                            {/* End Date Month End*/}
                            <View style={{paddingHorizontal:5}}></View>
                            {
                                Platform.OS == 'android' && 
                                <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                    <Picker
                                    selectedValue={this.state.endYear}
                                    style={{
                                        flex:1,
                                        paddingVertical:2,
                                        height:30,
                                    }}
                                    mode="dropdown"
                                    textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                    itemStyle={MainStyles.TInput}
                                    onValueChange={(itemValue, itemIndex) => this.setState({endYear: itemValue})}>
                                        <Picker.Item label="YYYY" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                        {
                                        this.state.dateYears.map(item=>{
                                            return (
                                            <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                            )
                                        })
                                        }
                                    </Picker>
                                </View>
                            }
                            {
                                Platform.OS == 'ios' && 
                                <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                    <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.endYear}</Text>
                                </TouchableOpacity>
                                
                            }
                            {/* End Date Year End*/}
                            <View style={{paddingHorizontal:5}}></View>
                            <Image source={require('../../assets/calendar-icon.png')} style={{width:20,height:20}} />
                        </View>
                        {/* Last date of shift Ends */}
                        <View style={{marginTop:15}}></View>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'45%'}}>
                                <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                    Start Time
                                    <Text style={{color:'#ee1b24'}}>*</Text>
                                </Text>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:10}}>
                                    {
                                        Platform.OS == 'android' && 
                                        <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                            <Picker
                                            selectedValue={this.state.startHour}
                                            style={{
                                                flex:1,
                                                paddingVertical:2,
                                                height:30,
                                            }}
                                            mode="dropdown"
                                            textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemStyle={MainStyles.TInput}
                                            onValueChange={(itemValue, itemIndex) => this.setState({startHour: itemValue})}>
                                                <Picker.Item label="HH" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                                {
                                                this.state.timHours.map(item=>{
                                                    return (
                                                    <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                                    )
                                                })
                                                }
                                            </Picker>
                                        </View>
                                    }
                                    {
                                        Platform.OS == 'ios' && 
                                        <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                            <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.startHour}</Text>
                                        </TouchableOpacity>
                                        
                                    }
                                    <View style={{paddingHorizontal:5}}>
                                        <Text style={{color:'#bebebe',fontFamily:'AvenirLTStd-Medium',fontSize:16}}>:</Text>
                                    </View>
                                    {
                                        Platform.OS == 'android' && 
                                        <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                            <Picker
                                            selectedValue={this.state.startMinute}
                                            style={{
                                                flex:1,
                                                paddingVertical:2,
                                                height:30,
                                            }}
                                            mode="dropdown"
                                            textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemStyle={MainStyles.TInput}
                                            onValueChange={(itemValue, itemIndex) => this.setState({startMinute: itemValue})}>
                                                <Picker.Item label="MM" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                                {
                                                this.state.timeMinutes.map(item=>{
                                                    return (
                                                    <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                                    )
                                                })
                                                }
                                            </Picker>
                                        </View>
                                    }
                                    {
                                        Platform.OS == 'ios' && 
                                        <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                            <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.startMinute}</Text>
                                        </TouchableOpacity>
                                        
                                    }
                                </View>
                            </View>
                            {/* Start Time Ends */}
                            <View style={{paddingHorizontal:10}}></View>
                            <View style={{width:'45%'}}>
                                <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                                    End Time
                                    <Text style={{color:'#ee1b24'}}>*</Text>
                                </Text>
                                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-evenly',marginTop:10}}>
                                    {
                                        Platform.OS == 'android' && 
                                        <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                            <Picker
                                            selectedValue={this.state.endHour}
                                            style={{
                                                flex:1,
                                                paddingVertical:2,
                                                height:30,
                                            }}
                                            mode="dropdown"
                                            textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemStyle={MainStyles.TInput}
                                            onValueChange={(itemValue, itemIndex) => this.setState({endHour: itemValue})}>
                                                <Picker.Item label="MM" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                                {
                                                this.state.timHours.map(item=>{
                                                    return (
                                                    <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                                    )
                                                })
                                                }
                                            </Picker>
                                        </View>
                                    }
                                    {
                                        Platform.OS == 'ios' && 
                                        <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                            <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.endHour}</Text>
                                        </TouchableOpacity>
                                        
                                    }
                                    <View style={{paddingHorizontal:5}}>
                                        <Text style={{color:'#bebebe',fontFamily:'AvenirLTStd-Medium',fontSize:16}}>:</Text>
                                    </View>
                                    {
                                        Platform.OS == 'android' && 
                                        <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                            <Picker
                                            selectedValue={this.state.endMinute}
                                            style={{
                                                flex:1,
                                                paddingVertical:2,
                                                height:30,
                                            }}
                                            mode="dropdown"
                                            textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                            itemStyle={MainStyles.TInput}
                                            onValueChange={(itemValue, itemIndex) => this.setState({endMinute: itemValue})}>
                                                <Picker.Item label="MM" value="" style={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}/>
                                                {
                                                this.state.timeMinutes.map(item=>{
                                                    return (
                                                    <Picker.Item key={'key-'+item} label={''+item} value={''+item} />
                                                    )
                                                })
                                                }
                                            </Picker>
                                        </View>
                                    }
                                    {
                                        Platform.OS == 'ios' && 
                                        <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                            <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.endMinute}</Text>
                                        </TouchableOpacity>
                                        
                                    }
                                </View>
                            </View>
                            {/* End Time Ends */}
                        </View>
                        {/* Start & End Time Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Shift Details
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <TextInput 
                            multiline={true}
                            style={[MainStyles.TInput,{height:80}]} 
                            returnKeyType={"go"} 
                            ref={(input) => { this.shiftDetails = input; }} 
                            blurOnSubmit={false}
                            onChangeText={(text)=>this.setState({shiftDetails:text})} 
                            placeholderTextColor="#bebebe" 
                            underlineColorAndroid="transparent" 
                            value={this.state.shiftDetails}
                        />
                        {/* Shift Details Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Dispensing System
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        {
                            Platform.OS == 'android' && 
                            <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                <Picker
                                selectedValue={this.state.disSystem}
                                style={{
                                    flex:1,
                                    paddingVertical:2,
                                    height:30,
                                }}
                                mode="dropdown"
                                textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemStyle={MainStyles.TInput}
                                onValueChange={(itemValue, itemIndex) => this.setState({disSystem: itemValue})}>
                                    <Picker.Item label="Choose" value="" />
                                    {
                                    this.state.dispensingList.map((item,key)=>{
                                        return (
                                        <Picker.Item key={'key-'+key} label={''+item} value={''+item} />
                                        )
                                    })
                                    }
                                </Picker>
                            </View>
                        }
                        {
                            Platform.OS == 'ios' && 
                            <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.disSystem}</Text>
                            </TouchableOpacity>
                            
                        }
                        {/* Dispensing System Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Pharmacy Offers Pharmacotherapy
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        <View style={{flexDirection:'row',justifyContent:'flex-start',alignItems:'flex-start',flexWrap:'wrap'}}>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper]} onPress={()=>{
                                this.setState({pOffers:'Yes'});
                            }}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                    {this.state.pOffers == 'Yes' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[MainStyles.checkBoxWrapper,{alignItems:'flex-start',marginLeft:40}]} onPress={()=>{
                                this.setState({pOffers:'No'});
                            }}>
                                <View style={[MainStyles.checkBoxStyle]}>
                                   {this.state.pOffers == 'No' &&  <View style={MainStyles.checkBoxCheckedStyle}></View>}
                                </View>
                                <Text style={[MainStyles.checkBoxLabel]}>No</Text>
                            </TouchableOpacity>
                        </View>
                        {/* Pharmacy Offers Pharmacotherapy Ends */}
                        <View style={{marginTop:15}}></View>
                        <Text style={{color:'#151515',fontFamily:'AvenirLTStd-Medium',fontSize:14}}>
                            Travel and Accommodation (non-metro)
                            <Text style={{color:'#ee1b24'}}>*</Text>
                        </Text>
                        <View style={{marginTop:10}}></View>
                        {
                            Platform.OS == 'android' && 
                            <View style={[MainStyles.TInput,{paddingLeft:0,paddingVertical:0}]}>
                                <Picker
                                selectedValue={this.state.travelAcom}
                                style={{
                                    flex:1,
                                    paddingVertical:2,
                                    height:30,
                                }}
                                mode="dropdown"
                                textStyle={{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemTextStyle= {{fontSize: 14,fontFamily:'AvenirLTStd-Medium'}}
                                itemStyle={MainStyles.TInput}
                                onValueChange={(itemValue, itemIndex) => this.setState({travelAcom: itemValue})}>
                                    <Picker.Item label="Choose" value="" />
                                    {
                                    this.state.travelList.map((item,key)=>{
                                        return (
                                        <Picker.Item key={'key-'+key} label={''+item} value={''+item} />
                                        )
                                    })
                                    }
                                </Picker>
                            </View>
                        }
                        {
                            Platform.OS == 'ios' && 
                            <TouchableOpacity style={[MainStyles.TInput,{alignItems:'center'}]} onPress={()=>{this.pickerIos()}}>
                                <Text style={{color:'#03163a',fontFamily:'Roboto-Light',fontSize:18}}>{this.state.travelAcom}</Text>
                            </TouchableOpacity>
                            
                        }
                        {/* Travel and Accommodation (non-metro) Ends */}
                        <View style={{
                            justifyContent:'center',
                            alignItems:'center',
                            marginTop:26
                        }}>
                            <TouchableOpacity style={[MainStyles.psosBtn,MainStyles.psosBtnSm]} onPress={()=>{this.submitLocumShift()}}>
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
            </SafeAreaView>
        )
    }
}
export default NLSFormScreen;
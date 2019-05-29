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
class EChatList extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            isRefreshing:false,
            chatList:[{id:1},{id:2}]
        };
        this.fetchChatList = this._fetchChatList.bind(this);
    }
    _fetchChatList = ()=>{

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
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Chat</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Image source={require('../../assets/noti-icon.png')} width={20} height={23} style={{width:20,height:23}} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{height:RemoveHiehgt}}>
                    {
                        this.state.chatList.length > 0 && 
                        <FlatList data={this.state.chatList} 
                            renderItem={({item}) => (
                                <TouchableOpacity style={{
                                    backgroundColor:'#FFFFFF',
                                    paddingHorizontal:10,
                                    paddingVertical:15,
                                    flexDirection:'row',
                                    justifyContent:'space-between',
                                    alignItems:'center',
                                    borderBottomColor: '#f0f0f0',
                                    borderBottomWidth: 1,
                                }} onPress={()=>{
                                    this.props.navigation.navigate('ChatSingle',{chat_id:1});
                                }}>
                                    <View style={{flexDirection:'row',alignItems:'center'}}>
                                        <View style={{width:50,height:50,borderRadius: 100,justifyContent:'center',alignItems:'center'}}>
                                            <ImageBackground  source={require('../../assets/default.png')} style={{overflow:'hidden',width:50,height:50,borderRadius: 100}}></ImageBackground>
                                            <View style={{
                                                    width:13,
                                                    height:13,
                                                    backgroundColor:'#00ff00',
                                                    position: 'absolute',
                                                    right:1,
                                                    bottom:1,
                                                    borderWidth: 2,
                                                    borderColor: '#FFFFFF',
                                                    borderRadius:100
                                                }}></View>
                                        </View>
                                        <Text style={[MainStyles.JLELoopItemName,{marginLeft:10,flexWrap:'wrap'}]}>Amit Sharma</Text>
                                    </View>
                                    <View style={{alignItems:'center'}}>
                                        <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#676767',fontSize:11}}>12:35 AM</Text>
                                        <View style={{marginTop:5,backgroundColor:'#02aeee',width:18,height:18,alignItems:'center',justifyContent:'center',borderRadius:100}}>
                                            <Text style={{fontFamily:'AvenirLTStd-Medium',color:'#FFFFFF',fontSize:10}}>2</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                                )}
                            keyExtractor={(item) => 'key-'+item.id}
                            viewabilityConfig={this.viewabilityConfig}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={()=>{this.setState({isRefreshing:true}),this.fetchChatList()}}
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
export default EChatList;
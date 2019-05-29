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
class ChatScreen extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            isRefreshing:false,
            chatting:[{id:1,sendBy:true},{id:2,sendBy:false}],
            messageText:''
        };
        this.fetchChatting = this._fetchChatting.bind(this);
    }
    _fetchChatting = ()=>{

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
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Amit Sharma</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{fontFamily:'AvenirLTStd-Light',color:'#FFFFFF',fontSize:10}}>Online</Text>
                    </View>
                </View>
                <View style={{flex:1,height:RemoveHiehgt}}>
                    {
                        this.state.chatting.length > 0 && 
                        <FlatList data={this.state.chatting} 
                            renderItem={({item}) => (
                                <View style={[{
                                    flexDirection:'row',
                                    paddingHorizontal:10,
                                    flexWrap:'wrap',
                                    alignItems:'center',
                                    marginBottom: 20,
                                },(item.sendBy == false)?{justifyContent:'flex-end'}:{justifyContent:'flex-start'},
                                ]}>
                                    {
                                        item.sendBy == false && <Text style={{color:'#b6b6b6',fontSize:12}}>3:00 PM</Text>
                                    }
                                    
                                    <View style={[{backgroundColor:(item.sendBy == true)?'#ffffff':'#99c5e8',flexWrap:'wrap',paddingHorizontal:10,paddingVertical:10,borderRadius:5},
                                    (item.sendBy == false)?{marginLeft:10}:{marginRight:10}]}>
                                        {
                                                item.sendBy == true && 
                                                <View style={{width:10,height:5,position:'absolute',left:-4,top:0,backgroundColor:'#FFFFFF'}}>
                                                    <View style={{width:6,height:5,position:'absolute',bottom:-1,left:-2,borderRadius:6,backgroundColor:'#f0f0f0'}}></View>
                                                </View>
                                        }
                                        {
                                                item.sendBy == false && 
                                                <View style={{width:10,height:5,position:'absolute',right:-4,top:0,backgroundColor:'#99c5e8'}}>
                                                    <View style={{width:6,height:5,position:'absolute',bottom:-1,right:-2,borderRadius:2,backgroundColor:'#f0f0f0'}}></View>
                                                </View>
                                        }
                                        <Text>sdfasdf asdfas sdfasdf asdfas sdfasdf</Text>
                                    </View>
                                    {
                                        item.sendBy == true && <Text style={{color:'#b6b6b6',fontSize:12}}>3:00 PM</Text>
                                    }
                                </View>
                            )}
                            inverted
                            keyExtractor={(item) => 'key-'+item.id}
                            viewabilityConfig={this.viewabilityConfig}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.isRefreshing}
                                    onRefresh={()=>{this.setState({isRefreshing:true}),this.fetchChatting()}}
                                    title="Pull to refresh"
                                    colors={["#1d7bc3"]}
                                />
                            }
                        />
                    }
                </View>
                <View style={{backgroundColor:'#FFFFFF',paddingHorizontal:10,paddingVertical:10,flexDirection:'row',alignItems:'center'}}>
                    <TextInput 
                        style={{
                            flex:1,
                            paddingLeft: 10,
                            paddingVertical:2,
                            height:40,
                            fontSize:14,
                            borderRadius:20,
                            fontFamily:'AvenirLTStd-Medium',
                            backgroundColor:'#f0f0f0'
                        }} 
                        returnKeyType={"go"} 
                        ref={(input) => { this.messageText = input; }} 
                        blurOnSubmit={false}
                        onChangeText={(text)=>this.setState({messageText:text})} 
                        placeholderTextColor="#bebebe" 
                        underlineColorAndroid="transparent" 
                        value={this.state.messageText}
                    />
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft: 10,}}>
                        <Icon name="paperclip" style={{fontSize:25,color:'#7e7e7e'}} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{justifyContent:'center',alignItems:'center',marginLeft: 10,}}>
                        <Icon name="paper-plane-o" style={{fontSize:22,color:'#7e7e7e'}} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }
}
export default ChatScreen;
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
class Notifications extends Component{
    constructor(props){
        super(props);
        this.state={
            loading:false,
            isRefreshing:false,
            notiList:{},
        };
        this.fetchNotifications = this._fetchNotifications.bind(this);
    }
    componentDidMount =()=>{
        this.fetchNotifications();
    }
    _fetchNotifications = ()=>{
        fetch(SERVER_URL+'fetch_notification?user_id=10')
        .then(res=>res.json())
        .then(response=>{
            console.log(response);
            if(response.status == 200){
                this.setState({notiList:response.result});
            }
        })
        .catch(err=>{

        });
    }
    render(){
        return(
            <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>
                <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../../assets/back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Notifications</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                            <Text style={{color:'#FFFFFF'}}>Clear all</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.notiList.length > 0 && 
                    <FlatList data={this.state.notiList} 
                        renderItem={({item}) => (
                            <View style={{
                                backgroundColor:'#FFFFFF',
                                paddingHorizontal:10,
                                paddingVertical:15,
                                flexDirection:'row',
                                justifyContent:'space-between',
                                alignItems:'center',
                                borderBottomColor: '#f0f0f0',
                                borderBottomWidth: 1,
                                flexWrap:'wrap',
                                flex:1
                            }}>
                                <ImageBackground  source={require('../../assets/default-noti.png')} style={{overflow:'hidden',width:50,height:50,borderRadius: 100}}></ImageBackground>
                                <View style={{flexWrap:'wrap'}}>
                                    <Text style={[MainStyles.JLELoopItemName,{marginLeft:10,flexWrap:'wrap'}]}>{item.message}</Text>
                                </View>
                            </View>
                            )}
                        keyExtractor={(item) => 'key-'+item.id}
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
export default Notifications;
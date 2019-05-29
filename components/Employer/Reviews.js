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
class Reviews extends Component{
    constructor(props) {
        super(props);
        this.state={
            loading:false,
            currentTab:'my',
            myList:[{id:1},{id:2}],
            locumList:[{id:1},{id:2},{id:3},{id:4}],
            isRefreshingMy:false,
            isRefreshingLocum:false
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
        this.getMyReviews = this._getMyReviews.bind(this);
        this.getLocumReviews = this._getLocumReviews.bind(this);
    }
    _getMyReviews = ()=>{
        this.setState({isRefreshingMy:false});
    }
    _getLocumReviews = ()=>{
        this.setState({isRefreshingLocum:false});
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
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>Reviews</Text>
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
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'my')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'my'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'my')?MainStyles.activeJLEItemText:'']}>MY REVIEW</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[MainStyles.jobListETabsItem,(this.state.currentTab == 'locum')?MainStyles.activeJLEItem:'']} onPress={()=>{this.setState({currentTab:'locum'})}}>
                        <Text style={[MainStyles.jobListETabsItemText,(this.state.currentTab == 'locum')?MainStyles.activeJLEItemText:'']}>LOCUM REVIEW</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.currentTab == 'my' && 
                    <View style={{height:RemoveHiehgt}}>
                        {
                            this.state.myList.length > 0 && 
                            <FlatList data={this.state.myList} 
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
                                    }}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <ImageBackground  source={require('../../assets/review-image.png')} style={{overflow:'hidden',width:50,height:50,borderRadius: 100}}></ImageBackground>
                                            <View style={{justifyContent:'center'}}>
                                                <Text style={[MainStyles.JLELoopItemName,{marginLeft:10,flexWrap:'wrap'}]}>Vinit Gupta</Text>
                                                <Text style={{fontFamily:'AvenirLTStd-Book',fontSize:13,marginLeft:10,flexWrap:'wrap',color:'#676767'}}>Job Title</Text>
                                            </View>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{fontFamily:'AvenirLTStd-Book',color:'#bebebe',fontSize:10}}>12 days ago</Text>
                                            <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star-o" style={{color:'#cccccc',fontSize:18}}/>
                                            </View>
                                        </View>
                                    </View>
                                    )}
                                keyExtractor={(item) => 'key-'+item.id}
                                viewabilityConfig={this.viewabilityConfig}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshingMy}
                                        onRefresh={()=>{this.setState({isRefreshingMy:true}),this.getMyReviews()}}
                                        title="Pull to refresh"
                                        colors={["#1d7bc3"]}
                                    />
                                }
                            />
                        }
                    </View>
                }
                {
                    this.state.currentTab == 'locum' && 
                    <View style={{height:RemoveHiehgt}}>
                        {
                            this.state.locumList.length > 0 && 
                            <FlatList data={this.state.locumList} 
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
                                    }}>
                                        <View style={{flexDirection:'row',alignItems:'center'}}>
                                            <ImageBackground  source={require('../../assets/review-image.png')} style={{overflow:'hidden',width:50,height:50,borderRadius: 100}}></ImageBackground>
                                            <View style={{justifyContent:'center'}}>
                                                <Text style={[MainStyles.JLELoopItemName,{marginLeft:10,flexWrap:'wrap'}]}>Vinit Gupta</Text>
                                                <Text style={{fontFamily:'AvenirLTStd-Book',fontSize:13,marginLeft:10,flexWrap:'wrap',color:'#676767'}}>Job Title</Text>
                                            </View>
                                        </View>
                                        <View style={{alignItems:'center'}}>
                                            <Text style={{fontFamily:'AvenirLTStd-Book',color:'#bebebe',fontSize:10}}>12 days ago</Text>
                                            <View style={{marginTop:5,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star" style={{color:'#fac917',fontSize:18,marginRight:3}}/>
                                                <Icon name="star-o" style={{color:'#cccccc',fontSize:18}}/>
                                            </View>
                                        </View>
                                    </View>
                                    )}
                                keyExtractor={(item) => 'key-'+item.id}
                                viewabilityConfig={this.viewabilityConfig}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={this.state.isRefreshingLocum}
                                        onRefresh={()=>{this.setState({isRefreshingLocum:true}),this.getLocumReviews()}}
                                        title="Pull to refresh"
                                        colors={["#1d7bc3"]}
                                    />
                                }
                            />
                        }
                    </View>
                }
            </SafeAreaView>
        )
    }
}
export default Reviews;
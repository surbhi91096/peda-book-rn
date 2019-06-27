import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, 
    Dimensions, ScrollView,
    TouchableOpacity, SafeAreaView } from 'react-native';
import MainStyles from './Styles';
import { DrawerActions,NavigationActions,withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import HeaderMenu from './Navigation/HeaderMenu';
const { height, width } = Dimensions.get('window');
class DownloadItems extends Component {
    constructor(props) {
        super(props);
        this.state = { loading: false,
            data:[{title:'Reader Manual 1',id:1},{title:'Reader 2',id:2},{title:'Manual 3',id:3}],
            renderedListData:[],
            searchOpened:false,
            noFilterData:false
        }
    }
    componentDidMount() {
    }
    searchBooks = (keyword)=>{
        if(keyword.length>0){
            let text = keyword.toLowerCase()
            let fullList = this.state.data;
            let filteredList = fullList.filter((item) => { // search from a full list, and not from a previous search results list
            if(item.title.toLowerCase().match(text))
                return item;
            });
            if (!text || text === '') {
                this.setState({
                    renderedListData: fullList,
                    noFilterData:false,
                })
            } else if (!filteredList.length) {
                // set no data flag to true so as to render flatlist conditionally
                this.setState({
                    noFilterData: true
                })
            }
            else if (Array.isArray(filteredList)) {
                  this.setState({
                      noFilterData: false,
                      renderedListData: filteredList
                  })
            }
        }
        else{
            this.setState({
                renderedListData: [],
                noFilterData: false,
            })
        }
    }
    render() {
        const RemoveHiehgt = height - 93;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                <HeaderMenu />
                <View style={{paddingHorizontal:5}}>
                    <View style={{backgroundColor: '#c2cccd',height: 40,borderRadius: 5,marginVertical:10}}>
                        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',alignContent:'center',paddingHorizontal:10}}>
                            <View style={{justifyContent:'center',flex:1,height:'100%'}}>
                                <Text style={{fontSize:18}}>Download Items</Text>
                            </View>
                            {
                                this.state.searchOpened == true && 
                                <TextInput 
                                    style={{
                                        flex: 1,
                                        textAlign: 'left',
                                        height: 40,
                                        fontSize: 17,
                                        fontFamily: 'AvenirLTStd-Medium',
                                        borderRadius: 2,
                                        paddingHorizontal: 7,
                                        width:'95%',
                                        top:0,
                                        position:'absolute',
                                        backgroundColor:'#FFFFFF'
                                    }}
                                    placeholder="Search"
                                    ref={(input) => { this.searchInput = input; }}
                                    onChangeText={(text) => this.searchBooks(text)}
                                    autoCapitalize='none'
                                    keyboardType="web-search"
                                    placeholderTextColor="#665e5c"
                                    underlineColorAndroid="transparent"
                                />
                            }
                            <TouchableOpacity style={{marginLeft:15}} onPress={()=>{
                                this.setState({searchOpened:!this.state.searchOpened,renderedListData:[],noFilterData:false});
                                setTimeout(()=>{
                                    if(this.searchInput){
                                        this.searchInput.focus();
                                    }
                                },200);
                            }}>
                                <Image source={require('../assets/magnifier.png')} style={{width:20,height:20}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {
                    this.state.renderedListData.length < 1 && 
                    <FlatList 
                    contentContainerStyle={{paddingHorizontal:10}}
                    data={this.state.data}
                        renderItem={({item})=>{
                            return(
                                <View style={{backgroundColor:'#FFFFFF',padding:5,flexDirection:'row',justifyContent:'space-between',marginVertical:6}}>
                                    <View>
                                        <Image source={require('../assets/default.png')} width={50} height={50} style={{width:150,height:150}}/>
                                    </View>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.title}</Text>
                                        <Text style={{fontSize:13}}>Lorem Isum Dolar set imet is that a simple text paraghrap which show demo content on every.</Text>
                                        <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+item.id}
                    />
                }
                {
                    this.state.renderedListData.length > 0 && 
                    <FlatList 
                    contentContainerStyle={{paddingHorizontal:10}}
                    data={this.state.renderedListData}
                        renderItem={({item})=>{
                            return(
                                <View style={{backgroundColor:'#FFFFFF',padding:5,flexDirection:'row',justifyContent:'space-between',marginVertical:6}}>
                                    <View>
                                        <Image source={require('../assets/default.png')} width={50} height={50} style={{width:150,height:150}}/>
                                    </View>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.title}</Text>
                                        <Text style={{fontSize:13}}>Lorem Isum Dolar set imet is that a simple text paraghrap which show demo content on every.</Text>
                                        <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+item.id}
                    />
                }
                {
                    this.state.renderedListData.length < 1 && this.state.noFilterData ==true && 
                    <View style={{flex:1,minHeight:RemoveHiehgt,paddingHorizontal:10,paddingBottom:40,alignItems:'center',justifyContent:'center'}}>
                        <Text style={{color:'#971a31',fontSize:17}}>No Data Found</Text>
                    </View>
                }
                <View style={{justifyContent:'flex-end',flexDirection:'row',paddingHorizontal:20,paddingVertical:10,backgroundColor:'#FFFFFF'}}>
                    <Text style={{fontSize:11,marginRight:2}}>Powered By</Text> 
                    <Text style={{color:'#971a31',fontSize:11}}>Pedabooks</Text>
                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({

});
export default withNavigation(DownloadItems);
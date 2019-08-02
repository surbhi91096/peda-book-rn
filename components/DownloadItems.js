import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, 
    Dimensions, ScrollView,AsyncStorage,RefreshControl,
    TouchableOpacity, SafeAreaView } from 'react-native';
import MainStyles from './Styles';
import { DrawerActions,NavigationActions,withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import HeaderMenu from './Navigation/HeaderMenu';
import Loader from './Loader';
import Pdf from 'react-native-pdf';
import Slider from '@react-native-community/slider';
const { height, width } = Dimensions.get('window');
class DownloadItems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            data:{},
            renderedListData:[],
            searchOpened:false,
            noFilterData:false,
            showPdf:false,
            currentBook:'',
            currentBookPages:0,
            currentPageViewing:1,
            progressBarWidth:0,
            curPage:0,
            showTableContents:false,
            tOFTab:'content',
            tableContents:{},
            isRefreshingList:false,
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus',this.setDownloadedItems);
    }
    setDownloadedItems = async()=>{
        await AsyncStorage.getItem('userData').then(async uRes=>{
            this.setState({userData:JSON.parse(uRes),loading:false});
            await AsyncStorage.getItem('downloadedItem').then(dRes=>{
                var downloadItemData = JSON.parse(dRes);
                var downloadItem = [];
                for(var i = 0;i<downloadItemData.length;i++){
                    console.log(downloadItemData[i].accessCode , this.state.userData.accessCode);
                    if(downloadItemData[i].ReaderId == this.state.userData.UserId){
                        downloadItem.push(downloadItemData[i]);
                    }
                    else if(typeof(downloadItemData[i].accessCode) != "undefined"){
                        if(typeof(this.state.userData.accessCode) != "undefined"){
                            if(downloadItemData[i].accessCode == this.state.userData.accessCode){
                                downloadItem.push(downloadItemData[i]);
                            }
                        }
                    }
                }
                this.setState({data:downloadItem,loading:false,isRefreshingList:false});
            });
        });
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
    setTheWidthOfProgressBar = ()=>{
        this.setState({progressBarWidth:(100/this.state.currentBookPages)*this.state.currentPageViewing});
    }
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    render() {
        const RemoveHiehgt = height - 93;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                <Loader loading={this.state.loading} />
                <HeaderMenu />
                <View style={{paddingHorizontal:5}}>
                    <View style={{backgroundColor: '#c2cccd',height: 40,borderRadius: 5,marginVertical:10}}>
                        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',alignContent:'center',paddingHorizontal:10}}>
                            <View style={{justifyContent:'center',flex:1,height:'100%'}}>
                                <Text style={{fontSize:18,marginTop:4}}>Download Items</Text>
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
                            <TouchableOpacity style={{marginLeft:15,marginTop:4}} onPress={()=>{
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
                                    <TouchableOpacity style={{width:150,height:'100%',maxHeight:180}} onPress={()=>{
                                        console.log(item);
                                        this.setState({currentBook:item.downloadedFile,showPDF:true});
                                    }}>
                                        <Image source={{uri:item.CoverPhoto}} width={50} height={50} style={{width:150,height:'100%',maxHeight:180}}/>
                                    </TouchableOpacity>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.BookTitle}</Text>
                                        <Text style={{fontSize:13}}>{item.desc}</Text>
                                        {/* <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+item.BookId}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshingList}
                                onRefresh={()=>{this.setState({isRefreshingList:true}),this.setDownloadedItems()}}
                                title="Pull to refresh"
                                colors={["#1d7bc3","red", "green", "blue"]}
                            />
                        }
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
                                    <TouchableOpacity style={{width:150,height:'100%',maxHeight:180}} onPress={()=>{
                                        this.setState({currentBook:item.downloadedFile,showPDF:true});
                                    }}>
                                        <Image source={{uri:item.CoverPhoto}} width={50} height={50} style={{width:150,height:'100%',maxHeight:180}}/>
                                    </TouchableOpacity>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.BookTitle}</Text>
                                        <Text style={{fontSize:13}}>{item.desc}</Text>
                                        {/* <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity> */}
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+item.BookId}
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
                {this.state.showPDF == true && 
                <View style={{backgroundColor:'#FFFFFF',position:'absolute',top:0,left:0}}>
                    <View style={[MainStyles.navHeaderWrapper,{justifyContent:'space-between'}]}>
                        <TouchableOpacity onPress={() => { this.setState({showPDF:false,currentBook:''}) }} style={{ paddingHorizontal: 10 }}>
                            <Image source={require('../assets/left-ar.png')} style={{ width: 10, height: 19 }} />
                        </TouchableOpacity>
                        <View style={{alignItems:'flex-end',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity style={styles.pdfActionBtns}>
                                <Image source={require('../assets/edit.png')} style={{ width: 19, height: 19 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pdfActionBtns}>
                                <Image source={require('../assets/crayon-drawing.png')} style={{ width: 19, height: 19 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pdfActionBtns}>
                                <Image source={require('../assets/test.png')} style={{ width: 19, height: 19 }} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pdfActionBtns}>
                                <Image source={require('../assets/magnifier.png')} style={{ width: 19, height: 19 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Pdf
                    source={{uri:this.state.currentBook}}
                    activityIndicatorProps={{color:'#971a31'}}
                    onLoadComplete={(numberOfPages,filePath,{width,height},tableContents)=>{
                        console.log(tableContents);
                        this.setState({currentBookPages:numberOfPages,tableContents});
                        setTimeout(()=>{this.setTheWidthOfProgressBar();});
                    }}
                    page={this.state.curPage}
                    onPageChanged={(page,numberOfPages)=>{
                        this.setState({currentPageViewing:page});
                        setTimeout(()=>{this.setTheWidthOfProgressBar()},200);
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    enablePaging={true}
                    style={styles.pdf}/>
                    {/* PDF Viewer bottom buttons */}
                    <View style={[MainStyles.navHeaderWrapper,{justifyContent:'space-between',borderTopWidth:1,borderBottomWidth:0,borderTopColor: '#9e2d42'}]}>
                        <TouchableOpacity onPress={() => {  this.setState({showTableContents:true});}} style={{ paddingHorizontal: 10 }}>
                            <Image source={require('../assets/menu.png')} style={{ width: 19, height: 19 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            flex:1,
                            paddingHorizontal:15,
                            height:15,
                            justifyContent:'center',
                            alignItems:'center'
                        }}>
                            <View style={{
                                width:'100%',
                                height:5,
                                borderRadius:10,
                                backgroundColor:'rgba(151, 26, 49, 0.5)',

                            }}>
                                <View style={{
                                    position:'absolute',
                                    width:`${this.state.progressBarWidth}%`,
                                    height:5,
                                    borderRadius:10,
                                    backgroundColor:'#971a31',
                                }}>
                                </View>
                            </View>
                            <View style={{
                                width:15,
                                height:15,
                                backgroundColor:'#971a31',
                                position:'absolute',
                                top:0,
                                left:`${this.state.progressBarWidth}%`,
                                borderRadius:100
                            }} onLongPress={()=>{
                                
                            }}>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { }} style={{ paddingHorizontal: 10 }}>
                            <Image source={require('../assets/page-menu.png')} style={{ width: 19, height: 19 }} />
                        </TouchableOpacity>
                    </View>
                    {/* Table of contents */}
                    {
                        this.state.showTableContents == true && 
                        <View style={{
                            position:'absolute',
                            top:0,
                            width:'100%',
                            height:'100%',
                            backgroundColor:'#FFFFFF',
                            zIndex:1500
                        }}>
                            <View style={[MainStyles.navHeaderWrapper,{justifyContent:'flex-start'}]}>
                                <TouchableOpacity onPress={() => { this.setState({showTableContents:false}); }} style={{ paddingHorizontal: 10,flexDirection:'row',alignItems:'center',justifyContent:'center' }}>
                                    <Image source={require('../assets/left-ar.png')} style={{ width: 10, height: 19 }} />
                                    <Text style={{marginLeft:12,
                                        fontFamily: 'AvenirLTStd-Roman', color: '#403f41', fontSize: 16, paddingRight: 120
                                    }}>
                                        Table Of Contents
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flex:1,
                                height:height-47,
                            }}>
                                <View style={{
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center',
                                    borderBottomWidth:2,
                                    borderBottomColor:'#971a31'
                                }}>
                                    <TouchableOpacity style={[styles.tOCBtns,(this.state.tOFTab == 'content')?{backgroundColor:'#971a31'}:{}]} onPress={()=>{this.setState({tOFTab:'content'})}}>
                                        <Text style={[styles.tOCBtnsText,(this.state.tOFTab == 'content')?{color:'#FFFFFF'}:{}]}>Contents</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.tOCBtns,(this.state.tOFTab == 'bookmark')?{backgroundColor:'#971a31'}:{}]} onPress={()=>{this.setState({tOFTab:'bookmark'})}}>
                                        <Text style={[styles.tOCBtnsText,(this.state.tOFTab == 'bookmark')?{color:'#FFFFFF'}:{}]}>Bookmarks</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[styles.tOCBtns,(this.state.tOFTab == 'resource')?{backgroundColor:'#971a31'}:{}]} onPress={()=>{this.setState({tOFTab:'resource'})}}>
                                        <Text style={[styles.tOCBtnsText,(this.state.tOFTab == 'resource')?{color:'#FFFFFF'}:{}]}>Resources</Text>
                                    </TouchableOpacity>
                                </View>
                                <FlatList 
                                    data={this.state.tableContents}
                                    contentContainerStyle={{height:height-47}}
                                    renderItem={({item})=>{
                                        return (
                                        <TouchableOpacity style={{
                                            width:'100%',
                                            paddingHorizontal:10,
                                            paddingVertical:10,
                                            borderBottomWidth:1,
                                            justifyContent:'space-between',
                                            alignItems:'center',
                                            borderBottomColor:'#971a31',
                                            flexDirection:'row'
                                        }}>
                                            <Text style={{color:'#971a31',fontSize:16}}>{item.title}</Text>
                                            <View>
                                                <Icon name="chevron-down" style={{color:'#971a31'}} />
                                            </View>
                                        </TouchableOpacity>);
                                    }}
                                    
                                    keyExtractor={(item)=>'key-'+this.makeid(10)+(new Date()).getTime()+item.pageIdx}
                                />
                            </View>
                        </View>
                    }
                </View>
                }
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdfActionBtns:{
        marginHorizontal:10
    },
    pdf: {
        height:Dimensions.get('window').height - 115,
        width:Dimensions.get('window').width,
    },
    tOCBtns:{
        paddingVertical:10,
        
        textAlign:'center',
        alignItems:'center',
        justifyContent:'center',
        width:'33.33333333%'
    },
    tOCBtnsText:{
        color:'#971a31',
        fontSize:17
    }
});
export default withNavigation(DownloadItems);
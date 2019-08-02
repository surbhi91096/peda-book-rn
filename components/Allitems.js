import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, RefreshControl,
    Dimensions, ScrollView,KeyboardAvoidingView,Platform,AsyncStorage,
    TouchableOpacity, SafeAreaView } from 'react-native';
import MainStyles from './Styles';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FlatList } from 'react-native-gesture-handler';
import HeaderMenu from './Navigation/HeaderMenu';
import { SERVER_URL } from '../Constants';
import Toast from 'react-native-simple-toast';
import Loader from './Loader';
import RNFS from 'react-native-fs';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Pdf from 'react-native-pdf';
import Slider from '@react-native-community/slider';
const { height, width } = Dimensions.get('window');
var myHeaders = new Headers();
myHeaders.set('Accept', 'application/json');
myHeaders.set('Cache-Control', 'no-cache');
myHeaders.set('Pragma', 'no-cache');
myHeaders.set('Expires', '0');
class Allitems extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            loading: true,
            data:[],
            renderedListData:[],
            searchOpened:false,
            noFilterData:false,
            isRefreshing:false,
            downloading:false,
            downloadingArray:[],
            percent:0,
            fileSize:'0',
            isDone:false,
            showPDF : false,
            currentBook:'',
            currentBookPages:0,
            currentPageViewing:1,
            progressBarWidth:0,
            curPage:0,
            showTableContents:false,
            tOFTab:'content',
            tableContents:{},
            downloadedItem:[],
            currentBookIndex:-1,
            isRefreshingList:false,
        }
        this.viewabilityConfig = {
            waitForInteraction: true,
            viewAreaCoveragePercentThreshold: 95
        }
    }
    setUserData = async()=>{
        this.setState({data:[]});
        await AsyncStorage.getItem('userData').then(async res=>{
            let userData = JSON.parse(res);
            var haveAccessCode = false;
            if(typeof(userData.accessCode) != "undefined"){
                haveAccessCode = true;
            }
            this.setState({userData,haveAccessCode,Name:userData.Name,userPic:{uri:userData.ProfileImage}});
            this.setDownloadedItems();
        });
        
    }
    setDownloadedItems = async()=>{
        await AsyncStorage.getItem('downloadedItem').then(async res=>{
            let downloadedItem = JSON.parse(res);
            if(!downloadedItem){
                downloadedItem = [];
            }
            this.setState({downloadedItem});
            if(this.state.haveAccessCode == false){
                this.getBooksFromUserId();
            }
            else{
                this.getBooksFromAccessCode();
            }
        });
    }
    async saveDetails(key, value) {
        await AsyncStorage.setItem(key, value);
    }
    componentDidMount() {
        this.props.navigation.addListener('didFocus',this.setUserData);
        //this.setUserData();
        // this.setDownloadedItems();
        // setTimeout(()=>{
        //     this.getBooks();
        // },1000);
    }
    setTheWidthOfProgressBar = ()=>{
        this.setState({progressBarWidth:(100/this.state.currentBookPages)*this.state.currentPageViewing});
    }
    getBooksFromUserId = ()=>{
        var fd = new FormData();
        fd.append('UserId',this.state.userData.UserId);
        fetch(SERVER_URL+'get_assign_classes',{
            method:'POST',
            headers:myHeaders,
            body:fd
        })
        .then(res=>{
            console.log(res);
            return res.json();
        })
        .then(response=>{
            console.log(response);
            if(response.Status == 1){
                var data = [];
                for(var i= 0;i<response.Result.length;i++){
                    var current = response.Result[i];
                    var downloadFile = '';
                    if(current.IdDownload == true){
                        var exractFileName = (current.FilePath).split('/');
                        var fileName = exractFileName[exractFileName.length-1];
                        downloadFile = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
                        ((current)=>{RNFS.exists(downloadFile).then(r=>{
                            var exractFileName = (current.FilePath).split('/');
                            var fileName = exractFileName[exractFileName.length-1];
                            downloadFile = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
                            var haveDownloaded = this.state.downloadedItem.filter(p => (p.accessCode == this.state.userData.accessCode && p.BookId == current.BookId));
                            var bookMark = [];
                            if(haveDownloaded.length < 1){
                                r = false;
                            }
                            if(haveDownloaded.length > 0){
                                if(typeof(haveDownloaded[0].bookmarksList) != "undefined" && haveDownloaded[0].bookmarksList.length > 0){
                                    bookMark = haveDownloaded[0].bookmarksList;
                                }
                            }
                            data.push({
                                BookId:current.BookId,
                                ReaderId:current.ReaderId,
                                FileId:current.FileId,
                                EducatorId:current.EducatorId,
                                CoverPhoto:current.CoverPhoto,
                                BookTitle:current.BookTitle,
                                BookTitle:current.BookTitle,
                                BookAuthor:current.BookAuthor,
                                desc:current.desc,
                                FilePath:current.FilePath,
                                IdDownload:r,
                                downloading:false,
                                fileSize:'0 KB',
                                percent:0,
                                downloadedFile:downloadFile,
                                bookmarksList:bookMark
                            });
                            this.setState({data});
                        });})(current);
                    }
                    else{
                        data.push({
                            BookId:current.BookId,
                            ReaderId:current.ReaderId,
                            FileId:current.FileId,
                            EducatorId:current.EducatorId,
                            CoverPhoto:current.CoverPhoto,
                            BookTitle:current.BookTitle,
                            BookTitle:current.BookTitle,
                            BookAuthor:current.BookAuthor,
                            desc:current.desc,
                            FilePath:current.FilePath,
                            IdDownload:false,
                            downloading:false,
                            fileSize:'0 KB',
                            percent:0,
                            downloadedFile:downloadFile,
                            bookmarksList:[]
                        });
                    }
                }
                this.setState({data});
            }
            this.setState({loading:false,isRefreshingList:false});
        })
        .catch(err=>{
            console.log(err);
            this.setState({loading:false,isRefreshingList:false,data:[]});
        });
    }
    getBooksFromAccessCode = ()=>{
        var fd = new FormData();
        fd.append('AccessCode',this.state.userData.accessCode);
        fetch(SERVER_URL+'get_ebook_access_code',{
            method:'POST',
            headers:myHeaders,
            body:fd
        })
        .then(res=>{
            console.log(res);
            return res.json();
        })
        .then(response=>{
            if(response.Status == 1){
                var data = [];
                var booksList =response.Result.books;
                for(var i= 0;i<booksList.length;i++){
                    var current = booksList[i];
                    var downloadFile = '';
                    var exractFileName = (current.FilePath).split('/');
                    var fileName = exractFileName[exractFileName.length-1];
                    downloadFile = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
                    ((current)=>{RNFS.exists(downloadFile).then(r=>{
                        var exractFileName = (current.FilePath).split('/');
                        var fileName = exractFileName[exractFileName.length-1];
                        downloadFile = `file://${RNFS.DocumentDirectoryPath}/${fileName}`;
                        var haveDownloaded = this.state.downloadedItem.filter(p => (p.accessCode == this.state.userData.accessCode && p.BookId == current.BookId));
                        var bookMark = [];
                        if(haveDownloaded.length < 1){
                            r = false;
                        }
                        if(haveDownloaded.length > 0){
                            if(typeof(haveDownloaded[0].bookmarksList) != "undefined" && haveDownloaded[0].bookmarksList.length > 0){
                                bookMark = haveDownloaded[0].bookmarksList;
                            }
                        }
                        var saveDataArray = {
                            BookId:current.BookId,
                            ReaderId:current.ReaderId,
                            FileId:current.FileId,
                            EducatorId:current.EducatorId,
                            CoverPhoto:current.CoverPhoto,
                            BookTitle:current.BookTitle,
                            BookTitle:current.BookTitle,
                            BookAuthor:current.BookAuthor,
                            desc:current.desc,
                            FilePath:current.FilePath,
                            IdDownload:r,
                            downloading:false,
                            fileSize:'0 KB',
                            percent:0,
                            downloadedFile:downloadFile,
                            accessCode:'',
                            bookmarksList:bookMark,
                        };
                        if(this.state.haveAccessCode == true){
                            saveDataArray.accessCode = this.state.userData.accessCode;
                        }
                        data.push(saveDataArray);
                        this.setState({data});
                    });})(current);
                }
                this.setState({data});
            }
            this.setState({loading:false,isRefreshingList:false,data:[]});
        })
        .catch(err=>{
            this.setState({loading:false,isRefreshingList:false,data:[]});
            console.log(err);
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
    downloadThisFile = (sourceFilePath,index) => {
        var exractFileName = sourceFilePath.split('/');
        var fileName = exractFileName[exractFileName.length-1];
        var cachedPath = `${RNFS.DocumentDirectoryPath}/${fileName}`;
        console.log(sourceFilePath,cachedPath);
        let options = {
            fromUrl: sourceFilePath,
            toFile: cachedPath,
            background: true,
            begin: (info) => {
                switch (info.statusCode) {
                    case 200:
                        var fileSize = this.humanFileSize(info.contentLength);
                        var data = this.state.data;
                        data[index].fileSize = fileSize;
                        data[index].downloading = true;
                        this.setState({data});
                    break;
                    default:
                    break;
                }
            },
            progress: (info)=>{
                var data = this.state.data;
                data[index].percent = info.bytesWritten / info.contentLength * 100;
                this.setState({data});
            },
        };
        var data = this.state.data;
        data[index].downloading = true;
        this.setState({data});
        // start download
        RNFS.downloadFile(options).promise.then((r) => {
            data[index].downloading = false;
            data[index].downloadedFile = `file://${cachedPath}`;
            data[index].IdDownload = true;
            if(this.state.haveAccessCode == true){
                data[index].accessCode = this.state.userData.accessCode;
            }
            var downloadedItem = this.state.downloadedItem;
            downloadedItem.push(data[index]);
            this.saveDetails('downloadedItem',JSON.stringify(downloadedItem));
            if(this.state.haveAccessCode == false){
                var fd = new FormData();
                fd.append('EbookId',data[index].BookId);
                fd.append('ReaderId',this.state.userData.UserId);
                fetch(SERVER_URL+'download_ebooks',
                {
                    method:'POST',
                    body:fd
                })
                .then(res=>{return res.json()})
                .then(r=>{
                })
                .catch(err=>{console.log(err);})
            }
            this.setState({data});
        }).catch(err=>{
            console.log(err)
        });
    }
    humanFileSize(bytes) {
        var thresh = 1024;
        if(Math.abs(bytes) < thresh) {
            return bytes + ' B';
        }
        var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
        var u = -1;
        do {
            bytes /= thresh;
            ++u;
        } while(Math.abs(bytes) >= thresh && u < units.length - 1);
        return bytes.toFixed(1)+' '+units[u];
    }
    checkIsFileExists = async (filePath)=>{
        var response =  await RNFS.exists(filePath);
        let body = await response;
        return body;
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
    isBookMarked  = ()=>{
        var filteredBookMarks = this.state.data[this.state.currentBookIndex].bookmarksList.filter(p => p.pageIndex == this.state.currentPageViewing);
        if(filteredBookMarks.length > 0){
            return true;
        }
        return false;
    }
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        console.log(prevState);
      }      
    render() {
        const RemoveHiehgt = height - 112;
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
                <Loader loading={this.state.loading} />
                <HeaderMenu />
                <View style={{paddingHorizontal:5}}>
                    <View style={{backgroundColor: '#c2cccd',height: 40,borderRadius: 5,marginVertical:10}}>
                        <View style={{flexDirection: 'row',justifyContent:'space-between',alignItems:'center',alignContent:'center',paddingHorizontal:10}}>
                            <View style={{justifyContent:'center',flex:1,height:'100%'}}>
                                <Text style={{fontSize:18,marginTop:4}}>All Items</Text>
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
                                        borderTopLeftRadius: 2,
                                        borderBottomLeftRadius:2,
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
                            <TouchableOpacity style={{marginLeft:15,marginTop:4}} onPress={()=>{this.setState({searchOpened:!this.state.searchOpened,renderedListData:[],noFilterData:false});setTimeout(()=>{if(this.searchInput){this.searchInput.focus();}},200);}}>
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
                        renderItem={({item,index})=>{
                            var exractFileName = (item.FilePath).split('/');
                            var fileName = exractFileName[exractFileName.length-1];
                            return(
                                <View style={{backgroundColor:'#FFFFFF',padding:5,flexDirection:'row',justifyContent:'space-between',marginVertical:6}}>
                                    <View style={{height:'100%',maxHeight:180}}>
                                        <TouchableOpacity style={{width:150,height:'100%',maxHeight:180}} onPress={()=>{
                                            this.setState({currentBook:item.downloadedFile,showPDF:true,currentBookIndex:index});
                                        }}>
                                            <Image source={{uri:item.CoverPhoto}} width={50} height={50} style={{width:150,height:'100%',maxHeight:180}}/>
                                        </TouchableOpacity>
                                        {
                                            item.IdDownload == false  && 
                                            <View style={{
                                                position:'absolute',
                                                width:'100%',
                                                height:'100%',
                                                maxHeight:180,
                                                backgroundColor:'rgba(0,0,0,0.5)',
                                                justifyContent:'center',
                                                alignItems:'center',
                                            }}>
                                                {
                                                    item.downloading == false && 
                                                    <TouchableOpacity onPress={()=>{
                                                        console.log(item.FilePath,index);
                                                        this.downloadThisFile(item.FilePath,index);}} style={{backgroundColor:'#FFFFFF',width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius:100}}>
                                                        <Image source={require('../assets/d-cloud-icon.png')} style={{width:22,height:22}}/>
                                                    </TouchableOpacity>
                                                }
                                                {
                                                    item.downloading == true && 
                                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                                        <AnimatedCircularProgress
                                                            size={30}
                                                            width={3}
                                                            rotation={0}
                                                            duration={10}
                                                            fill={item.percent}
                                                            tintColor="#FFFFFF"
                                                            onAnimationComplete={() => {}}
                                                            backgroundColor="rgba(255,255,255,0.5)" 
                                                        />
                                                        <Text style={{color:'#FFFFFF',fontSize:13,marginTop:5}}>{item.fileSize}</Text>
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.BookTitle}</Text>
                                        <Text style={{fontSize:13}}>{item.desc}</Text>
                                        <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}} onPress={()=>{
                                            this.props.navigation.navigate('SingleBook',{BookId:item.BookId});
                                        }}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+this.makeid(8)+item.BookId}
                        viewabilityConfig={this.viewabilityConfig}
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
                                    <View style={{height:'100%',maxHeight:180}}>
                                        <TouchableOpacity style={{width:150,height:'100%',maxHeight:180}} onPress={()=>{
                                            this.setState({currentBook:item.downloadedFile,showPDF:true});
                                        }}>
                                            <Image source={{uri:item.CoverPhoto}} width={50} height={50} style={{width:150,height:'100%',maxHeight:180}}/>
                                        </TouchableOpacity>
                                        {
                                            item.IdDownload == false  && 
                                            <View style={{
                                                position:'absolute',
                                                width:'100%',
                                                height:'100%',
                                                maxHeight:180,
                                                backgroundColor:'rgba(0,0,0,0.5)',
                                                justifyContent:'center',
                                                alignItems:'center',
                                            }}>
                                                {
                                                    item.downloading == false && 
                                                    <TouchableOpacity onPress={()=>{
                                                        this.downloadThisFile(item.FilePath,index);}} style={{backgroundColor:'#FFFFFF',width:30,height:30,justifyContent:'center',alignItems:'center',borderRadius:100}}>
                                                        <Image source={require('../assets/d-cloud-icon.png')} style={{width:22,height:22}}/>
                                                    </TouchableOpacity>
                                                }
                                                {
                                                    item.downloading == true && 
                                                    <View style={{justifyContent:'center',alignItems:'center'}}>
                                                        <AnimatedCircularProgress
                                                            size={30}
                                                            width={3}
                                                            rotation={0}
                                                            duration={10}
                                                            fill={item.percent}
                                                            tintColor="#FFFFFF"
                                                            onAnimationComplete={() => {}}
                                                            backgroundColor="rgba(255,255,255,0.5)" 
                                                        />
                                                        <Text style={{color:'#FFFFFF',fontSize:13,marginTop:5}}>{item.fileSize}</Text>
                                                    </View>
                                                }
                                            </View>
                                        }
                                    </View>
                                    <View style={{paddingHorizontal:10,flexWrap:'wrap',flex:1}}>
                                        <Text style={{fontSize:17,marginBottom:20}}>{item.BookTitle}</Text>
                                        <Text style={{fontSize:13}}>{item.desc}</Text>
                                        <TouchableOpacity style={{backgroundColor:'#971a31',maxWidth:150,marginTop:20,padding:7,flexDirection:"row",justifyContent:'space-between',alignItems:'center'}} onPress={()=>{
                                            this.props.navigation.navigate('SingleBook',{BookId:item.BookId});
                                        }}>
                                            <Text style={{color:'#FFFFFF',fontSize:15}}>More Info </Text>
                                            <Icon style={{color:'#FFFFFF',fontSize:15}} name="exclamation-circle" />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        }}
                        keyExtractor={(item)=>'key-'+item.BookId}
                        viewabilityConfig={this.viewabilityConfig}
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
                    <Text style={{color:'#971a31',fontSize:11}}>Pedabook</Text>
                </View>
                {this.state.showPDF == true && 
                <View style={{backgroundColor:'#FFFFFF',position:'absolute',top:0,left:0}}>
                    <View style={[MainStyles.navHeaderWrapper,{justifyContent:'space-between'}]}>
                        <TouchableOpacity onPress={() => { this.setState({showPDF:false,currentBook:''}) }} style={{ paddingHorizontal: 10 }}>
                            <Image source={require('../assets/left-ar.png')} style={{ width: 10, height: 19 }} />
                        </TouchableOpacity>
                        <View style={{alignItems:'flex-end',justifyContent:'center',flexDirection:'row'}}>
                            <TouchableOpacity style={styles.pdfActionBtns} onPress={()=>{
                                var bookmarkData = {PageTitle:'Page - '+(this.state.currentPageViewing+1),pageIndex:this.state.currentPageViewing};
                                var data = this.state.data;
                                if(!this.isBookMarked()){
                                    data[this.state.currentBookIndex].bookmarksList.push(bookmarkData);
                                }
                                this.setState({data,currentBookMarksList:data[this.state.currentBookIndex].bookmarksList});
                                console.log(this.state.currentPageViewing,this.state.currentBookIndex);
                            }}>
                                <Image source={(this.isBookMarked())?require('../assets/bookmark.png'):require('../assets/bookmark-o.png')} style={{ width: 19, height: 19 }} />
                            </TouchableOpacity>
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
                    onLoadComplete={(numberOfPages,filePath,{width,height},tableContents)=>{;
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
                        <View style={{width:"78%"}}>
                            <Slider
                                style={{width: "100%", height: 20}}
                                minimumValue={1}
                                step={1}
                                value={this.state.currentPageViewing}
                                maximumValue={this.state.currentBookPages}
                                minimumTrackTintColor="#971a31"
                                thumbTintColor="#971a31"
                                maximumTrackTintColor="#971a31"
                                onValueChange={(res)=>{this.setState({curPage:res})}}
                            />
                        </View>
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
                                {
                                    this.state.tOFTab == 'content' && 
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
                                }
                                {
                                    this.state.tOFTab == 'bookmark' && 
                                    <FlatList 
                                        data={this.state.currentBookMarksList}
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
                                                <Text style={{color:'#971a31',fontSize:16}}>{item.PageTitle}</Text>
                                            </TouchableOpacity>);
                                        }}
                                        
                                        keyExtractor={(item)=>'key-'+this.makeid(10)+(new Date()).getTime()+item.pageIdx}
                                    />
                                }
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
export default Allitems;
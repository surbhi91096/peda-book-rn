import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, 
    Dimensions, ScrollView, TouchableOpacity, SafeAreaView,AsyncStorage } from 'react-native';
import MainStyles from './Styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SERVER_URL } from '../Constants';
import Toast from 'react-native-simple-toast';
import Loader from './Loader';
const { height, width } = Dimensions.get('window');
class SingleBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            BookId:this.props.navigation.getParam('BookId'),
            BookData:{CoverPhoto:require('../assets/default.png')},
            showPDF : false
        }
    }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData,Name:userData.Name,userPic:{uri:userData.ProfileImage}});
    }
    componentDidMount(){
        this.setUserData();
        this.getBookData();
    }
    getBookData = ()=>{
        var fd = new FormData();
        fd.append('BookId',this.state.BookId);
        fetch(SERVER_URL+'get_ebook_info',{
            method:'POST',
            body:fd
        })
        .then(res=>{
            console.log(res);
            return res.json();
        })
        .then(response=>{
            console.log(response);
            if(response.Status == 1){
                var bookData = response.Result;
                this.setState({BookData:{BookTitle:bookData.BookTitle,BookAuthor:bookData.BookAuthor,CoverPhoto:{uri:bookData.CoverPhoto},BookPath:bookData.FilePath}});
            }
        })
        .catch(err=>{
            console.log(err);
        })
    }
    render(){
        const RemoveHiehgt = height - 50;
        return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
            <Loader loading={this.state.loading} />
            <View style={[MainStyles.navHeaderWrapper,{justifyContent:'flex-start'}]}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack(); }} style={{ paddingHorizontal: 10 }}>
                    <Image source={require('../assets/left-ar.png')} style={{ width: 10, height: 19 }} />
                </TouchableOpacity>
                <Text style={{ fontFamily: 'AvenirLTStd-Roman', color: '#403f41', fontSize: 16, paddingLeft: 20 }}>More Info</Text>
            </View>
            <ScrollView keyboardShouldPersistTaps="always" style={{paddingBottom:10}}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Image source={this.state.BookData.CoverPhoto} style={{width:150,height:200,marginVertical:30}}/>
                    <Text style={{fontSize:20,fontFamily: 'AvenirLTStd-Roman',color:'#3c3d3e',marginBottom:10}}>{this.state.BookData.BookTitle}</Text>
                    <Text style={{color:'#6b6c6b',fontFamily: 'AvenirLTStd-Light'}}>Author : {this.state.BookData.BookAuthor}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
        );
    }
}
export default SingleBook;

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
    }
});
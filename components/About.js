import React,{Component} from 'react';
import {View,ImageBackground, Image,Text, StyleSheet, TouchableOpacity } from 'react-native';
import Loader from './Loader';
import MainStyles from './Styles';
class AboutScreen extends Component{
    constructor(props) {
        super(props);
        this.state={loading:false}
    }
    componentDidMount(){
    }
    render(){
        return (
            <ImageBackground source={require('../assets/splash-bg.png')} style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <Loader loading={this.state.loading} />
                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../assets/back-icon.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#FFFFFF',fontSize:16}}>About</Text>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <TouchableOpacity>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flex:1,justifyContent: 'center',alignItems:'center'}}>
                    <Image source={require('../assets/web-logo.png')} style={{width:280,height:48}}/>
                    <Text style={{color:'#676767',marginTop:40,flexWrap:'wrap',width:80,textAlign:'center'}}>Version 2.0.03</Text>
                </View>
                <View style={{position:'absolute',alignItems:'center',justifyContent:'center',width:'100%',bottom:20,flexDirection: 'row'}}>
                    <Text style={{color:'#147dbf',fontFamily:'AvenirLTStd-Roman'}}>Terms &amp; Conditions</Text>
                    <View style={{borderLeftColor:'#1d7bc3',borderLeftWidth:1,marginHorizontal:5}}><Text>&nbsp;</Text></View>
                    <Text style={{color:'#147dbf',fontFamily:'AvenirLTStd-Roman'}}>Privacy &amp; Policy</Text>
                </View>
            </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({

});
export default AboutScreen;
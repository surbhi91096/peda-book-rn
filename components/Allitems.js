import React,{Component} from 'react';
import {View,ImageBackground, Image,Text,StyleSheet,TextInput,Dimensions,ScrollView, TouchableOpacity,SafeAreaView } from 'react-native';
import MainStyles from './Styles';
const { height, width } = Dimensions.get('window');
class Allitems extends Component{
    constructor(props) {
        super(props);

        this.state={loading:false}
    }
    componentDidMount(){
    }
    render(){

        const RemoveHiehgt = height - 50;
        return (

        <SafeAreaView style={{flex:1,backgroundColor:'#f0f0f0'}}>

                      <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.goBack();}}>
                        <Image source={require('../assets/left-ar.png')} style={{width:10,height:19}}/>
                    </TouchableOpacity>
                    
                    <Text style={{fontFamily:'AvenirLTStd-Roman',color:'#403f41',fontSize:16,paddingRight:120}}>Profile Setting</Text>
                    
                         </View>

                         <ScrollView style={{}}>
<View
style={{
    flex:1,
    paddingHorizontal:5,
    paddingVertical:5,
}}>
<View
style={{
    backgroundColor:'#c2cccd',
    flex:1,
    height:40,
    borderRadius:5,

}}>
<View style={{
    flexDirection:'row'
}}>

</View>

</View>

</View>
                          
                    
               
                     

                 
                 
            
                   
    
                        </ScrollView>
                        


             </SafeAreaView>
                      );
                   }
               }
        const styles = StyleSheet.create({
               
           });
        export default Allitems;
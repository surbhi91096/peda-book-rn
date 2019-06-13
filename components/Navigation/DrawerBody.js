import React,{Component} from 'react';
import { ScrollView, TouchableOpacity,View,SafeAreaView,ImageBackground,Image,Text,AsyncStorage,StyleSheet } from 'react-native';
import { DrawerItems,NavigationActions,withNavigation } from 'react-navigation';
class DrawerBody extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData:{}
        }
    }
    navigateToScreen = (route) => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
      }
    async setUserData(){
        let userDataStringfy = await AsyncStorage.getItem('userData');
        let userData = JSON.parse(userDataStringfy);
        this.setState({userData});
    }
    componentDidMount(){
        this.setUserData();
    }
    /*componentDidUpdate(){
        this.setUserData();
    }*/
    render(){
        const {items} = this.props.props;
        return (
            <SafeAreaView>
                <ScrollView style={{padding:0,marginTop:20}}>
                    <TouchableOpacity style={styles.DIS} onPress={()=>this.navigateToScreen('Profile')}>
                        <Image source={require('../../assets/d-book-icon.png')} style={{width:15,height:14}} />
                        <Text style={styles.DITS}>Show All Items</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DIS} onPress={()=>this.navigateToScreen('Profile')}>
                        <Image source={require('../../assets/d-cloud-icon.png')} style={{width:15,height:15}} />
                        <Text style={styles.DITS}>Show Downloaded</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.DIS} onPress={()=>this.navigateToScreen('Logout')}>
                        <Image source={require('../../assets/logout-d-icon.png')} style={{width:15,height:15}} />
                        <Text style={styles.DITS}>Logout</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    DIS:{
        paddingHorizontal:10,
        paddingVertical: 15,
        textAlign: 'left',
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems: 'center'
    },
    DITS:{
        fontSize: 14,
        fontFamily: 'AvenirLTStd-Medium',
        paddingLeft:10
    }
});
export default withNavigation(DrawerBody);
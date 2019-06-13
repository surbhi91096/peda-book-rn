import React, { Component } from 'react';
import { View, ImageBackground, Image, Text, StyleSheet, TextInput, Dimensions, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import MainStyles from './Styles';
import { DrawerActions,NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
const { height, width } = Dimensions.get('window');
class Allitems extends Component {
    constructor(props) {
        super(props);

        this.state = { loading: false }
    }
    componentDidMount() {
    }
    render() {

        const RemoveHiehgt = height - 50;
        return (

            <SafeAreaView style={{ flex: 1, backgroundColor: '#f0f0f0' }}>

                <View style={MainStyles.navHeaderWrapper}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.dispatch(DrawerActions.toggleDrawer())}}>
                        <Icon name="bars" style={{
                            fontSize:20,
                            color:'#971a31'
                        }} />
                    </TouchableOpacity>

                    <Text style={{ fontFamily: 'AvenirLTStd-Roman', color: '#971a31', fontSize: 16 }}>Pedabook</Text>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate('Profile');}}>
                        <Image source={require('../assets/user.png')} style={{width:25,height:25}} />
                    </TouchableOpacity>
                </View>

                <ScrollView style={{}}>
                    <View
                        style={{flex: 1,paddingHorizontal: 5,paddingVertical: 5,}}>
                        <View
                            style={{backgroundColor: '#c2cccd',flex: 1,height: 40,borderRadius: 5,}}>
                            <View style={{flexDirection: 'row'}}>

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
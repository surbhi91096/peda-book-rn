import { StyleSheet, Dimensions } from 'react-native';
win = Dimensions.get('window');
const MainStyles = StyleSheet.create({
    psosBtn:{
        paddingVertical:14,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor:'rgba(153, 25, 48, 0.5)',
        alignItems:'center',
        justifyContent:'center',
    },
    psosBtnn:{
        paddingVertical:4,
        paddingHorizontal: 30,
        borderRadius: 3,
        backgroundColor:'#ed352c'
    },
    psosBtnText:{
        color:'#FFF',
        fontFamily:'AvenirLTStd-Medium',
        fontSize: 20,
    },
    psosBtnSm:{
        paddingVertical:8,
        paddingHorizontal: 80,
    },
    psosBtnSmm:{
        paddingVertical:8,
        paddingHorizontal: 40,
    },
    psosBtnXm:{
        paddingVertical:5,
        paddingHorizontal: 20,
    },
    psosBtnXsText:{
        fontSize: 15,
    },
    TInput:{
        flex:1,
        //textAlign:'left',
        paddingLeft: 10,
        paddingVertical:2,
        height:30,
        fontSize:14,
        borderRadius:20,
        fontFamily:'AvenirLTStd-Medium',
        borderColor:'#a1a1a1',
        borderWidth: 1,
        borderStyle:"dashed"
    },
    selectFilesBtn:{
        backgroundColor:'#959595',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical:5,
        borderRadius:35,
        borderColor:'#a1a1a1',
        borderWidth:1
    },
    col4:{
        width:'20%',
    },
    checkBoxWrapper:{
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    checkBoxStyle:{
        width:15,
        height:15,
        borderWidth:1,
        borderColor:'#bebebe',
        borderRadius:3,
        marginRight:6,
        alignItems:'center',
        justifyContent:'center'
    },
    checkBoxCheckedStyle:{
        width:8,
        height:8,
        backgroundColor:'#1476c0'
    },
    checkBoxLabel:{
        color:'#FFFFFF',
        fontSize:15,
        fontFamily:'AvenirLTStd-Medium'
    },
    tacItems:{
        paddingVertical: 10,
        flexWrap:'wrap',
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    tacItemsH:{
        fontFamily:'AvenirLTStd-Heavy',
        fontSize:15
    },
    tacItemsSH:{
        fontFamily:'AvenirLTStd-Roman',
        fontSize:13
    },
    tacItemsImage:{
        width:'100%',
        marginTop:10
    },
    modalHeader:{
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: "#1476c0",
        paddingHorizontal:10
    },
    modalHeaderHeading:{
        color: "#FFF",
        fontFamily: "Roboto-Medium",
        fontSize: 16,
        paddingVertical:10,
        fontFamily:'AvenirLTStd-Medium',
    },
    modalFooter:{
        width:'100%',
        backgroundColor:'#ebebeb',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:5,
        borderTopColor: '#bebebe',
        borderTopWidth: 2,
    },
    eDW:{
        backgroundColor:'#FFFFFF',
        marginTop:8,
        paddingVertical:10,
        paddingHorizontal:15,
        flexDirection:'row',
        justifyContent:'space-evenly',
        flexWrap: 'wrap',
    },
    eDTWI:{
        backgroundColor:'#e67e22',
        width:'48%',
        paddingVertical:10,
        paddingHorizontal:15,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5
    },
    eDTWIT:{
        fontFamily:'AvenirLTStd-Book',
        color:'#FFFFFF',
        fontSize:14,
        textAlign:'center'
    },
    eDBWI:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#f0f0f0',
        paddingHorizontal:30,
        paddingVertical:15
    },
    eDBWIIC:{
        backgroundColor:'#1d7bc3',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical:15,
        borderRadius:100,
        width:80,
        height:80,
        marginBottom: 8,
    },
    eDBWIT:{
        fontFamily:'AvenirLTStd-Roman',
        textAlign:'center'
    },
    navHeaderWrapper:{
        flexDirection:'row',
        justifyContent:"space-between",
        paddingVertical: 13,
        paddingHorizontal: 10,
        backgroundColor:'#fcfeff',
        alignItems: 'center',
        borderBottomColor: '#9e2d42',
        borderBottomWidth: 1,
        
    },
    nHNotiIconNum:{
        position:'absolute',
        right:-5,
        top:-5,
        width:15,
        height:15,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#FFFFFF',
        borderRadius: 35,
        borderWidth: 1,
        borderColor: '#929496'
    },
    jobListETabsItem:{
        paddingVertical:10,
        paddingHorizontal:7,
        justifyContent: 'center',
        alignItems:'center',
        textAlign:'center',
        width:'50%'
    },
    jobListETabsItemText:{
        fontFamily:'AvenirLTStd-Medium',
        fontSize:12,
        color:'#676767'
    },
    activeJLEItem:{
        borderBottomColor:'#1d7bc3',
        borderBottomWidth:2
    },
    activeJLEItemText:{
        color:'#1d7bc3'
    },
    JLELoopItem:{
        backgroundColor:'#FFFFFF',
        marginTop:10,
        paddingHorizontal:10,
        paddingVertical:10,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center'
    },
    JLELoopItemName:{
        color:'#151515',
        fontFamily:'AvenirLTStd-Medium',
        fontSize:15,
        marginBottom:5
    },
    JLELoopItemTime:{
        color:'#bebebe',
        fontFamily:'AvenirLTStd-Book',
        fontSize:13
    },
    JLELoopItemCount:{
        color:'#151515',
        fontFamily:'AvenirLTStd-Medium',
        fontSize:14
    },
    JLELoopItemIcon:{
        color:'#1d7bc3',
        marginLeft:5
    },
    locumProfileItemWrapper:{
        paddingVertical:10,
        borderTopColor:'#999999',
        borderTopWidth:1,
    },
    LPIHeading:{
        color:'#151515',
        fontFamily:'AvenirLTStd-Light',
        fontSize:15,
    },
    LPISubHeading:{
        color:'#151515',
        fontFamily:'AvenirLTStd-Medium',
        fontSize:16,
    }
});
export default MainStyles;
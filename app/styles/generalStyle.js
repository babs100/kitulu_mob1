const React = require('react-native');

const { StyleSheet,Dimensions } = React;
const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    emptyTab: {
        paddingTop: deviceHeight / 2 - 50,
        paddingBottom: deviceHeight / 2 - 50,
        alignItems:'center'
    },
    inputGroup1 : {
        backgroundColor: 'rgba(10, 10, 10, 0.7)',
        marginBottom: 3,
        borderColor:'transparent'


    },
    icon1 : {
        color:'#FFFFFF',
        marginRight:5
    },

    icon2 : {
        color:'#FFFFFF',
        fontSize:25
    },
    
    input1 : {
        color:'white',
        fontSize:20
    },
    errorText1 : {
        color:'#522e22',
        marginBottom:10,
        padding:10
    },
    strongText:{
       fontWeight:'bold' ,
       marginLeft:5,
       marginRight:5
       
    },
    fieldTitle:{
        fontWeight:'bold' ,
        flex:3

    },
    fieldValue:{
        marginLeft:5,
        flex:7

    },
    headerText1 : {
        color:'#FFFFFF',
        marginBottom:10,
        padding:10
    },
    headerText2 : {
        color:'#FFFFFF',
        marginTop:5,
        marginLeft:5,
        padding:5,
        marginBottom:5,
    },
    navBar:{
        backgroundColor:'rgba(247, 157, 60, 0.7)',
        flexDirection:'row',
        padding:5
    },
    navBarTitle : {
        color:'#FFFFFF',
        marginTop:10,
        marginLeft:5,
        marginBottom:5,
        flex:5
    },
    tabBar: {
        backgroundColor:'#F79D3C',
        color:'#FFFFFF'
    },
    textView1:
    {
        marginTop:5,
        backgroundColor:'#F8F8F8',
        borderLeftColor:'rgba(247, 157, 60, 0.7)',
        borderLeftWidth:5,
        flexDirection:'row',
        marginLeft:15,
        marginRight:15,
        padding:10
        
    },
    text1:
    {
        
    }

});

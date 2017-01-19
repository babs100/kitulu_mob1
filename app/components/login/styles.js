const React = require('react-native');

const { StyleSheet, Dimensions, Platform } = React;

const deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    imageContainer: {
        flex: 1,
        width: null,
        height: null,
    },
    loginContainer: {
        flex: 1,
       // paddingTop:deviceHeight / 4,
        marginLeft:5,
        marginRight:5
    }
    
});

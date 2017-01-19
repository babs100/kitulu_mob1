import React, {Component} from 'react' ;
import {Image, BackAndroid} from 'react-native' ;
import {Container, H3, View,Text, Button,InputGroup, Input, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux' ;
import loginStyles from './styles.js' ;
import generalStyles from './../../styles/generalStyle.js' ;

const loginBg = require('../../../images/login2.png') ;

export default class Login extends Component
{

    constructor(props)
    {
        super(props) ;
        this.state =
        {
            email:'',
            password:'',
            invalid:false
        }
    }
    
    exitApp()
    {
        BackAndroid.exitApp(0) ;
    }

    componentDidMount()
    {
        //this.props.store.setUser('obabs78@gmail.com','babs100') ;
        BackAndroid.addEventListener('hardwareBackPress', () => this.exitApp() ) ;
    }

    componentWillUnmount()
    {
        BackAndroid.removeEventListener('hardwareBackPress') ;
    }

    

    /*
   async doLogin()
    {
        
        const email = this.state.email ;
        const password = this.state.password ;
        await this.props.store.setUser(email,password) ;
        
        if(this.props.store.user !== null)
        {
            Actions.home ;
        }else {
            this.setState(
                {
                    invalid:true 
                }
            )
        }
        
        
    }
    */
    renderError()
    {
        if(this.state.invalid == true)
        {
            return (
                <H3 style={{color:'#A42232',marginBottom:10,padding:10, alignSelf:'center'}}>Login Failed</H3>
            )
        }
    }

    render()
    {
        const goHome = ()=> Actions.home() ;
        return (

            <Container style={{backgroundColor:'#686868'}}>
                    <Image source={loginBg} style={loginStyles.imageContainer} >
                        <View style={loginStyles.loginContainer}>
                            <H3 style={[generalStyles.headerText1, {alignSelf:'center'}]}>Account LogIn</H3>
                            <InputGroup borderType="regular" style={generalStyles.inputGroup1} >
                                <Icon name='ios-person' style={generalStyles.icon1} />
                                <Input placeholder='EMAIL' onChangeText={(email) => this.setState({email})} style={generalStyles.input1} />
                            </InputGroup>
                            <InputGroup borderType="regular" style={generalStyles.inputGroup1} >
                                <Icon name='ios-lock' style={generalStyles.icon1} />
                                <Input
                                    placeholder='PASSWORD'
                                    secureTextEntry={true}
                                    onChangeText={(password) => this.setState({password})}
                                    style={generalStyles.input1}
                                />
                            </InputGroup>
                            <Button block warning onPress={ goHome}>
                                    Login
                                    <Icon name="ios-unlock-outline" style={generalStyles.icon1}/>
                            </Button>

                        </View>
                    </Image>
]            </Container>

        )
    }
}
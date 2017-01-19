import React, {Component, PropTypes} from 'react' ;
import {Image,  ActivityIndicator, Keyboard,Dimensions, LayoutAnimation} from 'react-native' ;
import {Container, H3, View,Text, Button,InputGroup, Input, Icon} from 'native-base';
import { Actions } from 'react-native-router-flux' ;
import Popup from 'react-native-popup' ;
//import {axios} from 'axios' ;
var axios = require('axios');
//import KeyboardEvents from 'react-native-keyboardevents' ;
//import {Emitter as KeyboardEventEmitter} from 'react-native-keyboardevents' ;

//import Spinner from 'react-native-spinkit' ;
import loginStyles from './styles.js' ;
import generalStyles from './../../styles/generalStyle.js' ;
import KeyboardHandler from './../keyboard/KeyboardHandler.js' ;
const loginBg = require('../../../images/login2.png') ;

import {Animations} from '../../animations/anims.js' ;

const deviceHeight = Dimensions.get('window').height;

export default class Login extends Component
{

    constructor(props)
    {
        super(props) ;
        this.state =
        {
            email:'',
            password:'',
            invalid:false,
            loading:false,
            disableButton:false,
            keyboardSpace : 0,
            isKeyboardOpened:false
        }

        this._didShowListener = null;
        this._didHideListener = null;
    }

    static propTypes = {
        //getJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };

    /*
    exitApp()
    {
        BackAndroid.exitApp(0) ;
    }
    */
    async getDefaultUserEmail()
    {
        let email = '';
        try{
           email = await AsyncStorage.getItem('@kitulu:email') ;
           this.setState({ email:email})  ;
        }catch (error)
        {

        }
    }

    componentWillUpdate(props,state)
    {
        if(state.isKeyboardOpened !== this.state.isKeyboardOpened)
        LayoutAnimation.configureNext(Animations.layout.spring) ;
    }

    async setDefaultUserEmail(email)
    {
        try{
            await AsyncStorage.setItem('@kitulu:email', email) ;
        }catch (error)
        {

        }
    }

    _updateKeyboardSpace(frames)
    {
        this.setState(
            {
                keyboardSpace:frames.endCoordinates.height,
                isKeyboardOpened:true
            }
        );
    }

    _resetKeyboardSpace()
    {
        this.setState(
            {
                keyboardSpace:0,
                isKeyboardOpened:false
            }
        );
    }

    componentDidMount()
    {
        //this.props.store.setUser('obabs78@gmail.com','babs100') ;
        this.getDefaultUserEmail();
        this._didShowListener = Keyboard.addListener('keyboardDidShow', this._updateKeyboardSpace.bind(this));
        this._didHideListener = Keyboard.addListener('keyboardDidHide', this._resetKeyboardSpace.bind(this));
        //BackAndroid.addEventListener('hardwareBackPress', () => this.exitApp() ) ;

    }

    componentWillUnmount()
    {
        //BackAndroid.removeEventListener('hardwareBackPress') ;
        this._didShowListener.remove();
        this._didHideListener.remove();

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
    loginError(message)
    {
        this.setState(
            {
                disableButton:false,
            }
        );
        this.popup.tip({
            title: 'Login Failed',
            content: [message],
            btn: {
                text: 'OK',
                style: {
                    color: 'rgba(247, 157, 60, 0.7)'
                },
                callback: () => {
                    
                }
            }
        });
    }

    showMessage(message)
    {
        this.popup.tip({
            title: 'Message',
            content: [message],
            btn: {
                text: 'OK',
                style: {
                    color: 'rgba(247, 157, 60, 0.7)'
                },
                callback: () => {

                }
            }
        });
       // Actions.home() ;
    }

    doLogin2()
    {
        
        const email = this.state.email ;
        const password = this.state.password ;
        if(email === '' || password === '')
        {
            this.showMessage('check input fields!');
            return ;
        }

        this.setState(
            {
                disableButton:true,
                loading:true

            }
        );
        var instance = axios.create(
            {
                baseURL : 'http://www.simitime.com/api/v1/',
                timeout:1000,
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                }

            }
        );
        instance.post('authenticate',JSON.stringify( {
            email : email,
            password : password
        }) ).then(function (response) {
            if(response.status == 200)
            {
                this.props.store.setToken(response.token)  ;
                Actions.home() ;
            }else {
                this.loginError(response.error);
                this.setState(
                    {
                        disableButton:false,
                        loading:false

                    }
                );
            }
        }).catch(function(error)
        {
            this.loginError('network failed!');
            this.setState(
                {
                    disableButton:false,
                    loading:false

                }
            );
        })
    }
    async doLogin()
    {
        const email = this.state.email ;
        const password = this.state.password ;

        if(email === '' || password === '')
        {
            this.showMessage('check input fields!');
            return ;
        }

        this.setState(
            {
                disableButton:true
               
            }
        );
        const API_URL = 'http://www.simitime.com/api/v1/authenticate' ;
        try{
            let response = await fetch(API_URL ,{
                method:'POST',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type' : 'application/json'
                    //'Content-type' : 'application/x-www-form-urlencoded'
                },
                body :JSON.stringify( {
                    email : email,
                    password : password
                })}) ;
            let respJson = await response.json() ;
            if(response.ok)
            {
                this.props.store.setToken(respJson.token) ;
                //this.props.store.loadJobs();
                //this.props.store.loadUser();
                this.setDefaultUserEmail(email) ;
                Actions.home({type:'reset'}) ;
            }
            else 
            {
                this.loginError(respJson.error);
                //this.loginError('Invalid Credentials!')
                
            }
            

        }
        catch (error)
        {
            //this.response = {status : 'FAIL',message : error};
            //console.log(error) ;
            //this.loginError('network failed!');
            this.loginError(error);
        }
        
            
    }
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

        //for login
        const paddingTop  = ( deviceHeight / 4) - (this.state.keyboardSpace / 3);
        //var KeyboardSpacer = require('react-native-keyboard-spacer') ;
        //this.emailInput.value = this.state.defaultEmail ;
        return (
            
            <Container style={{backgroundColor:'#686868'}}>
                    <Image source={loginBg} style={[loginStyles.imageContainer, {paddingTop: paddingTop}]} >
                        <View style={{alignItems:'center'}}>
                            <ActivityIndicator  animating={this.state.loading} color="#AB732C" size="large" style={{alignItems:'center', height:50}}/>
                        </View>

                        <View style={loginStyles.loginContainer}>
                            <H3 style={[generalStyles.headerText1, {alignSelf:'center'}]}>Account LogIn</H3>
                            <InputGroup borderType="regular" style={generalStyles.inputGroup1} >
                                <Icon name='ios-person' style={generalStyles.icon1} />
                                <Input 
                                    placeholder='EMAIL'
                                    onChangeText={(email) => this.setState({email})} style={generalStyles.input1}
                                    value={this.state.email}

                                />
                                
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
                            <Button block warning onPress={ () => this.doLogin()} disabled={this.state.disableButton}>
                                    Login
                                    <Icon name="ios-unlock-outline" style={generalStyles.icon1}/>
                            </Button>
                           

                        </View>
                        {/* Popup component */}
                        <Popup ref={ popup => this.popup = popup} />
                    </Image>

            </Container>
               

        )
    }
}
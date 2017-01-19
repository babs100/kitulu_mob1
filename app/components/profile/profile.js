import React, {Component, PropTypes} from 'react' ;
import {Container,Content,Thumbnail,Header,Title, H3,H2, View, Tabs, Button,InputGroup, Input,Text} from 'native-base';
import {Actions} from 'react-native-router-flux' ;
import { TouchableOpacity , Image,BackAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons' ;
import {_} from 'lodash' ;
import generalStyles from './../../styles/generalStyle.js' ;
const profileThumb =  require('../../thumbnails/profile/tunde.jpg') ;

export default class Profile extends Component
{

    constructor(props)
    {
        super(props) ;
        this.state = {
            user:{},
            loading:true
        }
    }

    componentWillMount()
    {
        /*
        BackAndroid.addEventListener('hardwareBackPress', ()=> {
            
            return false ;
        }) ;
        */
    }
    componenentWillUnmount()
    {
        //BackAndroid.removeEventListener('hardwareBackPress') ;
    }

    static propTypes = {
        //getJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };

    _getUser()
    {
        var end_point = 'http://www.simitime.com/api/v1/authenticate/user'  ;
        fetch(end_point,{
            method:'GET',
            headers: {
                'Authorization' : 'Bearer ' + this.props.store.token
            }
        }).then((response) => response.json())
            .then((data) => {
                this.setState(
                    {
                        user:data.user,
                        loading:false
                    }
                );
                this.props.store.setUser(data.user);
            } )
            .catch(function (error) {
                this._getUser() ;
            });
    }
    componentDidMount()
    {
        const user = this.props.store.user ;
        if(_.isEmpty(user))
        {
          this._getUser() ;  
        }
        else {
            this.setState(
                {
                    user:user,
                    loading:false
                }
            );
        }
    }
    
    
    renderProfile()
    {
        
        const user = this.state.user ;
        
        if(this.state.loading ) {
            return(
                <View style={{paddingTop:100}}>
                    <H3 style={[generalStyles.headerText1, {alignSelf:'center'}]}>Loading...</H3>
                </View>
            )
        }
        else {
            return(
                <View>
                    
                        <View style={{marginTop:15, padding:5}}>
                            <Thumbnail size={100} source={{uri:user.image_url}} style={{alignSelf:'center', marginBottom:10}} />
                            {/*<Image source={{uri:'./../../thumbnails/'+user.image}} style={{width:50, height:50,alignSelf:'center', marginBottom:10}}/> */}
                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="person" size={24} style={{marginRight:5}} />
                            <Text >{user.firstname + ' ' + user.lastname}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="email" size={24} style={{marginRight:5}} />
                            <Text >{user.email}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="phone" size={24} style={{marginRight:5}} />
                            <Text >{user.phone}</Text>
                        </View>
                        
                        

                        <View style={{ margin:15}}>
                            <Button  warning block onPress={() => false}>
                                <Icon name="brush"  color={'white'} />
                                Edit Profile
                            </Button>
                        </View>


                </View>
            );
        }
    }

    render()
    {
        const goBack = () => Actions.pop() ;
        return (
            <Container style={{backgroundColor:'#686868'}}>
               

                <View>
                    <View style={{backgroundColor:'rgba(247, 157, 60, 0.7)', flexDirection:'row', padding:5}}>


                        <Button transparent onPress={()=> goBack()} style={{margin:5}}>
                            <Icon
                                name='keyboard-arrow-left'
                                size={24}
                                color={'white'}

                            />
                        </Button>

                        <H3 style={[generalStyles.headerText2,{flex:5}]}>Profile</H3>


                    </View>
                    <Content >
                        {this.renderProfile()}

                    </Content>
                </View>
            </Container>



        )
    }
}
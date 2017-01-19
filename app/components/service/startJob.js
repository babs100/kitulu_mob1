import React, {Component, PropTypes} from 'react' ;
import {Container,Content,Thumbnail,Header,Title, H3,H2, View, Tabs, Button,InputGroup, Input,Text} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons' ;
import {Actions, ActionConst} from 'react-native-router-flux' ;
import { TouchableOpacity } from 'react-native'
import numbro from 'numbro' ;
import Popup from 'react-native-popup' ;
var moment = require('moment') ;
import generalStyles from './../../styles/generalStyle.js' ;



// Job Types: cleaner=1, driver=2, tutor=3, painter=4
const cleaningThumb =  require('../../thumbnails/cleaning.png') ;
const drivingThumb =  require('../../thumbnails/driving.png') ;
const tutorThumb =  require('../../thumbnails/teaching.png') ;
const paintingThumb =  require('../../thumbnails/painting.png') ;
const otherThumb =  require('../../thumbnails/other.png') ;

export default class StartJob extends Component
{

    constructor(props)
    {
        super(props) ;
        this.state = {
            startcode:'',
            disableButton:false,
        }

    }

    static propTypes = {
        store:  PropTypes.any.isRequired
    };




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
                   // Actions.refresh({key:'home'}); 
                   //Actions.home() ;
                    Actions.pop();
                }
            }
        });
        //Actions.pop();
        this.setState({disableButton:false});
        //Actions.home({type:ActionConst.REFRESH}) ;
        //Actions.home() ;
    }

    showError(message)
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
        //Actions.home() ;
        this.setState({disableButton:false})
    }
    
    async startThisJob(id, code)
    {
        this.setState({disableButton:true});
        const end_point = 'http://www.simitime.com/api/v1/startjob?jobId='+id+'&startcode='+ code  ;
        if(this.state.startcode === '')
        {
            this.popup.tip({
                title: 'Failure',
                content: ['Please provide startcode!'],
                btn: {
                    text: 'OK',
                    style: {
                        color: 'rgba(247, 157, 60, 0.7)'
                    },
                    callback: () => {
                    }
                }
            });

            this.setState({disableButton:false});
            return ;
        }
        try{
            
            let response = await fetch( end_point,{
                method:'GET',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.store.token
                } }) ;
            let responseJson = await response.json() ;
            if(response.ok)
            {
                if(responseJson.status === 'STARTED')
                {
                    this.props.store.startJob(id, responseJson.dateStarted);
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
                }
                else {
                    this.showError(responseJson.message) ;
                }
                
                
            }
        }
        catch(error)
        {
            this.showError('Network Failed!') ;

        }

        
    }

    thumb(t)
    {
        if(t == 1)
        {
            return cleaningThumb ;
        }
        else if(t == 3)
        {
            return drivingThumb ;
        }
        else if(t == 4)
        {
            return tutorThumb ;
        }
        else if(t == 9)
        {
            return paintingThumb ;
        }
        else {
            return otherThumb ;
        }
    }

    renderJob()
    {

        const job = this.props.store.job ;
        const goBack = () =>
        {
            //Actions.refresh({key:'home'});
            //Actions.home() ;
            Actions.pop() ;
        }
        //const goBack = () => Actions.pop() ;
        if(job != null )
        {
            return(
                <View>
                    <View style={generalStyles.navBar}>


                        <Button transparent onPress={()=> goBack()} style={{margin:5}}>
                            <Icon
                                name='keyboard-arrow-left'
                                size={24}
                                color={'white'}
                                
                                />
                        </Button>
                        
                        <H3 style={generalStyles.navBarTitle}>Start Job</H3>


                    </View>
                    <Content >
                        <View style={{marginLeft:5, marginRight:5,marginTop:20, padding:5, flexDirection:'row',backgroundColor:'#F8F8F8',borderLeftColor:'rgba(247, 157, 60, 0.7)',borderLeftWidth:5}}>
                            <View style={{flex:2, alignItems:'center'}}>
                                <Thumbnail size={80} square source={this.thumb(job.type)}  />
                            </View>
                            <View style={{ flex:4, marginLeft:3, paddingLeft:3,borderLeftColor:'rgba(247, 157, 60, 0.7)',borderLeftWidth:1}}>
                                <H3 style={{paddingTop:5,paddingBottom:5}}>{job.title}</H3>
                                <Text>{job.customer}</Text>
                                <Text>{job.address}</Text>
                                <Text>{'N' + numbro(job.amount).format('0,0')}</Text>
                                <Text>{moment(job.startDate).format('dddd MMM Do, YYYY.')}</Text>
                                
                            </View>


                        </View>

                        <View style={{marginLeft:5, marginRight:5, marginTop:10}}>
                            <InputGroup borderType="regular" style={generalStyles.inputGroup1} >
                                <Icon name='code' style={generalStyles.icon1} />
                                <Input
                                    placeholder='START CODE'
                                    onChangeText={(startcode) => this.setState({startcode})}
                                    style={generalStyles.input1}
                                />
                            </InputGroup>
                            <Button block large warning onPress={()=> this.startThisJob(job.jobId, this.state.startcode)} disabled={this.state.disableButton}>
                                <Icon name="touch-app" size={24} style={generalStyles.icon1}/>
                                Start this Job
                                
                            </Button>
                        </View>

                        

                    </Content>
                    {/* Popup component */}
                    <Popup ref={ popup => this.popup = popup} />
                    
                </View>
            );
        }
    }

    render()
    {
        
        return (
            <Container style={{backgroundColor:'#686868'}}>
                {this.renderJob()}
            </Container>



        )
    }
}
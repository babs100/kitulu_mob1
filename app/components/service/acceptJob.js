import React, {Component, PropTypes} from 'react' ;
import {Container,Content,Thumbnail,Header,Title, H3,H2, View, Tabs, Button,InputGroup, Input,Text} from 'native-base';
import {Actions, ActionConst} from 'react-native-router-flux' ;
import {Alert} from 'react-native' ;
import { TouchableOpacity ,Platform} from 'react-native'
import numbro from 'numbro' ;
import Icon from 'react-native-vector-icons/MaterialIcons' ;
import PushNotification from 'react-native-push-notification' ;
import {_} from 'lodash' ;
//import { AsyncStorage} from 'react-native' ;

//import styles from './styles.js' ;
import myTheme from '../../../myThemes/light.js';
import generalStyles from './../../styles/generalStyle.js' ;
import Popup from 'react-native-popup' ;

import AndroidPopupMenu from '../popupmenu/AndroidPopupMenu.js' ;

const STORAGE_KEY = '@kitulu:jobs';

// Job Types: cleaner=1, driver=2, tutor=3, painter=4
const cleaningThumb =  require('../../thumbnails/cleaning.png') ;
const drivingThumb =  require('../../thumbnails/driving.png') ;
const tutorThumb =  require('../../thumbnails/teaching.png') ;
const paintingThumb =  require('../../thumbnails/painting.png') ;
const otherThumb =  require('../../thumbnails/other.png') ;

var moment = require('moment-timezone') ;
/*
moment.fn.minutesFromNow = function() {
    var r = Math.floor((+new Date() - (+this))/60000);
    return r + ' min' + ((r===1) ? '' : 's') + ' ago';
};
*/
//moment.unix(d).minutesFromNow();
export default class AcceptJob extends Component
{

    constructor(props)
    {
        super(props) ;
        //const jobId = this.props.jobId;

        this.state =
        {
            //jobId : jobId,
            //job: this.props.store.getJob(jobId)
            minutes :0,
            disableButtons:false
        }

    }

    static propTypes = {
        //getJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };


    componentDidMount()
    {
        PushNotification.configure({
            onNotification : function (notification) {
                // console.log('Notification ' + notification) ;
            }
        });
    }

    //goBack = () => { Actions.pop() };
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
                   //Actions.refresh({key:'home'});
                   //Actions.home() ;
                   Actions.pop() ;
               }
           }
       });
       //Actions.pop() ;
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
                    //Actions.home() ;
                    this.setState({disableButtons:false});
                }
            }
        });
        this.setState({disableButtons:false});
    }

    scheduleJobNotification(job)
    {
        var date = moment(job.startDate).toDate();
        if(Platform.OS === 'ios')
        {
            date = date.toISOString() ;
        }

        
            PushNotification.localNotificationSchedule(
                {
                    title:'Kitulu',
                    message: 'You have a job with ' + job.customer + ' today',
                    date

                }
            );
       


    }
   async acceptThisJob(id)
    {
        //this.popup.alert('OK','Offer Accepted!') ;
        //this.props.store.acceptJob(id) ;
        const job = this.props.store.job ;
        this.setState({disableButtons:true});
        try{
            const end_point = 'http://www.simitime.com/api/v1/acceptjob?jobId=' + id ;
            let response = await fetch( end_point,{
                method:'GET',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.store.token
                } }) ;
            let responseJson = await response.json() ;
            if(response.ok)
            {
                //this.showMessage(responseJson.message) ;
                if(responseJson.status === 'ACCEPTED')
                {
                    this.props.store.acceptJob(id);
                    this.scheduleJobNotification(job) ;
                    this.showMessage(responseJson.message) ;
                    
                    //Actions.home() ;
                }
                else if(responseJson.status === 'EXPIRED')
                {
                    this.props.store.expireJob(id);
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
                }
                else {
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
                }

            }
        }
        catch(error)
        {
            this.showError('Network Failed!') ;

        }


    }
    
    rejectTheJob(id)
    {
        this.popup.confirm({
            title: 'Confirmation',
            content: ['Are you sure you want','to reject this offer'],
            ok: {
                text: 'Yes',
                style: {
                    color: 'red'
                },
                callback: () => {
                    this.rejectThisJob(id);
                }
            },
            cancel: {
                text: 'No',
                style: {
                    color: 'blue'
                },
                callback: () => {
                    
                }
            }
        });
    }
    async rejectThisJob(id)
    {
        //this.popup.alert('OK','Offer Accepted!') ;
        //this.props.store.acceptJob(id) ;
        this.setState({disableButtons:true});
        try{
            const end_point = this.props.store.API_BASE_URL + 'rejectjob?jobId=' + id ;
            let response = await fetch( end_point,{
                method:'GET',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.store.token
                } }) ;
            let responseJson = await response.json() ;
            if(response.ok)
            {
                //this.showMessage(responseJson.message) ;
                if(responseJson.status === 'REJECTED')
                {
                    this.props.store.rejectJob(id);
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
                }
                else if(responseJson.status === 'EXPIRED')
                {
                    this.props.store.expireJob(id);
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
                }
                else {
                    this.showMessage(responseJson.message) ;
                    //Actions.home() ;
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

    getJobInJobs(jobs, jobId) {
            var job = {} ;
            jobs.map((j) =>
                {
                    if(j.jobId == jobId)
                        job = j ;
                }) ;
            return job ;
            }
    
    renderJob()
    {
        //const jobId = this.props.jobId ;
        //const jobs = this.props.store.jobs ;
        const job = this.props.store.job ;
        //const goBack = () => Actions.pop() ;
        const goBack = () =>
        {
            //Actions.refresh({key:'home'});
            //Actions.home() ;
            Actions.pop() ;
        }
        

        
        //var min = moment().tz('Africa/Lagos').diff(moment(job.createdAt),'minutes');
        var now = moment() ;
        var createdAt = moment(job.createdAt) ;
        var min = now.diff(createdAt,'minutes');
        var remainingMinutes = _.toNumber(min) ;
        
        if(remainingMinutes >= 31)
        {
            remainingMinutes = 0 ;
        }
        else
        {
            remainingMinutes = 31 - remainingMinutes ;
        }

       
        
        if(_.isEmpty(job) === false)
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
                        
                        <H3 style={generalStyles.navBarTitle}>{job.title}</H3>


                    </View>
                    <Content >
                        <View style={{marginTop:20, padding:10}}>
                            <Thumbnail square size={100} source={this.thumb(job.type)} style={{alignSelf:'center', marginBottom:10}} />

                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="person" size={24} style={{marginRight:5}} />
                            <Text >{job.customer}</Text>
                        </View>

                        <View style={generalStyles.textView1}>
                            <Icon name="home" size={24} style={{marginRight:5}} />
                            <Text numberOfLines={2}>{job.address}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="event-note" size={24} style={{marginRight:5}} />
                            <Text>{moment(job.startDate).format('dddd MMM Do, YYYY.')}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Icon name="monetization-on" size={24} style={{marginRight:5}} />
                            <Text>{'N' + numbro(job.amount).format('0,0')}</Text>
                        </View>

                        <View style={generalStyles.textView1}>
                            <Icon name="access-alarm" size={24} style={{marginRight:5}} />
                            <Text>{remainingMinutes + ' min remaining'}</Text> 
                            {/*<Text>{now.toString() + ' now'}</Text>*/}
                        </View>

                        <View style={{ marginLeft:15,marginRight:15,marginTop:10}}>
                            <Button large warning block onPress={() => this.acceptThisJob(job.jobId)} disabled={this.state.disableButtons}>
                                <Icon name="check"  color={'white'} size={22} style={{marginRight:5}}/>
                                Accept this offer
                            </Button>
                        </View>
                        <View style={{ marginLeft:15,marginRight:15,marginTop:10}}>
                            <Button large danger block onPress={() => this.rejectTheJob(job.jobId)} disabled={this.state.disableButtons}>
                                <Icon name="thumb-down"  color={'white'} size={22} style={{marginRight:5}} />
                                Reject this offer
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
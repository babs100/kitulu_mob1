import React, {Component, PropTypes} from 'react' ;
import {Container,Content,Header,Title, H3,H2, View, Tabs, Button,InputGroup, Input, Thumbnail} from 'native-base';
import {Actions} from 'react-native-router-flux' ;
import PushNotification from 'react-native-push-notification' ;
import { AsyncStorage, Image,ToastAndroid, BackAndroid, AppState, Platform} from 'react-native' ;
import Icon from 'react-native-vector-icons/MaterialIcons' ;

import styles from './styles.js' ;
import myTheme from '../../../myThemes/light.js';
import generalStyles from './../../styles/generalStyle.js' ;
import TabOne from './tabOne.js' ;
import TabTwo from './tabTwo.js'
import TabThree from './tabThree.js'
import Popup from 'react-native-popup' ;
import AndroidPopupMenu from '../popupmenu/AndroidPopupMenu.js' ;
import NotificationController from  '../../controllers/notificationController.js' ;
const loader =  require('../../../images/gear.gif') ;
const networkfailed =  require('../../../images/networkfailed.png') ;
const STORAGE_KEY = '@kitulu:jobs';

var moment = require('moment-timezone') ;
//var API ;
//@observer
export default class Home extends Component
{
    
    constructor(props)
    {
        super(props) ;
        this.state =
        {
            jobs:[],
            ready:false,
            loading:true,
            showToast:false,
            failed:false
        };
        //this._getInitialState() ;
        //this.api = this.props.store.API ;
        //API = this.props.store.API;
        this.selectJob = this.selectJob.bind(this) ;
        this.selectPendingJob = this.selectPendingJob.bind(this) ;
        this.selectCompletedJob = this.selectCompletedJob.bind(this) ;
        //this.handleAppStateChange = this.handleAppStateChange.bind(this);
    }

    static propTypes = {
        //getJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };

    componentWillMount()
    {
        //BackAndroid.addEventListener('hardwareBackPress', this.blockBackAndroid()) ;
        this._getJobs();
        PushNotification.configure({
            onNotification : function (notification) {
                // console.log('Notification ' + notification) ;
            }
        });
    }

    componentDidMount()
    {
        
        //AppState.addEventListener('change', this.handleAppStateChange) ;
        //setTimeout(()=>this._showJobScheduleNotification(),5000 );
        //this._getJobs() ;
       //this._showJobScheduleNotification() ;
        //this._getStates() ;



    }
    componentWillUnmount()
    {
        //AppState.removeEventListener('change', this.handleAppStateChange) ;
    }

    handleAppStateChange(appState)
    {
        if(appState === 'active')
        {
            this._showJobScheduleNotification() ; // show notification in 4 seconds
        }

    }
   _showJobScheduleNotification()
   {
       
          let date =  new Date(Date.now() + 2000) ;
           if(Platform.OS === 'ios')
           {
               date = date.toISOString() ;
           }
          let jobs = this.props.store.jobs ;
          // var job_count = jobs.length ;
           
           var job_count = 0 ;
           jobs.map(job => {
               if(moment().isSame(job.startDate) && job.status == 3)
               {
                   job_count +=1;
               }
           });
            
           if(job_count > 0)
           {
               PushNotification.localNotificationSchedule(
                   {
                       title:'Kitulu',
                       message: 'You have ' + job_count + ' pending job(s) today',
                       date
                       
                   }
               );
           }
       

       
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
                    Actions.refresh({key:'home'}) ;

                }
            }
        });

    }

    getUser()
    {
        return API.get('authenticate/user') ;
    }

    getJobs()
    {
        return API.get('getjobs') ;
    }

    _getStates()
    {
        API.all([this.getUser(), this.getJobs()])
            .then(API.spread(function (userResponse, jobResponse) {
                
                this.props.store.setJobs(jobResponse.jobs) ;
                
                this.props.store.setUser(userResponse.user);
                
                this.setState({loading:false, failed:false}) ;
            })).catch(function (error) {
            
            this.showError('Network failed!')
        });
        
    }
   _getJobs()
    {
        var end_point = 'http://www.simitime.com/api/v1/getjobs'  ;
        fetch(end_point,{
            method:'GET',
            headers: {
                'Authorization' : 'Bearer ' + this.props.store.token
            }
        }).then((response) => response.json())
            .then((data) => {

              this.props.store.setJobs(data.jobs);
                this.setState(
                    {
                        jobs:data.jobs,
                        loading:false,
                        failed:false,
                        ready:true
                    }
                );
            } )
            //.catch((error) => this.showError('Network failed!') );
            .catch((error) => this.setState({ready:false,loading:false,failed:true}) );
            
    }
    _getInitialState = async() =>
    {
        var end_point = 'http://www.simitime.com/api/v1/getjobs'  ;
        try{
            let response = fetch( end_point,{
                method:'GET',
                headers: {
                    'Authorization' : 'Bearer ' + this.props.store.token
                }
            });

            let responseJson = await response.json() ;
            //console.log(responseJson);
            this.setState(
                {
                    jobs:responseJson.jobs
                }
            ) ;
            
        }
        catch (error)
        {
            this.response = {'status' : 'FAIL','message' : error} ;
        }
    };

    
    goBack = () => { Actions.pop() };

    goProfile = () => {
        //this.props.store.loadUser() ;
        Actions.profile() ;
    };

    goSettings = () => {  };
    
    onPopupEvent = (eventName, index) => {
        if (eventName !== 'itemSelected') return ;
        if (index === 0) this.goProfile() ;
        else this.goSettings() ;
    };

    selectJob = async(jobId) =>
    {
        await this.props.store.setAJob(jobId) ;
        Actions.accept({jobId: jobId}) ;

    };

    selectPendingJob = async(jobId,status) =>
    {
        await this.props.store.setAJob(jobId) ;
        
        if(status == 3)
        {
            Actions.startJob() ;
        }else
        {
            Actions.endJob() ;
        }
        
    };

    selectCompletedJob = async(jobId) =>
    {
        await this.props.store.setAJob(jobId) ;
        Actions.completedJob({jobId: jobId}) ;

    };
    renderNetworkFailed()
    {
        if(this.state.failed)
        {
            //this.setState({showToast:true}) ;
            return(
                <View style={{paddingTop:100, alignItems:'center'}}>
                    <Thumbnail square size={100} source={networkfailed} style={{alignSelf:'center', marginBottom:10}} />
                    <Button warning onPress={() => {
                    this.setState({failed:false, loading:true});
                    this._getJobs();
                        }   
                    } style={{alignSelf:'center'}}>
                        <Icon name="refresh" style={{ marginRight:5}}/>
                        Reload
                    </Button>
                </View>
            )
        }
    }
    renderTab()
    {
        if(this.state.loading)
        {
            //this.setState({showToast:true}) ;
            return(
                <View style={{paddingTop:100}}>
                    <H3 style={[generalStyles.headerText1, {alignSelf:'center'}]}>Loading...</H3>
                </View>
            )
        }else if(this.state.ready)
        {
            //const jobs = this.state.jobs ;
            this._showJobScheduleNotification() ;
            const jobs = this.props.store.jobs ;

            return(
                <Content theme={myTheme}>
                    <Tabs >
                        <TabOne tabLabel='New Jobs' jobs={jobs} selectHandler={this.selectJob.bind(this)} />
                        <TabTwo tabLabel='Pending Jobs' jobs={jobs} selectPendingHandler={this.selectPendingJob.bind(this)} />
                        <TabThree tabLabel='Job History' jobs={jobs} selectCompletedHandler={this.selectCompletedJob.bind(this)}/>
                    </Tabs>
                </Content>    
            )
        }
    }

    render()
    {
        //const goBack = () => Actions.pop() ;
        //const jobs = this.state.jobs ;
        /*
        const showToast = ()=>{
            ToastAndroid.show('use home button to exit app', ToastAndroid.SHORT) ;
            return true ;
        }
        */
        return (

        <Container style={{backgroundColor:'#686868'}}>

            <View style={{backgroundColor:'rgba(247, 157, 60, 0.7)', flexDirection:'row'}}>


                <H2 style={[generalStyles.headerText2,{flex:5}]}>Kitulu</H2>
                <Button transparent onPress={() => {
                    this.setState({failed:false,ready:false, loading:true});
                    this._getJobs();
                }}>
                    <Icon name="refresh" color={'white'} size={24}
                          style={{marginBottom : 4}} />
                </Button>
                <AndroidPopupMenu actions={['Profile', 'Settings']} onPress={this.onPopupEvent} />

            </View>
            <Content theme={myTheme}>
                {this.renderNetworkFailed()}
                {this.renderTab()}
                
                {/* Popup component */}
                <Popup ref={ popup => this.popup = popup} />
                

               
            </Content>

            
        </Container>



        )
    }
}
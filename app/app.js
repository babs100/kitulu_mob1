import React, {Component} from 'react' ;
import {Router, Scene, ActionConst, Reducer} from 'react-native-router-flux' ;

import Splashscreen from './components/splashscreen/splashscreen.js' ;
import Login from './components/login/login.js' ;
import Home from './components/home/home.js' ;
import Profile from './components/profile/profile.js' ;
import AcceptJob from './components/service/acceptJob.js' ;
import StartJob from './components/service/startJob.js' ;
import EndJob from './components/service/endJob.js' ;
import CompletedJob from './components/service/completedJob.js' ;
//import {jobs, setJobs, modifyJob, getJob, getJobs} from './model/reactive/job.js' ;
import store from './model/mobx/job.js' ;
import {Actions} from 'react-native-router-flux' ;
import {ToastAndroid} from 'react-native' ;
export default class App extends Component
{
    render()
    {
        const backAndroidPressed = () =>
        {
            try {
                // pop a scene if there is any and stay in the app
                Actions.pop();
                return true;
            }catch (error)
            {
                ToastAndroid.show('press home button to exit app', ToastAndroid.SHORT) ;
                return true ; //stay in the app if no scene to pop i.e on the first scene
            }
        };
        return(
            
            <Router store={store} backAndroidHandler={()=> backAndroidPressed()} >
                <Scene key="root" hideNavBar >

                    <Scene key="splash" component={Splashscreen}  initial={true}   />
                    <Scene key="login" component={Login}   />
                    <Scene key="home" component={Home}  />
                    <Scene key="accept" component={AcceptJob}   />
                    <Scene key="startJob" component={StartJob}   />
                    <Scene key="endJob" component={EndJob}   />
                    <Scene key="completedJob" component={CompletedJob}   />
                    <Scene key="profile" component={Profile}   />
                </Scene>
            </Router>
        );
    }
}
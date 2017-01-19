import React, {Component, PropTypes} from 'react' ;
import {Image, AsyncStorage} from 'react-native' ;
import {Actions, ActionConst} from 'react-native-router-flux' ;
import {Container,H3} from 'native-base';
//import Store from 'react-native-store' ;

const splashImage = require('../../../images/splashsceen.png') ;
//const jobs =  Store.model('jobs') ;
/*

const DB = {
    'user' : Store.model('user') ,
    'jobs' : Store.model('jobs')
} ;
*/
const jobs = [
    {
        'jobId' : '2143614401',
        'type' : 1,
        'customer': 'Babatunde Olajide',
        'address' : '2, Adeola Odeku,VI, Lagos' ,
        'title' : 'General Cleaning',
        'amount': 7500,
        'status' : 0,
        'startDate' : '2016-12-24',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 10:00'
    },
    {
        'jobId' : '2143614411',
        'type' : 1,
        'customer': 'Seun Osewa',
        'address' : '3, Ojo Road, Ajegunle, Lagos' ,
        'title' : 'General Cleaning',
        'amount': 7500,
        'status' : 0,
        'startDate' : '2016-12-26',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 10:00'
    },
    {
        'jobId' : '2143614421',
        'type' : 2,
        'customer': 'Adewale  Kuti',
        'address' : '3, Ojuwoye Rd, Mushin, Lagos' ,
        'title' : 'Driving',
        'amount': 6500,
        'status' : 0,
        'startDate' : '2016-12-19',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 09:00'
    },
    {
        'jobId' : '2143614651',
        'type' : 2,
        'customer': 'Ogechi Philips',
        'address' : '3, Ojuwoye Rd, Mushin, Lagos' ,
        'title' : 'Driving',
        'amount': 4000,
        'status' : 0,
        'startDate' : '2016-12-24',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 10:00'
    },
    {
        'jobId' : '2143614651',
        'type' : 3,
        'customer': 'Musa Ciroma',
        'address' : '7, Ojuwoye Rd, Mushin, Lagos' ,
        'title' : 'Math Tutor',
        'amount': 3000,
        'status' : 0,
        'startDate' : '2016-12-15',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 12:00'
    },
    {
        'jobId' : '2143614671',
        'customer': 'Muhammadu Buhari',
        'type' : 3,
        'address' : '7, Odo street , Obalende,  Lagos' ,
        'title' : 'English Tutor',
        'amount': 5000,
        'status' : 0,
        'startDate' : '2016-12-29',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 13:00'
    },

    {
        'jobId' : '2143614691',
        'type' : 3,
        'customer': 'Akin Akinade',
        'address' : '71, Palm Avenue , Mushin,  Lagos' ,
        'title' : 'Biology Tutor',
        'amount': 3000,
        'status' : 0,
        'startDate' : '2016-12-24',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 10:00'
    },

    {
        'jobId' : '2143614695',
        'type' : 3,
        'address' : '3, Herbert Macaulay , Yaba,  Lagos' ,
        'title' : 'Math Tutor',
        'amount': 3000,
        'status' : 0,
        'startDate' : '2016-12-24',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-15 10:00'
    },
    {
        'jobId' : '2143614693',
        'type' : 4,
        'customer': 'Afis Garuba',
        'address' : '13, Idowu Taylor , VI,  Lagos' ,
        'title' : 'Painting',
        'amount': 8000,
        'status' : 0,
        'startDate' : '2016-12-22',
        'startCode' : '',
        'endCode' : '',
        'createdAt' : '2016-12-13 08:00'
    }
] ;

const users = [
    {
        'email' : 'obabs78@gmail.com',
        'password' : 'babs100',
        'name' : 'Babatunde Olajide',
        'gender' : 'Male',
        'image' : 'profile/prof.jpg'
    },
    {
        'email' : 'kitulu@kitulu.com',
        'password' : 'kitulu',
        'name' : 'Kitulu Limited',
        'gender' : 'Female',
        'image' : 'profile/kitulu.png'
    }
] ;
const STORAGE_KEY = '@kitulu:jobs';
export default class Splashscreen extends Component
{

    constructor(props)
    {
        super(props) ;
        this.state = {
            jobsCount : 0
        }
    }

    static propTypes = {
        //setJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };

    
    
     goLogin()
    {
        //Actions.login({type:ActionConst.REPLACE}) ;
        Actions.login({type:'reset'}) ;
    }

    bootstrapData()
    {
        /*
        jobs.map(job => (
            DB.jobs.add(job)
        )) ;
        DB.user.add(user) ;
        */
    }

    _bootstrapInitialState = async() =>
    {
        var joblist = await AsyncStorage.getItem(STORAGE_KEY) ;
        //this.props.setJobs(jobs) ;
        this.props.store.setJobs(jobs) ;
        //this.props.store.setUsers(users) ;
        //this.props.store.setUser('obabs78@gmail.com','babs100') ;
        if(joblist === null)
        {
            try{
                await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(jobs)) ;
            }catch (error)
            {

            }
            /*
            try{
                await AsyncStorage.setItem('@kitulu:users', JSON.stringify(users)) ;
            }catch (error)
            {

            }
            */
        }
    };

    componentDidMount()
    {
        
       // this._bootstrapInitialState() ;
        setTimeout(() => {
            this.goLogin() ;
        }, 4000);
    }

    render()
    {
        return (
            <Container>
                <Image source={splashImage} style={{ flex:1, height:null, width:null}} />
            </Container>

        )
    }
}
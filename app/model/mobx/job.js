import {reaction, observable, observe, computed, autorun} from 'mobx';
import autobind from 'autobind-decorator' ;
import {_} from 'lodash' ;
//import {axios} from 'axios';
//import fetch from 'react-native' ;
const API_URL = 'http://www.simitime.com/' ;
const BASE_URL = 'http://www.simitime.com/api/v1/' ;
//var TOKEN = '' ;
var axios = require('axios');
@autobind
class JobStore {

    @observable jobs = [] ;
    @observable job = {} ;
    @observable token = '' ;
    //@observable isLoading = true;
    @observable response = '' ;
    @observable user = {};
    API_BASE_URL = 'http://www.simitime.com/api/v1/' ;
    API = axios.create(
        {
            baseURL:BASE_URL,
            timeout:2000,
            headers: {
                'Authorization' : 'Bearer ' + this.token 
            }
            
        }
    );


   
    setToken(token)
    {
        this.token = token ;
    }
    setJobs(jobs)
    {
        this.jobs = jobs ;
    }

    setUser(user)
    {
        this.user = user ;
    }

    startJob(id, date)
    {
        this.jobs.map((j) =>
        {
            if(j.jobId == id)
            {
                j.status = 4 ;
                j.dateStarted = date;
            }

        })
    }

    endJob(id,date)
    {
        this.jobs.map((j) =>
        {
            if(j.jobId == id)
            {

                j.status = 5 ; // end status
                j.dateCompleted = date ;
            }

        })
    }

    expireJob(id)
    {
        this.jobs.map((j) =>
        {
            if(j.jobId == id)
            {

                j.status = 8 ; // expire status
            }

        })
    }


    setAJob(id)
    {
        this.jobs.forEach((j) =>
        {
            if(j.jobId == id)
            {
                this.job = j ;
            }

        })
    }

    acceptJob(id)
    {
        this.jobs.map((j) =>
        {
            if(j.jobId == id)
            {
                j.status = 3 ; //pending status
            }

        })
    }

    rejectJob(id)
    {
        this.jobs.map((j) =>
        {
            if(j.jobId == id)
            {
                j.status = 2 ; //rejected status
            }

        })
    }
  
   
    

   
    modifyJob(job)
    {
        this.jobs.map((j,i) =>
        {
            if(j.jobId == job.jobId)
                this.jobs[i] = job ;
        })
    }




}

export default new JobStore() ;
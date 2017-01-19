import React, { Component,PropTypes } from 'react';
import numbro from 'numbro' ;
import {Actions} from 'react-native-router-flux' ;

import { Container, Content, H3,View,Icon, List, ListItem, Thumbnail,Text } from 'native-base';
import generalStyles from './../../styles/generalStyle.js' ;

// Job Types: cleaner=1, driver=2, tutor=3, painter=4
const cleaningThumb =  require('../../thumbnails/cleaning.png') ;
const drivingThumb =  require('../../thumbnails/driving.png') ;
const tutorThumb =  require('../../thumbnails/teaching.png') ;
const paintingThumb =  require('../../thumbnails/painting.png') ;
const otherThumb =  require('../../thumbnails/other.png') ;

var moment = require('moment') ;

export default class TabTwo extends Component {

    constructor(props)
    {
        super(props) ;

    }

    static propTypes = {
        //jobs:  PropTypes.arrayOf(PropTypes.object).isRequired
        jobs:  PropTypes.any,
        //job:  PropTypes.any.isRequired,
        selectPendingHandler:PropTypes.func.isRequired
    };


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

    /*
     selectJob(jobId)
     {
     this.props.store.setAJob(jobId) ;
     Actions.accept({jobId: jobId}) ;
     }
     */

    renderList()
    {
        const self = this ;
        /*
         const goAccept = (jobId) =>{
         Actions.accept({jobId: jobId}) ;
         } ;
         */
        let alljobs = this.props.jobs ;
        let pendingJobs = [] ;
        if(alljobs.length > 0)
        {
            pendingJobs = alljobs.filter(job => job.status === 3 || job.status === 4) ;
        }
        //const pendingJobs = this.props.jobs.filter(job => job.status === 1) ;
        if(pendingJobs.length < 1 || pendingJobs == undefined)
        {
            return (
                <View style={generalStyles.emptyTab}>
                    <Text style={{alignSelf:'center'}}>No Pending jobs available.</Text>
                </View>
            ) ;
        }

        return (

            <List>
                {
                    pendingJobs.map((job,i) => (
                        <ListItem key={job.jobId} button onPress={() => this.props.selectPendingHandler(job.jobId, job.status)}>
                            <Thumbnail  square size={80} source={self.thumb(job.type)}/>
                            <Text>{job.title}</Text>
                            <Text note>{job.address}</Text>
                            <Text note>{ 'N' + numbro(job.amount).format('0,0')}</Text>
                            <Text note>{moment(job.startDate).format('dddd MMM Do, YYYY.') }</Text>
                        </ListItem>
                    ))
                }
            </List>
        )
    }

    render()
    {
        return (
            <Container style={{backgroundColor:'rgb(248, 248, 248)'}}>
                <Content>
                    {this.renderList()}
                </Content>
            </Container>
        );

    }
}
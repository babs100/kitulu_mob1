import React, { Component,PropTypes } from 'react';
import numbro from 'numbro' ;
import {Actions} from 'react-native-router-flux' ;

import { Container, Content, H3,View,Icon, List, ListItem, Thumbnail,Text } from 'native-base';

import generalStyles from './../../styles/generalStyle.js' ;
const checkThumb =  require('../../thumbnails/check.png') ;


var moment = require('moment') ;

export default class TabThree extends Component {

    constructor(props)
    {
        super(props) ;

    }

    static propTypes = {
        //jobs:  PropTypes.arrayOf(PropTypes.object).isRequired
        jobs:  PropTypes.any,
        //job:  PropTypes.any.isRequired,
        selectCompletedHandler:PropTypes.func.isRequired
    };




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
        let finishedJobs = [] ;
        if(alljobs.length > 0)
        {
            finishedJobs = alljobs.filter(job => job.status === 5) ;
        }

        if(finishedJobs.length < 1 || finishedJobs == undefined)
        {
            return (
                <View style={generalStyles.emptyTab}>
                    <Text style={{alignSelf:'center'}}>No Finished jobs available.</Text>
                </View>
            ) ;
        }

        return (

            <List>
                {
                    finishedJobs.map((job,i) => (
                        <ListItem key={job.jobId} button onPress={() => this.props.selectCompletedHandler(job.jobId)} >
                            <Thumbnail  square size={80} source={checkThumb}/>
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
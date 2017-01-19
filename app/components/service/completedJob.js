import React, {Component, PropTypes} from 'react' ;
import {Container,Content,Thumbnail,Header,Title, H3,H2, View, Tabs, Button,InputGroup, Input,Text} from 'native-base';
import {Actions, ActionConst} from 'react-native-router-flux' ;
import {Alert} from 'react-native' ;
import { TouchableOpacity } from 'react-native'
import numbro from 'numbro' ;
import Icon from 'react-native-vector-icons/MaterialIcons' ;
import {_} from 'lodash' ;
//import { AsyncStorage} from 'react-native' ;

//import styles from './styles.js' ;
import myTheme from '../../../myThemes/light.js';
import generalStyles from './../../styles/generalStyle.js' ;
import Popup from 'react-native-popup' ;

import AndroidPopupMenu from '../popupmenu/AndroidPopupMenu.js' ;

const STORAGE_KEY = '@kitulu:jobs';

const checkThumb =  require('../../thumbnails/check.png') ;

var moment = require('moment-timezone') ;
/*
moment.fn.minutesFromNow = function() {
    var r = Math.floor((+new Date() - (+this))/60000);
    return r + ' min' + ((r===1) ? '' : 's') + ' ago';
};
*/
//moment.unix(d).minutesFromNow();
export default class completedJob extends Component
{

    constructor(props)
    {
        super(props) ;
        //const jobId = this.props.jobId;



    }

    static propTypes = {
        //getJobs:  PropTypes.any.isRequired
        store:  PropTypes.any.isRequired
    };


    
    
    renderJob()
    {
        //const jobId = this.props.jobId ;
        //const jobs = this.props.store.jobs ;
        const job = this.props.store.job ;
        const goBack = () =>
        {
            //Actions.refresh({key:'home'});
            //Actions.home() ;
            Actions.pop() ;
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
                        
                        <H3 style={generalStyles.navBarTitle}>Completed Job</H3>


                    </View>
                    <Content >
                        <View style={{marginTop:20, padding:10}}>
                            <Thumbnail square size={100} source={checkThumb} style={{alignSelf:'center', marginBottom:10}} />

                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>JOB TITLE :</Text>
                            <Text style={generalStyles.fieldValue}>{job.title}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>CUSTOMER :</Text>
                            <Text style={generalStyles.fieldValue}>{job.customer}</Text>
                        </View>

                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>ADDRESS :</Text>
                            <Text numberOfLines={2} style={generalStyles.fieldValue}>{job.address}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>DATE :</Text>
                            <Text style={generalStyles.fieldValue}>{moment(job.startDate).format('dddd MMM Do, YYYY.')}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>AMOUNT :</Text>
                            <Text style={generalStyles.fieldValue}>{'N' + numbro(job.amount).format('0,0')}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>START :</Text>
                            <Text style={generalStyles.fieldValue}>{moment(job.dateStarted).format('h:mm A on ddd MMM Do, YYYY.')}</Text>
                        </View>
                        <View style={generalStyles.textView1}>
                            <Text style={generalStyles.fieldTitle}>END :</Text>
                            <Text style={generalStyles.fieldValue}>{moment(job.dateCompleted).format('h:mm A on ddd MMM Do, YYYY.')}</Text>
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
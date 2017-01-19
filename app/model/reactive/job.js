//const Atom = require('kefir.atom')  ;
import Atom from 'kefir.atom' ;
export const jobs = Atom([{x:1},{x:2}]).log('jobs') ;

export function setJobs(thejobs)
{
    jobs.set(thejobs) ;
}

export function getJobs() {
    return jobs ;
}
export function modifyJob(index,newJob )
{
    const oldJob = jobs.view(index) ;
    oldJob.modify( j => newJob);
}

export function getJob(index) {
    return jobs.view(index) ;
}
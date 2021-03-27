import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Navigator from './routes/homeStack';
import EnterCode from './components/entercode';
import EnterNic from './components/enternic';
import EnterAccount from './components/enteraccount';
import Welcomeback from './components/welback';
import GetStart from './components/getstarted';
import WantTo from './components/wantto';
import Bio from './components/bio';
import Home from './components/home';
import Services from './components/services';
import AvailableJobs from './components/availjobs';
import Profile from './components/profile';
import JobsDone from './components/jobsdone';
import BookingDetails from './components/bookingdetails';
import JobsinProgress from './components/jobsinprogress';
import Bids from './components/bids';
import BidDetails from './components/biddetails';

import Providers from './navigation';

export default function App() {
  return (
    // <EnterAccount/>
    // <GetStart/>
    // <Navigator />
    // <EnterCode />
    // <EnterNic/>
    // <Welcomeback/>
    // <WantTo/>
    // <Bio/>
    // <Home/>
    // <Services/>
    // <AvailableJobs/>
    // <Profile />
    // <JobsDone />
    // <BookingDetails />
    // <JobsinProgress />
    // <Bids />
    <BidDetails />
  );
  // return <Providers />;
}

// const styles = StyleSheet.create({});

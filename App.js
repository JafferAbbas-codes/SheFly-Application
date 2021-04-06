import React from 'react';
import {store} from './redux/configureStore.js';
// import {StyleSheet, View, Text} from 'react-native';
// import Navigator from './routes/homeStack';
// import EnterCode from './components/entercode';
// import EnterNic from './components/enternic';
// import EnterAccount from './components/enteraccount';
// import Welcomeback from './components/welback';
// import GetStart from './components/getstarted';
// import WantTo from './components/wantto';
// import Bio from './components/bio';
// import Home from './components/home';
// import Services from './components/services';
// import AvailableJobs from './components/availjobs';
// import Profile from './components/profile';
// import JobsDone from './components/jobsdone';
// import BookingDetails from './components/bookingdetails';
// import JobsinProgress from './components/jobsinprogress';
// import Bids from './components/bids';
import BidDetails from './screens/seller/biddetails';
// import AllServices from './screens/buyer/allServices';
// import BidAccepted from './screens/buyer/bidaccepted';
// import DrawerContent from './screens/buyer/DrawerContent';
// import feedback from './screens/buyer/feedback';
// import SellerProfileforBuyer from './screens/buyer/sellerprofileforbuyer';
// import BidDetails from './screens/buyer/biddetails';
// import ServiceSeller from './screens/buyer/ServiceSeller';
// import BuyerHome from './screens/buyer/Home';
// import BuyerRequests from './screens/buyer/BuyerRequests';
import RequestDetails from './screens/buyer/RequestDetails';

import Providers from './navigation';
// import BuyerRequests from './screens/buyer/BuyerRequests.js';

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
    // <BuyerHome />
    // <AllServices />
    // <BidAccepted />
    // <DrawerContent />
    // < feedback />
    // <SellerProfileforBuyer />
    // <BuyerRequests />
    // <BidDetails />
    // <RequestDetails />
  );
  // return <Providers store={store} />;
}

// const styles = StyleSheet.create({});

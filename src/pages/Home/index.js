import { Card,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from '@material-tailwind/react'
import React, { useEffect } from 'react'
import TotalCard from '../../components/TotalCard'
import GroupIcon from '@mui/icons-material/Group';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import RevenueCard from '../../components/RevenueCard';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { db } from '../../firebase';
import All from './All';
import Ordinary from './Ordinary';
import VIP from './VIP';

function Home() {
  const [totalTickets, setTotalTickets] = React.useState([])
  const [ordinaryTickets, setOrdinaryTickets] = React.useState([])
  const [vipTickets, setVIPTickets] = React.useState([])
  
  const [totalTicketsRevenue, setTotalTicketsRevenue] = React.useState(0)
  const [ordinaryTicketsRevenue, setOrdinaryTicketsRevenue] = React.useState(0)
  const [vipTicketsRevenue, setVIPTicketsRevenue] = React.useState(0)

  useEffect(() => {
    const unsubscribe = db.collection('registration').onSnapshot((snapshot) => {
      const ticketData = snapshot.docs.map((doc) => doc.data());
      setTotalTickets(ticketData);

      // Calculate the total amount
      const total = ticketData.reduce((acc, doc) => acc + doc.amount, 0);
      setTotalTicketsRevenue(total);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);



  useEffect(() => {
    const unsubscribe = db.collection('registration').where("type" ,"==", "Ordinary").onSnapshot((snapshot) => {
      const ticketData = snapshot.docs.map((doc) => doc.data());
      setOrdinaryTickets(ticketData);

      // Calculate the total amount
      const total = ticketData.reduce((acc, doc) => acc + doc.amount, 0);
      setOrdinaryTicketsRevenue(total);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = db.collection('registration').where("type" ,"==", "VIP").onSnapshot((snapshot) => {
      const ticketData = snapshot.docs.map((doc) => doc.data());
      setVIPTickets(ticketData);

      // Calculate the total amount
      const total = ticketData.reduce((acc, doc) => acc + doc.amount, 0);
      setVIPTicketsRevenue(total);
    });

    return () => {
      // Unsubscribe from the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);



  React.useEffect(() => {
    db.collection('registration').where("type" ,"==", "VIP").onSnapshot((snapshot) => {
      setVIPTickets(snapshot.docs.map((doc) => doc.data()))
    })
  }, [])


  return (
    <Card className='home'>
    {/** TotalCards */}
      <div className='cards'>
         <TotalCard title='Total Registered Tickets' number={totalTickets.length} icon={GroupIcon} />
         <TotalCard title='Total Ordinary Tickets' number={ordinaryTickets.length} icon={ConfirmationNumberIcon} />
         <TotalCard title='Total VIP Tickets' number={vipTickets.length} icon={SupervisedUserCircleIcon} />
      </div>

      <div className='cards'>
      <RevenueCard title='Tickets Revenue' number={totalTicketsRevenue} icon={CurrencyExchangeIcon} />
      <RevenueCard title='Ordinary Tickets Revenue' number={ordinaryTicketsRevenue} icon={CurrencyExchangeIcon} />
      <RevenueCard title='VIP Tickets Revenue' number={vipTicketsRevenue} icon={CurrencyExchangeIcon} />
   </div>

    {/** Tabs */}
    <Tabs style={{marginTop:15}} id="custom-animation" value={0}>
    <TabsHeader>
    <Tab key={0} value={0}>
    All Tickets
  </Tab>
  <Tab key={1} value={1}>
  Ordinary Tickets
</Tab>
<Tab key={2} value={2}>
VIP Tickets
</Tab>
    </TabsHeader>
    <TabsBody
    animate={{
      initial: { y: 250 },
      mount: { y: 0 },
      unmount: { y: 250 },
    }}
    style={{background:'#fff', borderRadius:10}}
    >
    <TabPanel key={0} value={0}>
      <All />
    </TabPanel>
    <TabPanel key={1} value={1}>
    <Ordinary />
  </TabPanel>
  <TabPanel key={2} value={2}>
  <VIP />
</TabPanel>
    </TabsBody>
    </Tabs>
    </Card>
  )
}

export default Home
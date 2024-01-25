import {  Layout } from 'antd';
import SideBar from '../components/SideBar';
import HeaderItem from '../components/HeaderItem';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { useDispatch, useSelector} from 'react-redux';

import { useGetEhsasTelegramNewsQuery } from '../query/Charts';
import { useLocation } from 'react-router-dom/dist';
import { useHomeQuery } from '../query/Auth/AuthSlice';

const { Header,  Content } = Layout;


function DashboardPage() {
  const {data : userAuth  , isLoading : loadingAuth , error  , isError , status} = useHomeQuery('name',)

  const [collapsed , setCollapsed] = useState(false);
  
  const navigate = useNavigate()
  
  
  
  
  
 
  

  // const token = useSelector(state=> state.auth.access)
  const token = localStorage.getItem('access')


  useEffect(()=> {
    if(!token || error?.status === 401){
     
      navigate('/login')
    }
  })
 

  const [value , setValue] = useState(1)

  const path = useLocation()


 
  return (
    <Layout>
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout style={{maxWidth: "100vw"} }>
        <Header className='bg-yellow-500 shadow-xl h-10'><HeaderItem collapsed={collapsed} setCollapsed={setCollapsed} /></Header>
        <Content style={{backgroundColor : '#fafafa'}} >
          
          <Outlet/>
        </Content>
      </Layout>   
    </Layout>
  )
}

export default DashboardPage
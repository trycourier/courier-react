import React, { useState } from 'react'
import { Container, Tab } from './styled';

function TabBar({ style = {} }) {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <Container style={style}>
      <Tab  className={activeTab === 0 ? 'active' : ''} onClick={() => setActiveTab(0)}>Unread</Tab>
      <Tab className={activeTab === 1 ? 'active' : ''}  onClick={() => setActiveTab(1)}>All notifications</Tab>
    </Container>
  )
}

export default TabBar

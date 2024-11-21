import React from 'react';
import Sidebar from './FilterBar';
import Top from './Top';
import Card from './Card';

const Home = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className="flex-1 p-4 ml-2">
        <Top />
        <Card />
      </div>
    </div>
  );
}

export default Home;

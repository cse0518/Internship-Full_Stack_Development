import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from '../components/Layout';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Contents from '../components/Contents';

const App = () => {
  return (
      <div
          style={{
            display: 'flex',
            flex: 1
          }}
      >
        <Sidebar/>
        <Layout>
          <Header/>
          <Contents/>
        </Layout>
      </div>
  );
};
export default App;

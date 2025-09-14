import React from 'react';
import Nav from './Nav';
import { Outlet } from 'react-router';

    function App() {
      return (
        <div id='app'>
          <nav>
            <Nav/>
          </nav>
          <main>
            <Outlet/>
          </main>
        </div>
      );
    }

    export default App;
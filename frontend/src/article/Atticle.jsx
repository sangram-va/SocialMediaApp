import React, { useState, useContext } from 'react';
import { ContextApi } from '../Context/Context'; 
import { FaTimes } from 'react-icons/fa';
import GetArticles from './GetArticles'; 
import SideNavBar from '../sidenav/SideNavBar';

const Article = () => {
  const [isSideNavVisible, setIsSideNavVisible] = useState(false);
  const { loggedUser } = useContext(ContextApi); 

  const toggleSideNav = () => {
    setIsSideNavVisible(!isSideNavVisible);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div 
        style={{
          width: isSideNavVisible ? '300px' : '0',
          transition: 'width 0.3s ease-in-out',
          overflow: 'hidden',
          background: 'linear-gradient(45deg, #3b8d99, #6bdbdb)', 
          color: 'white',
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 1,
          paddingTop: '50px',
          paddingLeft: '20px',
          paddingRight: '20px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 0px 6px rgba(0, 0, 0, 0.1)' 
        }}
      >
        <div style={{display:`${isSideNavVisible?"block":"none"}`}}>
          <SideNavBar></SideNavBar>
        </div>
        {/* Close Button */}
        {isSideNavVisible && (
          <button
            style={{
              backgroundColor: '#e74c3c', 
              color: 'white',
              fontSize: '30px',
              border: 'none',
              padding: '12px 15px',
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              zIndex: 1,
              borderRadius: '50%',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s ease'
            }}
            onClick={toggleSideNav}
          >
            <FaTimes size={30} />
          </button>
        )}
      </div>

      <div 
        style={{
          flexGrow: 1,
          marginLeft: isSideNavVisible ? '300px' : '0',
          transition: 'margin-left 0.3s ease-in-out',
          padding: '20px',
          backgroundColor: '#f4f4f9'
        }}
      >
        {!isSideNavVisible && (
          <button
            onClick={toggleSideNav}
            style={{
              backgroundColor: '#333',
              color: 'white',
              fontSize: '22px',
              border: 'none',
              padding: '5px 10px',
              position: 'fixed',
              top: '0px',
              left: '0px',
              cursor: 'pointer',
              zIndex: 1,
              transition: 'background-color 0.3s ease'
            }}
          >
            ☰
          </button>
        )}

        <GetArticles />
      </div>
    </div>
  );
};

export default Article;

import React from 'react';
import logo from '../../assets/img/logo.svg';
import Container from 'rsuite/Container';
import Header from 'rsuite/Header';
import Content from 'rsuite/Content';
import Footer from 'rsuite/Footer';
import './Popup.css';
import Welcome from './screens/welcome';
import TyyprPage from './screens/tyyprPage';
import OwnerPage from './screens/ownerPage';


const Popup = () => {
  const [currentScreen, setCurrentScreen] = React.useState('welcome');

  const changeScreen = (scr) => {
    setCurrentScreen(scr);
  }

  return (
    <div className="App">
      {currentScreen == 'welcome' ? <Welcome changeScreen={changeScreen} /> : currentScreen == 'owner' ? <OwnerPage changeScreen={changeScreen} /> : currentScreen == 'tyypr' ? <TyyprPage changeScreen={changeScreen} /> : <></>}

    </div>
  );
};

export default Popup;

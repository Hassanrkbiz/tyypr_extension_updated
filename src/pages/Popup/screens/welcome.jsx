import React from 'react';
import { Container, Stack, Header, Content, Footer } from 'rsuite';
import '../Popup.css';
import owner from '../../../assets/img/owner..png';
import tyypr from '../../../assets/img/tyypr..png';
import tyypr1 from '../../../assets/img/tyypr.svg';

const Welcome = ({ changeScreen }) => {
  return (
    <div className="App">
      <Container>
        <Header className="centralize mt-6">
          <p className="mb-3 text-[16px]">welcome to</p>
          <div className="">
            <img src={tyypr1} width={'25%'} />
          </div>
          <p className="mt-6 mb-3 text-[13px]">are you on OnlyFans page</p>
        </Header>
        <Content className="flex flex-row justify-evenly mt-[3rem] mb-[1.6rem]">
          <div className="w-[8.5rem]">
            <div onClick={() => {changeScreen('owner')}} className="w-full border-2 border-[#1a1919] hover:border-[#d8e91a86] bg-[#1a1919] rounded-lg h-[4.25rem] centralize cursor-pointer">
              <img src={owner} className={'mt-[1.55rem]'} />
            </div>
            <div className='mt-3 text-[10px] leading-3'>
              <p>creator / agency</p>
              <p>main account</p>
            </div>
          </div>
          <div>
            <p className='text-[1.25rem] mt-4'>or</p>
          </div>
          <div className="w-[8.5rem]">
            <div onClick={() => {changeScreen('tyypr')}} className="w-full border-2 border-[#1a1919] hover:border-[#d8e91a86] bg-[#1a1919]  rounded-lg h-[4.25rem] centralize cursor-pointer">
              <img src={tyypr} className={'mt-5'} />
            </div>
            <div className='mt-3 text-[10px] leading-3'>
              <p>manager / chatter</p>
              <p>sub account</p>
            </div>
          </div>
        </Content>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default Welcome;

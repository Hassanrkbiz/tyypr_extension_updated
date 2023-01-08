import React from 'react';
import { Container, Stack, Header, Content, Footer, Input, Button } from 'rsuite';
import '../Popup.css';
import owner from '../../../assets/img/owner..png';
import tyypr from '../../../assets/img/tyypr..png';
import tyypr1 from '../../../assets/img/tyypr.svg';

const OwnerPage = ({ changeScreen }) => {
  const [count, setCount] = React.useState(1);
  const [price, setPrice] = React.useState(25);

  const addPage = () => {
    setCount(count + 1);
    setPrice(price + 25);
    console.log('addPages',count, price);
  };

  const pagesInput = () => {
    console.log('pagesInput');
    var pagesI = [];
    for (let i = 0; i < count; i++) {
      pagesI.push(
        <div className="flex flex-row w-full justify-center items-center mb-3">
          <div className="w-[5.5rem]">
            <p className="text-[0.95rem]">page</p>
          </div>
          <div>
            <Input
              placeholder="onlyfans/page"
              className="border-[#222222] bg-[#222222] w-[15rem] inputSetup"
            />
          </div>
        </div>
      );
    }
    return pagesI;
  };
  return (
    <div className="App">
      <Container>
        <Header className="mt-6">
          <p className="text-[1.3rem] text-right mr-[3rem]">account</p>
        </Header>
        <Content className="mt-[2rem] mb-[1.6rem]">
          <div className="flex flex-row w-full justify-center items-center mb-3">
            <div className="w-[5.5rem]">
              <img src={tyypr} className={''} />
            </div>
            <div>
              <Input
                placeholder="your email"
                className="border-[#222222] bg-[#222222] w-[15rem] inputSetup"
              />
            </div>
          </div>
          <div className="flex flex-row w-full justify-center items-center mb-3">
            <div className="w-[5.5rem]">
              <p className='text-[0.95rem]'>name</p>
            </div>
            <div>
              <Input
                placeholder="your company name"
                className="border-[#222222] bg-[#222222] w-[15rem] inputSetup"
              />
            </div>
          </div>
          {pagesInput()}
          <div>
            <div className='flex flex-row items-end justify-center'>
                <p className='text-[17.5px] mr-4 ml-[6rem]'>unlimited pages</p>
                <p className='text-[14px] text-[#d8e91a86] cursor-pointer' onClick={addPage}>add page</p>
            </div>
          </div>

          <div className='flex flex-row justify-center mt-4'>
            <p className='text-[1.3rem] ml-[11.5rem] mr-4 self-center'>${price}</p>
            <Button appearance="ghost" className='btnSetup'>Start</Button>
          </div>
        </Content>
        <Footer></Footer>
      </Container>
    </div>
  );
};

export default OwnerPage;

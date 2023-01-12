import React, { useLayoutEffect, useState} from 'react';
import Features from './Features';
import NotesPopup from './NotesPopup';
import ScriptPopup from './ScriptPopup';
import { getResults } from '../Content/modules/request';

const SessionsList = ({
  isShowScriptPopup,
  setShowScriptPopup,
  isShowNotesPopup,
  setShowNotesPopup,
  isShowScriptListModal,
  setShowScriptListModal,
  isShowFeatures,
  setShowFeatures,
}) => {
  const [sessionTime, setSessionTime] = useState('4:35');
  const [unAttendedSession, setUnattendedSession] = useState('4:35');
  const [sales, setSales] = useState(45);
  const [salesCount, setSalesCount] = useState(2);
  const [reactionTime, setReactionTime] = useState('1:35');
  const [earning, setEarning] = useState(45);

  useLayoutEffect(() => {
    starter();
  }, []);

  const starter = async () => {
    try{
      var startDate = await getResults('/api2/v2/users/me/start-date-model');
      startDate = encodeURIComponent(startDate?.startDate);
      var transactions = await getResults(`/api2/v2/payouts/transactions?startDate=${startDate}&marker=1673545272`);
      console.log('transactions', transactions);
      var list = transactions?.list;
      if(list?.length){
        setSalesCount(list.length);
        var salesAmount = getSalesAmount(list);
        setSales(salesAmount);
      } else {
        setSalesCount(0);
        setSales(0);
      }
    } catch (err) {
      console.log(err);
    }


  }

  const getSalesAmount = (list) => {
    var countS = 0;
    for(var li of list){
      countS += li.amount;
    }
    return countS;
  }

  return (
    <>
      <div className="z-1 group relative cursor-pointer border-t border-[#444444]  flex flex-col items-center justify-center">
        <div className="bg-[#202020] z-1 relative py-[10px] w-full">
          <span className="text-[#B6C31F] text-[15px] font-light">{sessionTime}min</span>
          <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
            session time
          </p>
        </div>

        {/* UNATTENDED SESSION  */}
        <div className="transition-all ease-in duration-100 z-[-1] opacity-0  w-[145px]  group-hover:opacity-100 group-hover:right-[155px] bg-black h-[58px] absolute -right-[155px] top-0 w-[114px] flex flex-col items-center justify-center">
          <span className="text-[#B6C31F] text-[15px] font-light ">
            {unAttendedSession}min
          </span>
          <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
            session time
          </p>
        </div>
      </div>
      <div className="border-t border-[#444444] py-[10px]  flex flex-col items-center justify-center">
        <span className="text-[#B6C31F] text-[15px] font-light ">${sales}</span>
        <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
          from {salesCount} sales
        </p>
      </div>
      <div className="border-t border-[#444444] py-[10px]  flex flex-col items-center justify-center">
        <span className="text-[#B6C31F] text-[15px] font-light ">{reactionTime}min</span>
        <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
          reaction time
        </p>
      </div>
      <div className="border-t border-[#444444] py-[10px]  flex flex-col items-center justify-center">
        <span className="text-[#B6C31F] text-[15px] font-light ">${earning}</span>
        <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
          earnings /hr{' '}
        </p>
      </div>
      <div className="cursor-pointer  relative border-t border-[#444444]   flex flex-col items-center justify-center h-[55px]">
        <p
          onClick={() => {
            setShowScriptPopup(!isShowScriptPopup);
            setShowScriptListModal(false);
            setShowNotesPopup(false);
            setShowFeatures(false);
          }}
          className="text-[#9A9A9A] font-light text-[13px] py-[10px] mb-0 w-full"
        >
          scripts{' '}
        </p>
        {isShowScriptPopup && !isShowScriptListModal && (
          <ScriptPopup
            setShowScriptPopup={setShowScriptPopup}
            setShowScriptListModal={setShowScriptListModal}
          />
        )}
      </div>
      <div className="cursor-pointer relative border-t border-[#444444]   flex flex-col items-center justify-center h-[55px]">
        <p
          onClick={() => {
            setShowNotesPopup(!isShowNotesPopup);
            setShowScriptListModal(false);
            setShowFeatures(false);
            setShowScriptPopup(false);
          }}
          className="text-[#9A9A9A] font-light text-[13px] py-[10px] mb-0 w-full"
        >
          notes{' '}
        </p>

        {isShowNotesPopup && (
          <NotesPopup setShowNotesPopup={setShowNotesPopup} />
        )}
      </div>
      <div className="z-1 group relative  cursor-pointer border-t border-[#444444]   flex flex-col items-center justify-center">
        <p className="text-[#9A9A9A] font-light text-[13px] py-[10px] mb-0 w-full  h-[55px] z-[11] relative flex  bg-[#202020] items-center justify-center">
          auto follower{' '}
        </p>

        {/* UNATTENDED SESSION  */}
        <div className="transition-all ease-in duration-100 z-10 opacity-0  group-hover:opacity-100 group-hover:right-[155px] h-[55px] bg-black  absolute -right-[155px] top-0 w-[145px] flex flex-col items-center justify-center">
          <p className="text-[#46759B] font-light text-[13px] mb-0">
            comming soon
          </p>
        </div>
      </div>
      <div className="cursor-pointer border-t border-[#444444]   flex flex-col items-center justify-center">
        <p
          onClick={() => {
            setShowFeatures(!isShowFeatures);
            setShowScriptListModal(false);
            setShowNotesPopup(false);
            setShowScriptPopup(false);
          }}
          className="text-[#9A9A9A] font-light text-[13px] py-4"
        >
          account
        </p>
        {isShowFeatures && <Features />}
      </div>
    </>
  );
};

export default SessionsList;

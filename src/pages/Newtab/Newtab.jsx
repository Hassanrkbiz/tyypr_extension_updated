import React, { useState, useLayoutEffect } from 'react';
import '../../assets/styles/tailwind.css';
import { LeftArrowIcon, RightArrowIcon, TypprLogo } from './Icons';
import './Newtab.css';
import OpenScriptItemModal from './OpenScriptItemModal';
import SessionsList from './SessionsList';
import Features from './Features';
import NotesPopup from './NotesPopup';
import ScriptPopup from './ScriptPopup';
import { getResults } from '../Content/modules/request';
import { getStorageVal } from '../../modules/utils';
import { Store } from '../../modules/variables';

const Newtab = () => {
  const [isSessionEnd, setSessionEnd] = useState(true);
  const [isSidebarShow, setSidebarShow] = useState(true);
  const [isShowScriptPopup, setShowScriptPopup] = useState(false);
  const [isShowNotesPopup, setShowNotesPopup] = useState(false);
  const [isShowScriptListModal, setShowScriptListModal] = useState(false);
  const [isShowFeatures, setShowFeatures] = useState(false);
  const [sessionTime, setSessionTime] = useState('0:00');
  const [unAttendedSession, setUnattendedSession] = useState('4:35');
  const [sales, setSales] = useState('-');
  const [salesCount, setSalesCount] = useState('-');
  const [reactionTime, setReactionTime] = useState('1:35');
  const [earning, setEarning] = useState('-');

  useLayoutEffect(() => {
    starter();
  }, []);

  function handleStatus(e) {
    console.log(e.target.checked);
  }

  const starter = async () => {
    try {
      var sessT = await getStorageVal('sessionTime', '0:00');
      var isSessEnd = await getStorageVal('isSessionEnd', true);
      setSessionEnd(isSessEnd);
      setSessionTime(sessT);
      var startDate = await getResults('/api2/v2/users/me/start-date-model');
      startDate = encodeURIComponent(startDate?.startDate);
      var transactions = await getResults(
        `/api2/v2/payouts/transactions?startDate=${startDate}&marker=1673545272`
      );
      console.log('transactions', transactions);
      var list = transactions?.list;
      if (list?.length) {
        setSalesCount(list.length);
        var salesAmount = getSalesAmount(list);
        setSales(salesAmount);
        setEarning(salesAmount);
      } else {
        setSalesCount(0);
        setSales(0);
        setEarning(0);
      }
    } catch (err) {
      console.log(err);
    }

    var userName = document.querySelectorAll(
      '.b-chat__header__title span.g-user-name'
    );
    console.log('userName', userName);
    var body = document.querySelectorAll('body');
    console.log('body', body);
  };

  const getSalesAmount = (list) => {
    var countS = 0;
    for (var li of list) {
      countS += li.amount;
    }
    return countS;
  };

  function handleReset() {
    setSidebarShow(false);
    setShowScriptPopup(false);
    setShowNotesPopup(false);
    setShowScriptListModal(false);
    setShowFeatures(false);
  }

  const sessionUpdate = () => {
    var sessionVal = isSessionEnd;
    setSessionEnd(sessionVal ? false : true);
    // console.log('sessionVal',sessionVal);
    Store.set({ isSessionEnd: sessionVal ? false : true }, () => {
      startTimer();
    });
  };

  const startTimer = () => {
    setTimeout(async () => {
      var isSessE = await getStorageVal('isSessionEnd', true);
      // console.log('isSessE',isSessE);
      if (!isSessE) {
        formatTime();
        startTimer();
      }
    }, 1000);
  };

  const formatTime = async () => {
    var sessT = await getStorageVal('sessionTime', '0:00');
    var time = sessT.split(':');
    // console.log('time: ', time);
    var timeSec = parseInt(time[1]);
    var timeMin = parseInt(time[0]);
    if (timeSec < 59) {
      timeSec += 1;
    } else {
      timeSec = 0;
      timeMin += 1;
    }
    // console.log(timeMin, timeSec);
    var sessTime = `${timeMin.toString()}:${
      timeSec < 10 ? '0' + timeSec.toString() : timeSec.toString()
    }`;
    // console.log('sessTime: ', sessTime);
    sessT = sessTime;
    Store.set({ sessionTime: sessTime }, () => {
      setSessionTime(sessTime);
    });
  };

  return (
    <>
      <div className="relative">
        {isShowNotesPopup && (
          <div
            onClick={() => setShowNotesPopup(false)}
            className="fixed top-0 left-0 w-full h-full bg-transparent z-9"
          ></div>
        )}{' '}
        {isShowScriptListModal && (
          <div
            onClick={() => setShowScriptListModal(false)}
            className="fixed top-0 left-0 w-full h-full bg-transparent z-9"
          ></div>
        )}{' '}
        {isShowFeatures && (
          <div
            onClick={() => setShowFeatures(false)}
            className="fixed top-0 left-0 w-full h-full bg-transparent z-9"
          ></div>
        )}{' '}
        {isShowScriptListModal
          ? ''
          : isShowScriptPopup && (
              <div
                onClick={() => setShowScriptPopup(false)}
                className="fixed top-0 left-0 w-full h-full bg-transparent z-9"
              ></div>
            )}
        <div
          className="z-10 fixed flex justify-center items-center top-10 right-0 bg-[#202020] rounded-[10px_0px_0px_10px] w-[34px] h-[46px] cursor-pointer"
          onClick={() => setSidebarShow(true)}
        >
          <LeftArrowIcon />
        </div>
        <aside
          className={`${
            isSidebarShow ? 'right-0' : '-right-[155px]'
          } bg-[#202020] rounded-[10px] w-[155px] z-[11] fixed top-2 pt-9 text-center transition-all duration-200 ease-in`}
        >
          <div className="flex justify-end px-3 absolute right-0 top-8 z-[12]">
            <span onClick={() => handleReset()} className="cursor-pointer">
              {' '}
              <RightArrowIcon />
            </span>
          </div>

          <span className="mx-auto flex justify-center">
            <TypprLogo />
          </span>

          <h6 className="text-[#F88AE6] text-[10px] font-bold my-4">
            see stats
          </h6>

          <div className="flex items-center justify-center my-6">
            <span className="text-[#8C8C8C] text-light">status</span>
            <li className="ml-3 list-none">
              <input
                onChange={handleStatus}
                className="tgl tgl-ios"
                id="cb2"
                type="checkbox"
              />
              <label className="tgl-btn" htmlFor="cb2"></label>
            </li>
          </div>

          <button
            className="text-[#b1b1b1] font-bold text-[12px] p-4"
            onClick={() => sessionUpdate()}
          >
            {isSessionEnd ? 'Start Session' : 'End Session'}
          </button>

          <div className="z-1 group relative cursor-pointer border-t border-[#444444]  flex flex-col items-center justify-center">
            <div className="bg-[#202020] z-1 relative py-[10px] w-full">
              <span className="text-[#B6C31F] text-[15px] font-light">
                {sessionTime}min
              </span>
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
            <span className="text-[#B6C31F] text-[15px] font-light ">
              ${sales}
            </span>
            <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
              from {salesCount} sales
            </p>
          </div>
          <div className="border-t border-[#444444] py-[10px]  flex flex-col items-center justify-center">
            <span className="text-[#B6C31F] text-[15px] font-light ">
              {reactionTime}min
            </span>
            <p className="text-[#9A9A9A] font-light text-[13px] mb-0">
              reaction time
            </p>
          </div>
          <div className="border-t border-[#444444] py-[10px]  flex flex-col items-center justify-center">
            <span className="text-[#B6C31F] text-[15px] font-light ">
              ${earning}
            </span>
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
          {isShowScriptListModal && <OpenScriptItemModal />}
          <p className="text-center text-[#9A9A9A] font-light text-[10px]">
            version 1.20
          </p>
        </aside>
      </div>
    </>
  );
};

export default Newtab;

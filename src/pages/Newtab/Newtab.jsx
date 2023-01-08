import React, { useState } from 'react';
import '../../assets/styles/tailwind.css';
import { LeftArrowIcon, RightArrowIcon, TypprLogo } from './Icons';
import './Newtab.css';
import OpenScriptItemModal from './OpenScriptItemModal';
import SessionsList from './SessionsList';

const Newtab = () => {
  const [isSessionEnd, setSessionEnd] = useState(false);
  const [isSidebarShow, setSidebarShow] = useState(true);
  const [isShowScriptPopup, setShowScriptPopup] = useState(false);
  const [isShowNotesPopup, setShowNotesPopup] = useState(false);
  const [isShowScriptListModal, setShowScriptListModal] = useState(false);
  const [isShowFeatures, setShowFeatures] = useState(false);

  function handleStatus(e) {
    console.log(e.target.checked);
  }

  function handleReset() {
    setSidebarShow(false);
    setShowScriptPopup(false);
    setShowNotesPopup(false);
    setShowScriptListModal(false);
    setShowFeatures(false);
  }

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
            onClick={() => setSessionEnd(!isSessionEnd)}
          >
            {isSessionEnd ? 'End Session' : 'Start Session'}
          </button>

          <SessionsList
            isShowScriptPopup={isShowScriptPopup}
            setShowScriptPopup={setShowScriptPopup}
            isShowNotesPopup={isShowNotesPopup}
            setShowNotesPopup={setShowNotesPopup}
            isShowScriptListModal={isShowScriptListModal}
            setShowScriptListModal={setShowScriptListModal}
            setShowFeatures={setShowFeatures}
            isShowFeatures={isShowFeatures}
          />
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

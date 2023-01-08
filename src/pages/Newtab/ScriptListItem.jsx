import React from 'react';
import { useState } from 'react';
import { GreenCheckIcon } from './Icons';

const ScriptListItem = ({ obj, setShowScriptListModal }) => {
  const [isShowCheck, setShowCheck] = useState(false);
  return (
    <>
      <li
        className="text-[#c2c2c2] text-[12px] border-b border-[#444444]  h-[54px] flex items-center px-4 py-2"
        onClick={() => {
          setShowCheck(!isShowCheck);
          setShowScriptListModal(true);
        }}
      >
        {isShowCheck && (
          <span className="mr-1">
            <GreenCheckIcon />
          </span>
        )}

        <span className="truncate">{obj.name}</span>
      </li>
    </>
  );
};

export default ScriptListItem;

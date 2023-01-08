import React from 'react';
import ScriptListItem from './ScriptListItem';

const ScriptPopup = ({ setShowScriptListModal }) => {
  const scritsdata = [
    {
      name: 'Home Alone v2 - Babe are you Text checkbox checkbox',
      checked: false,
    },
    {
      name: 'Netflix & Toys  - Hey big boy Hey big boy',
      checked: false,
    },
    {
      name: 'Ready for a Shower  v1 - Hey bay check one three',
      checked: false,
    },
    {
      name: 'Ready for a Shower  v1 - Hey bay check one three',
      checked: false,
    },
    {
      name: 'Ready for a Shower  v1 - Hey bay check one three',
      checked: false,
    },
  ];
  return (
    <>
      <div className="absolute bottom-0 -left-[249px] w-[250px] bg-[#2B2B2B] z-20 rounded-md">
        <div className="bg-[#161616] text-center py-1 w-full">
          <span className="text-[#6D6D6D] text-[10px]">
            scripts for bloom social page
          </span>
        </div>

        <ul className="mb-0 max-h-[162px] overflow-auto scroll-w-0">
          {scritsdata &&
            scritsdata.length > 0 &&
            scritsdata.map((obj, index) => (
              <ScriptListItem
                obj={obj}
                key={index}
                setShowScriptListModal={setShowScriptListModal}
              />
            ))}
        </ul>

        <div className="py-1 w-full h-[54px] flex items-center px-4">
          <span className="text-[#D8E91A] text-[12px]">
            Upload a sales script
          </span>
        </div>
      </div>
    </>
  );
};

export default ScriptPopup;

import React from 'react';

const Popup = ({
  heading,
  setShowScriptPopup,
  setShowNotesPopup,
  setShowAutoFollowerPopup,
}) => {
  return (
    <>
      <div className="absolute top-0 left-[2px] w-[calc(100%-4px)] bg-[#202020] p-[10px] z-20 border-2 border-[#B6C31F] rounded-md">
        <h4 className="text-[12px] mb-0 text-white">{heading}</h4>
        <input
          className="text-[11px] text-[#8C8C8C] bg-transparent border-b mb-1"
          type="text"
          placeholder="Title..."
        />
        <textarea
          className="text-[12px] text-[#8C8C8C] bg-transparent border-b"
          placeholder="Description"
        ></textarea>
        <button
          onClick={() => {
            setShowScriptPopup(false);
            setShowNotesPopup(false);
            setShowAutoFollowerPopup(false);
          }}
          className="bg-[#B6C31F] text-white px-4 py-[6px] text-[11px] rounded-sm hover:shadow-xl hover:shadow-[#B6C31F]"
        >
          adf
        </button>
      </div>
    </>
  );
};

export default Popup;

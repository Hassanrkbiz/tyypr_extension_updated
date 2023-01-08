import React from 'react';

const NotesPopup = () => {
  return (
    <>
      <div className="absolute bottom-0 -left-[280px] w-[280px] bg-[#2B2B2B] p-2 z-20 rounded-[10px]">
        <h4 className="text-center text-[20px] mb-2 text-white">
          everyday girl
        </h4>
        <textarea
          cols={10}
          className="resize-none outline-none text-[12px] text-[#8C8C8C] bg-transparent border-b w-[90%] ml-[1rem] mr-[1rem] min-h-[180px]"
          placeholder="... write something"
        ></textarea>
      </div>
    </>
  );
};

export default NotesPopup;

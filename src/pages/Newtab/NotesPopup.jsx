import React, { useState, useLayoutEffect } from 'react';
import { getStorageVal } from '../../modules/utils';
import { Store } from '../../modules/variables';

const NotesPopup = () => {
  const [heading, setHeading] = useState('');
  const [content, setContent] = useState('');
  var notesList = [];

  useLayoutEffect(() => {
    notesFunc();
  }, []);

  const notesFunc = async () => {
    notesList = await getStorageVal('notes', []);
    console.log('notesList', notesList);
    var profileLink = document.querySelectorAll('.b-chat__header__title a');
    if (!profileLink.length) {
      console.log('no user found for notes');
    }
    var userName = getUsername(profileLink[0]?.href ?? '');
    userName = userName ?? 'default';
    console.log('userName: ' + userName);
    setHeading(userName);
    var notes = await getNotes(userName);
    console.log('notes', notes);
    setContent(notes);
  };

  const getUsername = (link) => {
    return link?.split('/')[3];
  };

  const getNotes = async (userName) => {
    var notesText = '';
    console.log(notesList);
    for (var i = 0; i < notesList.length; i++) {
      console.log(notesList[i].heading);
      console.log(notesList[i].heading == userName);
      if (notesList[i].heading == userName) {
        notesText = notesList[i].content;
        break;
      }
    }
    console.log('notesText', notesText);
    return notesText;
  };

  const createNotes = async (txt) => {
    setContent(txt);
    var found = false;
    for (let i = 0; i < notesList.length; i++) {
      if (notesList[i].heading == heading) {
        found = true;
        notesList[i].content = txt;
      }
    }
    if (found) {
      Store.set({ notes: notesList });
    } else {
      notesList.push({ heading: heading, content: txt });
      Store.set({ notes: notesList });
    }
  };
  return (
    <>
      <div className="absolute bottom-0 -left-[280px] w-[280px] bg-[#2B2B2B] p-2 z-20 rounded-[10px]">
        <h4 className="text-center text-[20px] mb-2 text-white">{heading}</h4>
        <textarea
          cols={10}
          className="resize-none outline-none text-[12px] text-[#8C8C8C] bg-transparent border-b w-[90%] ml-[1rem] mr-[1rem] min-h-[180px]"
          placeholder="... write something"
          value={content}
          onChange={(e) => createNotes(e.target.value)}
        ></textarea>
      </div>
    </>
  );
};

export default NotesPopup;

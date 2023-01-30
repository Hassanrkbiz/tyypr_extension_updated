import React, { useState } from 'react';
import ScriptListItem from './ScriptListItem';
import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { getStorageVal } from '../../modules/utils';
import { Store } from '../../modules/variables';
import { GreenCheckIcon } from './Icons';

const ScriptPopup = ({ setShowScriptListModal }) => {
  var FileInput = React.useRef();
  const [list, setList] = React.useState([]);
  const [isShowCheck, setShowCheck] = useState(false);
  const [reload, setReload] = useState(null);
  const scrollView = React.useRef();

  React.useLayoutEffect(() => {
    start();
  }, [reload]);

  const start = async () => {
    var scriptList = await getStorageVal('scriptList', []);
    console.log('scriptList', scriptList);
    if (scriptList.length) {
      setList(scriptList);
    }
  };

  console.log(list);

  const saveDocs = (txt) => {
    var slist = list;
    var uuid = crypto.randomUUID();
    slist.push({ name: txt, checked: false, id: uuid });
    console.log(slist);
    setList(slist);
    Store.set({ scriptList: slist }, () => {
      setReload('1');
      setTimeout(() => {
        scrollView.current.scrollTop = scrollView.current.scrollHeight;
      }, 1000);
    });
  };
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

  const openModal = (id) => {
    if (id) {
      Store.set({ currentScriptID: id }, () => {
        setShowScriptListModal(true);
      });
    }
  };

  const listView = () => {
    var listV = list.map((obj, index) => {
      console.log(obj);
      return (
        <li
          className="text-[#c2c2c2] text-[12px] border-b border-[#444444]  h-[54px] flex items-center px-4 py-2"
          onClick={() => {
            setShowCheck(!isShowCheck);
            openModal(obj?.id);
          }}
        >
          {isShowCheck && (
            <span className="mr-1">
              <GreenCheckIcon />
            </span>
          )}

          <span className="truncate">{obj.name}</span>
        </li>
      );
    });
    console.log(listV);
    return listV;
  };

  const fileUploaded = (event) => {
    setReload(null);
    console.log(event);
    var input = event.target;
    var reader = new FileReader();
    reader.onload = function (evt) {
      var content = evt.target.result;
      // var zip = new JSZip(reader.result);
      var zip = new PizZip(content);
      var doc = new Docxtemplater().loadZip(zip);
      var text = doc.getFullText();
      console.log('docx', text);
      saveDocs(text);
    };
    reader.readAsBinaryString(input.files[0]);
  };
  return (
    <>
      <div className="absolute bottom-0 -left-[249px] w-[250px] bg-[#2B2B2B] z-20 rounded-md">
        <div className="bg-[#161616] text-center py-1 w-full">
          <span className="text-[#6D6D6D] text-[10px]">
            scripts for bloom social page
          </span>
        </div>

        <ul
          className="mb-0 max-h-[162px] overflow-auto scroll-w-0"
          ref={scrollView}
        >
          {listView()}
        </ul>

        <div className="py-1 w-full h-[54px] flex items-center px-4">
          <input
            type="file"
            id="docx"
            className="hidden"
            ref={FileInput}
            onChange={(e) => {
              fileUploaded(e);
            }}
          />
          <span
            className="text-[#D8E91A] text-[12px]"
            onClick={() => FileInput.current.click()}
          >
            Upload a sales script
          </span>
        </div>
      </div>
    </>
  );
};

export default ScriptPopup;

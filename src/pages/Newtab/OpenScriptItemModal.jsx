import React from 'react';
import { getStorageVal } from '../../modules/utils';

const OpenScriptItemModal = () => {
  const [currentScript, setCurrentScript] = React.useState([]);

  React.useLayoutEffect(() => {
    start();
  }, []);

  const start = async () => {
    var currentScriptID = await getStorageVal('currentScriptID', '');
    var list = await getStorageVal('scriptList', []);
    var cScript = [];
    list.forEach((script) => {
      if (script?.id && script?.id == currentScriptID) {
        // console.log(`Script ${JSON.stringify([script])}`)
        setCurrentScript(script);
      }
    });
  };
  function handleStatus(e) {
    console.log(e.target.checked);
  }

  return (
    <>
      <div className=" absolute right-[155px] bg-[#2B2B2B] top-[5rem]  flex items-start justify-between z-20 rounded-[10px] w-[46.5rem] h-[369px] p-6">
        <div>
          <h4 className="text-left text-[16px] font-medium text-[#F4F4F4]">
            Ready for a Shower v.1
          </h4>
          <p className="text-left text-sm font-medium text-[#F4F4F4] ">
            {currentScript.name ? currentScript.name : ''}
          </p>
        </div>

        <div>
          <p className="flex items-center text-[12px] mb-1">
            <span className="text-[#8C8C8C] text-light">
              {' '}
              Create Duplicate{' '}
            </span>
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.4866 6.99402H6.67497C5.90091 6.99489 5.15895 7.30262 4.61165 7.8499C4.06438 8.39731 3.75651 9.13932 3.75562 9.91337V16.725C3.75649 17.4989 4.06437 18.241 4.61165 18.7883C5.15893 19.3356 5.90091 19.6435 6.67497 19.6444H13.4866C14.2607 19.6435 15.0026 19.3356 15.5499 18.7883C16.0973 18.2411 16.4051 17.4989 16.406 16.725V9.91337C16.4051 9.13932 16.0973 8.39735 15.5499 7.8499C15.0027 7.30264 14.2607 6.99487 13.4866 6.99402ZM14.4597 16.7251C14.4596 16.983 14.3568 17.2304 14.1745 17.4128C13.9921 17.5953 13.7447 17.6979 13.4866 17.6982H6.67494C6.41698 17.6979 6.16962 17.5953 5.98721 17.4128C5.80468 17.2304 5.70211 16.9831 5.70182 16.7251V9.91345C5.70211 9.65533 5.80468 9.40797 5.98721 9.22556C6.16959 9.04318 6.41695 8.94046 6.67494 8.94032H13.4866C13.7447 8.94046 13.9921 9.04318 14.1745 9.22556C14.3568 9.40794 14.4596 9.6553 14.4597 9.91345V16.7251Z"
                fill="#444444"
              />
              <path
                d="M19.3251 1.15549H12.5135C11.7394 1.15636 10.9974 1.46424 10.4501 2.01152C9.90274 2.55878 9.59501 3.30093 9.59412 4.07484V5.04795C9.59412 5.39558 9.77954 5.71682 10.0806 5.89064C10.3817 6.06446 10.7527 6.06446 11.0537 5.89064C11.3548 5.71683 11.5404 5.3956 11.5404 5.04795V4.07484C11.5405 3.81687 11.6432 3.56951 11.8256 3.3871C12.008 3.20458 12.2554 3.102 12.5135 3.10171H19.3251C19.5831 3.102 19.8305 3.20458 20.0129 3.3871C20.1954 3.56948 20.298 3.81685 20.2983 4.07484V10.8865C20.298 11.1446 20.1954 11.3919 20.0129 11.5744C19.8305 11.7567 19.5831 11.8595 19.3251 11.8596H18.352C18.0044 11.8596 17.6832 12.0452 17.5093 12.3462C17.3355 12.6473 17.3355 13.0183 17.5093 13.3194C17.6831 13.6204 18.0044 13.8059 18.352 13.8059H19.3251C20.099 13.805 20.8411 13.4972 21.3884 12.9498C21.9357 12.4026 22.2436 11.6606 22.2445 10.8865V4.07487C22.2436 3.30096 21.9357 2.55884 21.3884 2.01154C20.8412 1.46424 20.099 1.1564 19.3251 1.15551L19.3251 1.15549Z"
                fill="#444444"
              />
            </svg>
          </p>
          <div className="flex items-center justify-center">
            <span className="text-[#8C8C8C] text-[12px] text-light">
              auto copy
            </span>
            <li className="ml-1 list-none">
              <input
                onChange={handleStatus}
                className="tgl-auto-copy tgl-auto-copy-ios"
                id="auto-copy-check"
                type="checkbox"
              />
              <label
                className="tgl-auto-copy-btn"
                htmlFor="auto-copy-check"
              ></label>
            </li>
          </div>
        </div>
      </div>
    </>
  );
};

export default OpenScriptItemModal;

import React from 'react';
import { render } from 'react-dom';

import Popup from './Popup';
import './index.css';
import '../../assets/styles/tailwind.css';
import 'rsuite/dist/rsuite.min.css'

render(<Popup />, window.document.querySelector('#app-container'));

if (module.hot) module.hot.accept();

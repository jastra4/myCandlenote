import React from 'react';
import {render} from 'react-dom';

import App from './components/app/App';

const anchor = document.createElement('div');
anchor.id = 'candleNote-extensionffff';

document.body.insertBefore(anchor, document.body.childNodes[0]);

render(<App />, document.getElementById('candleNote-extensionffff'));

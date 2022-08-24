import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { ProfileSearch } from './views/ProfileSearch/ProfileSearch';

const container = document.getElementById('root') as Element;
const root = ReactDOM.createRoot(container);
root.render(<ProfileSearch />);

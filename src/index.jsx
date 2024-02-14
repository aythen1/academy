import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { createRoot } from 'react-dom/client';

import './style.css'

import Editor from './editor'

import Test from './editor/test/001/index.jsx'


const root = createRoot(document.getElementById("app"));

const Layout = () => {
  return (
    <div>

          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={<Editor />}
              />
              <Route path="/test/*" element={<Test />} />
            </Routes>
          </BrowserRouter>
    </div>
  );
};

root.render(<Layout />);

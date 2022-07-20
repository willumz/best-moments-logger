import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Library from "./pages/Library";
import MediaView from "./pages/MediaView";
import {
  HashRouter,
  Routes,
  Route,
} from "react-router-dom";
import SeriesView from './pages/SeriesView';
import EpisodeView from './pages/EpisodeView';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Library />} />
        <Route path="/media/:id" element={<MediaView />} />
        <Route path="/series/:id" element={<SeriesView />} />
        <Route path="/episode/:id" element={<EpisodeView />} />
      </Routes>
    </HashRouter>
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

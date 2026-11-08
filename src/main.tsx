import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import PortalProvider from './components/PortalProvider';
import './styles/theme.css';
import './styles/app.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* A copy served where only the page itself is addressable routes on the hash. */}
    {import.meta.env.VITE_HASH_ROUTER === '1' ? (
      <HashRouter>
        <PortalProvider>
          <App />
        </PortalProvider>
      </HashRouter>
    ) : (
      <BrowserRouter>
        <PortalProvider>
          <App />
        </PortalProvider>
      </BrowserRouter>
    )}
  </StrictMode>,
);

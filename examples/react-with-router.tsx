// Example: React App with React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Provider, Button, Heading, Text } from '@react-spectrum/s2';
import { IMSProvider } from './contexts/IMSProvider';
import { useIMS } from './contexts/useIMS';
import HomePage from './pages/Home';
import NotFoundPage from './pages/NotFound';

function AppNav() {
  const ims = useIMS();

  return (
    <nav style={{
      padding: '1rem',
      borderBottom: '1px solid #ddd',
      display: 'flex',
      gap: '1rem',
      alignItems: 'center'
    }}>
      <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </div>

      {ims.isAuthenticated ? (
        <Button onPress={() => ims.logout()}>Sign out</Button>
      ) : (
        <Button variant="cta" onPress={() => ims.signIn()}>
          Sign in with Adobe
        </Button>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <IMSProvider>
      <Provider>
        <BrowserRouter>
          <AppNav />
          <main style={{ padding: '2rem' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
        </BrowserRouter>
      </Provider>
    </IMSProvider>
  );
}

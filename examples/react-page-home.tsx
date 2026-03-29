// Example: Home page component for React Router
import { Heading, Text, Button } from '@react-spectrum/s2';
import { useIMS } from '../contexts/useIMS';

export default function HomePage() {
  const ims = useIMS();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Heading>Welcome to your Protopack app</Heading>

      <Text>
        This is a minimal starting point with Adobe IMS authentication, Spectrum
        design system, and Adobe Services SDK pre-configured.
      </Text>

      {ims.isAuthenticated ? (
        <div style={{ marginTop: '2rem' }}>
          <Text>You're signed in! Ready to build something amazing.</Text>
        </div>
      ) : (
        <div style={{ marginTop: '2rem' }}>
          <Text>Sign in to access Adobe services.</Text>
          <Button variant="cta" onPress={() => ims.signIn()} style={{ marginTop: '1rem' }}>
            Sign in with Adobe
          </Button>
        </div>
      )}
    </div>
  );
}

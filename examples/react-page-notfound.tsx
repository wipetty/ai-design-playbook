// Example: 404 Not Found page for React Router
import { Heading, Text, Button } from '@react-spectrum/s2';
import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <Heading>Page not found</Heading>

      <Text>
        The page you're looking for doesn't exist.
      </Text>

      <Button variant="primary" onPress={() => navigate('/')} style={{ marginTop: '1rem' }}>
        Go home
      </Button>
    </div>
  );
}

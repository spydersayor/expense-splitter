import { Providers } from './app/providers';
import { Layout } from './app/Layout';
import { AppRoutes } from './app/routes';

function App() {
  return (
    <Providers>
      <Layout>
        <AppRoutes />
      </Layout>
    </Providers>
  );
}

export default App;

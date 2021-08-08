import Films from './Films';
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

import { ReactQueryDevtools } from 'react-query/devtools';

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <Films />
      </div>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default App;

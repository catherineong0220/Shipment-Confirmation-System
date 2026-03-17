import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './dashboard/dashboard';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const root = ReactDOM.createRoot(document.getElementById('root'));
const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <ChakraProvider>
      <Dashboard/>
    </ChakraProvider>
  </QueryClientProvider>
);
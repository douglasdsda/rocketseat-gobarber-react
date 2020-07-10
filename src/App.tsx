import React from 'react';

import GlobalStyle from './styles/global';
import SignIn from './pages/Signin/index';
// import SignUp from './pages/SignUp/index';
import ToastContainer from './components/ToastContainer';

import AppProvider from './hooks/index';

const App: React.FC = () => (
  <>
    <AppProvider>
      <SignIn />
      {/* <SignUp /> */}
    </AppProvider>
    <GlobalStyle />
  </>
);

export default App;

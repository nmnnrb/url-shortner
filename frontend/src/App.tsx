import * as React from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Content from './Components/Content';

interface IAppProps {
}

const App: React.FunctionComponent<IAppProps> = () => {
  return (
    <>
    <Header/>
    <Content/>
    <Footer/>
    </>
  ) ;
};

export default App;

import * as React from 'react';

interface IHeaderProps {
}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  return(
    <div className="bg-sky-500 mt-1">
        <div className="container p-2 mx-auto ">
            <nav className='flex items-center justify-start'>
            <h1 className='text-blue-900 opacity-50 -translate-x-[-0.3%] -translate-y-[-5%]  font-serif font-semibold text-5xl '>URL-Shortner</h1>
            <h1 className='text-white font-serif absolute font-semibold text-5xl '>URL-Shortner</h1>
                </nav> </div>

    </div>
  ) ;
};

export default Header;

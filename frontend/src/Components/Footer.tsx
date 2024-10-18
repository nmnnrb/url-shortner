import * as React from 'react';

interface IFooterProps {
}

const Footer: React.FunctionComponent<IFooterProps> = () => {
  return(
    <>
     <div className="bg-sky-500 mt-2 text-white text-base text-center px-2 py-6">
        Copyright &#169; URL_Shortner | <a href="https://www.linkedin.com/in/nmnnrb/"> NamanSharma</a>
     </div>
    </>
  ) ;
};

export default Footer;

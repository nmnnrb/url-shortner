import * as React from 'react';
import './index.css';
import axios from 'axios';
import {serverUrl} from "./helpers/Context"

interface IFormContentProps {
    pagereload: () => void;
}

const FormContent: React.FunctionComponent<IFormContentProps> = (props) => {
    const {pagereload} = props;
    const [fullUrl, setFullUrl] = React.useState<string>("");
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(`${serverUrl}/shortUrl` ,{
                fullUrl: fullUrl
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }});
            console.log("db  sent")
            setFullUrl("" );
            pagereload();
        } catch (error) {
            alert(`${serverUrl}/shortUrl`);
            console.log(error);
        }
    }
  return (
    <div className='container mx-auto p-2'>
        <div className='bg-banner my-8 roundex-xl bg-cover bg-center'>
           <div className='w-full h-full rounded-xl p-20  backdrop-brightness-90'>
           <h2 className='text-white text-shadow-lg select-none text-center text-4xl texts-center pb-4'> URL Shortner</h2>
            <p className='text-white text-shadow-lg select-none text-center pb-2 text-xl font-extralight' >Paste you long long URL , so we can make it  to the size so that it can store in the int  </p>
            <p className='text-white text-shadow-lg select-none mb-5  text-center pb-4 text-sm font-extralight '>free Tool to shortern and store all your import URL's</p>
            <form onSubmit={handleSubmit} >
                <div className='flex flex-row' >
                    <div className="w-full relative ">
                        <div className="absolute inset-0 start-0 items-start justify-center ps-2 py-1 pointer-events-none text-zinc-800  ">urlshortner.link/ </div>
                <input required value={fullUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>  ) => setFullUrl(e.target.value)} name='fullUrl' className='w-full block  pl-32 py-2 text-sm text-zinc-700 rounded-xl  outline-none  focus:ring-blue-300 focus:border-blue-900' type='text' placeholder='Enter the URL  here' ></input>
                <button type='submit' className='absolute top-0 end-0 p-[7px] text-sm font-medium text-white bg-blue-700 rounded-lg   border'>Shorten</button>
               
                </div>
                </div>
            </form>
           </div>
        </div>
    </div>
  ) ;
};

export default FormContent;

import * as React from 'react';
import { serverUrl } from '../helpers/Context';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface IAppProps {
     data: {
        _id: string;
        fullUrl: string;
        shortUrl: string;
        clicks: number;
        createdAt: Date;
        updatedAt: Date;
      
       }
       pagereload: () => void;
}

const App: React.FunctionComponent<IAppProps> = (props) => {
    const {data, pagereload} = props;
    const copytoclipboard = async (url:string) => {
        try {
            await navigator.clipboard.writeText(`${serverUrl}/shortUrl/${url}`)
            alert("URL copied to clipboard");
        } catch (error) {
            console.log(error);
        }
    }

    const deleteurlline = async (id:string) => {
        try {
            await axios.delete(`${serverUrl}/shortUrl/${id}`);
            // alert("URL deleted successfully");
            // This should trigger the reload state in Content component

        } catch (error) {
            console.log(error);
        }finally{
            pagereload();
        }

    }
  
    console.log("data in datatable is ", data);
    const renderTableData  =  () => {
         return data.reverse().map((item)  =>  {
            return (
            <tr key={item._id} className='border-b text-white bg-zinc-600 hover:bg-white hover:text-blue-400' >
                <td>{item.fullUrl}</td>
                <td className='text-blue-300 text-center pr-52 hover:cursor-pointer hover:text-blue-900'> 
                    <Link to={`${serverUrl}/shortUrl/${item.shorturl}`}  > {item.shorturl}</Link> 
                    </td>
                <td className='flex gap-7 items-center justify-center pr-16' >{item.click}</td>
                <td>{
                    <div className='flex gap-4 items-center justify-center pr-12'>
                        <span onClick={() => copytoclipboard(item.shorturl)} className=' hover:cursor-pointer copyicon'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>
                        </span>
                        
                        
                        {/* deleet icon
                         */}
                         
                <span onClick={ () => deleteurlline(item._id)} className='hover:cursor-pointer delte0-icon'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>

</span>
                    </div>
                    }</td>
            </tr>
            )
         })
    }
  return (
    <div className="conatiner mx-auto pt-2 pb-10">
        <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">

            <table className="min-w-full table-fixed text-sm text-left rtl:text-right text-gray-500">
    <thead className='text-md uppercase text-zinc-50 bg-zinc-700'>
        <tr>
            <th scope='col' className='px-6 py-3 w-6/12'  >FullUrl</th>
            <th scope='col' className='px-6 py-3 w-3/12'  >ShortenURL</th>
            <th scope='col' className='px-6 py-3'  >Clicks</th>
            <th scope='col' className='px-6 py-3 '  >Actions</th>
        </tr>
    </thead>
    <tbody>
       {renderTableData()}
    </tbody>
            </table>

        </div>
    </div>
  ) ;
};

export default App;

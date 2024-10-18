import * as React from 'react';
import FormContent from '../FormContent';
import DataTable from '../Components/DataTable';
import { serverUrl } from '../helpers/Context';
import axios from 'axios';

interface IContentProps {
}

const Content: React.FunctionComponent<IContentProps> = () => {
  const [reload, setReload] = React.useState<boolean>(false);

 interface urlData {
  _id: string;
  fullUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;

 }

 const pagereload = (): void => {
   setReload(prev => !prev);
 }
  const [data  ,setData] = React.useState<urlData[]>([]);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/shortUrl`);
        console.log("response from server", response);
        setData(response.data);
        setReload(false);
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setReload(false); // Ensure this is always executed
    }
    }

    React.useEffect(() => {
      fetchData();
    },[reload]);
   return (
    <div>
      <FormContent pagereload={pagereload}/>
      <DataTable pagereload={pagereload} data={data} />
    </div>
  ) ;
};

export default Content;

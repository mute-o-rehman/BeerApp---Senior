import { getBeerList, getBeerMetaData } from '../../api';
import { ApiParams, Beer } from '../../types';
import handle from '../../utils/error';

const fetchData = (setData: (data: Array<Beer>) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerList(params);

      setData(response.data);
    } catch (error) {
      handle(error);
    }
  })();
};

const fetchMetadata = (setData: (total: number) => void, params?: ApiParams) => {
  (async () => {
    try {
      const response = await getBeerMetaData(params);

      setData(parseInt(response.data.total, 10));
    } catch (error) {
      handle(error);
    }
  })();
};

export { fetchData, fetchMetadata };

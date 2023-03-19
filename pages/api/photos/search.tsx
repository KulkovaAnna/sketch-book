import { Axios, AxiosResponse } from 'axios';
import { NextApiHandler } from 'next';
import { DefaultPhotosParams, Photo } from 'types/photos';

interface Params extends DefaultPhotosParams {
  query?: string;
}

const defaultOptions: Params = {
  resultsCount: 10,
  page: 1,
  orderBy: 'relevant',
};

const photosHandler: NextApiHandler = async function (req, res) {
  const params: Params = req.query;
  const options: Params = {
    ...defaultOptions,
    ...params,
  };
  const axiosClient = new Axios({
    baseURL: 'https://api.unsplash.com/',
    headers: {
      Authorization: `Client-ID ${process.env.UNSPLAH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
      'Content-Type': 'application/json',
    },
    transformResponse: (data: string) => JSON.parse(data),
  });
  const result = await axiosClient.get<null, AxiosResponse<Photo[]>>(
    '/photos',
    {
      params: {
        query: options.query,
        per_page: options.resultsCount,
        page: options.page,
        order_by: options.orderBy,
      },
    }
  );
  res.status(200).send(result.data);
};

export default photosHandler;

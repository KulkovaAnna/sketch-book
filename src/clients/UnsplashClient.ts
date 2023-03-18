import { Axios, AxiosResponse } from 'axios';
import { FeedResponse, Photo } from './interfaces';

type OrderBy = 'latest' | 'relevant';

interface DefaultOptions {
  resultsCount?: number;
  page?: number;
  orderBy?: OrderBy;
}

interface IUnsplashClient {
  getPhotos(options: DefaultOptions): Promise<Photo[]>;
  searchPhotos(query: string, options: DefaultOptions): Promise<Photo[]>;
}

export class UnsplashClient implements IUnsplashClient {
  private axiosClient = new Axios({
    baseURL: 'https://api.unsplash.com/',
    headers: {
      Authorization: `Client-ID ${process.env.REACT_APP_UNSPLAH_ACCESS_KEY}`,
      'Accept-Version': 'v1',
      'Content-Type': 'application/json',
    },
    transformResponse: (data: string) => JSON.parse(data),
  });
  private defaultOptions: DefaultOptions = {
    resultsCount: 10,
    page: 1,
    orderBy: 'relevant',
  };

  async getPhotos(opt: DefaultOptions): Promise<Photo[]> {
    const options = {
      ...this.defaultOptions,
      ...opt,
    };
    const res = await this.axiosClient.get<null, AxiosResponse<Photo[]>>(
      '/photos',
      {
        params: {
          per_page: options.resultsCount,
          page: options.page,
          order_by: options.orderBy,
        },
      }
    );
    return res.data;
  }

  async searchPhotos(
    query: string,
    opt = this.defaultOptions
  ): Promise<Photo[]> {
    const options = {
      ...this.defaultOptions,
      ...opt,
    };
    const res = await this.axiosClient.get<null, FeedResponse<Photo>>(
      '/search/photos',
      {
        params: {
          query,
          per_page: options.resultsCount,
          page: options.page,
          order_by: options.orderBy,
        },
      }
    );
    return res.results;
  }
}

const unsplashClient = new UnsplashClient();

export default unsplashClient;

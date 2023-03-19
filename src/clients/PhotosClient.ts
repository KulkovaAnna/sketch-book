import { Axios, AxiosResponse } from 'axios';
import { DefaultPhotosParams, FeedResponse, Photo } from 'types/photos';

interface IUnsplashClient {
  getPhotos(options: DefaultPhotosParams): Promise<Photo[]>;
  searchPhotos(query: string, options: DefaultPhotosParams): Promise<Photo[]>;
}

export class UnsplashClient implements IUnsplashClient {
  private axiosClient = new Axios({
    baseURL: '/api',
    transformResponse: (data) => JSON.parse(data),
  });

  async getPhotos(options: DefaultPhotosParams): Promise<Photo[]> {
    const res = await this.axiosClient.get<null, AxiosResponse<Photo[]>>(
      '/photos',
      { params: options }
    );
    return res.data;
  }

  async searchPhotos(
    query: string,
    options: DefaultPhotosParams
  ): Promise<Photo[]> {
    const res = await this.axiosClient.get<null, FeedResponse<Photo>>(
      '/photos/search',
      { params: { query, ...options } }
    );
    return res.results;
  }
}

const unsplashClient = new UnsplashClient();

export default unsplashClient;

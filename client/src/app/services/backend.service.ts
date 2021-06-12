import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApplicationSettings } from '../constants/constants';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  public async GetVideosNames(): Promise<any> {
    return this.httpClient.get(ApplicationSettings.API_ENDPOINT + 'videos', { responseType: 'json' }).toPromise();
  }
}

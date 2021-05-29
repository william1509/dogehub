import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {

  constructor(private httpClient: HttpClient) {}

  public async GetVideosNames(): Promise<any> {
    return this.httpClient.get(this.URL() + 'videos', { responseType: 'json' }).toPromise();
  }

  public URL(): String {
    return'104.248.61.205:3000/';
  }
}

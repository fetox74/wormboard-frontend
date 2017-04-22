import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ZKBAggregateList} from './model/zkb-aggregate-list';

@Injectable()
export class AggregateService {
  private baseURL = 'http://localhost:8080/';
  private queryMonth = 'getStatsForMonth?month=';

  constructor(private http: Http) {}

  getStatsForMonth(month: string): Observable<ZKBAggregateList> {
    return this.http.get(this.baseURL + this.queryMonth + month)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

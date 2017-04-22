import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ZKBAggregate} from './model/zkb-aggregate';

@Injectable()
export class AggregateService {
  private baseURL = 'http://localhost:8080/';
  private queryMonth = 'getStatsForMonth?month=';

  constructor(private http: Http) {}

  getStatsForMonth(month: string): Observable<ZKBAggregate[]> {
    return this.http.get(this.baseURL + this.queryMonth + month)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ZKBAggregate} from '../model/zkb-aggregate';
import {ServerStatus} from '../model/server-status';

@Injectable()
export class AggregateService {
  private baseURL = 'http://fetox-developments.com:8080/WormBoardREST/';
  private queryServer = 'getServerStatus';
  private queryMonth = 'getStatsForMonth?month=';
  private queryQuarter = 'getStatsForQuarter?quarter=';
  private queryYear = 'getStatsForYear?year=';
  private queryLast90Days = 'getStatsForLast90Days';

  constructor(private http: Http) {}

  getServerStatus(): Observable<ServerStatus> {
    return this.http.get(this.baseURL + this.queryServer)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForMonth(month: string): Observable<ZKBAggregate[]> {
    return this.http.get(this.baseURL + this.queryMonth + month)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForQuarter(quarter: string): Observable<ZKBAggregate[]> {
    return this.http.get(this.baseURL + this.queryQuarter + quarter)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForLast90Days(): Observable<ZKBAggregate[]> {
    return this.http.get(this.baseURL + this.queryLast90Days)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForYear(year: string): Observable<ZKBAggregate[]> {
    return this.http.get(this.baseURL + this.queryYear + year)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

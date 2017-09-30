import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ZWBAggregateCorp} from '../model/zwb-aggregate-corp';
import {ServerStatus} from '../model/server-status';
import {ZWBHourlyAggregateCorp} from '../model/zwb-hourly-aggregate-corp';

@Injectable()
export class AggregateService {
  private baseURL = 'http://fetox-developments.com:8080/WormBoardREST/';
  private queryServer = 'getServerStatus';
  private queryMonth = 'getStatsForMonth?month=';
  private queryQuarter = 'getStatsForQuarter?quarter=';
  private queryYear = 'getStatsForYear?year=';
  private queryLast90Days = 'getStatsForLast90Days';
  private queryHourlyCorpMonth = 'getHourlyCorpStatsForMonth?month=';
  private queryHourlyCorpQuarter = 'getHourlyCorpStatsForQuarter?quarter=';
  private queryHourlyCorpYear = 'getHourlyCorpStatsForYear?year=';
  private queryHourlyCorpLast90Days = 'getHourlyCorpStatsForLast90Days?corporation=';

  constructor(private http: Http) {}

  getServerStatus(): Observable<ServerStatus> {
    return this.http.get(this.baseURL + this.queryServer)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForMonth(month: string): Observable<ZWBAggregateCorp[]> {
    return this.http.get(this.baseURL + this.queryMonth + month)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForQuarter(quarter: string): Observable<ZWBAggregateCorp[]> {
    return this.http.get(this.baseURL + this.queryQuarter + quarter)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForLast90Days(): Observable<ZWBAggregateCorp[]> {
    return this.http.get(this.baseURL + this.queryLast90Days)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getStatsForYear(year: string): Observable<ZWBAggregateCorp[]> {
    return this.http.get(this.baseURL + this.queryYear + year)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForMonth(corporation: string, month: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpMonth + month + '&corporation=' + corporation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForQuarter(corporation: string, quarter: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpQuarter + quarter + '&corporation=' + corporation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForLast90Days(corporation: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpLast90Days + corporation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForYear(corporation: string, year: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpYear + year + '&corporation=' + corporation)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

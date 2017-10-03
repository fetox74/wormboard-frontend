import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {ZWBAggregateCorp} from '../model/zwb-aggregate-corp';
import {ServerStatus} from '../model/server-status';
import {ZWBHourlyAggregateCorp} from '../model/zwb-hourly-aggregate-corp';
import {ZWBAggregateChar} from '../model/zwb-aggregate-char';
import {ZWBHistoryCorp} from '../model/zwb-history-corp';

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
  private queryHourlyCorpLast90Days = 'getHourlyCorpStatsForLast90Days?corporationid=';
  private queryActiveCharsMonth = 'getCorpActivePlayerStatsForMonth?month=';
  private queryActiveCharsQuarter = 'getCorpActivePlayerStatsForQuarter?quarter=';
  private queryActiveCharsYear = 'getCorpActivePlayerStatsForYear?year=';
  private queryActiveCharsLast90Days = 'getCorpActivePlayerStatsForLast90Days?corporationid=';
  private queryCorpHistoryMonth = 'getCorpHistoryForMonth?month=';
  private queryCorpHistoryQuarter = 'getCorpHistoryForQuarter?quarter=';
  private queryCorpHistoryYear = 'getCorpHistoryForYear?year=';
  private queryCorpHistoryLast90Days = 'getCorpHistoryForLast90Days?corporationid=';

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

  getHourlyCorpStatsForMonth(corporationid: number, month: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpMonth + month + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForQuarter(corporationid: number, quarter: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpQuarter + quarter + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForLast90Days(corporationid: number): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpLast90Days + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getHourlyCorpStatsForYear(corporationid: number, year: string): Observable<ZWBHourlyAggregateCorp> {
    return this.http.get(this.baseURL + this.queryHourlyCorpYear + year + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActiveCharStatsForMonth(corporationid: number, month: string): Observable<ZWBAggregateChar> {
    return this.http.get(this.baseURL + this.queryActiveCharsMonth + month + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActiveCharStatsForQuarter(corporationid: number, quarter: string): Observable<ZWBAggregateChar> {
    return this.http.get(this.baseURL + this.queryActiveCharsQuarter + quarter + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActiveCharStatsForLast90Days(corporationid: number): Observable<ZWBAggregateChar> {
    return this.http.get(this.baseURL + this.queryActiveCharsLast90Days + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getActiveCharStatsForYear(corporationid: number, year: string): Observable<ZWBAggregateChar> {
    return this.http.get(this.baseURL + this.queryActiveCharsYear + year + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCorpHistoryForMonth(corporationid: number, month: string): Observable<ZWBHistoryCorp> {
    return this.http.get(this.baseURL + this.queryCorpHistoryMonth + month + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCorpHistoryForQuarter(corporationid: number, quarter: string): Observable<ZWBHistoryCorp> {
    return this.http.get(this.baseURL + this.queryCorpHistoryQuarter + quarter + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCorpHistoryForLast90Days(corporationid: number): Observable<ZWBHistoryCorp> {
    return this.http.get(this.baseURL + this.queryCorpHistoryLast90Days + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }

  getCorpHistoryForYear(corporationid: number, year: string): Observable<ZWBHistoryCorp> {
    return this.http.get(this.baseURL + this.queryCorpHistoryYear + year + '&corporationid=' + corporationid)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
}

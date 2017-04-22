export class ZKBAggregate {
  constructor(public date: number,
              public corporation: string,
              public kills: number,
              public isk: number,
              public active: string,
              public numactive: number,
              public netisk: number,
              public sumonkills: number) {}
}

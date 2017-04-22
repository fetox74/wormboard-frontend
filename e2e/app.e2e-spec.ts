import { KillmailDatabaseFrontendAngularPage } from './app.po';

describe('killmail-database-frontend-angular App', () => {
  let page: KillmailDatabaseFrontendAngularPage;

  beforeEach(() => {
    page = new KillmailDatabaseFrontendAngularPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

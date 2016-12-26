import { CrmPage } from './app.po';

describe('crm App', function() {
  let page: CrmPage;

  beforeEach(() => {
    page = new CrmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

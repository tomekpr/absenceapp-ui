import { AbsenceappUiPage } from './app.po';

describe('absenceapp-ui App', () => {
  let page: AbsenceappUiPage;

  beforeEach(() => {
    page = new AbsenceappUiPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

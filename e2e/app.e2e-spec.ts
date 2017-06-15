import { HandsontableDemo2Page } from './app.po';

describe('handsontable-demo2 App', () => {
  let page: HandsontableDemo2Page;

  beforeEach(() => {
    page = new HandsontableDemo2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

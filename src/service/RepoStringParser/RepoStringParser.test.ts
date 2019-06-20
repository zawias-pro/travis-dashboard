import { RepoStringParser } from './RepoStringParser';

describe('RepoStringParser', () => {
  test('returns valid array', () => {
    const testString = 'user/repo1\nuser/repo2'.trim();

    expect(RepoStringParser.parse(testString)).toEqual(
      [
        {'name': 'user/repo1', 'slug': 'user%2Frepo1'},
        {'name': 'user/repo2', 'slug': 'user%2Frepo2'},
      ],
    );
  });

  test('drops empty lines', () => {
    const testString = 'user/repo1\n\n  \nuser/repo2'.trim();

    expect(RepoStringParser.parse(testString)).toEqual(
      [
        {'name': 'user/repo1', 'slug': 'user%2Frepo1'},
        {'name': 'user/repo2', 'slug': 'user%2Frepo2'},
      ],
    );
  });

  test('returns empty array for empty string', () => {
    const testString = '';

    expect(RepoStringParser.parse(testString)).toEqual(
      [],
    );
  });
});

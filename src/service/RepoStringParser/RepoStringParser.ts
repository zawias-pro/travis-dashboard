interface Repository {
  name: string;
  slug: string;
}

class RepoStringParser {
  public static parse(repoString: string): Repository[] {
    const lines = repoString
      .split(/\n/)
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return lines.map(line => ({
      name: line,
      slug: encodeURIComponent(line),
    }));
  }
}
export { RepoStringParser };

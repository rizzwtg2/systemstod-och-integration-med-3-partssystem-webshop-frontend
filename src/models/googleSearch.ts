interface Url {
  type: string;
  template: string;
}

interface Query {
  title: string;
  totalResults: string;
  searchTerms: string;
  count: number;
  startIndex: number;
  inputEncoding: string;
  outputEncoding: string;
  safe: string;
  cx: string;
}

interface Queries {
  request: Query[];
  nextPage?: Query[];
}

interface Facet {
  anchor: string;
  label: string;
  label_with_op: string;
}

interface Context {
  title: string;
  facets: Facet[][];
}

interface SearchInformation {
  searchTime: number;
  formattedSearchTime: string;
  totalResults: string;
  formattedTotalResults: string;
}

interface Thumbnail {
  src: string;
  width: string;
  height: string;
}

interface Metatag {
  [key: string]: string;
}

interface CseImage {
  src: string;
}

interface Pagemap {
  cse_thumbnail?: Thumbnail[];
  metatags?: Metatag[];
  cse_image?: CseImage[];
  offer?: Record<string, string>[];
  pricecurrency?: string;
  price?: string;
}

interface Label {
  name: string;
  displayName: string;
  label_with_op: string;
}

export interface IItem {
  kind: string;
  title: string;
  htmlTitle: string;
  link: string;
  displayLink: string;
  snippet: string;
  htmlSnippet: string;
  formattedUrl: string;
  htmlFormattedUrl: string;
  pagemap?: Pagemap;
  labels?: Label[];
}

export interface ISearchResult {
  kind: string;
  url: Url;
  queries: Queries;
  context: Context;
  searchInformation: SearchInformation;
  items: IItem[];
}

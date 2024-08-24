export interface StrapiQuery {
  sort: string[];
  filters: Filters;
  populate: string;
  fields: string[];
  pagination: Pagination;
  publicationState: string;
  locale: string[];
}

export interface Filters {
  title: Title;
}

export interface Title {
  $eq: string;
}

export interface Pagination {
  pageSize: number;
  page: number;
}

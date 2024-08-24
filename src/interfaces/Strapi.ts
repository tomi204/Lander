export interface StrapiData<T, MetaData = unknown> {
  data: Data<T>;
  meta?: MetaData;
}
export interface Data<T> {
  id: string;
  attributes: T;
}

export interface MediaMultiple {
  data: Data<Media>[];
}

export interface MediaSimple {
  data: Data<Media>;
}

export interface Media {
  id: string;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: MediaFormats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface MediaFormats {
  small: MediaThumbnail;
  large: MediaThumbnail;
  medium: MediaThumbnail;
  thumbnail: MediaThumbnail;
}

export interface MediaThumbnail {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: null;
  width: number;
  height: number;
  size: number;
  url: string;
}

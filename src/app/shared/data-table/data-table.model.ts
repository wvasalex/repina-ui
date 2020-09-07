import { Observable } from 'rxjs';
import { StrMap } from '@shared/types';

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
  query?: StrMap<string>;
}

export interface Page<T> {
  content: T[];
  totalCount: number;
  size: number;
  index: number;
}

export type PaginatedEndpoint<T> = (req: PageRequest<T>) => Observable<Page<T>>;

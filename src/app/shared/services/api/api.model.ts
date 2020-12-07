import { InjectionToken } from '@angular/core';
import { StrMap } from '@shared/types';

export const API_BASE_CONFIG = new InjectionToken<BaseApiConfig>('base.config');
export const API_CONFIG = new InjectionToken<ApiConfig>('api.config');

export interface BaseApiConfig {
  host: string;
  base: string;
}

export interface ApiConfig {
  path: string;
}

export interface ApiRawResponse<T> {
  ok: boolean;
  result: T;
  error_code?: number;
  error_title?: string;
}

export interface ApiRequestOptions {
  [key: string]: string | string[] | StrMap<string | number> | boolean;
}

export interface PagedRequest extends StrMap<string | number> {
  page?: number;
  per_page?: number;
}

export interface PagedResponse<T> {
  page: number;
  total_count: number;
  per_page: number;
  results: T[];
}

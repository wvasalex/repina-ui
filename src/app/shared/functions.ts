import { StrMap } from '@shared/types';

export function parseQueryParams(queryParams): StrMap<string> {
  if (!queryParams) {
    return null;
  }

  const vars = queryParams.split('&');
  return vars.reduce((result, item) => {
    const [key, value] = item.split('=');
    result[key] = decodeURIComponent(value);
    return result;
  }, {});
}

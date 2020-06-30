import { StrMap } from '../types';

export type GridDataType = 'big-small' | 'small-big' | 'small-wide' | 'small' | 'big';

export const GridDataSize: StrMap<GridDataSizeDef> = {
  'big-small': {
    cols: 3,
    roles: [1, 2, 3],
    grid: [
      {colspan: 2, rowspan: 2},
      {},
      {},
    ],
  },
  'small-big': {
    cols: 3,
    roles: [1, 3, 2],
    grid: [
      {},
      {colspan: 2, rowspan: 2},
      {},
    ],
  },
  'small-wide': {
    cols: 3,
    roles: [1, 2],
    grid: [
      {},
      {colspan: 2},
    ],
  },
  'small': {
    cols: 3,
    roles: [1, 2, 3],
    grid: [
      {},
      {},
      {},
    ],
  },
  'big': {
    cols: 2,
    roles: [1, 2],
    grid: [
      {},
      {},
    ],
  }
};

export interface GridDataSizeDef {
  cols: number;
  roles: number[];
  grid: StrMap<any>[];
}

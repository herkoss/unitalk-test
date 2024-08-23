import type { FC, MouseEvent } from 'react';
import { TableCell, TableSortLabel, Typography, TableHead, TableRow } from '@mui/material';

import { Iterator, IteratorModeEnum } from '@/shared/ui/Iterator';
import { SortSettings, TableData } from './types';

interface HeadCell {
  id: keyof TableData;
  label: string;
}

const headCells: Array<HeadCell> = [
  {
    id: 'id',
    label: '#'
  },
  {
    id: 'name',
    label: 'Користувач'
  },
  {
    id: 'isWorking',
    label: 'Працює'
  },
  {
    id: 'createdAt',
    label: 'Дата / Час створення'
  },
  {
    id: 'text',
    label: 'fieldName[]'
  }
];

interface OperatorTableHeadCellProps extends HeadCell {
  sortSettings: SortSettings;
  onTableSortLabelClick: (property: keyof TableData) => (event: MouseEvent<unknown>) => void;
}

const OperatorTableHeadCell: FC<OperatorTableHeadCellProps> = ({
  id,
  label,
  sortSettings,
  onTableSortLabelClick
}) => (
  <TableCell key={id} sortDirection={sortSettings.orderBy === id ? sortSettings.order : false}>
    <TableSortLabel
      active={sortSettings.orderBy === id}
      direction={sortSettings.orderBy === id ? sortSettings.order : 'asc'}
      onClick={onTableSortLabelClick(id)}
    >
      <Typography fontFamily="Rubik" fontSize="14px" lineHeight="24px" fontWeight="500">
        {label}
      </Typography>
    </TableSortLabel>
  </TableCell>
);

interface OperatorTableHeadProps {
  sortSettings: SortSettings;
  onRequestSort: (event: MouseEvent<unknown>, property: keyof TableData) => void;
}

export const OperatorTableHead: FC<OperatorTableHeadProps> = ({ sortSettings, onRequestSort }) => {
  const createSortHandler = (property: keyof TableData) => (event: MouseEvent<unknown>) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <Iterator
          mode={IteratorModeEnum.raw}
          Render={OperatorTableHeadCell}
          data={headCells.map((cell) => ({
            ...cell,
            sortSettings,
            onTableSortLabelClick: createSortHandler
          }))}
        />
      </TableRow>
    </TableHead>
  );
};

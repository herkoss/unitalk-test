import { useEffect, useMemo, useState, type FC, type MouseEvent, type ChangeEvent } from 'react';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';

import { useDispatch } from '@/shared/lib/store-hooks';
import { operatorsFetchPending, useOperatorsSelector } from '@/entity/operator';
import { Iterator, IteratorModeEnum } from '@/shared/ui/Iterator';
import { Led } from '@/shared/ui/led';

import { SortSettings, TableData } from './types';
import { getComparator, stableSort } from './utils';
import { OperatorTableRow } from './OperatorsTableRow';
import { OperatorTableHead } from './OperatorsTableHead';
import { OperatorsErrorFallback, OperatorsLoaderFallback } from './OperatorsFallbacks';

interface Props {
  className?: string;
}

export const OperatorsTable: FC<Props> = ({ className }) => {
  const dispatch = useDispatch();

  const operators = useOperatorsSelector();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortSettings, setSortSettings] = useState<SortSettings>({
    searchValue: '',
    order: 'asc',
    orderBy: 'id'
  });

  useEffect(() => {
    dispatch(operatorsFetchPending());
  }, [dispatch]);

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - operators.data.length) : 0;

  const mappedOperators = useMemo<Array<TableData>>(
    () => operators.data.map((op) => ({ ...op, text: op.text ?? '-' })),
    [operators.data]
  );

  const visibleRows = useMemo(
    () =>
      stableSort(
        mappedOperators.filter((op) => op.name.toLowerCase().includes(sortSettings.searchValue)),
        getComparator(sortSettings.order, sortSettings.orderBy)
      ).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [page, rowsPerPage, mappedOperators, sortSettings]
  );

  const handleChangePage = (_: unknown, newPage: number) => setPage(newPage);

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_: MouseEvent<unknown>, property: keyof TableData) =>
    setSortSettings((prevState) => ({
      ...prevState,
      orderBy: property,
      order: prevState.orderBy === property && prevState.order === 'asc' ? 'desc' : 'asc'
    }));

  const handleRequestSearch = (event: ChangeEvent<HTMLInputElement>) =>
    setSortSettings((prevState) => ({
      ...prevState,
      searchValue: event.target.value
    }));

  return (
    <div className={className} style={{ margin: '24px', overflow: 'hidden' }}>
      <Typography mb="40px" variant="h3" fontFamily="Rubik" fontWeight="400">
        Оператори
      </Typography>
      <Paper sx={{ padding: '16px' }}>
        <TextField
          label="Пошук"
          variant="outlined"
          value={sortSettings.searchValue}
          onChange={handleRequestSearch}
          placeholder="Ім’я користувача..."
          sx={{ width: '276px', marginBottom: '16px' }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <OperatorTableHead sortSettings={sortSettings} onRequestSort={handleRequestSort} />
            <TableBody>
              <Led
                entity={operators}
                loaderFallback={<OperatorsLoaderFallback />}
                errorFallback={<OperatorsErrorFallback />}
              >
                <Iterator
                  mode={IteratorModeEnum.raw}
                  Render={OperatorTableRow}
                  data={visibleRows}
                />
              </Led>
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 52 * emptyRows
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          component="div"
          count={operators.data.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 25]}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

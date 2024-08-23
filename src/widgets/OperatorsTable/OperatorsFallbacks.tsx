import type { FC } from 'react';
import { CircularProgress, TableCell, Typography } from '@mui/material';

export const OperatorsLoaderFallback: FC = () => (
  <TableCell align="center" colSpan={5} height="375px">
    <CircularProgress />
  </TableCell>
);
export const OperatorsErrorFallback: FC = () => (
  <TableCell align="center" colSpan={5} height="375px">
    <Typography variant="h5">
      Щось пішло не так під час завантаження операторів... Спробуйте знову пізніше
    </Typography>
  </TableCell>
);

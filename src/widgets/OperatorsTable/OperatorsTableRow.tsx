import type { FC } from 'react';
import { TableRow, TableCell, Typography, Box, Avatar, Checkbox } from '@mui/material';

import { formatDate } from '@/shared/lib/utils';

import { TableData } from './types';

export const OperatorTableRow: FC<TableData> = ({
  id,
  name,
  avatar,
  isWorking,
  createdAt,
  text
}) => (
  <TableRow hover role="checkbox" tabIndex={-1} key={id} sx={{ cursor: 'pointer', padding: '4px' }}>
    <TableCell>
      <Typography variant="body2" fontFamily="Rubik">
        {id}
      </Typography>
    </TableCell>
    <TableCell padding="none">
      <Box display="flex" gap="8px" alignItems="center">
        <Avatar src={avatar} />
        <Typography variant="body2" fontFamily="Rubik">
          {name}
        </Typography>
      </Box>
    </TableCell>
    <TableCell align="left">
      <Checkbox readOnly color="error" checked={isWorking} />
    </TableCell>
    <TableCell align="left">
      <Typography variant="body2" fontFamily="Rubik">
        {formatDate(createdAt)}
      </Typography>
    </TableCell>
    <TableCell align="left">
      <Typography variant="body2" fontFamily="Rubik">
        {text}
      </Typography>
    </TableCell>
  </TableRow>
);

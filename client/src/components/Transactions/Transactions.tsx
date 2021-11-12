import React, { useEffect, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TransactionModal from '../TransactionModal/TransactionModal';
import './Transactions.sass';
import { transactionService } from '../../services/transaction';
import { ITransaction } from '../../interface/types';
import LATEST_BLOCKS from '../../graphql/queries/getLatestBlocks';
import { useQuery } from '@apollo/client';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

interface Column {
   id: 'hash' | 'block_index' | 'height' | 'time';
   label: string;
   minWidth?: number;
   align?: 'right';
   format?: (value: number) => string;
}

const columns: readonly Column[] = [
   { id: 'hash', label: 'Hash', minWidth: 170 },
   { id: 'block_index', label: 'Block Index', minWidth: 100 },
   {
      id: 'height',
      label: 'Height',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
   },
   {
      id: 'time',
      label: 'Time',
      minWidth: 170,
      align: 'right',
      format: (value: number) => value.toLocaleString('en-US'),
   },
];

const Transactions = () => {
   const [page, setPage] = React.useState(0);
   const [rowsPerPage, setRowsPerPage] = React.useState(10);
   const [transactions, setTransactions] = useState<ITransaction[]>([]);
   const [hash, setHash] = useState<string>('');
   const [openModal, setOpenModal] = useState<boolean>(false);
   const { loading, data, error } = useQuery(LATEST_BLOCKS);

   const handleClose = () => setOpenModal(false);
   const previewModal = (transaction: ITransaction) => {
      setHash(transaction.hash);
      setOpenModal(true);
   };

   useEffect(() => {
      const blocks =
         data && transactionService.transactionBlocks(data.latestBlocks);
      setTransactions(blocks);
   }, [data]);

   const handleChangePage = (event: unknown, newPage: number) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement>
   ) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
   };

   if (loading || (!data && !error)) {
      return (
         <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="inherit" />
         </Stack>
      );
   }

   return (
      <div className="transaction">
         <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 500 }}>
               <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                     <TableRow>
                        {columns.map((column) => (
                           <TableCell
                              key={column.id}
                              align={column.align}
                              style={{
                                 minWidth: column.minWidth,
                                 backgroundColor: '#b2bbb5',
                              }}
                           >
                              {column.label}
                           </TableCell>
                        ))}
                     </TableRow>
                  </TableHead>

                  <TableBody>
                     {transactions &&
                        transactions
                           .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                           )
                           .map((transaction: ITransaction) => {
                              return (
                                 <TableRow
                                    hover
                                    role="checkbox"
                                    tabIndex={-1}
                                    key={transaction.hash}
                                    style={{ cursor: 'pointer' }}
                                    onClick={() => previewModal(transaction)}
                                 >
                                    {columns.map((column) => {
                                       const value = transaction[column.id];
                                       return (
                                          <TableCell
                                             key={column.id}
                                             align={column.align}
                                          >
                                             {column.format &&
                                             typeof value === 'number'
                                                ? column.format(value)
                                                : value}
                                          </TableCell>
                                       );
                                    })}
                                 </TableRow>
                              );
                           })}
                  </TableBody>
               </Table>
            </TableContainer>
            {transactions && (
               <TablePagination
                  rowsPerPageOptions={[10, 25, 50, 100]}
                  component="div"
                  count={transactions.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
               />
            )}
            {openModal ? (
               <TransactionModal
                  hash={hash}
                  openModal={openModal}
                  handleClose={handleClose}
               />
            ) : null}
         </Paper>
      </div>
   );
};

export default Transactions;

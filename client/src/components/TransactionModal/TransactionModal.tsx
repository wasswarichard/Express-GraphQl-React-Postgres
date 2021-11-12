import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import { transactionService } from '../../services/transaction';
import { useQuery } from '@apollo/client';
import {
   ITransactionDetails,
   ITransactionModalProps,
} from '../../interface/types';
import BLOCK_DETAILS from '../../graphql/queries/getBlockDetails';

const style = {
   position: 'absolute' as 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: '60%',
   bgcolor: 'background.paper',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

const TransactionModal: React.FC<ITransactionModalProps> = ({
   openModal,
   hash,
   handleClose,
}) => {
   const { loading, data } = useQuery(BLOCK_DETAILS, {
      variables: {
         hash,
      },
   });

   const [transactionDetails, setTransactionDetails] =
      useState<ITransactionDetails>({
         size: '',
         prev_block: '',
         hash: '',
         next_block: '',
         weight: ''
      });

   useEffect(() => {
      const newData = data && transactionService.transaction(data.blockDetails);
      setTransactionDetails(newData);
   }, [data]);

   return (
      <Modal
         aria-labelledby="transition-modal-title"
         aria-describedby="transition-modal-description"
         open={openModal}
         onClose={handleClose}
         closeAfterTransition
         BackdropComponent={Backdrop}
         BackdropProps={{ timeout: 500 }}
      >
         <Fade in={openModal}>
            <Box sx={style}>
               <Typography
                  id="transition-modal-title"
                  variant="h6"
                  component="h2"
               >
                  Block: {hash}
               </Typography>
               {loading ? (
                  <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
                     <CircularProgress color="inherit" />
                  </Stack>
               ) : (
                  transactionDetails && (
                     <div>
                        <Typography
                           id="transition-modal-description"
                           sx={{ mt: 2 }}
                        >
                           size: {transactionDetails.size}
                        </Typography>
                        <Typography
                           id="transition-modal-description"
                           sx={{ mt: 2 }}
                        >
                           Weight: {transactionDetails.weight}
                        </Typography>
                        <Typography
                           id="transition-modal-description"
                           sx={{ mt: 2 }}
                        >
                           Previous Hash: {transactionDetails.prev_block}
                        </Typography>
                     </div>
                  )
               )}
            </Box>
         </Fade>
      </Modal>
   );
};
export default TransactionModal;

export interface ITransactionDetails {
   size: string;
   prev_block: string;
   hash: string;
   next_block: string;
   weight: string
}

export interface ITransaction {
   hash: string;
   block_index: string;
   height: number;
   time: number;
}

export interface ITransactionModalProps {
   openModal: boolean;
   hash: string;
   handleClose: (value: boolean) => void;
}

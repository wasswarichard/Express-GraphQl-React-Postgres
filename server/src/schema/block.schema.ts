import { object, string, ref } from 'yup';

export const createBlockSchema = object({
   body: object({
      block_index: string().required('Block index is required'),
      hash: string().required('hash is required'),
      height: string()
         .required('height is required')
         .min(6, 'height is too short - should be 6 characters minimum'),
      time: string().required('time is required'),
   }),
});

export const createBlockDetailsSchema = object({
   body: object({
      block_index: string().required('Block index is required'),
      prev_block: string().required('Previous Block is required'),
      size: string().required('Block size is required'),
   }),
});

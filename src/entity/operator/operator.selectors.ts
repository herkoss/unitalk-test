import { useSelector } from '@/shared/lib/store-hooks';

export const useOperatorsSelector = () => useSelector((state) => state.operator.operators);

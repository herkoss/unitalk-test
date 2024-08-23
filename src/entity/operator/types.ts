import type { LoadableEntity } from '@/shared/types/common';

export interface OperatorRaw {
  id: string;
  name: string;
  avatar: string;
  createdAt: string;
  isWorking: boolean;
}

export interface Operator extends Omit<OperatorRaw, 'id'> {
  id: number;
}

export interface OperatorAddon {
  id: string;
  text: string;
  fieldName: string;
  isChecked: boolean;
}

export interface OperatorMergedOperatorAddon extends Operator, Partial<Omit<OperatorAddon, 'id'>> {}

export interface IOperatorState {
  operators: LoadableEntity<Array<OperatorMergedOperatorAddon>>;
}

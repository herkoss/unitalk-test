import type { OperatorAddon, OperatorMergedOperatorAddon, OperatorRaw } from './types';

export const mapOperators = (
  rawOperators: Array<OperatorRaw>,
  operatorAddons: Array<OperatorAddon>
): Array<OperatorMergedOperatorAddon> =>
  rawOperators.map((operator) => ({
    ...operator,
    ...operatorAddons.find((addon) => addon.id === operator.id),
    id: Number(operator.id)
  }));

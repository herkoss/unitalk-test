import { format } from 'date-fns';

import { Nullable, UndefinedOrNull, Undefined } from '@/shared/types/common';

export const isUndefined = <T>(value: Undefined<T>): value is undefined => value === undefined;

export const isNull = <T>(value: Nullable<T>): value is null => value === null;

export const isExist = <T>(value: UndefinedOrNull<T>): value is T =>
  !(isUndefined(value) || isNull(value));

const EMPTY_ARRAY_LENGTH = 0;
const ARRAY_LENGTH_OFFSET = 1;
export const isEmptyArray = <T>(value: Array<T>): boolean => value.length === EMPTY_ARRAY_LENGTH;

export const lastElementIndex = <T>(array: T[]) => array.length - ARRAY_LENGTH_OFFSET;

export const isLastElementIndex = (index: number, array: unknown[]) =>
  index === lastElementIndex(array);

export const formatDate = (dateRaw: string) => format(new Date(dateRaw), 'dd.MM.yyyy H:mm');

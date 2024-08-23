import { ReactNode } from 'react';

import { LoadableEntity } from '@/shared/types/common';
import { isExist } from '@/shared/lib/utils';

interface Props<T> {
  entity: LoadableEntity<T>;
  loaderFallback?: ReactNode;
  errorFallback?: ReactNode;
  children: ReactNode;
}

export const Led = <T,>({ entity, loaderFallback, errorFallback, children }: Props<T>) => {
  if (entity.isLoading && isExist(loaderFallback)) {
    return loaderFallback;
  }

  if (entity.error && isExist(errorFallback)) {
    return errorFallback;
  }

  return children;
};

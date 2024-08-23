import { FC, Fragment, ReactElement } from 'react';

import { isEmptyArray, isExist, isLastElementIndex } from '@/shared/lib/utils';

export enum IteratorModeEnum {
  raw = 'raw',
  unorderedList = 'unorderedList',
  orderedList = 'orderedList'
}

interface Props<T> {
  Render: FC<T>;
  data: Array<T>;
  mode?: IteratorModeEnum;
  fallback?: ReactElement;
  separator?: ReactElement;
  wrapperClassName?: string;
  keyFn?: (item: T) => undefined | string | number;
}

export const Iterator = <T extends object>({
  data,
  Render,
  mode = IteratorModeEnum.unorderedList,
  fallback,
  separator,
  wrapperClassName,
  keyFn
}: Props<T>) => {
  if (isExist(fallback) && isEmptyArray(data)) {
    return fallback;
  }

  const isRaw = mode === IteratorModeEnum.raw;

  const content = data.map((_data, index) => {
    if (isRaw) {
      if (isLastElementIndex(index, data)) {
        return (
          <Fragment key={keyFn ? keyFn(_data) : index}>
            <Render {..._data} />
          </Fragment>
        );
      }

      return (
        <Fragment key={keyFn ? keyFn(_data) : index}>
          <Render {..._data} />
          {separator}
        </Fragment>
      );
    }

    if (isLastElementIndex(index, data)) {
      return (
        <li key={keyFn ? keyFn(_data) : index}>
          <Render {..._data} />
        </li>
      );
    }

    return (
      <li key={keyFn ? keyFn(_data) : index}>
        <Render {..._data} />
        {separator}
      </li>
    );
  });

  switch (mode) {
    case IteratorModeEnum.raw:
      return <Fragment>{content}</Fragment>;
    case IteratorModeEnum.orderedList:
      return <ol className={wrapperClassName}>{content}</ol>;
    case IteratorModeEnum.unorderedList:
      return <ul className={wrapperClassName}>{content}</ul>;
    default:
      return <Fragment>{content}</Fragment>;
  }
};

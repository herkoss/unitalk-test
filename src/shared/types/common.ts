export type Undefined<T> = T | undefined;
export type Nullable<T> = T | null;
export type UndefinedOrNull<T> = T | null | undefined;

interface PendingEntity<T> {
  data: T;
  isLoading: true;
  error: null;
}
interface FulfilledEntity<T> {
  data: T;
  isLoading: false;
  error: null;
}
interface RejectedEntity<T> {
  data: T;
  isLoading: false;
  error: string;
}

export type LoadableEntity<T> = PendingEntity<T> | FulfilledEntity<T> | RejectedEntity<T>;

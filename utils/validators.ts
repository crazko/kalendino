import { isAfter, isBefore } from 'date-fns';

export const composeValidators = (...validators: any[]) => (value: any) =>
  validators.reduce((error, validator) => error || validator(value), undefined);

export const required = (value: any) => (value ? undefined : 'Required');

export const before = (value: Date) => (date: Date) => (isBefore(date, value) ? undefined : 'Required');

export const after = (value: Date) => (date: Date) => (isAfter(date, value) ? undefined : 'Required');

export const match = (pattern: RegExp) => (value: string) => (value.match(pattern) ? undefined : 'Wrong input');

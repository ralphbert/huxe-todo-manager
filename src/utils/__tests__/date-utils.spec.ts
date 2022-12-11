import { describe, it, expect } from 'vitest';
import { formatDateTime } from '../date-utils';

describe('date-utils', () => {
  it('should return correct format', () => {
    expect(formatDateTime('2022-01-15T12:00:00')).toBe('15.01.2022, 12:00');
    expect(formatDateTime('2022-01-15T12:00')).toBe('15.01.2022, 12:00');
  });

  it('should fail', () => {
    expect(() => formatDateTime('katze')).toThrowError();
  });
});

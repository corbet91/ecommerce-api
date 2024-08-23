import { JwtGuard } from './jwt-auth.guard.ts';

describe('JwtGuard', () => {
  it('should be defined', () => {
    expect(new JwtGuard()).toBeDefined();
  });
});

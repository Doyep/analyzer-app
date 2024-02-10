import { Token } from './token.model';

describe('Token', () => {
  it('should create an instance', () => {
    const token = new Token('access_token', 'refresh_token');
    expect(token).toBeTruthy();
  });
});

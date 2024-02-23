import { User } from './user.model'

describe('User', () => {
  it('should create an instance', () => {
    const user = new User(1, 'firstname', 'lastname', 'profileUrl', new Date())
    expect(user).toBeTruthy()
  })
})

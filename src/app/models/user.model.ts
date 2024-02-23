export class User {
  public readonly userId: number
  public readonly firstName: string
  public readonly lastName: string
  public readonly profileUrl: string
  public readonly lastSync: Date

  constructor(
    userId: number,
    firstName: string,
    lastName: string,
    profileUrl: string,
    lastSync: Date
  ) {
    this.userId = userId
    this.firstName = firstName
    this.lastName = lastName
    this.profileUrl = profileUrl
    this.lastSync = lastSync
  }
}

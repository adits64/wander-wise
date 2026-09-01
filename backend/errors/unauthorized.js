export class UnauthorizedError extends Error {
  constructor(message = "Invalid Credentials!") {
    super(message);
    this.name = "UnauthorizedError";
    this.status = 401;
  }
}

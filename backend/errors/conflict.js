export class ConflictError extends Error {
  constructor(message = "Already Exists!") {
    super(message);
    this.name = "ConflictError";
    this.status = 409;
  }
}

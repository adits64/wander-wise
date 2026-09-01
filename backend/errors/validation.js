export class ValidationError extends Error {
  constructor(message, errors = []) {
    super(message);
    this.name = "ValidationError";
    this.status = 400;
    this.errors = errors;
  }
}

export class EnvVariableError extends Error {
  constructor(variableName) {
    super(`${variableName} env variable not set or invalid - must be a number`);
  }
}

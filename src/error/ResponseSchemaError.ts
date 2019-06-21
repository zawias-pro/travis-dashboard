class ResponseSchemaError implements Error {
  public name: string = 'ResponseSchemaError';
  public message: string;

  constructor(message: string = 'Response is invalid') {
    this.message = message;
  }
}

export { ResponseSchemaError };

export interface InputErrorResponse {
  readonly param: string;
  readonly value: string;
  readonly message: string;
}

export interface ErrorResponse {
  readonly errors: Map<string, InputErrorResponse>;
}

export function ErrorResponse(errors: any): ErrorResponse {
  let errorResult: ErrorResponse = {
    errors: new Map<string, InputErrorResponse>(),
  };
  errors.map((error: any) => {
    const inputResponse: InputErrorResponse = {
      param: error.param,
      value: error.value,
      message: error.msg,
    };
    errorResult.errors.set(error.param, inputResponse);
  });
  return errorResult;
}

export class Result<T, E = unknown> {
  private constructor(
    public readonly status: boolean,
    public readonly message?: string,
    public readonly data?: T,
    public readonly error?: Record<string, string>
  ) {}

  static ok<T>(data: T, message?: string): Result<T> {
    return new Result<T>(true, message, data, undefined);
  }

  static error<E>(
    message: string,
    error?: Record<string, string>
  ): Result<never, E> {
    return new Result<never, E>(false, message, undefined, error);
  }
}

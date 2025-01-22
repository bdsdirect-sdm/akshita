class AppError extends  Error {
    statusCode: number;  // status code of the error
    constructor(message:string,statusCode:number) {
        super(message);
        this.statusCode = statusCode;
        this.stack  = new Error().stack;
    }
}

export  {AppError};
import { HttpException, HttpStatus } from "@nestjs/common";


export class UnconfirmException extends HttpException {
    constructor() {
      super('Password doesnt match', HttpStatus.FORBIDDEN);
    }
  }
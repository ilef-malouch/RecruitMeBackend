import { HttpException, HttpStatus } from "@nestjs/common";


export class ExistingEmailException extends HttpException {
    constructor() {
      super('Email does Exist !', HttpStatus.FORBIDDEN);
    }
  }
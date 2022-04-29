import { HttpException, HttpStatus } from "@nestjs/common";


export class RequiredException extends HttpException {
    constructor() {
      super('"Please provide your credentials !"', HttpStatus.FORBIDDEN);
    }
  }
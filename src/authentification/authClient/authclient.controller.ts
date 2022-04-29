import { Body, Controller, Get, Param, Post, Req, Res, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthclientService } from './authclient.service';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { Response ,Request } from 'express';
import { authClientSignUpDto } from './dto/authClientSignUp.dto';

@Controller('authclient')
export class AuthclientController {
    constructor(private authClientService:AuthclientService){}

   
    @Post("signin")
    async signIn(@Body() dto:authClientSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authClientService.signInClient(dto)
      
        return {token : token} ;

    }
    
   
 
    /*@Post('/picture/:jwt')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './files',
    filename: editFileName,
    }),
    }))
    uploadFile(
    @Param("jwt")jwt,
    @UploadedFile() file: Express.Multer.File) {
    console.log("1")
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
    console.log("2")
    console.log(response.filename);
    return this.authClientService.updatePicture(jwt,response.filename);
   
    
  } */

    @Get('/:imgpath')
    seeUploadedFile(@Param('imgpath') image,@Res() res) {
      return res.sendFile(image, { root: './files' });
    }

    

    @Get("clientInfo/:jwt")
    async getClientInfo(@Param("jwt")jwt:any){
      const clientInfo= this.authClientService.findClientByJWT(jwt);
      const client = await clientInfo;
      return {
        "firstName": client.FirstName,
        "familyName": client.FamilyName,
        "birthday": client.Birthday,
        "domaine": client.Domaine,
        "email": client.Email,
        "image":client.Image,
      };
    }

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
      
      this.authClientService.signoutClient(token);
      res.cookie('access_token', '', { expires: new Date() });
   
    }

    @Post("/signup")
    async signUp(@Body() dto:authClientSignUpDto,@Res({ passthrough: true }) response: Response){
        const token = await this.authClientService.signUpClient(dto) 
       
        return { token :token};
    }
}

import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthclientService } from './authclient.service';
import { authClientSignInDto } from './dto/authClientSignIn.dto';
import { Response ,Request } from 'express';
import { authClientSignUpDto } from './dto/authClientSignUp.dto';
import { diskStorage } from 'multer';

import { v4 as uuidv4 } from 'uuid' 

const editFileName = (req, file, cb) => {
  const randomName = uuidv4()+file.originalname;
  cb(null, randomName);
}

@Controller('authclient')
export class AuthclientController {
    constructor(private authClientService:AuthclientService){}

   
    @Post("/signin")
    async signIn(@Body() dto:authClientSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authClientService.signInClient(dto)
      
        return {token : token} ;

    }
    
   
   
    @Post('/picture/:jwt')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './files',
    filename: editFileName,
    }),
    }))
    uploadFile(
    @Param("jwt")jwt,
    @UploadedFile() file: Express.Multer.File) {
    console.log("com")
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
   console.log("emnce")
    console.log(response.filename);
    return this.authClientService.updatePicture(jwt,response.filename);
   
    
  } 
  @Post('/cv/:jwt')
    @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
    destination: './files',
    filename: editFileName,
    }),
    }))
    uploadCv(
    @Param("jwt")jwt,
    @UploadedFile() file: Express.Multer.File) {
    
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
  
    console.log(response.filename);
    return this.authClientService.updateCv(jwt,response.filename);
   
    
  } 

   @Get('/:imgpath')
    seeUploadedFile(@Param('imgpath') image,@Res() res) {
      return res.sendFile(image, { root: './files' });
    }

    

    @Get("clientInfo/:jwt")
    async getClientInfo(@Param("jwt")jwt:any){
      const clientInfo= this.authClientService.findClientByJWT(jwt);
      const client = await clientInfo;
      console.log("1")
      
      return {
        "firstName": client.FirstName,
        "familyName": client.FamilyName,
        "birthday": client.Birthday,
        "domaine": client.Domaine,
        "email": client.Email,
        "githubLink":client.GithubLink,
        "linkedinLink":client.LinkedinLink,
        "image":client.Image,
        "cv":client.Cv,
      };
    }

    @Get('/signout')
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

    @Get("candidateInfo/:email")
    async getCandidateInfo(@Param("email")email:any){
      const clientInfo= this.authClientService.findClientByEmail(email);
      const client = await clientInfo; 
      return {
        "firstName": client.FirstName,
        "familyName": client.FamilyName,
        "birthday": client.Birthday,
        "domaine": client.Domaine,
        "email": client.Email,
        "githubLink":client.GithubLink,
        "linkedinLink":client.LinkedinLink,
        "image":client.Image,
        "cv":client.Cv,
      };
    }
}

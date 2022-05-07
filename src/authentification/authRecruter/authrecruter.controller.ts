import { Body, Controller, Get, Param, Post, Req, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AuthrecruterService } from './authrecruter.service';
import { authRecruterSignInDto } from './dto/authRecruterSignIn.dto';
import { Response ,Request } from 'express';
import { authRecruterSignUpDto } from './dto/authRecruterSignUp.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid'

const editFileName = (req, file, cb) => {
  const randomName = uuidv4()+file.originalname;
  cb(null, randomName);
}

@Controller('authrecruter')
export class AuthrecruterController {
    constructor(private authRecruterService:AuthrecruterService){}

   
    @Post("/signin")
    async signIn(@Body() dto:authRecruterSignInDto,@Res({ passthrough: true }) response: Response){
     
        const token = await this.authRecruterService.signInRecruter(dto)
      
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
    console.log("1")
    const response = {
    originalname: file.originalname,
    filename: file.filename,
    };
    console.log("2")
    console.log(response.filename);
    return this.authRecruterService.updatePicture(jwt,response.filename);
   
    
  } 
  
  @Get('/:imgpath')
    seeUploadedFile(@Param('imgpath') image,@Res() res) {
      return res.sendFile(image, { root: './files' });
    }

    

    @Get("/recruterInfo/:jwt")
    async getRecruterInfo(@Param("jwt")jwt:any){
      const recruterInfo= this.authRecruterService.findRecruterByJWT(jwt);
      const recruter = await recruterInfo;
      console.log("zaineb")
      return {
        "compagnyName": recruter.CompagnyName,
        "idCompagny": recruter.IdCompagny,
        "domaine": recruter.Domaine,
        "email": recruter.Email,
        "facebookLink": recruter.FacebookLink,
        "linkedinLink": recruter.LinkedinLink,
        "image":recruter.Image,
      };
    }

    @Get('signout')
    async logout(@Req()req:Request,@Res({ passthrough: true }) res: Response) {
      
      const token =req.cookies.access_token;
      
      this.authRecruterService.signoutRecruter(token);
      res.cookie('access_token', '', { expires: new Date() });
   
    }

    @Post("/signup")
    async signUp(@Body() dto:authRecruterSignUpDto,@Res({ passthrough: true }) response: Response){
        const token = await this.authRecruterService.signUpRecruter(dto) 
       
        return { token :token};
    }
}

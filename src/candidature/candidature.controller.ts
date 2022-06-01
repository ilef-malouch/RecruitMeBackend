import { Body, Controller, Get, Param, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { GetClient } from 'src/authentification/authClient/decorateur/getUser.paramDecorater';
import { JwtAuthGuard } from 'src/authentification/authRecruter/guads/JwtGuard.guard';
// import { JwtAuthGuard } from 'src/authentification/authClient/guads/JwtGuard.guard';
import { CreateCandidatureDto } from './candidature-dto';
import { CandidatureDetails } from './candidature.interface';
import { CandidatureService } from './candidature.service';
 
@Controller('candidature')
export class CandidatureController {
    constructor(private candidatureService:CandidatureService){}
    @Post('postuler')
    @UseGuards(JwtAuthGuard)
    addCandidat(@Body() createCandidatureDto: CreateCandidatureDto,
    // @Request() req
        @GetClient() client
    ): Promise<CandidatureDetails | null> {
        console.log("hola" ,client);
        
        return this.candidatureService.create(createCandidatureDto, client);
    }
    
    @Get()
    getCandidatures() {
        return this.candidatureService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.candidatureService.findOne(id);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        console.log("name");
        console.log(file.originalname);
        return file;
        
    }

    


}

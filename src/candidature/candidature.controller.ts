import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { GetClient } from 'src/authentification/authClient/decorateur/getUser.paramDecorater';
import { JwtAuthGuard } from 'src/authentification/authClient/guads/JwtGuard.guard';
import { CreateCandidatureDto } from './candidature-dto';
import { CandidatureDetails } from './candidature.interface';
import { CandidatureService } from './candidature.service';
 
@Controller('candidature')
export class CandidatureController {
    constructor(private candidatureService:CandidatureService){}
    @Post('postuler')
    // @UseGuards(JwtAuthGuard)
    addCandidat(@Body() createCandidatureDto: CreateCandidatureDto,
    @Request() req
        // @GetClient() client
    ): Promise<CandidatureDetails | null> {
        console.log("hola" ,req.user);
        
        return this.candidatureService.create(createCandidatureDto, req.user);
    }
    
    @Get()
    getCandidatures() {
        return this.candidatureService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.candidatureService.findOne(id);
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Controller('guestbook')
export class GuestbookController {
    constructor(private readonly guestbookService: GuestbookService) { }

    @Get()
    findAll() {
        return this.guestbookService.findAll();
    }

    @Post()
    create(@Body() createEntryDto: CreateEntryDto) {
        return this.guestbookService.create(createEntryDto);
    }
}

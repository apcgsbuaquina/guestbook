import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateEntryDto } from './dto/create-entry.dto';

@Injectable()
export class GuestbookService {
    constructor(private readonly supabaseService: SupabaseService) { }

    async findAll() {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data;
    }

    async create(createEntryDto: CreateEntryDto) {
        const { data, error } = await this.supabaseService
            .getClient()
            .from('guestbook')
            .insert([
                {
                    name: createEntryDto.name,
                    message: createEntryDto.message,
                },
            ])
            .select();

        if (error) {
            throw new InternalServerErrorException(error.message);
        }

        return data[0];
    }
}

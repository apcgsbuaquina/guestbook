import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntryDto {
    @IsString()
    @IsNotEmpty({ message: 'Name is required' })
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Message is required' })
    message: string;
}

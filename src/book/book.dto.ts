import { IsISBN, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BookDTO {
  @IsISBN()
  isbn: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  subtitle: string;

  @IsNumber(
    { allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
    { each: true },
  )
  authorIds: number[];
}

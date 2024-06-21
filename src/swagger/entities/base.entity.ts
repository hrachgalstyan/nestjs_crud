import { ApiProperty } from '@nestjs/swagger';

export class BaseEntity {
  @ApiProperty({
    example: 1,
    description: `The id of the record`,
  })
  id: number;
}

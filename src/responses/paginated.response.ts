import { ApiProperty } from '@nestjs/swagger';

export interface PaginatedResponse<T> {
  rows: T[];
  count: number;
  page?: number;
  limit?: number;
}

export function PaginatedObjectType<T>(classRef: new () => T) {
  abstract class PaginatedResponseClass implements PaginatedResponse<T> {
    @ApiProperty({ type: () => [classRef] })
    rows: T[];

    @ApiProperty()
    count: number;

    @ApiProperty()
    page?: number;

    @ApiProperty()
    limit?: number;
  }

  return PaginatedResponseClass;
}

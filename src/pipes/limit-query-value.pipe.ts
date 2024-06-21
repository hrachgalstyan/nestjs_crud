import { Injectable, PipeTransform } from '@nestjs/common';

/**
 * A pipe that limits the query value to a maximum of 15.
 * This is useful for limiting the number of items returned in a paginated response.
 * For example, if the user requests 100 items, the pipe will limit the value to 15 (I chose 15 arbitrarily).
 * If the user requests a non-numeric value, the pipe will return 15.
 */
@Injectable()
export class LimitQueryValuePipe implements PipeTransform {
  transform(value: any): number {
    const numValue = Number(value);

    /**
     * If the value is not a number or is greater than 15, return 15. (I chose 15 arbitrarily)
     */
    if (isNaN(numValue) || numValue > 15) {
      return 15;
    }

    return numValue;
  }
}

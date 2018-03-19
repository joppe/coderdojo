import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatService {
    public date(datetime: string): string {
        const d: Date = new Date(datetime);

        const month: number = d.getMonth() + 1;
        const day: number = d.getDate();

        return `${d.getFullYear()}-${month < 10 ? '0' : ''}${month}-${day < 10 ? '0' : ''}${day}`;
    }
}

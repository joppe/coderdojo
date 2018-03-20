import { Pipe, PipeTransform } from '@angular/core';

import { IUser } from '@app/user/user.interface';

@Pipe({
    name: 'name'
})
export class NamePipe implements PipeTransform {
    public transform(user: IUser, format: string): string {
        const parts: string[] = [];
        let separator: string = ' ';

        switch (format) {
            case 'abbr':
                parts.push(user.firstName.substring(0, 1).toLowerCase());

                if (user.middleName) {
                    parts.push(user.middleName
                        .split(' ')
                        .map((part: string): string => {
                            return part.substring(0, 1);
                        })
                        .join('')
                        .toLowerCase());
                }

                parts.push(user.lastName.substring(0, 1).toLowerCase());

                separator = '';
                break;
            case 'short':
                parts.push(`${user.firstName.substring(0, 1)}.`);

                if (user.middleName) {
                    parts.push(user.middleName);
                }

                parts.push(user.lastName);
                break;
            case 'full':
            default:
                parts.push(user.firstName);

                if (user.middleName) {
                    parts.push(user.middleName);
                }

                parts.push(user.lastName);
        }

        return parts.join(separator);
    }
}

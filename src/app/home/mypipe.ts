import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'convertFrom24To12Format' })
export class TimeFormat implements PipeTransform {
    transform(testtime: any): any {
        let ty = testtime.split(" ")[0];
        let time = testtime.split(" ")[1];
        let hour = (time.split(':'))[0]
        let min = (time.split(':'))[1]
        let part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? `0${min}` : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? `0${hour}` : hour;
        return `${ty} ${hour}:${min} ${part}`
    }
}
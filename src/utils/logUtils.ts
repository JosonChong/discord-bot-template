import moment from 'moment';
import cliColor from 'cli-color';

export function log(message: string) {
    let now = new Date().getTime();
    console.log(cliColor.green(moment(now).format('DD/MM HH:mm:ss')) + " " + message);
}
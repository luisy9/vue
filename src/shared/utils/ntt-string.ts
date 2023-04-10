export class NttString {

    public static Empty: string = '';

    public static booleanToString(value: boolean): string {
        return value ? 'Sí' : 'No';
    }

    public static IsNullOrWhiteSpace(value: string | null): boolean {
        try {
            if (value == null || value === 'undefined') {
                return true;
            }

            return value.toString().replace(/\s/g, '').length < 1;
        } catch (e) {
            return false;
        }
    }

    public static FormatCamelCase(value: string): string {
        let result = value.replace(/([A-Z]+)/g, ' $1');
        if (result.indexOf(' ') === 0) {
            result = result.substring(1, result.length);
        }
        return result;
    }

    public static SplitComaToBr(value: string): string {
        const result = value.replace(/(,+)/g, '<br/>');
        return result;
    }

    public static cleanCharacter(value: string, char: string): string {
        if (value == null) { return value; }
        if (value.indexOf(char) === -1) {
            return value;
        } else {
            value = value.replace(char, '');
            return this.cleanCharacter(value, char);
        }
    }

    public static countChar(value: string, char: string): number {
        return ((value.match(new RegExp(char, 'g')) || []).length);
    }

    public static Format(format: any, ...args: any): string {
        try {
            return format.toString().replace(/{(\d+(:\w*)?)}/g, (match: any, i: any) => {
                const s = match.split(':');
                if (s.length > 1) {
                    i = i[0];
                    match = s[1].replace('}', '');
                }

                const arg = this.parsePattern(match, args[i]);
                return typeof arg !== 'undefined' && arg != null ? arg : this.Empty;
            });
        } catch (e) {
            return this.Empty;
        }
    }

    protected static parsePattern(match: any, arg: any): string {
        if (arg == null || arg === undefined) {
            return arg;
        }

        switch (match) {
            case 'L':
                arg = arg.toLowerCase();
                break;
            case 'U':
                arg = arg.toUpperCase();
                break;
            case 'd':
                {
                    const splitted = arg.split('-');
                    if (splitted.length <= 1) {
                        return arg;
                    }

                    let day = splitted[splitted.length - 1];
                    const month = splitted[splitted.length - 2];
                    const year = splitted[splitted.length - 3];
                    day = day.split('T')[0];
                    day = day.split(' ')[0];

                    arg = day + '.' + month + '.' + year;
                }
                break;
            case 's':
                {
                    const splitted = arg.replace(',', '').split('.');
                    if (splitted.length <= 1) {
                        return arg;
                    }

                    let time = splitted[splitted.length - 1].split(' ');
                    if (time.length > 1) {
                        time = time[time.length - 1];
                    }

                    const year = splitted[splitted.length - 1].split(' ')[0];
                    const month = splitted[splitted.length - 2];
                    const day = splitted[splitted.length - 3];

                    arg = year + '-' + month + '-' + day;
                    if (time.length > 1) {
                        arg += 'T' + time;
                    } else {
                        arg += 'T' + '00:00:00';
                    }
                }
                break;

            case 'n':
                if (isNaN(parseInt(arg, 10)) || arg.length <= 3) {
                    break;
                }

                arg = arg.toString();
                const mod = arg.length % 3;
                let output = (mod > 0 ? (arg.substring(0, mod)) : this.Empty);
                for (let i = 0; i < Math.floor(arg.length / 3); i++) {
                    if ((mod === 0) && (i === 0)) {
                        output += arg.substring(mod + 3 * i, mod + 3 * i + 3);
                    } else {
                        output += '.' + arg.substring(mod + 3 * i, mod + 3 * i + 3);
                    }
                }
                arg = output;
                break;
            default:
                break;
        }

        return arg;
    }

}
class Log {
    public static _enable: boolean = false;

    static get enable(): boolean {
        return this._enable;
    }

    static set enable(value: boolean) {
        this._enable = value;
    }

    public static d(object: any) {
        if (!Log._enable) {
            return;
        }
        console.debug(object);
    };

    public static l(object: any) {
        if (!Log._enable) {
            return;
        }
        console.log(object);
    }

    public static e(object: any) {
        if (!Log._enable) {
            return;
        }
        console.error(object);
    }

    public static w(object: any) {
        if (!Log._enable) {
            return;
        }
        console.warn(object);
    }

    public static i(object: any) {
        if (!Log._enable) {
            return;
        }
        console.info(object);
    }
}

export default Log;
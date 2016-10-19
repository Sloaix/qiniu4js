class Debug {
    private static _enable: boolean = true;

    static get enable(): boolean {
        return this._enable;
    }

    static set enable(value: boolean) {
        this._enable = value;
    }

    public static d(object) {
        if (!Debug._enable) {
            return;
        }
        console.debug(object);
    };

    public static l(object) {
        if (!Debug._enable) {
            return;
        }
        console.log(object);
    }

    public static e(object) {
        if (!Debug._enable) {
            return;
        }
        console.error(object);
    }

    public static w(object) {
        if (!Debug._enable) {
            return;
        }
        console.warn(object);
    }

    public static i(object) {
        if (!Debug._enable) {
            return;
        }
        console.info(object);
    }
}

export default Debug;
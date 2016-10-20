class JSON {
    public static parse(str: string): Object|boolean {
        let object = null;
        try {
            object = JSON.parse(str);
        } catch (e) {
            return false;
        }
        return object;
    }
}

export default JSON;
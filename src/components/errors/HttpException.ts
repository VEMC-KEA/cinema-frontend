class HttpException {
    public status: number;
    public message: string;
    constructor(message: string, status?: number) {
        this.status = status || 500;
        this.message = message;
    }
}

export default HttpException;

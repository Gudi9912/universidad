export class ResourceNotFound extends Error{
    status
    constructor(message){
        super(message);
        this.status = 404
    }
}
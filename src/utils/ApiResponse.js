
// status code above 400 is for error

class ApiResponse {
    constructor(statusCode, data, message = "Success"){
        this.data = data
        this.message = message
        this.statusCode = statusCode
        this.success = statusCode < 400  //setting the statusCode
    }
}

export { ApiResponse }
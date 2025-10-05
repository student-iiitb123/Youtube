class apierror extends Error{
    constructor(statusCode,
        message="something went Wrong",
       errors= [],
       stack =""
        

    ){
        super(message)
           this.statusCode = statusCode
           this.data = null
           this.message = message
           this.sucess = false
           this.errors = this.errors
    }
}

export {apierror}
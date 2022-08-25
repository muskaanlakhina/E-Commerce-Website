// 404

const notFound= ((req,res,next)=>{
    const error =new Error(`Not Found - ${req.originalUrl}`)
    res.status(404)
    next(error)

}

)
// a function that get a error req and return json format.

const errorHandler = ((err,req,res,next)=>{
    const statusCode =res.statusCode === 200 ? 500 :res.statusCode
    res.status(statusCode)
    res.json({
        massage:err.massage,
        stack:process.env.NODE_ENV === 'production' ? null :err.stack,
    })
}
)
 export {notFound,errorHandler}
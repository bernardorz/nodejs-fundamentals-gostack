import { Response, Request, NextFunction } from 'express'

export  const ValidateParams = ( request : Request,response : Response, next : NextFunction) => {


  const { title, value, type } = request.body
  const checkedParams  = !title || !value || !type || (type !== 'income' && type !== 'outcome')

  if(checkedParams){
  return response.status(400).json({ message : 'Please check past parameters'})
  }

  return next()
}

import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodEffects } from "zod";

const validateRequestJson =
  (schema: AnyZodObject | ZodEffects<AnyZodObject>) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => { 
    try { 
      await schema.parseAsync({
        body: req.body.data && JSON.parse(req.body.data),
        query: req.query,
        params: req.params,
        cookies: req.cookies,
      });
      req.body = req.body.data && JSON.parse(req.body.data);
      return next();
    } catch (error) {
      next(error);
    }
  };

export default validateRequestJson;

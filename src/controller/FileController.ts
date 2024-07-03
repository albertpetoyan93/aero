import { NextFunction, Request, Response } from "express";
import HttpStatusCodes from "../constants/HttpStatusCodes";
import FileService from "../services/FileService";

export default class FileController {
  static uploadSingle = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }]
    #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['file'] = {
          in: 'formData',
          required: 'true',
          type: 'file'
    } 
    */

    try {
      const result = await FileService.uploadSingle(req.file);

      res.json({
        status: HttpStatusCodes.CREATED,
        result,
      });
    } catch (e) {
      next(e);
    }
  };
  static list = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }]
    */
    try {
      const { list_size, page } = req.query;

      const limit = list_size ? +list_size : 10;
      const offset = page && Number(page) > 0 ? Number(page) : 1;

      const result = await FileService.list({
        limit,
        offset,
      });

      res.json({
        status: HttpStatusCodes.OK,
        result,
      });
    } catch (e) {
      next(e);
    }
  };
  static deleteSingle = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { id } = req.params;

      const deletedFile = await FileService.deleteSingle(id);

      await FileService.deleteSingleDb(deletedFile.path);

      res.json({
        status: HttpStatusCodes.OK,
      });
    } catch (e) {
      next(e);
    }
  };
  static single = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { id } = req.params;

      const result = await FileService.single(id);

      res.json({
        status: HttpStatusCodes.OK,
        result,
      });
    } catch (e) {
      next(e);
    }
  };
  static download = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }] */
    try {
      const { id } = req.params;

      const result = await FileService.download(id);

      res.download(result);
    } catch (e) {
      next(e);
    }
  };
  static update = async (req: any, res: Response, next: NextFunction) => {
    // #swagger.tags = ['File']
    /* #swagger.security = [{
            "apiKey": []
    }] 
      #swagger.consumes = ['multipart/form-data']  
      #swagger.parameters['file'] = {
          in: 'formData',
          required: 'true',
          type: 'file'
    }         
    */
    try {
      const { id } = req.params;

      const { oldFile } = await FileService.updateSingle(id, req.file);

      await FileService.deleteSingleDb(oldFile.path);

      res.json({
        status: HttpStatusCodes.OK,
      });
    } catch (e) {
      next(e);
    }
  };
}

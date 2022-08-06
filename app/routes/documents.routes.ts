import { NextFunction, Request, Response, Express } from 'express';

import controller from '../controllers/documents.controller';

export default (app: Express) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header(
      'Access-Control-Allow-Headers',
      'x-access-token, Origin, Content-Type, Accept'
    );
    next();
  });

  app.get('/api/documents', controller.getDocuments);

  app.get(
    '/api/documents/definitionAndLayout',
    controller.getDocumentsDefinitionAndLayout
  );

  app.post('/api/documents', controller.addDocument);
};

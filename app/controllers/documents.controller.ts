import { Request, Response } from 'express';

import {
  documentsData,
  documentsLayoutData,
  documentsDefinitionData,
} from '../data/data';
import {
  IDocumentDefinition,
  IDocumentEntity,
  IDocumentLayout,
  INewDocument,
} from '../types/documents.types';
import { TypedRequestBody } from '../types/global.types';
import { DocumentDefinitionTypesEnum } from '../variables/documents.variables';

export interface IAddDocumentRequestBody {
  newDocument: INewDocument;
}

export interface IGetDocumentsResponse {
  documents: IDocumentEntity[];
}

const getDocuments = async (req: Request, res: Response) => {
  try {
    res.status(200).send({ documents: documentsData });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send({
      message: error.message,
    });
  }
};

const getDocumentsDefinitionAndLayout = async (req: Request, res: Response) => {
  const documentsLayout: IDocumentLayout = JSON.parse(documentsLayoutData);
  const documentsDefinition: IDocumentDefinition = JSON.parse(
    documentsDefinitionData
  );

  try {
    res.status(200).send({ documentsLayout, documentsDefinition });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send({
      message: error.message,
    });
  }
};

const addDocument = async (
  req: TypedRequestBody<IAddDocumentRequestBody>,
  res: Response
) => {
  try {
    const { newDocument } = req.body;

    const documentsDefinition: IDocumentDefinition = JSON.parse(
      documentsDefinitionData
    );

    const documentsDefinitionFieldIds = documentsDefinition.schema.fields.map(
      (field) => field._id
    );

    if (
      !(
        documentsDefinitionFieldIds.sort().join(',') ===
        Object.keys(newDocument).sort().join(',')
      )
    ) {
      throw new Error('Please fill all fields');
    }

    documentsDefinition.schema.fields.map((field) => {
      const newDocumentField = newDocument[field._id];

      if (typeof newDocumentField.value === field.type) {
        return true;
      } else if (
        field.type === DocumentDefinitionTypesEnum.TEXT &&
        typeof newDocumentField.value === 'string'
      ) {
        return true;
      } else {
        throw new Error(`Field "${field.name} with a wrong type"`);
      }
    });

    const newDocumentEntity: IDocumentEntity = Object.values(
      newDocument
    ).reduce((obj, item) => {
      return {
        ...obj,
        [item.name]: item.value,
      };
    }, {});

    documentsData.push(newDocumentEntity);

    res.status(200).send({ documents: documentsData });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export default {
  getDocuments,
  getDocumentsDefinitionAndLayout,
  addDocument,
};

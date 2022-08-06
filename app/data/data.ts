import { IDocumentEntity } from '../types/documents.types';

export const documentsLayoutData =
  '{"header":{"rows":[{"columns":[{"type":"field","fieldId":"cc4cb134-fda0-44d8-8e92-e42ebbceb415"},{"type":"field","fieldId":"228b905f-4a43-4a40-b829-0c6a04ad4782"}]},{"columns":[{"type":"button","actionType":"save","label":"Save"}]}]}}';

export const documentsDefinitionData =
  '{"schema":{"fields":[{"_id":"cc4cb134-fda0-44d8-8e92-e42ebbceb415","label":"Client Name","name":"name","type":"text","maxLength":100},{"_id":"228b905f-4a43-4a40-b829-0c6a04ad4782","label":"Client Age","name":"age","type":"number"}]}}';

export const documentsData: IDocumentEntity[] = [
  {
    name: 'Dean',
    age: 25,
  },
];

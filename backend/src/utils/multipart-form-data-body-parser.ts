import { Scalars } from '@/types';

import { Request, BodyParser, RequestBody } from '@loopback/rest';

import multer from 'multer';

import { EnvironmentServiceConstants } from '../keys';

export const FORM_DATA = 'multipart/form-data';

export class MultipartFormDataBodyParser implements BodyParser {
  name = FORM_DATA;

  supports(mediaType: Scalars['String']) {
    // The mediaType can be
    // `multipart/form-data; boundary=--------------------------979177593423179356726653`
    return mediaType.startsWith(FORM_DATA);
  }

  async parse(request: Request): Promise<RequestBody> {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => cb(null, EnvironmentServiceConstants.UPLOAD_PATH),
      filename: (req, file, cb) => cb(null, file.originalname.replace(/ /gi, '_')),
    });

    const upload = multer({ storage });

    return new Promise<RequestBody>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      upload.any()(request, {} as any, err => {
        if (err) reject(err);
        else if (Array.isArray(request.files)) {
          resolve({ value: request.files });
        } else {
          reject({
            error: 'request.files in not an array'
          });
        }

      });
    });
  }
}

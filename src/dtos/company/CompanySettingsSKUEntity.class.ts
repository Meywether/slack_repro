import { Exclude } from 'class-transformer';
import { CompanySFTPFileSettingsPGEntity } from './CompanySFTPFileSettingsPG.dto';

export class CompanySFTPFileSettingsSKUEntity {
  constructor(payload: CompanySFTPFileSettingsSKUEntity) {
    this.id = payload.id;
    this.articleNumber = payload.articleNumber;
    this.description = payload.description;
    this.data = null;
    this.dateFormat = payload.dateFormat;
    this.fileType = payload.fileType;
    this.created_at = payload.created_at;
    this.updated_at = payload.updated_at;
    this.version = payload.version;
    this.cid = payload.cid;
    this.companySFTPFileSettingsPG = payload.companySFTPFileSettingsPG;
  }
  id: string;

  articleNumber: string;

  description: string;

  dateFormat: string;

  fileType: string;

  created_at: Date;

  updated_at: Date;

  deleted_at: Date;

  version: number;

  @Exclude()
  //Placeholder for stringified data
  data: string = null;

  @Exclude()
  //Placeholder for cid
  cid: string;

  @Exclude()
  logID: number;

  companySFTPFileSettingsPG: CompanySFTPFileSettingsPGEntity[];

  // PG Sort & PG Names joinen
}

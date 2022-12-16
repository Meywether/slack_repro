import { Exclude } from 'class-transformer';

export class CompanySFTPFileSettingsPromotionsEntity {
  constructor(payload: CompanySFTPFileSettingsPromotionsEntity) {
    this.id = payload.id;
    this.sku = payload.sku;
    this.promotionName = payload.promotionName;
    this.from = payload.from;
    this.to = payload.to;
    this.created_at = payload.created_at;
    this.updated_at = payload.updated_at;
    this.deleted_at = payload.deleted_at;
    this.version = payload.version;
    this.cid = null;
  }
  id: string;

  sku: string;

  promotionName: string;

  from: string;

  to: string;

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
}

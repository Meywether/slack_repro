import { Exclude } from 'class-transformer';

export class CompanySFTPFileSettingsSalesEntity {
  constructor(payload: CompanySFTPFileSettingsSalesEntity) {
    this.id = payload.id;
    this.articleNumber = payload.articleNumber;
    this.orderDate = payload.orderDate;
    this.orderNumber = payload.orderNumber;
    this.quantity = payload.quantity;
    this.dateFormat = payload.dateFormat;
    this.created_at = payload.created_at;
    this.updated_at = payload.updated_at;
    this.deleted_at = payload.deleted_at;
    this.version = payload.version;
    this.retailPrice = payload.retailPrice;
    this.wholesalePrice = payload.wholesalePrice;
    this.tax = payload.tax;
    this.cid = null;
  }
  id: string;

  articleNumber: string;

  orderDate: string;

  orderNumber: string;

  quantity: string;

  dateFormat: string;

  wholesalePrice: string;

  retailPrice: string;

  tax: string;

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
}

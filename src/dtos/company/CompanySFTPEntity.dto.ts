import { Exclude } from 'class-transformer';
import { CompanySFTPFileSettingsSKUEntity } from './CompanySettingsSKUEntity.class';
import { CompanySFTPFileSettingsPromotionsEntity } from './CompanySFTPFileSettingsPromotions.class';
import { CompanySFTPFileSettingsSalesEntity } from './CompanySFTPFileSettingsSales.class';

export class CompanySFTPEntity {
  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  @Exclude()
  id: string;

  @Exclude()
  cid: string;

  @Exclude()
  username: string;

  @Exclude()
  password: string;

  @Exclude()
  url: string;

  @Exclude()
  port: number;

  @Exclude()
  pathToUploads: string;

  @Exclude()
  pathToDownloads: string;

  created_at: Date;

  @Exclude()
  updated_at: Date;

  @Exclude()
  deleted_at: Date;

  @Exclude()
  version: number;

  companySFTPFileSettingsSKU: CompanySFTPFileSettingsSKUEntity;

  companySFTPFileSettingsSales: CompanySFTPFileSettingsSalesEntity;

  companySFTPFileSettingsPromotions: CompanySFTPFileSettingsPromotionsEntity;
}

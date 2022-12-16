import { BadRequestException, Inject, Injectable, Logger, LoggerService } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { CustomerEntityDto, IndustryEntity } from '../../dtos';

@Injectable()
export class CustomerUtilityService {
  constructor(
    @Inject('SETTINGS_MICROSERVICE')
    private settingsClient: ClientProxy,
    @Inject(Logger) private readonly logger: LoggerService,
  ) {}

  public async validateEntities(userEntityDto: CustomerEntityDto): Promise<void> {
    // Subindustry entity can be a custom input, due to this fact, it wont be validated.
    const industry_id = userEntityDto.industry_id;
    if (!userEntityDto.subindustry_id) {
      userEntityDto.subindustry_id = null;
    }
    try {
      const industry = await lastValueFrom(this.settingsClient.send<IndustryEntity, string>('getIndustryByID', industry_id));
      if (!industry) {
        throw new BadRequestException('industry  id not found');
      }
    } catch (error) {
      throw new BadRequestException('industry  id not found');
    }
  }
}

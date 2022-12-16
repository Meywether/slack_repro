import { CustomerEntity } from './CustomerEntity.class';

export class CustomerPaginationDTO {
  users: CustomerEntity[];
  total: number;
}

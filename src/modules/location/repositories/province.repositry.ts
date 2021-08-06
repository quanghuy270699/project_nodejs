import { Repository, EntityRepository } from "typeorm";
import { MProvince } from "../province.entity";

@EntityRepository(MProvince)
export class MProvinceRepository extends Repository<MProvince>{
  
}
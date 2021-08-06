import { Repository, EntityRepository } from "typeorm";
import { MWard } from "../ward.entity";

@EntityRepository(MWard)
export class MWardRepository extends Repository<MWard>{
  
}
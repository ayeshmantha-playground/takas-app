import {AdEntity} from "../../entity/ad.entity";
import {CrudRepository} from "../crud.repository";

export interface AdRepository extends CrudRepository<AdRepository, number> {

}




import {AdEntity} from "../../entity/ad.entity";
import {ImageEntity} from "../../entity/image.entity";
import {CrudRepository} from "../crud.repository";

export interface ImageRepository extends CrudRepository<ImageEntity, number>{

}
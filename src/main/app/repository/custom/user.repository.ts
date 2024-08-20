import {AdEntity} from "../../entity/ad.entity";
import {UserEntity} from "../../entity/user.entity";
import {CrudRepository} from "../crud.repository";

export interface UserRepository extends CrudRepository<UserEntity, string> {

}
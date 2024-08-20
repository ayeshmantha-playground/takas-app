import {AdEntity} from "../../entity/ad.entity";
import {AdTo} from "../../to/adTo";

export interface AdService {
    getAllAds(): Promise<Array<AdTo>>

    getAdsByUser(email: string): Promise<Array<AdTo>>

    getAlById(adId: string): Promise<Array<AdTo>>

    createNewAd(email: string, ad: AdTo): Promise<AdTo>

    deleteAd(email: string, adId: number): Promise<void>

}
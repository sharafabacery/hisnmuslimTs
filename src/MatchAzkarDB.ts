import { IAzkarBaseData } from "./interface/IAzkarBaseData";
import { IAzkarDB } from "./interface/IAzkarDB";
import { IMatchedAzkar } from "./interface/IMatchedAzkar";

export class MatchAzkarDB{
    matchAzkarBase(arabicAzkar:IAzkarBaseData[]){
        let matches:IMatchedAzkar[]=[]
        arabicAzkar.forEach(zekr=>{
            if(zekr.id<27){
                matches.push({
                    order:zekr.id+2,
                    audio:zekr.audioUrl
                })
            }else if(zekr.id==27){
                matches.push({
                    order:zekr.id+2,
                    audio:zekr.audioUrl
                })
                matches.push({
                    order:zekr.id+3,
                    audio:zekr.audioUrl
                })
            }else{
                matches.push({
                    order:zekr.id+3,
                    audio:zekr.audioUrl
                })
            }
        })
        return matches
    }
}
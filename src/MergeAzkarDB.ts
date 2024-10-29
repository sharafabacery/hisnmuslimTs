import { IAzkarDB } from "./interface/IAzkarDB";
import { ICommentaryDB } from "./interface/ICommentaryDB";

export class MergeAzkarDB{
    mergeAzkar(azkar:IAzkarDB[],commentary:ICommentaryDB[]){
        let returnAzkar:IAzkarDB[]=[]
        returnAzkar=azkar.map(zekr=>{
        return{
            ...zekr,
            azkarDetails:zekr.azkarDetails.map((details)=>{
                let comment=commentary.find(c=>c.contentId==details.id)
                if(comment!=undefined){
                    console.log(comment)
                    details.benefit=comment.benefit
                    details.hadith=comment.hadith
                    details.sharh=comment.sharh
                }
                return details
            })
        }    
           
        })
        return returnAzkar
    }
}
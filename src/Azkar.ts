import axios from "axios";
import { IAzkarBaseData } from "./interface/IAzkarBaseData";
import { IAzkar } from "./interface/IAzkar";
import { AzkarBaseData } from "./AzkarBaseData";

export class Azkar{
    async fetchAzkar(azkarBaseData:IAzkarBaseData,language:string){
        let result:IAzkar[]=[]
        console.log(azkarBaseData.title+" working on it.")
        let searcher:string;
        if(azkarBaseData.id==86&&language=='English'){
           searcher='http://www.hisnmuslim.com/api/en/86.json'
        }else if(azkarBaseData.id==86&&language=='العربية'){
            searcher='http://www.hisnmuslim.com/api/ar/86.json'
        }else{
            searcher=azkarBaseData.text
        }
        const res=await axios.get(searcher)
        res.data[azkarBaseData.title]?.forEach((e: { ID: any; ARABIC_TEXT: any; LANGUAGE_ARABIC_TRANSLATED_TEXT: any; TRANSLATED_TEXT: any; REPEAT: any; AUDIO: any; })=>{
            result.push({
                id: e.ID,
                arabicText: e.ARABIC_TEXT,
                translatedText: e.LANGUAGE_ARABIC_TRANSLATED_TEXT,
                languageArabicTranslatedText: e.TRANSLATED_TEXT,
                repeat: e.REPEAT,
                audio: e.AUDIO
            })
        })
        return result
    }
}
import axios from "axios";
import { IAzkarBaseData } from "./IAzkarBaseData";

export class AzkarBaseData{
    async fetchAzkarBaseData(url:string,language:string){
        let result:IAzkarBaseData[]=[]
        const res=await axios.get(url);
        res.data[language].forEach((e: { ID: any; TITLE: any; TEXT: any; AUDIO_URL: any; })=>{
             result.push({
                 id: e.ID,
                 title: e.TITLE,
                 text: e.TEXT,
                 audioUrl: e.AUDIO_URL,
                 azkar: []
             });
        })
        return result;
    }
}
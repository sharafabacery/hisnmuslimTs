import { IAzkarDB } from "./interface/IAzkarDB";
import { IAzkarDetails } from "./interface/IAzkarDetails";

export class AzkarDB{
    processORM(azkarList:[]){
        let returnAzkarDB:IAzkarDB[]=[]
        let titleIdTitles=Array.from(new Set(azkarList.map(e=>e['titleId'])));
        //console.log(titleIdTitles)
        titleIdTitles.forEach(titleId=>{
            let objs=azkarList.filter(azkar=>azkar['titleId']==titleId)
            if(objs.length>0){
                let obj=objs[0]
                let azkarDB:IAzkarDB={
                    id: obj['titleId'],
                    name: obj['name'],
                    search: obj['search'],
                    azkarDetails: objs.map((e: any)=>{
                        let obje:IAzkarDetails={
                            id: e['contentId'],
                            content: e['content'],
                            source: e['source'],
                            hokm: e['hokm'],
                            count: e['count'],
                            fadl:e['fadl'],
                            search:e['contentSearch']
                        }
                        return obje})
                }
                returnAzkarDB.push(azkarDB)
            }
        })
        return returnAzkarDB;

    }
    processTitlesORM(titles:[]){
        let returnAzkarDB:IAzkarDB[]=[]
        titles.forEach(title=>{
            returnAzkarDB.push({
                id: title['id'],
                name:title["name"],
                search:title["search"],
                audio:title["audio"],
                azkarDetails: []
            })
        })
        return returnAzkarDB
    }
}
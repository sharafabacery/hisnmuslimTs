import fs from 'fs'
import { BaseData } from "./BaseData";
import { IBaseData } from "./interface/IBaseData";
import { AzkarBaseData } from "./AzkarBaseData";
import { IAzkarBaseData } from "./interface/IAzkarBaseData";
import { Azkar } from "./Azkar";
import { Connectdb } from './Connectdb';
import { AzkarDB } from './AzkarDB';
import { json } from 'stream/consumers';
import { IAzkarDB } from './interface/IAzkarDB';
const azkarJson=async(languages:{[id:string]:IAzkarBaseData[]},outputFile:string)=>{
    let jsonData=JSON.stringify(languages)
    await fs.writeFileSync(outputFile,jsonData)
}
const azkarJsonDB=async(languages:IAzkarDB[],outputFile:string)=>{
    let jsonData=JSON.stringify(languages)
    await fs.writeFileSync(outputFile,jsonData)
}

const azkar=async(languages:{[id:string]:IAzkarBaseData[]})=>{
    let obj3=new Azkar()
    const languageKeys=Object.keys(languages);
    for (let index = 0; index <languageKeys.length; index++) {
        for (let index2 = 0; index2 < languages[languageKeys[index]].length; index2++) {
            let c=languages[languageKeys[index]][index2];
            languages[languageKeys[index]][index2].azkar=await obj3.fetchAzkar(languages[languageKeys[index]][index2],languageKeys[index]);
            
        }
    }
    return languages
}
const azkarMainBase=async(res:IBaseData[])=>{
    let obj2=new AzkarBaseData()
    let languages:{[id:string]:IAzkarBaseData[]}={}
    for (let index = 0; index < res.length; index++) {
        languages[res[index].language]=await obj2.fetchAzkarBaseData(res[index].languageUrl,res[index].language);
    }
    return languages
}
const dbconn=async()=>{
    let obj=new Connectdb("db\\hisn_elmoslem.db")
    obj.Connect()
    let queryResult=obj.RetriveData(`SELECT t.id as titleId,t.name,t.search,c.id as contentId,c.content,c.fadl,c.source,c.hokm,c.search as contentSearch,c.count
FROM titles t
INNER JOIN contents c
ON t.id=c.titleId
order by t.id`)
        let obj2=new AzkarDB()
        await azkarJsonDB(obj2.processORM(queryResult),'outputDB.json')
       //console.log()

}
const main=async()=>{
    let obj=new BaseData()
    
    let res:IBaseData[]=await obj.fetchBaseData("https://hisnmuslim.com/api/husn.json")
    let languages:{[id:string]:IAzkarBaseData[]}= await azkarMainBase(res)
    let languagesComplete=await azkar(languages)
    await azkarJson(languagesComplete,'output.json')
    
}

//main()
dbconn()

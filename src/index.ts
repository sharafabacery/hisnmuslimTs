import fs from 'fs'
import { BaseData } from "./BaseData";
import { IBaseData } from "./IBaseData";
import { AzkarBaseData } from "./AzkarBaseData";
import { IAzkarBaseData } from "./IAzkarBaseData";
import { Azkar } from "./Azkar";
const azkarJson=async(languages:{[id:string]:IAzkarBaseData[]})=>{
    let jsonData=JSON.stringify(languages)
    await fs.writeFileSync('output.json',jsonData)
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

const main=async()=>{
    let obj=new BaseData()
    
    let res:IBaseData[]=await obj.fetchBaseData("https://hisnmuslim.com/api/husn.json")
    let languages:{[id:string]:IAzkarBaseData[]}= await azkarMainBase(res)
    let languagesComplete=await azkar(languages)
    await azkarJson(languagesComplete)
    
}

main()


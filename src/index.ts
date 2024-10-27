import { lstat } from "fs";
import { BaseData } from "./BaseData";
import { IBaseData } from "./IBaseData";
import { AzkarBaseData } from "./AzkarBaseData";
import { IAzkarBaseData } from "./IAzkarBaseData";

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
    
    
}

main()


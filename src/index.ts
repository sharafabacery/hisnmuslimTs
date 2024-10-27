import { BaseData } from "./BaseData";
import { IBaseData } from "./IBaseData";


const main=async()=>{
    let obj=new BaseData()
    let res:IBaseData[]=await obj.fetchBaseData("https://hisnmuslim.com/api/husn.json")
    console.log(res)
    
}

main()


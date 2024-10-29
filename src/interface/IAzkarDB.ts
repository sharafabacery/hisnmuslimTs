import { IAzkarDetails } from "./IAzkarDetails"

export interface IAzkarDB{
    id:number
    name:string
    search:string
    azkarDetails:IAzkarDetails[]
}
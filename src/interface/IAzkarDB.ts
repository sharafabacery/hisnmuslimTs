import { IAzkarDetails } from "./IAzkarDetails"

export interface IAzkarDB{
    id:number
    name:string
    search:string
    audio?:string
    order:number
    azkarDetails:IAzkarDetails[]
}
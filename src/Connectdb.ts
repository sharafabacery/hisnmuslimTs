import path from 'node:path';
import {DatabaseSync} from 'node:sqlite'
export class Connectdb{
    dbConnectionString:string;
    database:any
    constructor(dbConnectionString:string){
        this.dbConnectionString=dbConnectionString
        console.log(this.dbConnectionString)
    }
    Connect(){
        this.database=new DatabaseSync(this.dbConnectionString);
    }
    RetriveData() {
        const query = this.database.prepare('SELECT id FROM titles ');  
        console.log(query.all())
    }
}
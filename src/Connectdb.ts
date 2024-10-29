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
    RetriveData(sqlString:string) {
        const query = this.database.prepare(sqlString);
        //console.log(query.all())  
        return query.all()
    }
}
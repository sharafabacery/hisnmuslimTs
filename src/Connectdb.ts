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
    updatePrepareDB(sqlString:string,matches:any[]){
        const query=this.database.prepare(sqlString)
        //console.log(matches)
        //query.run();
        matches.forEach(match=>{
            console.log(match)
            let result=query.run(match['audio'],match['order'])
            //console.log(result)
        })
        
    }
}
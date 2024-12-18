import fs from "fs";
import { BaseData } from "./BaseData";
import { IBaseData } from "./interface/IBaseData";
import { AzkarBaseData } from "./AzkarBaseData";
import { IAzkarBaseData } from "./interface/IAzkarBaseData";
import { Azkar } from "./Azkar";
import { Connectdb } from "./Connectdb";
import { AzkarDB } from "./AzkarDB";
import { json } from "stream/consumers";
import { IAzkarDB } from "./interface/IAzkarDB";
import { CommentaryDB } from "./CommentaryDB";
import { MergeAzkarDB } from "./MergeAzkarDB";
import { MatchAzkarDB } from "./MatchAzkarDB";
const azkarJson = async (
  languages: { [id: string]: IAzkarBaseData[] },
  outputFile: string
) => {
  let jsonData = JSON.stringify(languages);
  await fs.writeFileSync(outputFile, jsonData);
};
const azkarJsonDB = async (languages: IAzkarDB[], outputFile: string) => {
  let jsonData = JSON.stringify(languages);
  await fs.writeFileSync(outputFile, jsonData);
};

const azkar = async (languages: { [id: string]: IAzkarBaseData[] }) => {
  let obj3 = new Azkar();
  const languageKeys = Object.keys(languages);
  for (let index = 0; index < languageKeys.length; index++) {
    for (
      let index2 = 0;
      index2 < languages[languageKeys[index]].length;
      index2++
    ) {
      let c = languages[languageKeys[index]][index2];
      languages[languageKeys[index]][index2].azkar = await obj3.fetchAzkar(
        languages[languageKeys[index]][index2],
        languageKeys[index]
      );
    }
  }
  return languages;
};
const azkarMainBase = async (res: IBaseData[]) => {
  let obj2 = new AzkarBaseData();
  let languages: { [id: string]: IAzkarBaseData[] } = {};
  for (let index = 0; index < res.length; index++) {
    languages[res[index].language] = await obj2.fetchAzkarBaseData(
      res[index].languageUrl,
      res[index].language
    );
  }
  return languages;
};
const azkarDBORM = () => {
  let obj = new Connectdb("db/hisn_elmoslem.db");
  obj.Connect();
  let queryAzkarDB =
    obj.RetriveData(`SELECT t.id as titleId,t.name,t.search,c.id as contentId,t.audio,c.audio as contentAudio,t.[order],c.[order] as contentOrder,c.content,c.fadl,c.source,c.hokm,c.search as contentSearch,c.count
                                        FROM titles t
                                        INNER JOIN contents c
                                        ON t.id=c.titleId
                                        order by t.id`);

  let obj3 = new AzkarDB();
  return obj3.processORM(queryAzkarDB);
};
const dbconn = async () => {
  let resultAzkarDB = azkarDBORM();
  let obj2 = new Connectdb("db/commentary.db");
  obj2.Connect();
  let queryCommentary = obj2.RetriveData(`SELECT *
                                            FROM commentary
                                            ORDER BY contentId`);

  let obj4 = new CommentaryDB();
  let resultCommentary = obj4.processORM(queryCommentary);

  let mergeAzkarDB = new MergeAzkarDB().mergeAzkar(
    resultAzkarDB,
    resultCommentary
  );

  //console.log(resultCommentary)
  await azkarJsonDB(mergeAzkarDB, "outputDB.json");
  //console.log()
};
const main = async () => {
  let obj = new BaseData();

  let res: IBaseData[] = await obj.fetchBaseData(
    "https://hisnmuslim.com/api/husn.json"
  );
  let languages: { [id: string]: IAzkarBaseData[] } = await azkarMainBase(res);
  let languagesComplete = await azkar(languages);
  await azkarJson(languagesComplete, "output.json");
};
const getArabicAzkarApi = async () => {
  let obj = new BaseData();
  let res: IBaseData[] = await obj.fetchBaseData(
    "https://hisnmuslim.com/api/husn.json"
  );
  let languages: { [id: string]: IAzkarBaseData[] } = await azkarMainBase(res);
  return languages;
};
const getHisenhuslismTitles = () => {
  let obj = new Connectdb("db\\hisn_elmoslem.db");
  obj.Connect();
  let queryTitles = obj.RetriveData(`SELECT *
                                            FROM titles`);

  let titles = new AzkarDB().processTitlesORM(queryTitles);
  return titles;
};
const updateMatchedAudioTitle = async () => {
  let api = await getArabicAzkarApi();
  let matches = new MatchAzkarDB().matchAzkarBase(api["العربية"]);
  let obj = new Connectdb("db\\hisn_elmoslem.db");
  obj.Connect();
  let res = obj.updatePrepareDB(
    `UPDATE titles 
SET audio = ?
WHERE [order] = ? `,
    matches
  );
  //console.log(matches.length)
  //console.log(res)
};
const updateMatchedAudioContent = async () => {
  let api = await getArabicAzkarApi();
  let resultAzkarDB = azkarDBORM();
  let allAzkar = await azkar(api);
  let matches = new MatchAzkarDB().matchAzkarContents(
    allAzkar["العربية"],
    resultAzkarDB
  );
  let obj = new Connectdb("db\\hisn_elmoslem.db");
  obj.Connect();
  let res = obj.updatePrepareDB(
    `UPDATE contents 
SET audio = ?
WHERE id = ? `,
    matches
  );
  //console.log(matches.length)
  //console.log(res)
};

// Get Azkar from API and put them in json file
//main();

// Get Azkar from dbs and merage them and put them in json file
//dbconn();

// Get headers of Azkar and update database audio by api
//updateMatchedAudioTitle();

// Get Content of Azkar in api and update database audio
updateMatchedAudioContent();

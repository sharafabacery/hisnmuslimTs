import { IAzkarDB } from "./interface/IAzkarDB";
import { IAzkarDetails } from "./interface/IAzkarDetails";

export class AzkarDB {
  processORM(azkarList: []) {
    let returnAzkarDB: IAzkarDB[] = [];
    let titleIdTitles = Array.from(new Set(azkarList.map((e) => e["titleId"])));
    //console.log(titleIdTitles)
    titleIdTitles.forEach((titleId) => {
      let objs = azkarList.filter((azkar) => azkar["titleId"] == titleId);
      if (objs.length > 0) {
        let obj = objs[0];
        let azkarDB: IAzkarDB = {
          id: obj["titleId"],
          name: obj["name"],
          search: obj["search"],
          order: obj["order"],
          azkarDetails: objs.map((e: any) => {
            let obje: IAzkarDetails = {
              id: e["contentId"],
              content: e["content"],
              source: e["source"],
              hokm: e["hokm"],
              count: e["count"],
              fadl: e["fadl"],
              search: e["contentSearch"],
              contentOrder: e["contentOrder"],
            };
            return obje;
          }),
        };
        azkarDB.azkarDetails.sort((a, b) => a.contentOrder - b.contentOrder);
        returnAzkarDB.push(azkarDB);
      }
    });
    return returnAzkarDB;
  }
  processTitlesORM(titles: []) {
    let returnAzkarDB: IAzkarDB[] = [];
    titles.forEach((title) => {
      returnAzkarDB.push({
        id: title["id"],
        name: title["name"],
        search: title["search"],
        audio: title["audio"],
        order: title["order"],
        azkarDetails: [],
      });
    });
    return returnAzkarDB;
  }
}

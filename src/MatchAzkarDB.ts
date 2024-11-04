import { IAzkarBaseData } from "./interface/IAzkarBaseData";
import { IAzkarDB } from "./interface/IAzkarDB";
import { IAzkarOffset } from "./interface/IAzkarOffset";
import { IMatchedAzkar } from "./interface/IMatchedAzkar";
import { azkarOffset } from "./AzkarOffsetData";
export class MatchAzkarDB {
  titlesMap1 = [16, 28, 50, 59, 88, 95, 96, 105, 118, 124];
  azkar: IAzkarOffset[] = azkarOffset;
  matchAzkarBase(arabicAzkar: IAzkarBaseData[]) {
    let matches: IMatchedAzkar[] = [];
    arabicAzkar.forEach((zekr) => {
      if (zekr.id < 27) {
        matches.push({
          order: zekr.id + 2,
          audio: zekr.audioUrl,
        });
      } else if (zekr.id == 27) {
        matches.push({
          order: zekr.id + 2,
          audio: zekr.audioUrl,
        });
        matches.push({
          order: zekr.id + 3,
          audio: zekr.audioUrl,
        });
      } else {
        matches.push({
          order: zekr.id + 3,
          audio: zekr.audioUrl,
        });
      }
    });
    return matches;
  }
  matchingAzkarContents(zekrArabic: IAzkarBaseData, zekr: IAzkarDB) {
    let matches: IMatchedAzkar[] = [];

    if (zekrArabic.id != 27) {
      let foundTitlesMap = this.titlesMap1.find((e) => e == zekr.id);
      let foundAzkar = this.azkar.find((e) => e.titleId == zekr.id);
      if (foundTitlesMap) {
        let audioGenral = zekrArabic.azkar[0].audio;
        zekr.azkarDetails.forEach((z) => {
          matches.push({
            order: z.id,
            audio: audioGenral,
          });
        });
      } else if (foundAzkar) {
        let skip = 0;
        zekrArabic.azkar.forEach((value, index) => {
          let founded = foundAzkar.zekr.find((e) => e.zekrApi == index);
          if (founded) {
            for (let i = 0; i < founded.zekrDB; i++) {
              console.log("1 "+""+zekr.name+" "+value.id+" "+index+" ")
              let zz=zekr.azkarDetails[index + i+skip ]
              //console.log(zz)
              matches.push({
                order: zz.id,
                audio: value.audio,
              });
            }
            skip = founded.zekrDB;
          } else {
            //console.log(zekr.name)
            console.log("1 "+zekr.name+" "+value.id+" "+index+" ")
            let zz=zekr.azkarDetails[index +skip]
            matches.push({
                order: zz.id,
              audio: value.audio,
            });
          }
        });
      } else {
        console.log(zekr.name)
        zekrArabic.azkar.forEach((value, index) => {
          let zz=zekr.azkarDetails[index ]
          console.log(zz)
          matches.push({
            order: zz.id,
            audio: value.audio,
          });
        });
      }
    } else {
      //console.log("4444444444444")
      let skip = 0;
      zekrArabic.azkar.forEach((value, index) => {
        if (
          (zekr.id == 29 && value.id == 97) ||
          (zekr.id == 30 && value.id > 92 && value.id < 97)
        ) {
          skip--;
        } else {
          console.log(zekr.name +" "+index+ " "+skip+" "+value.id)
          let zz=zekr.azkarDetails[index+skip]
          
          matches.push({
            order: zz.id,
            audio: value.audio,
          });
        }
      });
    }
    return matches;
  }
  matchAzkarContents(arabicAzkar: IAzkarBaseData[], azkarDB: IAzkarDB[]) {
    let matches: IMatchedAzkar[] = [];
    arabicAzkar.forEach((zekrArabic) => {
      if (zekrArabic.id < 27) {
        
        let zekrDB = azkarDB.find((e) => e.id == zekrArabic.id + 2) as IAzkarDB;
        //console.log(zekrDB)
        matches = [
          ...matches,
          ...this.matchingAzkarContents(zekrArabic, zekrDB),
        ];
      } else if (zekrArabic.id == 27) {
        let zekrDB = azkarDB.find((e) => e.id == zekrArabic.id + 2) as IAzkarDB;
        let zekrDB2 = azkarDB.find(
          (e) => e.id == zekrArabic.id + 3
        ) as IAzkarDB;
        matches = [
          ...matches,
          ...this.matchingAzkarContents(zekrArabic, zekrDB),
          ...this.matchingAzkarContents(zekrArabic, zekrDB2),
        ];
      } else {
        let zekrDB = azkarDB.find((e) => e.id == zekrArabic.id + 3) as IAzkarDB;
        //console.log(zekrDB)
        
        matches = [
          ...matches,
          ...this.matchingAzkarContents(zekrArabic, zekrDB),
        ];
      }
    });
    return matches
  }
}

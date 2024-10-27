import axios from "axios";
import { IBaseData } from "./IBaseData";

export class BaseData {
  async fetchBaseData(url: string) {
    let result: IBaseData[] = [];
    const res=await axios.get(url);

      res.data.MAIN.forEach(
          (e: { ID: any; LANGUAGE: any; LANGUAGE_URL: any }) => {
            result.push({
              id: e.ID,
              language: e.LANGUAGE,
              languageUrl: e.LANGUAGE_URL,
            });
          }
        );
    return result;
  }
}

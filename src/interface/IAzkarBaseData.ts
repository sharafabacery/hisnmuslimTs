import { IAzkar } from "./IAzkar";

export interface IAzkarBaseData {
  id: number;
  title: string;
  text: string;
  audioUrl: string;
  azkar: IAzkar[];
}

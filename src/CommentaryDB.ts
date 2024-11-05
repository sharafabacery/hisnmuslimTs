import { ICommentaryDB } from "./interface/ICommentaryDB";

export class CommentaryDB {
  processORM(commentaryList: []) {
    let returnCommentaries: ICommentaryDB[] = [];
    commentaryList.forEach((e) => {
      returnCommentaries.push({
        id: e["id"],
        contentId: e["contentId"],
        sharh: e["sharh"],
        hadith: e["hadith"],
        benefit: e["benefit"],
      });
    });
    return returnCommentaries;
  }
}

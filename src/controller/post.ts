import fs from "fs";
import { IPost, IPostList, ISetPostData } from "../type/post";

const dbFileName = "db.json";

const getPostData = (): IPostList => {
  try {
    const db = fs.readFileSync(dbFileName, "utf-8");
    const reuslt: IPost[] = JSON.parse(db);
    return { contents: reuslt, success: true };
  } catch {
    const error: { message: string; success: false } = {
      message: "게시글 목록을 불러 올 수 없습니다.",
      success: false,
    };
    return error;
  }
};
const setPostData = (data: IPost[]): ISetPostData => {
  let dataToStr = JSON.stringify(data);
  try {
    const result = fs.writeFileSync(dbFileName, dataToStr, "utf-8");
    return { success: true };
  } catch (e) {
    return {
      success: false,
      message: "게시글 수정에 실패했습니다.",
    };
  }
};

const findPost = (id: number): IPost => {
  const data = getPostData();
  if (data.success) {
    let result = data.contents.find((post) => post.id === id);
    return !result ? null : result;
  } else {
    return null;
  }
};

export { getPostData, setPostData, findPost };

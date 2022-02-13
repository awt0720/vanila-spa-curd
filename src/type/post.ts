export interface IPost {
  id: number;
  title: string;
  content: string;
  writer: string;
  create_at: Date;
  update_at: Date;
}

export interface ISetPostData {
  success: boolean;
  message?: string;
}

export interface IPostList extends ISetPostData {
  contents?: IPost[];
}

export interface IPostDetail extends ISetPostData {
  content?: IPost;
}

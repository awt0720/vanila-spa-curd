import express, { Request, Response } from "express";
import { getPostData, setPostData, findPost } from "../controller/post";
import { IPostList, ISetPostData, IPost } from "../type/post";

const Post = express.Router();

Post.get("/", (_, res: Response) => {
  const data: IPostList = getPostData();

  if (data.success) {
    res.send(data.contents);
  } else {
    res.status(400).send(data);
  }
});

Post.get("/:id", (req: Request, res: Response) => {
  const paramsId = parseInt(req.params.id, 10);
  const post = findPost(paramsId);
  if (!post) {
    res.status(400).send({
      success: false,
      message: "해당 개시글을 찾을 수 없습니다.",
    });
  } else {
    res.send({
      success: true,
      content: post,
    });
  }
});
Post.post("/", (req: Request, res: Response) => {
  const { title, content, writer } = req.body;
  const data: IPostList = getPostData();

  if (!title || !content || !writer) {
    res.status(400).send({
      success: false,
      message: "Validate error",
    });
  } else {
    if (data.success) {
      const newData = data.contents;
      const newPost: IPost = {
        id: 1,
        title,
        content,
        writer,
        create_at: new Date(),
        update_at: new Date(),
      };
      if (newData.length === 0) {
        newData.push(newPost);
      } else {
        newPost.id = newData.length + 1;
        newData.push(newPost);
      }

      const result = setPostData(newData);

      if (!result) {
        res.send(result);
      } else {
        res.send(data);
      }
    } else {
      res.status(400).send(data);
    }
  }
});

Post.put("/:id", (req: Request, res: Response) => {
  const paramsId = parseInt(req.params.id, 10);
  const data: IPostList = getPostData();

  if (!data.success) {
    res.status(400).send({
      success: false,
      message: data.message,
    });
  } else {
    const currPost = findPost(paramsId);

    if (!currPost) {
      res.status(400).send({
        success: false,
        message: "같은 게시글을 찾을 수 없습니다.",
      });
    } else {
      const { title, content, writer } = req.body;
      const newData = data.contents.map((post) => {
        if (post.id === paramsId) {
          return {
            ...post,
            title,
            content,
            writer,
            update_at: new Date(),
          };
        }
        return post;
      });

      const result: ISetPostData = setPostData(newData);
      res.send(result);
    }
  }
});

Post.delete("/:id", (req: Request, res: Response) => {
  const post = findPost(parseInt(req.params.id, 10));
  if (!post) {
    res.status(400).send({
      success: false,
      message: "해당 게시글을 삭제 할 수 없습니다.",
    });
  } else {
    const data = getPostData();
    const newData = data.contents.filter((prev) => prev.id === post.id);
    const result = setPostData(newData);
    res.send(result);
  }
});

export default Post;

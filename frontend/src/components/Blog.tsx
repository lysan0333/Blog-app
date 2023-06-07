import React, { useState, FormEvent, useEffect } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import PlusOneIcon from "@mui/icons-material/PlusOne";
import { TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import { useAppDispatch } from "../app/hooks";
import { addBlog, readBlog, addlike, watchblog } from "../action/blogAction";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { TypeBlog } from "../action/actionType";
const Blog = () => {
  const isauth = useSelector((state: RootState) => state.auth.isauth);
  const user = useSelector((state: RootState) => state.auth.user);
  const blogs = useSelector((state: RootState) => state.blog.blogs);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [title, settitle] = useState("");
  const [content, setcontent] = useState("");
  const [image, setimage] = useState("");
  const [imageData, setImageData] = useState<string | null>(null);
  let tmp = blogs;
  const [currentblog, setcurrentblog] = useState<TypeBlog>({
    title: "",
    _id: "",
    like: 0,
    watch: 0,
    user_name: "",
    content: "",
    image: "",
  });

  useEffect(() => {
    if (!isauth) navigate("/login");
    dispatch(readBlog());
  }, []);

  const add_like = (id: string) => {
    dispatch(addlike(id));
  };

  const add_blg = (e: FormEvent) => {
    e.preventDefault();
    if (title != "" && content != "" && image != "") {
      const newblog = {
        title: title,
        content: content,
        user_name: user.name,
        image: image,
      };
      dispatch(addBlog(newblog));
      settitle("");
      setcontent("");
      setImageData("");
    }
  };

  const onwatch = (item: TypeBlog, id: string) => {
    dispatch(watchblog(id));
    setcurrentblog(item);
  };

  const handleFileUpload = (event: any) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageData(reader.result as string);
    };
  };

  return (
    <>
      <div className="text-center my-3">
        <button
          type="button"
          className="hover:animate-bounce block mx-auto my-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <div className="me-3">
           <img
              className="h-8 w-8 rounded-full justify-center "
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="">

            </img>
            </div>
          Create Blog
        </button>
      </div>
      <div className=" m-auto mx-3 flex ">
        <div className="  h-screen">
          <div className="grid grid-cols-5 mx-auto flex flex-wrap ms-5 ps-4 ">
            {tmp.map((item, key) => {
              return (
                <>
                  <div key={key} className="">
                    {item.image !== "" && (
                      <div className=" row-span-6 border-2 m-2  text-center p-2 bg-black transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110">
                        <span className="text-1xl text-blue-400">  The blog of{" "} </span>
                        
                         <span className="text-2xl text-white">{item.user_name}</span>
                       
                        <img
                          src={`${item.image}`}
                          className="my-4 w-full  h-60 m-auto "
                          alt={`${item.image}`} 
                          data-bs-toggle="modal"
                          data-bs-target="#exampleModal1"
                          onClick={(e) => onwatch(item, item._id)}
                        />
                        <div className="text-white text-2x1">{item.title}</div>
                        <div className="text-white text-1x1">{item.content}</div>
                        <VisibilityIcon className="text-white"></VisibilityIcon>
                        <span className="text-white">{item.watch}</span>
                        <ThumbUpIcon className="ms-10 text-white"></ThumbUpIcon>
                        <span className="text-white">{item.like}</span>
                          <>
                          <PlusOneIcon className=" text-blue-300 float-end"></PlusOneIcon>
                            {user.name !== item.user_name && (
                         <ThumbUpIcon
                        className="hover:cursor-pointer text-blue-300 float-end"
                        onClick={(e) => add_like(item._id)}
                         >
                         </ThumbUpIcon>
                          )}
                         
                          </>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModal1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog  modal-xl w-screen bg-white p-30 ">
          <div className="pt-4 text-center 	text-transform: uppercase pb-3 text-3 text-2xl text-blue-500 bg-dark">
            This is my blog'shown
          </div>
          <div className="grid grid-rows-3 grid-flow-col gap-4 shadow border-2 p-2 w-full">
            <div className="row-span-6 border-2 m-2  hover:cursor-pointer text-center p-2 ">
              <span className="text-2xl text-black">
                The article of{" "}
                <span className="text-blue-500  ">
                  {currentblog.user_name}'article
                </span>
              </span>
              <img
                src={`${currentblog.image}`}
                className="my-4 w-80  m-auto"
                alt={`localhost:8000/${currentblog.image}`}
              />
            </div>

            <div className="col-span-1  border-2 m-2 p-1">
              <strong>Title: </strong>
              {currentblog.title}
            </div>
            <div className="row-span-4 col-span-1  border-2 m-2">
              {currentblog.content}
            </div>
            <div className="col-span-1  border-2 m-2 text-center">
              <VisibilityIcon></VisibilityIcon>
              {currentblog.watch}
              <ThumbUpIcon className="ms-10"></ThumbUpIcon>
              {currentblog.like}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="exampleModal"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-blue-500 ">
              <h1 className="modal-title " id="exampleModalLabel">
                Create New Blog
              </h1>
            </div>
            <div className="modal-body flex w-full max-w-md space-x-3 mx-auto">
              <form onSubmit={add_blg}>
                <div className="mx-4 mt-4">
                  <label className="text">Title</label>
                  <TextField
                    className="w-full"
                    name="title"
                    id="outlined-basic"
                    label="title"
                    variant="outlined"
                    value={title}
                    onChange={(e) => settitle(e.target.value)}
                  />
                   <label className="text pt-3">Content</label>
                  <TextareaAutosize
                    className="border-blue-300 border-2 w-full my-3 p-3"
                    minRows="4"
                    value={content}
                    onChange={(e) => setcontent(e.target.value)}
                  ></TextareaAutosize>
                   <label className="text pt-1 pb-2">Address</label>
                  <input
                    type="url"
                    placeholder="http://128.127.11.1/home.com"
                    value={image}
                    onChange={(e) => setimage(e.target.value)}
                    className="form-control border-black mb-2"
                    required
                  />
                  <div className="flex justify-center">
                  <Button
                    type="submit"
                    variant="contained"
                    className="ms-32 rounded"
                    onClick={add_blg}
                    data-bs-dismiss="modal"
                  >
                    Add new blog
                  </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Blog;

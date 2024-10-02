import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createPost, editPost } from "../../services/posts";
import { AuthContext } from "../../context/AuthContext";
import { getAllCategories } from "../../services/categories";
import toast, { Toaster } from "react-hot-toast";
import userImg from "../../assets/userImg.png";
import ScrollToTop from "../../components/ScrollToTop";

const EditPost = () => {
  const [value, setValue] = useState("");
  const [titleValue, setTitleValue] = useState("");
  const [publishedValue, setPublishedValue] = useState("true");
  const [categoryValue, setCategoryValue] = useState("");
  const [imgValue, setImgValue] = useState(null);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { state } = useLocation();
  const { user } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const data = await getAllCategories();
      if (data === "Network Error") {
        toast.error("Server error, come back later.");
        return;
      }
      setCategories(data);
    };

    setCategoryValue(
      state.post?.categoryId || state.post?.categoryId._id
        ? state.post?.categoryId || state.post?.categoryId._id
        : ""
    );
    setTitleValue(state.post?.title ? state.post?.title : "");
    setValue(state.post?.content ? state.post?.content : "");

    getCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (categoryValue === "") {
      toast.error("Select a category");
      return;
    } else if (imgValue == null && state.post == null) {
      toast.error("Select an image to be put as a header");
      return;
    }
    let formData = new FormData();
    formData.append("title", titleValue);
    formData.append("content", value);
    formData.append("category", categoryValue);
    formData.append("published", publishedValue === "true" ? true : false);
    formData.append("image", imgValue);

    // Check whether the user is creating a post or updating an existing one
    let data;
    setIsLoading(true);
    if (state.post == null) {
      data = await createPost(formData, user.token);
    } else {
      data = await editPost(formData, state.post._id, user.token);
    }
    setIsLoading(false);

    if (data === "Network Error") {
      toast.error("Server error, come back later.");
      return;
    } else if (data?.errors) {
      data.errors.forEach((err) => {
        if (err.type) {
          toast.error(err.msg);
          return;
        }
      });
      return;
    } else if (data === undefined) {
      toast.error("Server error, come back later.");
      return;
    }

    if (state.post !== null) {
      toast.success("Post updated successfully.");
    } else {
      toast.success("Post created successfully.");
    }
    navigate(`/authors/${user._id}`);
  };

  return (
    <div className="pt-20 mx-8">
      <Toaster position="top-center" reverseOrder={false} />
      <h1 className="text-zinc-800 text-lg text-center mb-3">
        {state.post !== null ? "Edit blog" : "Create Blog"}
      </h1>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="title" className="font-semibold">
            Blog Title:
          </label>
          <input
            name="title"
            id="title"
            value={titleValue}
            onChange={(e) => setTitleValue(e.target.value)}
            className="block min-w-[80%] md:min-w-[50%] rounded outline-none p-2 mb-3"
          />

          <div className="flex gap-3 my-4">
            <legend className="font-semibold">Published:</legend>
            <div>
              <div>
                <input
                  type="radio"
                  id="yes"
                  name="published"
                  defaultChecked={true}
                  value="true"
                  onChange={(e) => setPublishedValue(e.target.value)}
                />
                <label>Yes</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="no"
                  name="published"
                  value="false"
                  onChange={(e) => setPublishedValue(e.target.value)}
                />
                <label>No</label>
              </div>
            </div>
          </div>

          <div className="space-x-3 my-2">
            <label htmlFor="category-select" className="font-semibold">
              Category:
            </label>
            <select
              name="category"
              id="category-select"
              value={categoryValue}
              onChange={(e) => setCategoryValue(e.target.value)}
              className="bg-white p-2"
            >
              <option value="maybe" hidden>
                --select category--
              </option>
              {categories?.map((category) => {
                return (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="space-x-3 my-3">
            <label htmlFor="image-select" className="font-semibold">
              Header image:
            </label>
            <input
              type="file"
              name="image"
              id="image-select"
              onChange={(e) => {
                setImgValue(e.target.files[0]);
              }}
              className="my-1"
            />
          </div>

          <div className=" my-5">
            <label className="font-semibold">Content:</label>
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="bg-white"
            />
          </div>

          {!isLoading && (
            <button
              type="submit"
              className="bg-blue-500 self-center text-white text-xs font-semibold rounded-lg px-3 py-2 m-3"
            >
              Submit
            </button>
          )}

          {isLoading && (
            <button
              type="submit"
              className="bg-blue-500 self-center text-white text-xs font-semibold rounded-lg px-3 py-2 m-3"
            >
              Loading...
            </button>
          )}
        </form>
      </div>
      <div>
        <h2 className="text-zinc-800 text-lg text-center mb-3">Preview</h2>
        <div className="md:border-r md:border-l md:border-zinc-300 md:px-5 md:col-span-2 pb-3 md:mx-20">
          <h1 className="text-zinc-800 text-3xl font-semibold sm:text-[3rem] leading-tight">
            {titleValue}
          </h1>
          {/* <img
            src={state.post?.headerImg || headerImg}
            alt="Header"
            className="h-80 sm:h-96 w-full rounded my-5"
          /> */}
          <div className="h-64 sm:h-96 w-full flex justify-center items-center font-semibold text-3xl border border-zinc-600 my-5">
            Header Image
          </div>
          <div className="flex justify-between items-center my-3  ">
            <div className="flex items-center gap-3">
              <img
                src={userImg}
                alt="User profile"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <p className="text-zinc-7 00 text-sm">Written by</p>
                <p className="text-zinc-900 text-lg font-semibold">
                  {user?.username}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm">
              Updated: {new Date().toLocaleDateString()}
            </p>
          </div>
          <main
            dangerouslySetInnerHTML={{ __html: value }}
            className="px-3"
          ></main>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
};

export default EditPost;

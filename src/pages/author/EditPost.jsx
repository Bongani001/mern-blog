import React, { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { useLocation, useSearchParams } from "react-router-dom";
import { createPost, editPost } from "../../services/posts";
import { AuthContext } from "../../context/AuthContext";
import { getAllCategories } from "../../services/categories";
import toast, { Toaster } from "react-hot-toast";

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

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ size: ["small", false, "large", "huge"] }], // custom dropdown

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    ["bold", "italic", "underline", "strike"], // toggled buttons
    ["blockquote", "code-block"],
    ["link"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
    [{ direction: "rtl" }], // text direction

    [{ align: [] }],

    ["clean"], // remove formatting button
  ];
  const modules = { toolbar: toolbarOptions };

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
    console.log({ value, titleValue, categoryValue, publishedValue, imgValue });

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
    console.log(data);
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

          <div className="my-5">
            <label className="font-semibold">Content:</label>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={value}
              onChange={setValue}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 self-center text-white text-xs font-semibold rounded-lg px-3 py-2 m-3"
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </form>
        <div></div>
      </div>
    </div>
  );
};

export default EditPost;

"use client";
import axios from "axios";
import React from "react";

const HomeComponents = () => {
  const ref = React.useRef(null);
  const [spam, setSpam] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    const body = new FormData(e.target);
    const { text } = Object.fromEntries(body.entries());
    formData.append("text", text);
    const { data } = await axios.post("/api/home", formData);
    if (data.message === 0) setSpam("Not spam");
    else setSpam("Spam message");
    setLoading(false);
    ref.current.reset();
  };
  return (
    <>
      <form
        ref={ref}
        onSubmit={submit}
        className="p-2 bg-white sm:p-4 w-full sm:w-[70%] ms:w-[60%] lg:w-[50%] border-[1px] rounded-md"
        action=""
        method="post"
      >
        {spam ? (
          <h1 className="text-center my-4 font-semibold sm:text-lg text-[0.9rem] text-[#333]">
            {spam}
          </h1>
        ) : (
          <></>
        )}
        <label
          htmlFor="text"
          className="block sm:text-lg text-[0.9rem] font-[500]"
        >
          Text
        </label>
        <input
          className="p-1 my-4 w-full sm:text-lg text-[0.9rem] outline-none border-[1px] rounded-sm"
          type="text"
          name="text"
          id="text"
          placeholder="Write text here"
          required={true}
        />
        <input
          disabled={loading}
          className="px-4 cursor-pointer py-1 text-white bg-[#333] rounded-sm sm:text-lg text-[0.9rem]"
          type="submit"
          value="Send"
        />
        {loading ? (
          <div className="loader mt-4"></div>
        ) : (
          <div className="h-[5px] mt-4"></div>
        )}
      </form>
    </>
  );
};

export default HomeComponents;

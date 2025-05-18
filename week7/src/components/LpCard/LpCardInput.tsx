import { useState } from "react";
import LP from "../../assets/img/lp.jpg";
import usePostLp from "../../hooks/mutations/usePostLp";

interface LpCardInputProps {
  onClose: () => void;
}

const LpCardInput = ({ onClose }: LpCardInputProps) => {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);
  const { mutate: postLpMutate } = usePostLp({
    onSuccess: () => {
      onClose(); // 모달 닫기
      window.location.reload(); // 새로고침
    },
  });

  const handleAddTag = () => {
    if (tag.trim() !== "" && !tagList.includes(tag)) {
      setTagList([...tagList, tag]);
      setTag("");
    }
  };

  const handleRemoveTag = (removeTag: string) => {
    setTagList(tagList.filter((t) => t !== removeTag));
  };

  const handlePostLp = () => {
    const newLpData = {
      title: name,
      content,
      thumbnail:
        "https://us.123rf.com/450wm/zlajo/zlajo1807/zlajo180700012/115048103-%EC%9E%A5%EB%AF%B8-%EB%B9%88-%EB%A0%88%EC%9D%B4%EB%B8%94-%EB%B9%88%ED%8B%B0%EC%A7%80-%EB%B3%B5%EA%B3%A0%ED%92%8D-%EB%B0%B0%EA%B2%BD-%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EC%99%80-%ED%95%A8%EA%BB%98-%EB%B9%84%EB%8B%90-lp.jpg",
      tags: tagList,
      published: true,
    };

    postLpMutate(newLpData);
  };

  return (
    <div className="bg-pink-100 w-md h-md p-4 rounded-sm flex flex-col items-center justify-center absolute top-20 left-[33%] z-100 m-auto">
      <div className="cursor-pointer flex justify-end w-full mb-2" onClick={onClose}>
        ✖️
      </div>
      <div>
        <img src={LP} alt="이미지" />
      </div>
      <div className="w-sm flex flex-col gap-2 mt-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="LP Name"
          className="border border-[#ED0086] rounded-sm p-2"
        />
        <input
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="LP Content"
          className="border border-[#ED0086] rounded-sm p-2"
        />
        <div className="flex gap-4">
          <input
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            placeholder="LP Tag"
            className="border border-[#ED0086] rounded-sm flex-1 p-2"
          />
          <button className="bg-gray-100 rounded-sm w-1/6 cursor-pointer" onClick={handleAddTag}>
            Add
          </button>
        </div>
        <div className="flex gap-2">
          {tagList.map((t, index) => (
            <div
              key={index}
              className="border border-[#ED0086] p-2 w-max flex gap-2 items-center rounded-sm bg-neutral-100"
            >
              <p>{t}</p>
              <button onClick={() => handleRemoveTag(t)} className="cursor-pointer text-red-500">
                X
              </button>
            </div>
          ))}
        </div>
        <button className="bg-[#ED0086] p-3 rounded-sm cursor-pointer" onClick={handlePostLp}>
          Add LP
        </button>
      </div>
    </div>
  );
};

export default LpCardInput;

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Profile from "../assets/img/profile.jpg";
import { useNavigate } from "react-router-dom";
import usePatchUser from "../hooks/mutations/usePatchUser";
import useGetMyInfo from "../hooks/queries/useGetMyInfo";

const MyPage = () => {
  // const [data, setData] = useState<ResponseMyInfoDto | null>(null);
  const { logout, accessToken } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editBio, setEditBio] = useState("");

  // 정보 수정
  const { mutate: patchUserMutate } = usePatchUser();
  const { data, refetch } = useGetMyInfo(accessToken);

  // useEffect(() => {
  //   const getData = async () => {
  //     const response = await getMyInfo();

  //     setData(response);
  //   };

  //   getData();
  // }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  // 정보 수정 시작
  const handleEdit = () => {
    setEditName(data?.data?.name || "");
    setEditBio(data?.data?.bio || "");
    setIsEditing(true);
  };

  // 정보 수정 함수
  const handleEditSubmit = () => {
    if (editName.trim() === "") {
      alert("이름은 빈 칸일 수 없습니다.");
      return;
    }

    patchUserMutate(
      {
        name: editName,
        bio: editBio,
        avatar: data?.data?.avatar || "",
      },
      {
        onSuccess: () => {
          refetch();
          setIsEditing(false);
        },
      }
    );
  };

  return (
    <div className="flex flex-col items-center mt-[100px] gap-3">
      <button className="cursor-pointer text-xl ml-[15%]" onClick={handleEdit}>
        ⚙️
      </button>
      <img src={(data?.data?.avatar as string) || Profile} alt="이미지" className="w-[150px]" />

      {isEditing && (
        <>
          <input
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="border p-1 flex-1 border border-yellow-500 rounded-sm p-2 w-[300px]"
          />
          <input
            value={editBio}
            onChange={(e) => setEditBio(e.target.value)}
            className="border p-1 flex-1 border border-yellow-500 rounded-sm p-2 w-[300px]"
            placeholder="소개를 입력해주세요."
          />
          <button
            onClick={handleEditSubmit}
            className="cursor-pointer px-2 w-[300px] h-[40px] bg-yellow-100 text-black rounded-sm cursor-pointer hover:bg-yellow-200 transition-colors ease-in-out duration-300"
          >
            수정 완료
          </button>
        </>
      )}

      {!isEditing && (
        <>
          <h1 className="text-2xl font-bold">{data?.data?.name}</h1>
          <h1 className="text-xl">{data?.data.bio}</h1>
          <h1 className="text-lg">{data?.data?.email}</h1>

          <button
            className="cursor-pointer bg-yellow-100 rounded-sm p-3 hover:scale-90 w-[300px]"
            onClick={handleLogout}
          >
            로그아웃
          </button>
        </>
      )}
    </div>
  );
};

export default MyPage;

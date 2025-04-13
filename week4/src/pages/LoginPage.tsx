import { postSignin } from "../apis/auth";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import useForm from "../hooks/useForm";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { UserSigninInformation, validateSignin } from "../utils/validate";
import google from "../assets/img/google.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
  const { values, errors, touched, getInputProps } = useForm<UserSigninInformation>({
    initialValue: {
      email: "",
      password: "",
    },
    validate: validateSignin,
  });

  const handleSubmit = async () => {
    try {
      const response = await postSignin(values);
      console.log(response);
      setItem(response.data.accessToken);
    } catch (e) {
      alert(e);
    }
  };

  // 오류가 하나라도 있거나, 입력값이 비어있으면 버튼을 비활성화
  const isDisabled =
    Object.values(errors || {}).some((error) => error.length > 0) || // 오류가 있으면 true
    Object.values(values).some((value) => value === ""); // 입력값이 비어있으면 true

  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 mt-[100px]">
      <div className="flex flex-row w-[300px] items-center">
        <h3 className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>{`<`}</h3>
        <h3 className="text-2xl font-bold flex-1 text-center">로그인</h3>
      </div>

      <div className="border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm flex flex-row p-4 items-center cursor-pointer">
        <img src={google} alt="구글 로고" className="w-[30px] h-[30px]"></img>
        <p className="flex-1 text-center">구글 로그인</p>
      </div>

      <div className="flex flex-row items-center justify-between w-[300px]">
        <div className="w-[100px] h-[2px] bg-black"></div>
        <p className="font-bold">OR</p>
        <div className="w-[100px] h-[2px] bg-black"></div>
      </div>

      <div className="flex flex-col gap-3">
        <input
          {...getInputProps("email")}
          name="email"
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.email && touched?.email ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors?.email && touched?.email && <div className="text-red-500 text-sm">{errors.email}</div>}

        <input
          {...getInputProps("password")}
          className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
            errors?.password && touched?.password ? "border-red-500 bg-red-200" : "border-gray-300"
          }`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors?.password && touched?.password && <div className="text-red-500 text-sm">{errors.password}</div>}

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          로그인
        </button>
      </div>
    </div>
  );
};
export default LoginPage;

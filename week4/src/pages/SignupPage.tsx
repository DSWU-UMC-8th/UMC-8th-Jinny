import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { postSignup } from "../apis/auth";
import google from "../assets/img/google.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const schema = z
  .object({
    email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
    password: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다. ",
      }),
    passwordCheck: z
      .string()
      .min(8, {
        message: "비밀번호는 8자 이상이어야 합니다.",
      })
      .max(20, {
        message: "비밀번호는 20자 이하여야 합니다. ",
      }),
    name: z.string().min(1, { message: "이름을 입력해주세요." }),
  })
  .refine((data) => data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const [step, setStep] = useState(1); // 1단계: 이메일, 2단계: 비밀번호, 3단계: 이름

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
    },
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const { passwordCheck, ...rest } = data;
    console.log(passwordCheck);

    const response = await postSignup(rest);
    console.log(response);
  };

  const handleNext = async () => {
    let valid = false;
    if (step === 1) valid = await trigger("email");
    else if (step === 2) valid = await trigger(["password", "passwordCheck"]);

    if (valid) setStep((prev) => prev + 1);
  };

  const navigate = useNavigate();

  const email = watch("email");
  const emailValid = !errors.email && email !== "";
  const password = watch("password");
  const passwordCheck = watch("passwordCheck");
  const name = watch("name");

  return (
    <div className="flex flex-col items-center justify-center gap-4 h-[calc(100dvh_-_56px)]">
      <div className="flex flex-row w-[300px] items-center">
        <h3 className="text-2xl cursor-pointer" onClick={() => navigate(-1)}>{`<`}</h3>
        <h3 className="text-2xl font-bold flex-1 text-center">회원가입</h3>
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
        {/* 1단계: 이메일 */}
        {step === 1 && (
          <>
            <input
              {...register("email")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                errors?.email ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
              type={"email"}
              placeholder={"이메일"}
            />
            {errors.email && <div className="text-red-500 text-sm">{errors.email.message}</div>}
            <button
              type="button"
              onClick={handleNext}
              disabled={!emailValid}
              className={`w-full py-3 rounded-md text-lg font-medium transition-colors ${
                !emailValid ? "bg-gray-300 text-white cursor-not-allowed" : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              다음
            </button>
          </>
        )}

        {/* 2단계: 비밀번호 */}
        {step === 2 && (
          <>
            <input
              {...register("password")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                errors?.password ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
              type={"password"}
              placeholder={"비밀번호"}
            />
            {errors.password && <div className="text-red-500 text-sm">{errors.password.message}</div>}

            <input
              {...register("passwordCheck")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                errors?.passwordCheck ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
              type={"password"}
              placeholder={"비밀번호 확인"}
            />
            {errors.passwordCheck && <div className="text-red-500 text-sm">{errors.passwordCheck.message}</div>}

            <button
              type="button"
              onClick={handleNext}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors"
            >
              다음
            </button>
          </>
        )}

        {/* 3단계: 이름 */}
        {step === 3 && (
          <>
            <input
              {...register("name")}
              className={`border border-[#ccc] w-[300px] p-[10px] focus:border-[#807bff] rounded-sm ${
                errors?.name ? "border-red-500 bg-red-200" : "border-gray-300"
              }`}
              type={"name"}
              placeholder={"이름"}
            />
            {errors.name && <div className="text-red-500 text-sm">{errors.name.message}</div>}

            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isSubmitted}
              className="w-full bg-blue-600 text-white py-3 rounded-md text-lg font-medium hover:bg-blue-700 transition-colors cursor-pointer disabled:bg-gray-300"
            >
              회원가입
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;

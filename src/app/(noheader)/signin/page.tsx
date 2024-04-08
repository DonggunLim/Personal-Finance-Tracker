import GoogleSigninButton from "@/components/Buttons/GoogleSigninButton";

export default function SigninPage() {
  return (
    <div className="bg-purple-100 p-8 rounded-xl">
      <p className="my-8 text-xl font-bold">구글 계정으로 로그인 하기</p>
      <GoogleSigninButton />
    </div>
  );
}

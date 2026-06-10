import { useNavigate } from "react-router";
import { useState } from "react";
import { ChevronLeft, UserPlus } from "lucide-react";

export function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "",
    password: "",
    passwordConfirm: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }
    alert("회원가입이 완료되었습니다.");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      {/* Mobile Device Mockup Container */}
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-8 ring-slate-800">
        
        {/* Header (App Bar) */}
        <div className="flex h-16 shrink-0 items-center border-b border-slate-100 px-4">
          <button
            onClick={() => navigate("/")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors active:bg-slate-100"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 pr-10 text-center text-lg font-bold text-slate-800">회원가입</h1>
        </div>

        {/* Scrollable Form */}
        <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100 text-blue-600">
              <UserPlus size={32} />
            </div>
            <h2 className="text-xl font-bold text-slate-800">새 계정 만들기</h2>
            <p className="mt-1 text-sm text-slate-500">
              앱을 사용하기 위한 정보를 입력해주세요.
            </p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label htmlFor="id" className="mb-1.5 block text-sm font-semibold text-slate-700">
                아이디
              </label>
              <input
                id="id"
                type="text"
                required
                value={formData.id}
                onChange={handleChange}
                placeholder="아이디 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-semibold text-slate-700">
                이름
              </label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="이름 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-slate-700">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="비밀번호 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label htmlFor="passwordConfirm" className="mb-1.5 block text-sm font-semibold text-slate-700">
                비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                type="password"
                required
                value={formData.passwordConfirm}
                onChange={handleChange}
                placeholder="비밀번호 다시 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-blue-600 px-4 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
            >
              가입하기
            </button>
          </form>
        </div>
        
        {/* Fake iOS Home Indicator */}
        <div className="mx-auto mb-2 mt-auto h-1.5 w-1/3 shrink-0 rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
}

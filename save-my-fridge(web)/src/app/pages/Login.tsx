import { useNavigate } from "react-router";
import { useState } from "react";
import { UserPlus, Refrigerator } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import loginImg from "../../imports/스크린샷_2026-04-29_105922.png";

export function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id && password) {
      navigate("/home");
    } else {
      alert("아이디와 비밀번호를 입력해주세요.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      {/* Mobile Device Mockup Container */}
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-white shadow-2xl ring-8 ring-slate-800">
        
        {/* Top Image Banner */}
        <div className="relative h-[260px] w-full shrink-0">
          <ImageWithFallback 
            src={loginImg} 
            alt="Save-My-Fridge Cover" 
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
              <Refrigerator size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight text-slate-800">Save-My-Fridge</h1>
              <p className="text-sm font-semibold text-slate-600">스마트한 식재료 관리</p>
            </div>
          </div>
        </div>

        {/* Scrollable Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-800">로그인</h2>
            <p className="mt-1 text-sm text-slate-500">
              앱을 사용하려면 계정에 로그인하세요.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="userId"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                아이디
              </label>
              <input
                id="userId"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                placeholder="아이디 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-semibold text-slate-700"
              >
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-sm outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-2xl bg-blue-600 px-4 py-4 text-[15px] font-bold text-white shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
            >
              로그인
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-sm">
            <span className="text-slate-500">계정이 없으신가요?</span>
            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="flex items-center font-bold text-blue-600 transition-colors active:text-blue-800"
            >
              <UserPlus size={16} className="mr-1" />
              회원가입
            </button>
          </div>
        </div>

        {/* Fake iOS Home Indicator */}
        <div className="mx-auto mb-2 mt-auto h-1.5 w-1/3 shrink-0 rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Home, User, Refrigerator, LogOut, UserX, Settings, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { useUser } from "../context/UserContext";
import { NotificationPanel, useBellCount } from "../components/NotificationPanel";

export function Profile() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [notifOpen, setNotifOpen] = useState(false);
  const bellCount = useBellCount();

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      navigate("/");
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말로 회원탈퇴 하시겠습니까?\n모든 데이터가 삭제되며 복구할 수 없습니다.")) {
      alert("회원탈퇴가 완료되었습니다.");
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-8 ring-slate-800">

        {/* App Header */}
        <div className="flex h-16 shrink-0 items-center justify-between bg-white px-6 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Refrigerator size={18} />
            </div>
            <span className="text-lg font-bold text-slate-800">마이페이지</span>
          </div>
          <button
            onClick={() => setNotifOpen((v) => !v)}
            className="relative text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Bell size={22} />
            {bellCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {bellCount > 9 ? "9+" : bellCount}
              </span>
            )}
          </button>
        </div>

        {/* Notification Panel */}
        <NotificationPanel isOpen={notifOpen} onClose={() => setNotifOpen(false)} />

        {/* Profile Header */}
        <div className="bg-white px-6 py-8 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-5xl shadow-lg">
              {user.avatarEmoji}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-800">{user.nickname}님</h2>
              <p className="mt-1 text-sm text-slate-500">user@savemyfridge.com</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Menu Section */}
          <div className="mb-4">
            <h3 className="mb-2 px-2 text-xs font-bold text-slate-500 uppercase">설정</h3>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <button
                onClick={() => navigate("/account-settings")}
                className="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-slate-50 border-b border-slate-100"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <Settings size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">계정 설정</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
              <button
                onClick={() => navigate("/privacy")}
                className="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                    <Shield size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">개인정보 보호</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div className="mb-4">
            <h3 className="mb-2 px-2 text-xs font-bold text-slate-500 uppercase">지원</h3>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <button className="flex w-full items-center justify-between px-4 py-4 transition-colors hover:bg-slate-50">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <HelpCircle size={20} />
                  </div>
                  <span className="font-semibold text-slate-800">도움말</span>
                </div>
                <ChevronRight size={20} className="text-slate-400" />
              </button>
            </div>
          </div>

          {/* Account Actions */}
          <div className="mb-4">
            <h3 className="mb-2 px-2 text-xs font-bold text-slate-500 uppercase">계정</h3>
            <div className="space-y-3">
              <button
                onClick={handleLogout}
                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm border border-slate-100 transition-all hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <LogOut size={20} />
                  </div>
                  <span className="font-bold text-blue-600">로그아웃</span>
                </div>
                <ChevronRight size={20} className="text-blue-400" />
              </button>

              <button
                onClick={handleDeleteAccount}
                className="flex w-full items-center justify-between rounded-2xl bg-white px-4 py-4 shadow-sm border border-red-100 transition-all hover:border-red-300 hover:shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <UserX size={20} />
                  </div>
                  <span className="font-bold text-red-600">회원탈퇴</span>
                </div>
                <ChevronRight size={20} className="text-red-400" />
              </button>
            </div>
          </div>

          {/* App Info */}
          <div className="mt-8 text-center text-xs text-slate-400">
            <p>Save-My-Fridge v1.0.0</p>
            <p className="mt-1">© 2026 Save-My-Fridge. All rights reserved.</p>
          </div>

          <div className="pb-20"></div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full flex h-20 shrink-0 items-center justify-around bg-white px-6 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Home size={22} />
            <span className="text-[10px] font-bold">홈</span>
          </button>
          <button
            onClick={() => navigate("/main")}
            className="flex flex-col items-center gap-1.5 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <Refrigerator size={22} />
            <span className="text-[10px] font-bold">냉장고</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1.5 text-blue-600"
          >
            <User size={22} />
            <span className="text-[10px] font-bold">마이</span>
          </button>
          <div className="absolute bottom-2 left-1/2 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-slate-300"></div>
        </div>

      </div>
    </div>
  );
}

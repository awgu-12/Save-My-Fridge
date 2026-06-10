import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Camera, Check } from "lucide-react";
import { useUser } from "../context/UserContext";

const AVATAR_OPTIONS = ["👤", "🧑", "👩", "🧔", "👦", "👧", "🧑‍🍳", "🐸", "🐻", "🦊"];

export function AccountSettings() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();

  const [nickname, setNickname] = useState(user.nickname);
  const [selectedAvatar, setSelectedAvatar] = useState(user.avatarEmoji);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateUser({ nickname: nickname.trim() || "사용자", avatarEmoji: selectedAvatar });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      navigate("/profile");
    }, 900);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-8 ring-slate-800">

        {/* Header */}
        <div className="flex h-16 shrink-0 items-center gap-3 bg-white px-6 shadow-sm z-10">
          <button
            onClick={() => navigate("/profile")}
            className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-slate-100 transition-colors"
          >
            <ChevronLeft size={22} className="text-slate-700" />
          </button>
          <span className="text-lg font-bold text-slate-800">계정 설정</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Avatar */}
          <div className="mb-6 flex flex-col items-center pt-4">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-blue-600 text-5xl shadow-lg">
                {selectedAvatar}
              </div>
              <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white shadow">
                <Camera size={14} />
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-500">아바타를 선택하세요</p>
          </div>

          {/* Avatar Picker */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
            <p className="mb-3 text-xs font-bold text-slate-500 uppercase">프로필 아바타</p>
            <div className="grid grid-cols-5 gap-3">
              {AVATAR_OPTIONS.map((emoji) => (
                <button
                  key={emoji}
                  onClick={() => setSelectedAvatar(emoji)}
                  className={`relative flex h-12 w-12 items-center justify-center rounded-2xl text-2xl transition-all ${
                    selectedAvatar === emoji
                      ? "bg-blue-100 ring-2 ring-blue-500 scale-110"
                      : "bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  {emoji}
                  {selectedAvatar === emoji && (
                    <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500">
                      <Check size={10} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Nickname */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase">
              이름 (별명)
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              maxLength={20}
              placeholder="별명을 입력하세요"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            />
            <p className="mt-1.5 text-right text-[10px] text-slate-400">{nickname.length}/20</p>
          </div>

          {/* Email (read-only) */}
          <div className="mb-6 rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
            <label className="mb-2 block text-xs font-bold text-slate-500 uppercase">
              이메일
            </label>
            <div className="rounded-xl bg-slate-100 px-4 py-3 text-sm text-slate-500">
              user@savemyfridge.com
            </div>
            <p className="mt-1.5 text-[10px] text-slate-400">이메일은 변경할 수 없습니다.</p>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className={`flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-bold text-white transition-all ${
              saved ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700 active:scale-95"
            }`}
          >
            {saved ? (
              <>
                <Check size={18} />
                저장됨!
              </>
            ) : (
              "저장하기"
            )}
          </button>

          <div className="pb-8" />
        </div>
      </div>
    </div>
  );
}

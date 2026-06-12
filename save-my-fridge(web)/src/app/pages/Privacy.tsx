import { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Users, Trash2, RefreshCw, Eye, EyeOff, Plus, X } from "lucide-react";

type Member = { id: string; name: string; email: string };

const INITIAL_MEMBERS: Member[] = [
  { id: "m1", name: "엄마", email: "mom@family.com" },
  { id: "m2", name: "아빠", email: "dad@family.com" },
];

export function Privacy() {
  const navigate = useNavigate();

  const [visibility, setVisibility] = useState<"private" | "family">("family");
  const [autoDelete, setAutoDelete] = useState(false);
  const [syncEnabled, setSyncEnabled] = useState(true);
  const [members, setMembers] = useState<Member[]>(INITIAL_MEMBERS);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [showAddMember, setShowAddMember] = useState(false);

  const addMember = () => {
    const email = newMemberEmail.trim();
    if (!email) return;
    const newMember: Member = {
      id: Date.now().toString(),
      name: email.split("@")[0],
      email,
    };
    setMembers((prev) => [...prev, newMember]);
    setNewMemberEmail("");
    setShowAddMember(false);
  };

  const removeMember = (id: string) => setMembers((prev) => prev.filter((m) => m.id !== id));

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
          <span className="text-lg font-bold text-slate-800">개인정보 보호</span>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* Data Visibility */}
          <div className="mb-4">
            <h3 className="mb-2 px-1 text-xs font-bold text-slate-500 uppercase">냉장고 데이터 공개 범위</h3>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              <button
                onClick={() => setVisibility("private")}
                className={`flex w-full items-center justify-between px-4 py-4 border-b border-slate-100 transition-colors ${
                  visibility === "private" ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${visibility === "private" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                    <EyeOff size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold ${visibility === "private" ? "text-blue-700" : "text-slate-700"}`}>나만 보기</p>
                    <p className="text-xs text-slate-400">내 냉장고 데이터를 나만 볼 수 있습니다</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${visibility === "private" ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}>
                  {visibility === "private" && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>

              <button
                onClick={() => setVisibility("family")}
                className={`flex w-full items-center justify-between px-4 py-4 transition-colors ${
                  visibility === "family" ? "bg-blue-50" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${visibility === "family" ? "bg-blue-100 text-blue-600" : "bg-slate-100 text-slate-500"}`}>
                    <Eye size={20} />
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold ${visibility === "family" ? "text-blue-700" : "text-slate-700"}`}>가족 공개</p>
                    <p className="text-xs text-slate-400">공유 멤버와 냉장고 데이터를 공유합니다</p>
                  </div>
                </div>
                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${visibility === "family" ? "border-blue-600 bg-blue-600" : "border-slate-300"}`}>
                  {visibility === "family" && <div className="h-2 w-2 rounded-full bg-white" />}
                </div>
              </button>
            </div>
          </div>

          {/* Shared Members */}
          <div className="mb-4">
            <div className="mb-2 flex items-center justify-between px-1">
              <h3 className="text-xs font-bold text-slate-500 uppercase">공유 멤버</h3>
              <button
                onClick={() => setShowAddMember((v) => !v)}
                className="flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-1 text-xs font-bold text-blue-600 hover:bg-blue-200 transition-colors"
              >
                <Plus size={12} />
                멤버 추가
              </button>
            </div>

            {showAddMember && (
              <div className="mb-2 flex gap-2">
                <input
                  type="email"
                  value={newMemberEmail}
                  onChange={(e) => setNewMemberEmail(e.target.value)}
                  placeholder="이메일 주소 입력"
                  className="flex-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                  onKeyDown={(e) => e.key === "Enter" && addMember()}
                />
                <button
                  onClick={addMember}
                  className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white hover:bg-blue-700 transition-colors"
                >
                  추가
                </button>
              </div>
            )}

            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">
              {members.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-slate-400">
                  <Users size={28} className="mb-2 opacity-40" />
                  <p className="text-xs">공유 멤버가 없습니다</p>
                </div>
              ) : (
                members.map((m, i) => (
                  <div
                    key={m.id}
                    className={`flex items-center justify-between px-4 py-3 ${i < members.length - 1 ? "border-b border-slate-100" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-purple-100 text-purple-600">
                        <Users size={16} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{m.name}</p>
                        <p className="text-xs text-slate-400">{m.email}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeMember(m.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="mb-4">
            <h3 className="mb-2 px-1 text-xs font-bold text-slate-500 uppercase">냉장고 설정</h3>
            <div className="rounded-2xl bg-white shadow-sm border border-slate-100 overflow-hidden">

              {/* Auto Delete */}
              <div className="flex items-center justify-between px-4 py-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100 text-red-500">
                    <Trash2 size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">폐기 재료 자동 삭제</p>
                    <p className="text-xs text-slate-400">유통기한 지난 재료 자동 제거</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoDelete((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${autoDelete ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${autoDelete ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>

              {/* Sync */}
              <div className="flex items-center justify-between px-4 py-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <RefreshCw size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">냉장고 동기화</p>
                    <p className="text-xs text-slate-400">공유 멤버와 실시간 동기화</p>
                  </div>
                </div>
                <button
                  onClick={() => setSyncEnabled((v) => !v)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${syncEnabled ? "bg-blue-600" : "bg-slate-200"}`}
                >
                  <div className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${syncEnabled ? "translate-x-5" : "translate-x-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="pb-8" />
        </div>
      </div>
    </div>
  );
}

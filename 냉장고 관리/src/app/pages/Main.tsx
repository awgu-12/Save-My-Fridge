import { useNavigate } from "react-router";
import { useState } from "react";
import { Search, Bell, Home, User, Plus, Refrigerator, AlertCircle, XCircle } from "lucide-react";
import { useIngredients, Ingredient } from "../context/IngredientContext";
import { NotificationPanel, useBellCount } from "../components/NotificationPanel";

export function Main() {
  const navigate = useNavigate();
  const { ingredients } = useIngredients();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("전체");
  const [notifOpen, setNotifOpen] = useState(false);
  const bellCount = useBellCount();

  const categories = ["전체", "채소", "육류", "유제품", "기타"];

  // 현재 시스템 날짜 기준 유통기한 계산 로직
  const getDaysLeft = (expiryDate: string) => {
    const today = new Date("2026-04-29");
    const target = new Date(expiryDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const filteredIngredients = ingredients.filter((item) => {
    const matchCategory = activeCategory === "전체" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-8 ring-slate-800">
        
        {/* App Header */}
        <div className="flex h-16 shrink-0 items-center justify-between bg-white px-6 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Refrigerator size={18} />
            </div>
            <span className="text-lg font-bold text-slate-800">나의 냉장고</span>
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

        {/* Search and Filters */}
        <div className="bg-white px-6 py-4 shadow-sm z-10">
          <div className="relative mb-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
              <Search size={18} />
            </div>
            <input
              type="text"
              placeholder="어떤 재료를 찾으시나요?"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-2xl bg-slate-100 py-3 pl-10 pr-4 text-sm outline-none transition-all focus:bg-white focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Content Area */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="space-y-3 pb-24">
            {filteredIngredients.length === 0 ? (
              <div className="mt-20 text-center text-slate-500">
                <p>일치하는 식재료가 없습니다.</p>
              </div>
            ) : (
              filteredIngredients.map((item) => {
                const daysLeft = getDaysLeft(item.expiryDate);
                const isExpired = daysLeft < 0;
                const isExpiringSoon = daysLeft >= 0 && daysLeft <= 3;

                return (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/ingredient/${item.id}`)}
                    className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-4 shadow-sm border border-slate-100 transition-all hover:border-blue-200 hover:shadow-md"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${
                        item.category === "채소" ? "bg-green-100" :
                        item.category === "육류" ? "bg-rose-100" :
                        item.category === "유제품" ? "bg-amber-100" : "bg-slate-100"
                      }`}>
                        {item.category === "채소" ? "🥬" :
                         item.category === "육류" ? "🥩" :
                         item.category === "유제품" ? "🥛" : "🛒"}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800">{item.name}</h3>
                        <p className="text-xs font-medium text-slate-500">
                          {item.storage} · {item.quantity}개
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1">
                      {isExpired ? (
                        <span className="flex items-center text-xs font-bold text-red-500">
                          <XCircle size={14} className="mr-1" />
                          폐기
                        </span>
                      ) : isExpiringSoon ? (
                        <span className="flex items-center text-xs font-bold text-amber-500">
                          <AlertCircle size={14} className="mr-1" />
                          D-{daysLeft === 0 ? "day" : daysLeft}
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-slate-400">
                          D-{daysLeft}
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400">{item.expiryDate}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Floating Action Button */}
        <button
          onClick={() => navigate("/register")}
          className="absolute bottom-24 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-300 transition-transform active:scale-95 z-20"
        >
          <Plus size={28} />
        </button>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full flex h-20 shrink-0 items-center justify-around bg-white px-6 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center gap-1.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            <Home size={22} />
            <span className="text-[10px] font-bold">홈</span>
          </button>
          <button
            onClick={() => navigate("/main")}
            className="flex flex-col items-center gap-1.5 text-blue-600"
          >
            <Refrigerator size={22} />
            <span className="text-[10px] font-bold">냉장고</span>
          </button>
          <button
            onClick={() => navigate("/profile")}
            className="flex flex-col items-center gap-1.5 text-slate-400 transition-colors hover:text-slate-600"
          >
            <User size={22} />
            <span className="text-[10px] font-bold">마이</span>
          </button>
          {/* Fake iOS Home Indicator */}
          <div className="absolute bottom-2 left-1/2 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-slate-300"></div>
        </div>

      </div>
    </div>
  );
}

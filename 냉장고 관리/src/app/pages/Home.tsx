import { useState } from "react";
import { useNavigate } from "react-router";
import { Bell, Home, User, Refrigerator, TrendingUp, AlertCircle, ChefHat } from "lucide-react";
import { useIngredients } from "../context/IngredientContext";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { NotificationPanel, useBellCount } from "../components/NotificationPanel";
import loginImg from "../../imports/스크린샷_2026-04-29_105922.png";

export function HomePage() {
  const navigate = useNavigate();
  const { ingredients } = useIngredients();
  const [notifOpen, setNotifOpen] = useState(false);
  const bellCount = useBellCount();

  // 현재 시스템 날짜 기준 유통기한 계산
  const getDaysLeft = (expiryDate: string) => {
    const today = new Date("2026-04-29");
    const target = new Date(expiryDate);
    const diffTime = target.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // 유통기한 임박 재료 (3일 이내)
  const expiringIngredients = ingredients.filter((item) => {
    const daysLeft = getDaysLeft(item.expiryDate);
    return daysLeft >= 0 && daysLeft <= 3;
  });

  // 폐기 대상 재료
  const expiredIngredients = ingredients.filter((item) => {
    return getDaysLeft(item.expiryDate) < 0;
  });

  // 추천 레시피 (임박 재료 기반)
  const recommendedRecipes = [
    { name: "토마토 스파게티", ingredients: ["토마토", "파스타"], difficulty: "쉬움" },
    { name: "소고기 덮밥", ingredients: ["소고기", "양파"], difficulty: "보통" },
    { name: "샐러드", ingredients: ["양상추", "토마토", "치즈"], difficulty: "쉬움" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-8 ring-slate-800">

        {/* App Header */}
        <div className="flex h-16 shrink-0 items-center justify-between bg-white px-6 shadow-sm z-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Refrigerator size={18} />
            </div>
            <span className="text-lg font-bold text-slate-800">Save-My-Fridge</span>
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

        {/* Hero Banner */}
        <div className="relative h-[180px] w-full shrink-0 bg-white">
          <ImageWithFallback
            src={loginImg}
            alt="Save-My-Fridge Cover"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
          <div className="absolute bottom-4 left-6 text-white">
            <h2 className="text-2xl font-extrabold">오늘의 냉장고</h2>
            <p className="text-sm font-medium opacity-90">스마트한 식재료 관리로 음식물 쓰레기 줄이기</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="flex gap-3 px-6 py-4 bg-white shadow-sm">
          <div className="flex-1 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <TrendingUp size={16} />
              <span className="text-xs font-bold">전체</span>
            </div>
            <p className="text-2xl font-extrabold text-blue-700">{ingredients.length}</p>
            <p className="text-[10px] text-blue-600">보관 중인 재료</p>
          </div>
          <div className="flex-1 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 p-4">
            <div className="flex items-center gap-2 text-amber-600 mb-1">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">임박</span>
            </div>
            <p className="text-2xl font-extrabold text-amber-700">{expiringIngredients.length}</p>
            <p className="text-[10px] text-amber-600">빨리 사용하세요</p>
          </div>
          <div className="flex-1 rounded-2xl bg-gradient-to-br from-red-50 to-red-100 p-4">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertCircle size={16} />
              <span className="text-xs font-bold">폐기</span>
            </div>
            <p className="text-2xl font-extrabold text-red-700">{expiredIngredients.length}</p>
            <p className="text-[10px] text-red-600">유통기한 초과</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

          {/* 유통기한 임박 재료 */}
          {expiringIngredients.length > 0 && (
            <div className="mb-6">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800">⏰ 빨리 사용하세요</h3>
                <button
                  onClick={() => navigate("/main")}
                  className="text-xs font-bold text-blue-600"
                >
                  전체보기
                </button>
              </div>
              <div className="space-y-2">
                {expiringIngredients.slice(0, 3).map((item) => {
                  const daysLeft = getDaysLeft(item.expiryDate);
                  return (
                    <div
                      key={item.id}
                      onClick={() => navigate(`/ingredient/${item.id}`)}
                      className="flex cursor-pointer items-center justify-between rounded-2xl bg-white p-3 shadow-sm border border-amber-100 hover:border-amber-300 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-lg">
                          {item.category === "채소" ? "🥬" :
                           item.category === "육류" ? "🥩" :
                           item.category === "유제품" ? "🥛" : "🛒"}
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">{item.name}</p>
                          <p className="text-[10px] text-slate-500">{item.storage}</p>
                        </div>
                      </div>
                      <div className="flex items-center text-xs font-bold text-amber-600">
                        <AlertCircle size={14} className="mr-1" />
                        D-{daysLeft === 0 ? "day" : daysLeft}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 추천 레시피 */}
          <div className="mb-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">👨‍🍳 추천 레시피</h3>
            </div>
            <div className="space-y-2">
              {recommendedRecipes.map((recipe, idx) => (
                <div
                  key={idx}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl bg-white p-4 shadow-sm border border-slate-100 hover:border-blue-200 transition-all"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-100 text-2xl">
                    <ChefHat size={24} className="text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-800">{recipe.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {recipe.ingredients.join(", ")}
                    </p>
                    <span className="mt-1.5 inline-block rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-600">
                      {recipe.difficulty}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pb-20"></div>
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 w-full flex h-20 shrink-0 items-center justify-around bg-white px-6 pb-4 pt-2 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] z-30">
          <button
            onClick={() => navigate("/home")}
            className="flex flex-col items-center gap-1.5 text-blue-600 transition-colors"
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

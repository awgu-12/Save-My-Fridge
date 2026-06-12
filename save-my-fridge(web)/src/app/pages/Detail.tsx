import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { ChevronLeft, Trash2, Calendar, Archive } from "lucide-react";
import { useIngredients } from "../context/IngredientContext";

export function Detail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { ingredients, updateIngredient, deleteIngredient } = useIngredients();
  
  const ingredient = ingredients.find(item => item.id === id);

  const [quantity, setQuantity] = useState(1);
  const [memo, setMemo] = useState("");

  useEffect(() => {
    if (ingredient) {
      setQuantity(ingredient.quantity);
      setMemo(ingredient.memo);
    }
  }, [ingredient]);

  if (!ingredient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
        <div className="flex h-[844px] w-full max-w-[390px] flex-col items-center justify-center rounded-[3rem] bg-white ring-8 ring-slate-800">
          <p className="text-slate-500 mb-4">재료를 찾을 수 없습니다.</p>
          <button onClick={() => navigate("/main")} className="text-blue-600 font-bold">돌아가기</button>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (id) {
      updateIngredient(id, { quantity, memo });
      alert("수정되었습니다.");
      navigate("/main");
    }
  };

  const handleDelete = () => {
    if (id && window.confirm("정말 이 재료를 삭제하시겠습니까?")) {
      deleteIngredient(id);
      navigate("/main");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-4 sm:p-8">
      <div className="relative flex h-[844px] max-h-[90vh] w-full max-w-[390px] flex-col overflow-hidden rounded-[3rem] bg-slate-50 shadow-2xl ring-8 ring-slate-800">
        
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center bg-white px-4 shadow-sm z-10 border-b border-slate-100">
          <button
            onClick={() => navigate("/main")}
            className="flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors active:bg-slate-100"
          >
            <ChevronLeft size={28} />
          </button>
          <h1 className="flex-1 pr-10 text-center text-lg font-bold text-slate-800">상세 정보</h1>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-8 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          
          <div className="mb-8 flex flex-col items-center text-center">
            <div className={`mb-4 flex h-24 w-24 items-center justify-center rounded-full text-4xl shadow-sm ${
              ingredient.category === "채소" ? "bg-green-100" :
              ingredient.category === "육류" ? "bg-rose-100" :
              ingredient.category === "유제품" ? "bg-amber-100" : "bg-slate-200"
            }`}>
              {ingredient.category === "채소" ? "🥬" :
               ingredient.category === "육류" ? "🥩" :
               ingredient.category === "유제품" ? "🥛" : "🛒"}
            </div>
            <h2 className="text-2xl font-bold text-slate-800">{ingredient.name}</h2>
            <span className="mt-2 rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
              {ingredient.category}
            </span>
          </div>

          <div className="mb-8 grid grid-cols-2 gap-4">
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
              <Calendar size={20} className="mb-2 text-blue-500" />
              <span className="text-xs text-slate-500 mb-1">유통기한</span>
              <span className="font-bold text-slate-800">{ingredient.expiryDate}</span>
            </div>
            <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-4 shadow-sm border border-slate-100">
              <Archive size={20} className="mb-2 text-purple-500" />
              <span className="text-xs text-slate-500 mb-1">보관위치</span>
              <span className="font-bold text-slate-800">{ingredient.storage}</span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">남은 수량 변경</label>
              <div className="flex items-center rounded-2xl border border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-16 py-4 text-slate-500 hover:text-slate-800 font-bold text-xl"
                >-</button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                  className="w-full text-center outline-none font-bold text-slate-800 text-lg [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                />
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-16 py-4 text-slate-500 hover:text-slate-800 font-bold text-xl"
                >+</button>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">메모 작성</label>
              <textarea
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
                placeholder="재료에 대한 메모를 남겨주세요."
                rows={4}
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 resize-none"
              />
            </div>
          </div>

        </div>

        {/* Bottom Actions */}
        <div className="flex shrink-0 items-center gap-3 bg-white px-6 pb-8 pt-4 z-10 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-t border-slate-100">
          <button
            onClick={handleDelete}
            className="flex h-[56px] w-[56px] items-center justify-center rounded-2xl bg-red-50 text-red-500 transition-colors hover:bg-red-100 active:scale-95 shrink-0"
          >
            <Trash2 size={24} />
          </button>
          <button
            onClick={handleSave}
            className="flex-1 rounded-2xl bg-blue-600 h-[56px] text-[16px] font-bold text-white shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
          >
            수정 완료
          </button>
        </div>

        {/* Fake iOS Home Indicator */}
        <div className="absolute bottom-2 left-1/2 h-1.5 w-1/3 -translate-x-1/2 rounded-full bg-slate-300 z-20"></div>
      </div>
    </div>
  );
}

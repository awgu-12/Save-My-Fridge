import { useNavigate } from "react-router";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useIngredients } from "../context/IngredientContext";

export function Register() {
  const navigate = useNavigate();
  const { addIngredient } = useIngredients();
  
  const [formData, setFormData] = useState({
    name: "",
    category: "채소",
    quantity: 1,
    expiryDate: "",
    storage: "냉장" as "냉장" | "냉동",
    memo: "",
  });

  const categories = ["채소", "육류", "유제품", "과일", "해산물", "기타"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.expiryDate) {
      alert("재료명과 유통기한은 필수입니다.");
      return;
    }
    
    addIngredient(formData);
    navigate("/main");
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
          <h1 className="flex-1 pr-10 text-center text-lg font-bold text-slate-800">재료 등록</h1>
        </div>

        {/* Form Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 재료명 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">재료명</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 양파, 우유, 소고기"
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            {/* 카테고리 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">카테고리</label>
              <div className="grid grid-cols-3 gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`rounded-xl py-3 text-sm font-semibold transition-colors ${
                      formData.category === cat
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "bg-white text-slate-600 border border-slate-200"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 보관 위치 */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-700">보관 위치</label>
              <div className="flex rounded-2xl bg-slate-200 p-1">
                {["냉장", "냉동"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFormData({ ...formData, storage: type as "냉장" | "냉동" })}
                    className={`flex-1 rounded-xl py-3 text-sm font-bold transition-all ${
                      formData.storage === type
                        ? "bg-white text-slate-800 shadow-sm"
                        : "text-slate-500"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* 수량 & 유통기한 */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">수량</label>
                <div className="flex items-center rounded-2xl border border-slate-200 bg-white">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: Math.max(1, formData.quantity - 1) })}
                    className="w-12 py-4 text-slate-500 hover:text-slate-800 font-bold"
                  >-</button>
                  <input
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) || 1 })}
                    className="w-full text-center outline-none font-semibold text-slate-800 [-moz-appearance:_textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, quantity: formData.quantity + 1 })}
                    className="w-12 py-4 text-slate-500 hover:text-slate-800 font-bold"
                  >+</button>
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">유통기한</label>
                <input
                  type="date"
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 font-medium text-slate-700"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-2xl bg-blue-600 px-4 py-4 text-[16px] font-bold text-white shadow-lg shadow-blue-200 transition-transform active:scale-[0.98]"
            >
              등록하기
            </button>
          </form>
        </div>

        {/* Fake iOS Home Indicator */}
        <div className="mx-auto mb-2 mt-auto h-1.5 w-1/3 shrink-0 rounded-full bg-slate-300"></div>
      </div>
    </div>
  );
}

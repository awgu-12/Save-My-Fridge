import { useState, useEffect, useRef } from "react";
import { X, Bell, ChefHat, AlertTriangle, Trash2 } from "lucide-react";
import { useIngredients } from "../context/IngredientContext";

type Notification = {
  id: string;
  type: "expired" | "expiring" | "recipe";
  title: string;
  body: string;
  time: string;
};

const APP_DATE = new Date("2026-04-29");

function daysUntil(dateStr: string): number {
  const expiry = new Date(dateStr);
  const diff = expiry.getTime() - APP_DATE.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

const RECIPE_NOTIFICATIONS: Notification[] = [
  {
    id: "recipe-1",
    type: "recipe",
    title: "오늘의 추천 레시피",
    body: "냉장고 재료로 만드는 계란볶음밥 🍳",
    time: "방금",
  },
  {
    id: "recipe-2",
    type: "recipe",
    title: "오늘의 추천 레시피",
    body: "야채 된장국으로 건강한 한 끼 🥣",
    time: "1시간 전",
  },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function NotificationPanel({ isOpen, onClose }: Props) {
  const { ingredients } = useIngredients();
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const panelRef = useRef<HTMLDivElement>(null);

  const ingredientNotifications: Notification[] = [
    ...ingredients
      .filter((i) => daysUntil(i.expiryDate) < 0)
      .map((i) => ({
        id: `expired-${i.id}`,
        type: "expired" as const,
        title: "폐기된 재료",
        body: `${i.name}의 유통기한이 ${Math.abs(daysUntil(i.expiryDate))}일 지났습니다.`,
        time: "오늘",
      })),
    ...ingredients
      .filter((i) => daysUntil(i.expiryDate) >= 0 && daysUntil(i.expiryDate) <= 3)
      .map((i) => ({
        id: `expiring-${i.id}`,
        type: "expiring" as const,
        title: "유통기한 임박",
        body:
          daysUntil(i.expiryDate) === 0
            ? `${i.name} 오늘이 유통기한입니다!`
            : `${i.name} D-${daysUntil(i.expiryDate)} 남았습니다.`,
        time: "오늘",
      })),
  ];

  const allNotifications = [...ingredientNotifications, ...RECIPE_NOTIFICATIONS].filter(
    (n) => !dismissed.has(n.id)
  );

  const dismiss = (id: string) => setDismissed((prev) => new Set([...prev, id]));
  const dismissAll = () => setDismissed(new Set(allNotifications.map((n) => n.id)));

  useEffect(() => {
    if (!isOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const iconColor = (type: Notification["type"]) => {
    if (type === "expired") return "bg-red-100 text-red-600";
    if (type === "expiring") return "bg-orange-100 text-orange-600";
    return "bg-blue-100 text-blue-600";
  };

  const Icon = (type: Notification["type"]) => {
    if (type === "expired") return <Trash2 size={16} />;
    if (type === "expiring") return <AlertTriangle size={16} />;
    return <ChefHat size={16} />;
  };

  return (
    <div className="absolute left-0 top-16 z-50 w-full px-3" ref={panelRef}>
      <div className="rounded-2xl bg-white shadow-xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <Bell size={16} className="text-blue-600" />
            <span className="font-bold text-slate-800 text-sm">알림</span>
            {allNotifications.length > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white">
                {allNotifications.length}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {allNotifications.length > 0 && (
              <button
                onClick={dismissAll}
                className="text-xs text-slate-400 hover:text-red-500 transition-colors"
              >
                전체 삭제
              </button>
            )}
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="max-h-72 overflow-y-auto [&::-webkit-scrollbar]:hidden">
          {allNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-slate-400">
              <Bell size={28} className="mb-2 opacity-30" />
              <p className="text-sm">알림이 없습니다</p>
            </div>
          ) : (
            allNotifications.map((n) => (
              <div
                key={n.id}
                className="flex items-start gap-3 px-4 py-3 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
              >
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${iconColor(n.type)}`}>
                  {Icon(n.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-700">{n.title}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{n.body}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
                <button
                  onClick={() => dismiss(n.id)}
                  className="shrink-0 text-slate-300 hover:text-slate-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export function useBellCount() {
  const { ingredients } = useIngredients();
  const expiredCount = ingredients.filter((i) => daysUntil(i.expiryDate) < 0).length;
  const expiringCount = ingredients.filter(
    (i) => daysUntil(i.expiryDate) >= 0 && daysUntil(i.expiryDate) <= 3
  ).length;
  return expiredCount + expiringCount + RECIPE_NOTIFICATIONS.length;
}

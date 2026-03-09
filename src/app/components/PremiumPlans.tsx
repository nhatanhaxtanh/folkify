import { ArrowLeft, Check, Crown, Sparkles } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useSubscription } from "../subscription";

type PremiumRouteState = {
  from?: string;
  feature?: string;
};

export function PremiumPlans() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isPremium, plan, upgradeToPremium, downgradeToFree } = useSubscription();
  const routeState = (location.state as PremiumRouteState | null) ?? null;

  const redirectTarget = routeState?.from || "/profile";
  const featureLabel = routeState?.feature || "tính năng này";

  const handleUpgrade = () => {
    upgradeToPremium();
    navigate(redirectTarget, { replace: true });
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F7FAF8]">
      <div className="bg-gradient-to-br from-[#1A3A2B] to-[#2D6A4F] px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/10 rounded-full" />
        <div className="absolute bottom-2 -left-7 w-24 h-24 bg-white/10 rounded-full" />
        <div className="relative">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center mb-4"
            aria-label="Quay lại"
          >
            <ArrowLeft size={18} className="text-white" />
          </button>
          <div className="w-14 h-14 rounded-2xl bg-white/15 flex items-center justify-center mb-4">
            <Crown size={28} className="text-amber-300" />
          </div>
          <div className="flex items-center gap-2">
            <Crown size={20} className="text-amber-300" />
            <h1 className="text-white text-2xl" style={{ fontWeight: 700 }}>
              Folkify Premium
            </h1>
          </div>
          <p className="text-[#B7E4C7] text-sm mt-2">
            Nâng cấp để mở khóa toàn bộ sheet và nội dung nâng cao.
          </p>
        </div>
      </div>

      <div className="flex-1 px-4 py-5 space-y-4">
        {!isPremium && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-3">
            <p className="text-amber-800 text-sm">
              Bạn cần Premium để dùng <span style={{ fontWeight: 700 }}>{featureLabel}</span>.
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
          <p className="text-gray-500 text-xs">Gói hiện tại</p>
          <p className="text-[#1A3A2B] text-lg mt-0.5" style={{ fontWeight: 700 }}>
            {plan === "premium" ? "Premium" : "Free"}
          </p>
        </div>

        <div className="bg-white rounded-2xl border-2 border-[#2D6A4F]/30 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-[#2D6A4F]" />
            <p className="text-[#1A3A2B] text-sm" style={{ fontWeight: 700 }}>
              Quyền lợi Premium
            </p>
          </div>
          <div className="space-y-2">
            {[
              "Mở khóa toàn bộ sheet premium",
              "Tải sheet độ phân giải cao",
              "Ưu tiên tính năng luyện tập mới",
            ].map((item) => (
              <div key={item} className="flex items-start gap-2">
                <Check size={14} className="text-[#2D6A4F] mt-0.5 flex-shrink-0" />
                <p className="text-gray-700 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-4 pt-2 pb-6" style={{ paddingBottom: "calc(1.5rem + env(safe-area-inset-bottom))" }}>
        {isPremium ? (
          <div className="space-y-2">
            <button
              onClick={() => navigate(redirectTarget, { replace: true })}
              className="w-full py-3.5 bg-[#1A3A2B] text-white rounded-2xl"
              style={{ fontWeight: 700 }}
            >
              Tiếp tục sử dụng
            </button>
            <button
              onClick={downgradeToFree}
              className="w-full py-3.5 bg-white border border-gray-200 text-gray-700 rounded-2xl"
              style={{ fontWeight: 600 }}
            >
              Chuyển về gói Free
            </button>
          </div>
        ) : (
          <button
            onClick={handleUpgrade}
            className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-2xl"
            style={{ fontWeight: 700 }}
          >
            Mua Premium ngay
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  ArrowLeft,
  CheckCircle,
  ChevronRight,
  Lightbulb,
  Play,
  Pause,
  Volume2,
  Clock,
  Star,
  Zap,
} from "lucide-react";
import { instruments } from "../data/instruments";
import folkifyLogo from "../../assets/logofolkify.png";

export function LessonDetail() {
  const { id, lessonId } = useParams();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [showTips, setShowTips] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lessonFinished, setLessonFinished] = useState(false);

  const instrument = instruments.find((i) => i.id === id);
  const lesson = instrument?.lessons.find((l) => l.id === lessonId);

  if (!instrument || !lesson) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#F7FAF8]">
        <div className="text-center">
          <p className="text-gray-500">Không tìm thấy bài học</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-[#2D6A4F] text-sm">
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  const totalSteps = lesson.steps.length;
  const progress = Math.round((completedSteps.size / totalSteps) * 100);

  const levelStyle =
    lesson.level === "Beginner"
      ? "bg-green-100 text-green-700"
      : lesson.level === "Intermediate"
      ? "bg-yellow-100 text-yellow-700"
      : "bg-red-100 text-red-700";

  const showYoutubeVideo = instrument.id === "dan-tranh" && lesson.id === "dt-1";
  const youtubeEmbedUrl =
    "https://www.youtube.com/embed/PehCcuN10M0?list=PLPfXdEzIap5iEbYjcDI3vdgrM7nSML-3u&index=1";

  const toggleStep = (index: number) => {
    const updated = new Set(completedSteps);
    if (updated.has(index)) {
      updated.delete(index);
    } else {
      updated.add(index);
      if (updated.size === totalSteps) {
        setLessonFinished(true);
      }
    }
    setCompletedSteps(updated);
  };

  return (
    <div className="flex flex-col min-h-full bg-[#F7FAF8]">
      {/* Header */}
      <div className="bg-[#1A3A2B] px-5 pt-12 pb-8 relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-36 h-36 rounded-full bg-white/5" />
        <div className="absolute -bottom-4 left-0 right-0 h-10 bg-[#F7FAF8] rounded-t-3xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-1.5 mb-4 -mt-2">
            <img
              src={folkifyLogo}
              alt="Folkify"
              className="w-10 h-10 rounded-xl"
            />
            <span className="text-white text-xl" style={{ fontWeight: 700 }}>
              Folkify
            </span>
          </div>

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-[#95D5B2] text-sm mb-5"
          >
            <ArrowLeft size={18} />
            <span>{instrument.name}</span>
          </button>

          <div className="flex items-start justify-between">
            <div>
              <span className={`text-xs px-2.5 py-1 rounded-full ${levelStyle}`}>
                {lesson.level}
              </span>
              <div className="flex items-center gap-2 mt-2 pr-4">
                <Play size={15} className="text-[#95D5B2]" />
                <h1 className="text-white text-lg" style={{ fontWeight: 700 }}>
                  {lesson.title}
                </h1>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1.5 -mt-1 flex-shrink-0">
              <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-3 py-1.5">
                <Clock size={12} className="text-[#95D5B2]" />
                <span className="text-white text-xs">{lesson.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-[#2D6A4F]/60 rounded-full px-3 py-1.5">
                <Zap size={12} className="text-yellow-400" />
                <span className="text-yellow-300 text-xs" style={{ fontWeight: 700 }}>+{lesson.xp} XP</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 px-4 py-4 space-y-5">
        {/* Progress */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>Tiến độ bài học</p>
            <p className="text-[#2D6A4F] text-sm" style={{ fontWeight: 700 }}>{progress}%</p>
          </div>
          <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#2D6A4F] to-[#52B788] rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-gray-400 text-xs mt-1.5">
            {completedSteps.size}/{totalSteps} bước hoàn thành
          </p>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <p className="text-[#1A3A2B] text-sm" style={{ fontWeight: 700 }}>📋 Giới thiệu bài học</p>
          <p className="text-gray-600 text-xs mt-2 leading-relaxed">{lesson.description}</p>
        </div>

        {/* Video */}
        {showYoutubeVideo ? (
          <div className="bg-[#1A3A2B] rounded-2xl p-3">
            <div className="relative w-full overflow-hidden rounded-xl" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={youtubeEmbedUrl}
                title="Làm quen với đàn tranh"
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        ) : (
          <div className="bg-[#1A3A2B] rounded-2xl p-5">
            {/* Thumbnail */}
            <div className="relative rounded-xl overflow-hidden mb-4" style={{ height: 120 }}>
              <img src={lesson.videoThumb} alt={lesson.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#1A3A2B]/50 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-transform"
                >
                  {isPlaying ? (
                    <Pause size={22} className="text-[#1A3A2B]" />
                  ) : (
                    <Play size={22} className="text-[#1A3A2B] ml-0.5" fill="#1A3A2B" />
                  )}
                </button>
              </div>
              {isPlaying && (
                <div className="absolute bottom-2 left-3 right-3">
                  <div className="flex items-center gap-1.5 justify-center">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div
                        key={i}
                        className="bg-[#52B788]/70 rounded-full w-0.5"
                        style={{
                          height: `${6 + Math.abs(Math.sin(i * 0.7)) * 14}px`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            <p className="text-[#95D5B2] text-xs mb-3" style={{ fontWeight: 600 }}>🎵 Nghe mẫu bài học</p>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="w-full h-1.5 bg-white/20 rounded-full overflow-hidden mb-1.5">
                  <div className="w-1/3 h-full bg-[#52B788] rounded-full" />
                </div>
                <div className="flex justify-between">
                  <span className="text-[#52B788] text-xs">0:23</span>
                  <span className="text-[#52B788] text-xs">{lesson.duration}</span>
                </div>
              </div>
              <Volume2 size={16} className="text-[#52B788] flex-shrink-0" />
            </div>
          </div>
        )}

        {/* Steps */}
        <div className="space-y-3">
          <p className="text-[#1A3A2B] text-sm" style={{ fontWeight: 700 }}>📝 Các bước thực hiện</p>
          {lesson.steps.map((step, i) => {
            const done = completedSteps.has(i);
            return (
              <div
                key={i}
                onClick={() => toggleStep(i)}
                className={`bg-white rounded-2xl p-4 flex items-start gap-3 shadow-sm border transition-all cursor-pointer active:scale-[0.98] ${
                  done ? "border-[#52B788]/40 bg-[#F0FBF4]" : "border-gray-100"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    done ? "bg-[#2D6A4F]" : "bg-[#E8F5EE]"
                  }`}
                >
                  {done ? (
                    <CheckCircle size={16} className="text-white" />
                  ) : (
                    <span className="text-[#2D6A4F] text-xs" style={{ fontWeight: 700 }}>{i + 1}</span>
                  )}
                </div>
                <p className={`text-sm leading-relaxed flex-1 ${done ? "text-gray-400 line-through" : "text-gray-700"}`}>
                  {step}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tips */}
        <div className="bg-amber-50 rounded-2xl border border-amber-100 overflow-hidden">
          <button
            onClick={() => setShowTips(!showTips)}
            className="w-full flex items-center gap-3 p-4"
          >
            <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb size={16} className="text-amber-700" />
            </div>
            <p className="text-amber-800 text-sm flex-1 text-left" style={{ fontWeight: 600 }}>
              💡 Mẹo và lưu ý
            </p>
            <ChevronRight
              size={16}
              className={`text-amber-600 transition-transform ${showTips ? "rotate-90" : ""}`}
            />
          </button>
          {showTips && (
            <div className="px-4 pb-4 space-y-2.5">
              {lesson.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-amber-200 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Star size={10} className="text-amber-700" fill="#B45309" />
                  </div>
                  <p className="text-amber-700 text-xs leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Complete Button */}
        {lessonFinished ? (
          <div className="bg-[#E8F5EE] rounded-2xl p-5 border border-[#52B788]/40 text-center">
            <div className="w-14 h-14 bg-[#2D6A4F]/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <CheckCircle size={28} className="text-[#2D6A4F]" />
            </div>
            <p className="text-[#1A3A2B] text-base" style={{ fontWeight: 700 }}>Tuyệt vời! 🎉</p>
            <p className="text-[#2D6A4F] text-xs mt-1 mb-1">Bạn đã hoàn thành bài học này!</p>
            <div className="flex items-center justify-center gap-1 mb-4">
              <Zap size={14} className="text-yellow-500" />
              <span className="text-yellow-600 text-sm" style={{ fontWeight: 700 }}>+{lesson.xp} XP nhận được</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => navigate(`/learn/${instrument.id}`)}
                className="flex-1 py-3 bg-white border border-[#52B788]/40 text-[#2D6A4F] rounded-xl text-sm"
                style={{ fontWeight: 600 }}
              >
                Bài học khác
              </button>
              <button
                onClick={() => navigate("/profile")}
                className="flex-1 py-3 bg-[#1A3A2B] text-white rounded-xl text-sm"
                style={{ fontWeight: 600 }}
              >
                Xem thành tích
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              if (completedSteps.size > 0) setLessonFinished(true);
            }}
            className={`w-full py-4 rounded-2xl text-white transition-all active:scale-[0.98] ${
              completedSteps.size === 0
                ? "bg-gray-200 text-gray-400"
                : "bg-gradient-to-r from-[#1A3A2B] to-[#2D6A4F] shadow-lg"
            }`}
            style={{ fontWeight: 600 }}
            disabled={completedSteps.size === 0}
          >
            {completedSteps.size === 0
              ? "Hoàn thành các bước để kết thúc"
              : `Hoàn thành bài học (${completedSteps.size}/${totalSteps})`}
          </button>
        )}
      </div>
    </div>
  );
}

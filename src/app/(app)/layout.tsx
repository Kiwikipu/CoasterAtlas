import BottomNav from "@/components/BottomNav";
import StampCelebration from "@/components/StampCelebration";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[radial-gradient(ellipse_at_top_right,#fde9df_0%,transparent_45%),radial-gradient(ellipse_at_bottom_left,#e9f5f4_0%,transparent_45%)]">
      <div className="mx-auto w-full max-w-2xl px-4 pb-32">{children}</div>
      <BottomNav />
      <StampCelebration />
    </div>
  );
}

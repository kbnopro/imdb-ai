import { SettingsModal } from "@/features/settings/components/SettingModal/SettingsModal";
import { TopBar } from "@chat/components/TopBar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex h-screen w-screen bg-white dark:bg-neutral-800">
      <div className="flex h-full w-full flex-col items-center">
        <TopBar />
        {children}
        <SettingsModal />
      </div>
    </div>
  );
}

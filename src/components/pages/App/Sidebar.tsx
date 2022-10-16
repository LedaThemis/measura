import Link from "next/link";
import { useRouter } from "next/router";
import {
  BsAlarm,
  BsClockHistory,
  BsGear,
  BsGraphUp,
  BsHouse,
} from "react-icons/bs";
import RulerIcon from "../../../icons/RulerIcon";

interface SidebarNavLinkProps {
  title: string;
  path: string;
  Icon: React.ReactNode;
}

const SidebarNavLink = ({ path, Icon, title }: SidebarNavLinkProps) => {
  const router = useRouter();

  const selectedClass = router.pathname === path ? "bg-sky-100" : "";

  return (
    <Link href={path}>
      <a
        className={`duration-50 flex w-min cursor-pointer items-center gap-2 rounded-xl p-1 transition-colors hover:bg-sky-100  sm:w-full ${selectedClass}`}
      >
        <div className="inline-flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-500">
          {Icon}
        </div>
        <p className="sr-only sm:not-sr-only">{title}</p>
      </a>
    </Link>
  );
};

const SidebarNav = () => {
  return (
    <nav className="flex flex-col gap-3">
      <SidebarNavLink
        title="Dashboard"
        path="/app"
        Icon={<BsHouse aria-hidden="true" size={"1.5rem"} />}
      />
      <SidebarNavLink
        title="History"
        path="/app/history"
        Icon={<BsClockHistory aria-hidden="true" size={"1.5rem"} />}
      />
      <SidebarNavLink
        title="Progress"
        path="/app/progress"
        Icon={<BsGraphUp aria-hidden="true" size={"1.5rem"} />}
      />
      <SidebarNavLink
        title="Reminders"
        path="/app/reminders"
        Icon={<BsAlarm aria-hidden="true" size={"1.5rem"} />}
      />
      <SidebarNavLink
        title="Settings"
        path="/app/settings"
        Icon={<BsGear aria-hidden="true" size={"1.5rem"} />}
      />
    </nav>
  );
};

const Sidebar = () => {
  return (
    <header className="box-border flex h-screen w-min shrink-0 flex-col place-items-center gap-8 border-r-2 px-4 pt-4 sm:place-items-stretch ">
      <a className="title-font flex  items-center gap-4 font-medium text-gray-900">
        <RulerIcon className="h-12 w-12 rounded-full bg-blue-100 p-2 text-white" />
        <h1 className="sr-only ml-3 text-2xl sm:not-sr-only">Measura</h1>
      </a>
      <SidebarNav />
    </header>
  );
};

export default Sidebar;

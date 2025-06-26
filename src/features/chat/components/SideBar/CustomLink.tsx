import clsx from "clsx";
import Link from "next/link";
import type { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

interface CustomLinkProps extends Omit<LinkProps, "className"> {
  children?: React.ReactNode;
}

export const CustomLink = ({ children, ...props }: CustomLinkProps) => {
  const pathname = usePathname();
  const active = pathname === props.href && props.href !== "/";
  return (
    <Link
      className={clsx(
        "flex w-full items-center gap-4 rounded-lg p-1.5",
        active
          ? "bg-neutral-200 dark:bg-neutral-700/80"
          : "hover:bg-neutral-200/50 dark:hover:bg-neutral-700/40",
      )}
      {...props}
    >
      {children ?? <></>}
    </Link>
  );
};

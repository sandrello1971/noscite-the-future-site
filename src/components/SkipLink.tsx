import { cn } from "@/lib/utils";

interface SkipLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export const SkipLink = ({ href, children, className }: SkipLinkProps) => {
  return (
    <a
      href={href}
      className={cn(
        // Position off-screen by default
        "absolute -top-full left-4 z-[100]",
        // When focused, bring into view
        "focus:top-4",
        // Styling
        "bg-primary text-primary-foreground px-4 py-2 rounded-md",
        "font-medium text-sm",
        "transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "hover:bg-primary/90",
        className
      )}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const target = document.querySelector(href) as HTMLElement;
          if (target && typeof target.focus === 'function') {
            target.focus({ preventScroll: false });
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }}
    >
      {children}
    </a>
  );
};
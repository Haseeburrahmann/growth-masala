interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-white p-6 shadow-sm ${
        hover ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-lg" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}

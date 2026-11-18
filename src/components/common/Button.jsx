export default function Button({
  as: Element = "button",
  children,
  className = "",
  ...props
}) {
  return (
    <Element
      className={`inline-flex items-center justify-center rounded-[4px] border border-white/30 px-5 py-2.5 text-sm font-medium transition-colors hover:border-white hover:bg-white hover:text-black ${className}`}
      {...props}
    >
      {children}
    </Element>
  );
}

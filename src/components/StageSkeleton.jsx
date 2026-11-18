export default function StageSkeleton() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center px-4">
      <div className="w-full max-w-[820px]">
        <div className="skeleton mx-auto h-3 w-24 rounded-chip" />
        <div className="skeleton mx-auto mt-4 h-12 w-2/3 rounded-panel sm:h-16" />
        <div className="skeleton mx-auto mt-8 h-[26vh] w-full rounded-panel" />
      </div>
    </div>
  );
}

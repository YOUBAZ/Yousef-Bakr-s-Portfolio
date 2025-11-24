const Loading = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 text-white">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.16),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(99,102,241,0.15),transparent_55%)]" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/20 blur-3xl" />
      </div>

      <div
        className="relative flex flex-col items-center gap-6 rounded-3xl border border-white/10 bg-slate-900/85 px-10 py-12 text-center shadow-2xl shadow-slate-950/50 backdrop-blur"
        role="status"
        aria-live="polite"
      >
        <div className="relative h-20 w-20">
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-sky-400/90 border-t-transparent animate-spin" />
          <div className="absolute inset-3 flex items-center justify-center rounded-full bg-slate-950">
            <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-slate-900">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300/60" />
              <span className="relative h-2 w-2 rounded-full bg-sky-300" />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">
            Preparing experience
          </p>
          <p className="text-2xl font-semibold text-white">Loading portfolio</p>
          <p className="text-sm text-slate-400">React · Motion · WebGL</p>
        </div>

        <div className="w-48 space-y-3">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full animate-pulse rounded-full bg-gradient-to-r from-sky-500/70 via-white/80 to-indigo-500/70" />
          </div>
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
            <span>UI</span>
            <span>Motion</span>
            <span>Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

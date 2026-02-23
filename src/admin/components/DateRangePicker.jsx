import { parseDateRange, buildDateString } from "../utils/dateUtils.js";

export default function DateRangePicker({ value, onChange }) {
  const { startDate, endDate, isPresent } = parseDateRange(value);

  const handleStartChange = (e) => {
    onChange(buildDateString(e.target.value, endDate, isPresent));
  };

  const handleEndChange = (e) => {
    onChange(buildDateString(startDate, e.target.value, false));
  };

  const handlePresentChange = (e) => {
    onChange(buildDateString(startDate, "", e.target.checked));
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-zinc-400 mb-1">Start date</label>
          <input
            type="month"
            value={startDate}
            onChange={handleStartChange}
            className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-600 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
          />
        </div>
        <div>
          <label className="block text-sm text-zinc-400 mb-1">End date</label>
          <input
            type="month"
            value={endDate}
            onChange={handleEndChange}
            disabled={isPresent}
            className={`w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-600 text-white focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all [&::-webkit-calendar-picker-indicator]:opacity-60 [&::-webkit-calendar-picker-indicator]:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
          />
        </div>
      </div>
      <label className="flex items-center gap-2 cursor-pointer group">
        <input
          type="checkbox"
          checked={isPresent}
          onChange={handlePresentChange}
          className="w-4 h-4 rounded border-zinc-600 bg-zinc-800 text-emerald-500 focus:ring-emerald-500/50 focus:ring-offset-0 cursor-pointer"
        />
        <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
          I currently work here (Present)
        </span>
      </label>
    </div>
  );
}

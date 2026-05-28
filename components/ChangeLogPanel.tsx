import { ChangeLog } from "../types/index";

interface ChangeLogPanelProps {
  logs: ChangeLog[];
}

export default function ChangeLogPanel({ logs }: ChangeLogPanelProps) {
  const sortedLogs = [...logs].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 h-full flex flex-col">
      <h3 className="font-semibold text-gray-900 mb-4">Activity Log</h3>
      <div className="flex-1 overflow-y-auto pr-2 space-y-4">
        {sortedLogs.map((log) => (
          <div key={log.id} className="flex gap-3 text-sm">
            <div className="flex flex-col items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5" />
              <div className="w-px h-full bg-gray-100 mt-1" />
            </div>
            <div className="pb-4">
              <p className="text-gray-800">
                <span className="font-medium">{log.taskTitle}</span>:{" "}
                {log.action}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {new Date(log.timestamp).toLocaleDateString()} at{" "}
                {new Date(log.timestamp).toLocaleString("en-PH", {
                  timeZone: "Asia/Manila",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        {logs.length === 0 && (
          <p className="text-sm text-gray-400 italic">No activity yet.</p>
        )}
      </div>
    </div>
  );
}

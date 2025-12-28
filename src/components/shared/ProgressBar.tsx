import { FiCheck } from 'react-icons/fi';

interface Step {
  id: string;
  title: string;
  completed: boolean;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: string;
  onStepClick: (stepId: string) => void;
}

export const ProgressBar = ({
  steps,
  currentStep,
  onStepClick
}: ProgressBarProps) => {
  const currentIndex = steps.findIndex((s) => s.id === currentStep);
  const progress = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center mt-3">
          <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="text-sm font-bold text-blue-600 dark:text-indigo-400 bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full">
            {Math.round(progress)}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {steps.map((step, index) => {
          const isCurrent = step.id === currentStep;
          const isPast = index < currentIndex;

          return (
            <button
              key={step.id}
              onClick={() => onStepClick(step.id)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-200 ${
                isCurrent
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-[1.02] hover:shadow-xl'
                  : isPast
                    ? 'bg-green-50 dark:bg-green-900/20 text-gray-900 dark:text-white border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30'
                    : 'bg-gray-50 dark:bg-gray-800/50 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                    isCurrent
                      ? 'bg-white/20 text-white'
                      : step.completed
                        ? 'bg-green-500 text-white shadow-md'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}
                >
                  {step.completed ? <FiCheck className="w-5 h-5" /> : index + 1}
                </div>

                <span
                  className={`font-semibold ${isCurrent ? 'text-white' : ''}`}
                >
                  {step.title}
                </span>
              </div>

              {step.completed && !isCurrent && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-medium text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/40 px-2 py-1 rounded-full">
                    Completed
                  </span>
                  <FiCheck className="w-5 h-5 text-green-500" />
                </div>
              )}

              {isCurrent && (
                <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                  Current
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-gray-700 dark:text-gray-300">
            Completed Steps
          </span>
          <span className="font-bold text-blue-600 dark:text-indigo-400">
            {steps.filter((s) => s.completed).length} / {steps.length}
          </span>
        </div>
      </div>
    </div>
  );
};

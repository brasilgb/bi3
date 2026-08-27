import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';
import { IoAlertCircleOutline } from 'react-icons/io5';

export const LoadingRows = ({ rows = 6 }: { rows?: number }) => (
  <div className="p-4 space-y-2">
    {Array.from({ length: rows }).map((_, i) => (
      <Skeleton key={i} className="h-7 w-full" />
    ))}
  </div>
);

export const ErrorRetry = ({ onRetry }: { onRetry: () => void }) => (
  <div className="flex flex-col items-center justify-center gap-2 p-10 text-gray-500">
    <IoAlertCircleOutline size={32} className="text-solar-red-support" />
    <p className="text-sm">Não foi possível carregar os dados.</p>
    <button
      onClick={onRetry}
      className="text-sm font-medium text-solar-blue-primary underline underline-offset-2 transition-colors duration-200 hover:text-solar-blue-secundary active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-solar-blue-primary focus-visible:ring-offset-1 rounded"
    >
      Tentar novamente
    </button>
  </div>
);

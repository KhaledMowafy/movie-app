import { useEffect, useRef } from "react";

/** runs a use case and auto-aborts previous call when inputs change */
export function useUseCase<TArgs extends any[], TResult>(
  runner: (signal: AbortSignal, ...args: TArgs) => Promise<TResult>,
  args: TArgs,
  onSuccess: (data: TResult) => void,
  onError: (err: unknown) => void
) {
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    abortRef.current?.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    runner(ac.signal, ...args).then(onSuccess).catch((e) => {
      if ((e as any)?.name === "AbortError") return;
      onError(e);
    });

    return () => ac.abort();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, args);
}

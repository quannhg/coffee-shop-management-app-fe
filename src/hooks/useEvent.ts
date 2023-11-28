import { useEffect } from 'react';

type EventKey = 'member:refetch';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useListenEvent(event: EventKey, listener: (...args: any[]) => void) {
  useEffect(() => {
    window.addEventListener(event, listener);
    return () => {
      window.removeEventListener(event, listener);
    };
  }, [event, listener]);
}

export function emitEvent(event: EventKey, ...args: unknown[]) {
  return window.dispatchEvent(new CustomEvent(event, { detail: args }));
}

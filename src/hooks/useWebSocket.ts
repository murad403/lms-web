/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from "react";

type WebSocketOptions = {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
};

export const useWebSocket = (
  url: string | null,
  options: WebSocketOptions = {}
) => {
  const wsRef = useRef<WebSocket | null>(null);
  const optionsRef = useRef(options);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    optionsRef.current = options;
  }, [options]);

  useEffect(() => {
    if (!url) {
      setIsConnected(false);
      return;
    }

    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      optionsRef.current.onOpen?.();
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        optionsRef.current.onMessage?.(data);
      } catch (error) {
        console.error("WebSocket parse error:", error);
      }
    };

    ws.onerror = (error) => {
      optionsRef.current.onError?.(error);
    };

    ws.onclose = () => {
      setIsConnected(false);
      optionsRef.current.onClose?.();
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [url]);

  const sendMessage = useCallback((data: object) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(data));
      return true;
    }

    console.warn("WebSocket is not open");
    return false;
  }, []);

  return { isConnected, sendMessage };
};
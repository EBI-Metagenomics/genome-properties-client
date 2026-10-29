import { useEffect, useState } from "react";
import { config } from "@/config";
import { joinUrl } from "@/utils/url";

export type {
  GenomePropertyDetail,
  GenomePropertySummary,
  HierarchyNode,
  StepEvidence,
} from "./types";

export function apiUrl(path: string): string {
  return joinUrl(config.api.replace(/\/graphql$/i, ""), path);
}

export function useApi<T>(path: string | null) {
  const [loading, setLoading] = useState(Boolean(path));
  const [error, setError] = useState(false);
  const [data, setData] = useState<T | null>(null);

  useEffect(() => {
    if (!path) {
      setLoading(false);
      setError(false);
      setData(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    setError(false);
    fetch(apiUrl(path))
      .then((res) => {
        if (!res.ok) {
          throw new Error(String(res.status));
        }
        return res.json() as Promise<T>;
      })
      .then((payload) => {
        if (!cancelled) {
          setData(payload);
          setLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setError(true);
          setLoading(false);
          setData(null);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return { loading, error, data };
}

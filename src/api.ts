import { useEffect, useState } from "react";
import { config } from "./config";

export type HierarchyNode = {
  accession: string;
  description: string;
  children?: HierarchyNode[];
};

export type GenomePropertySummary = {
  accession: string;
  description: string;
};

export type StepEvidence = {
  interproAcc: string;
  signatureAcc: string;
  goId: string | null;
};

export type GenomePropertyDetail = {
  accession: string;
  type: string;
  author: string;
  description: string;
  threshold: number;
  comment: string | null;
  literature: Array<{
    pmid: number;
    title: string | null;
    author: string | null;
    journal: string | null;
    listOrder: number;
  }>;
  databaseLinks: Array<{
    dbId: string;
    dbLink: string;
    comment: string | null;
    otherParams: string | null;
  }>;
  steps: Array<{
    stepId: string;
    stepNumber: number;
    required: number;
    childAccession: string | null;
    evidence: StepEvidence[];
  }>;
};

export function apiUrl(path: string): string {
  const base = (config.api || "").replace(/\/+$/, "").replace(/\/graphql$/i, "");
  const suffix = path.startsWith("/") ? path : `/${path}`;
  return `${base}${suffix}`;
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

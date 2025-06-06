import { Terminal, Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponseTabs } from "./response-tabs";
import { ResponseData } from "./types";

interface ResponseDisplayProps {
  response: ResponseData | null;
  activeTab: string;
  loading?: boolean;
  setActiveTab: (tab: string) => void;
  onExport: () => void;
  copyToClipboard: (text: string) => void;
  formatJson: (obj: any) => string;
}

function StatusBadge({ status }: { status: number }) {
  const isSuccess = status >= 200 && status < 300;
  return (
    <Badge variant={isSuccess ? "default" : "destructive"}>{status}</Badge>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12 text-slate-500">
      <Terminal className="h-12 w-12 mx-auto mb-4 opacity-50" />
      <p>Execute a cURL command to see the response</p>
    </div>
  );
}

export function ResponseDisplay({
  response,
  activeTab,
  loading = false,
  setActiveTab,
  onExport,
  copyToClipboard,
  formatJson,
}: ResponseDisplayProps) {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Terminal className="h-5 w-5" />
            Response
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-slate-300 border-t-transparent ml-2" />
            )}
          </CardTitle>
          {response && (
            <div className="flex items-center gap-2">
              <StatusBadge status={response.status} />
              <span className="text-sm text-slate-500 font-medium">
                {response.statusText}
              </span>
              <span className="text-sm text-slate-500">{response.time}ms</span>
              <Button
                variant="outline"
                size="sm"
                onClick={onExport}
                disabled={loading}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {response ? (
          <div className="space-y-4">
            <ResponseTabs
              response={response}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              copyToClipboard={copyToClipboard}
              formatJson={formatJson}
            />
          </div>
        ) : (
          <EmptyState />
        )}
      </CardContent>
    </Card>
  );
}

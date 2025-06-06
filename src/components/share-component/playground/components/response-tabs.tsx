import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponseData } from "./types";

interface ResponseTabsProps {
  response: ResponseData;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  copyToClipboard: (text: string) => void;
  formatJson: (obj: any) => string;
}

const DARK_THEME_CLASSES = {
  container: "border border-[#23262E] rounded-lg p-4",
  infoCard: "p-3 bg-[#000000] rounded border border-[#23262E]",
  text: "text-[#3BB25D]",
  headerKey: "text-[#2e8d49]",
  border: "border-[#13151a]",
};

export function ResponseTabs({
  response,
  activeTab,
  setActiveTab,
  copyToClipboard,
  formatJson,
}: ResponseTabsProps) {
  const handleCopyResponse = () => {
    copyToClipboard(formatJson(response.data));
  };

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="response">Response Body</TabsTrigger>
        <TabsTrigger value="headers">Headers</TabsTrigger>
        <TabsTrigger value="info">Info</TabsTrigger>
      </TabsList>

      <TabsContent value="response">
        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            className="absolute top-2 right-2 z-10"
            onClick={handleCopyResponse}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <pre className="bg-slate-900 text-green-400 p-4 rounded-lg overflow-x-auto text-sm max-h-96">
            <code>{formatJson(response.data)}</code>
          </pre>
        </div>
      </TabsContent>

      <TabsContent value="headers">
        <div className={`space-y-2 ${DARK_THEME_CLASSES.container}`}>
          {Object.entries(response.headers).map(([key, value]) => (
            <div
              key={key}
              className={`flex py-1 border-b pb-2 ${DARK_THEME_CLASSES.border}`}
            >
              <span
                className={`font-medium ${DARK_THEME_CLASSES.headerKey} w-1/3 break-words text-sm`}
              >
                {key}:
              </span>
              <span
                className={`${DARK_THEME_CLASSES.headerKey} w-2/3 break-words text-sm`}
              >
                {String(value)}
              </span>
            </div>
          ))}
        </div>
      </TabsContent>

      <TabsContent value="info">
        <div className="grid grid-cols-2 gap-4">
          <InfoCard
            label="Status"
            value={`${response.status} ${response.statusText}`}
          />
          <InfoCard label="Time" value={`${response.time}ms`} />
          <InfoCard label="Size" value={`${response.size} bytes`} />
          <InfoCard
            label="Content Type"
            value={response.headers["content-type"] || "Unknown"}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className={DARK_THEME_CLASSES.infoCard}>
      <div className={`text-sm ${DARK_THEME_CLASSES.text}`}>{label}</div>
      <div className={`font-semibold ${DARK_THEME_CLASSES.text}`}>{value}</div>
    </div>
  );
}

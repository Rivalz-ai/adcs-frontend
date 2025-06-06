import { Copy, Play, Code } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PLACEHOLDER_COMMAND = `curl --request GET --url https://api.example.com --header 'accept: application/json'`;

interface CurlInputProps {
  curlCommand: string;
  error: string | null;
  loading: boolean;
  placeholder?: string;
  isShowDescription?: boolean;
  setCurlCommand: (command: string) => void;
  onExecute: () => void;
  copyToClipboard: (text: string) => void;
}

export function CurlInput({
  curlCommand,
  loading,
  error,
  isShowDescription = true,
  placeholder = PLACEHOLDER_COMMAND,
  setCurlCommand,
  onExecute,
  copyToClipboard,
}: CurlInputProps) {
  return (
    <Card className="w-full border-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5" />
          cURL Command
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          {isShowDescription && (
            <label className="text-sm font-medium text-slate-700 mb-2 block">
              Enter your cURL command:
            </label>
          )}
          <Textarea
            value={curlCommand}
            onChange={(e) => setCurlCommand(e.target.value)}
            placeholder={placeholder}
            rows={8}
            className="font-mono text-sm bg-[#000000] text-[#3BB25D]"
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onExecute}
            disabled={loading || !curlCommand.trim()}
            className="flex-1"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
                Executing...
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Execute
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={() => copyToClipboard(curlCommand)}
          >
            <Copy className="h-4 w-4" />
          </Button>
        </div>

        {error && (
          <Alert className="border-red-200 bg-transparent">
            <AlertDescription className="text-red-700">
              <strong>Error:</strong> {error}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

import React from "react";
import { Highlight, themes, Language } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: Language;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <Highlight
      theme={themes.gruvboxMaterialDark}
      code={code}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "transparent",
          }}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              <span>{i + 1}</span>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;

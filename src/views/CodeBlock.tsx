import React from "react";
import { Highlight, themes, Language } from "prism-react-renderer";

interface CodeBlockProps {
  code: string;
  language: Language;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {
  return (
    <Highlight
      theme={themes.vsDark}
      code={code}
      language={language}
    >
      {({ style, tokens, getLineProps, getTokenProps }) => (
        <pre
          style={{
            ...style,
            padding: "10px",
            borderRadius: "5px",
            backgroundColor: "black",
            overflowX: "auto",
            fontFamily: "monospace",
          }}
        >
          {tokens.map((line, i) => (
            <div 
              key={i} 
              {...getLineProps({ line })}
              style={{
                display: "flex",
                lineHeight: "1.5",
              }}
            >
              <span 
                style={{
                  display: "inline-block",
                  width: "30px",
                  userSelect: "none",
                  opacity: "0.5",
                  paddingRight: "12px",
                  textAlign: "right",
                  color: "#666",
                }}
              >
                {i + 1}
              </span>
              <span style={{ flex: 1 }}>
                {line.map((token, key) => {
                  // Override specific token colors to match the image
                  let customStyle = {};
                  if (
                    token.types.includes("keyword") || 
                    token.types.includes("function") || 
                    token.types.includes("constant") ||
                    token.types.includes("builtin")
                  ) {
                    customStyle = { color: "#49B267" };
                  } else if (token.types.includes("comment")) {
                    customStyle = { color: "#49B267", fontStyle: "italic" };
                  } else if (
                    token.types.includes("string") || 
                    token.types.includes("operator")
                  ) {
                    customStyle = { color: "#49B267" };
                  } else {
                    customStyle = { color: "#49B267" };
                  }
                  
                  return (
                    <span 
                      key={key} 
                      {...getTokenProps({ token })} 
                      style={{ ...getTokenProps({ token }).style, ...customStyle }}
                    />
                  );
                })}
              </span>
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
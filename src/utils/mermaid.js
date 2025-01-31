import mermaid from "mermaid";

// Render function
export const render = async (config, code, id) => {
  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'default',
  });
  return await mermaid.render(id, code);
};

// Parse function
export const parse = async (code) => {
  return await mermaid.parse(code);
};

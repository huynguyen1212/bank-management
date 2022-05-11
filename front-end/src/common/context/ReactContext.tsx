import React, { createContext, ReactNode, useState } from "react";

interface IReactsContext {
  messageId: number | null;
  setMessageId: React.Dispatch<React.SetStateAction<number | null>>;
}

export const ReactsContext = createContext<IReactsContext>(
  {} as IReactsContext
);

const ReactsProvider = ({ children }: { children: ReactNode }) => {
  const [messageId, setMessageId] = useState<number | null>(null);

  return (
    <ReactsContext.Provider
      value={{ messageId, setMessageId }}
    >
      {children}
    </ReactsContext.Provider>
  );
};

export default ReactsProvider;

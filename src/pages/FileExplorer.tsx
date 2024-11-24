import { useQuery } from "@tanstack/react-query";
import { BASE_PATH, IFile } from "./System";
import React, { useState } from "react";
import BaseLayout from "./components/BaseLayout";

export const FileExplorer: React.FC = () => {
  // File system data
  const [currentPath, setCurrentPath] = useState<string>("/");
  const [currentFile, setCurrentFile] = useState<string | null>(null);
  const {
    isLoading: isLoadingFileSystem,
    data: files,
    error: fileSystemError,
  } = useQuery({
    queryKey: ["file-system", currentPath],
    queryFn: async (context: { queryKey: [string, string] }) => {
      const path = context.queryKey[1];
      const response = await fetch(`${BASE_PATH}/system/files?path=${path}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const { files } = await response.json();
      return files;
    },
  });
  const {
    data: fileContent,
    error: fileContentError,
    isLoading: isFileContentLoading,
  } = useQuery({
    queryKey: ["file-content", currentFile || "no-file"],
    enabled: !!currentFile,
    queryFn: async (context: { queryKey: [string, string] }) => {
      const file = context.queryKey[1];
      const response = await fetch(`${BASE_PATH}/system/files?path=${file}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return await response.text();
    },
  });
  const [sortBy, setSortBy] = useState<"name" | "size">("name");
  return (
    <BaseLayout>
      <div className="p-6 bg-gray-800 text-white rounded-lg shadow-md mt-4">
        <h2 className="text-xl font-bold mb-4">File System</h2>
        {currentFile && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white text-black p-6 rounded-lg shadow-lg w-3/4 max-h-3/4 overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">File Content</h3>
                <button
                  onClick={() => setCurrentFile(null)}
                  className="text-red-500 hover:underline"
                >
                  Close
                </button>
              </div>
              {isFileContentLoading ? (
                <div>Loading...</div>
              ) : fileContentError ? (
                <div className="text-red-500">
                  Error: {fileContentError.message}
                </div>
              ) : (
                <div className="h-full">
                  <textarea
                    readOnly
                    value={fileContent}
                    className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm overflow-auto border border-gray-700 rounded"
                    style={{ height: "90vh" }}
                  />
                </div>
              )}
            </div>
          </div>
        )}
        {fileSystemError ? (
          <div className="text-red-500">Error: {fileSystemError.message}</div>
        ) : (
          <div>
            <div className="mb-4">
              <span>
                /{" "}
                <button
                  onClick={() => setCurrentPath("/")}
                  className="text-blue-500 hover:underline"
                >
                  ROOT
                </button>
                {" / "}
              </span>
              {currentPath
                .split("/")
                .filter(Boolean)
                .map((part, index, arr) => {
                  const path = `/${arr.slice(0, index + 1).join("/")}/`;
                  return (
                    <span key={path}>
                      <button
                        onClick={() => setCurrentPath(path)}
                        className="text-blue-500 hover:underline"
                      >
                        {part}
                      </button>
                      {index < arr.length - 1 && " / "}
                    </span>
                  );
                })}
            </div>
            <div className="mb-4">
              <label htmlFor="sort-by" className="mr-2">
                Sort by:
              </label>
              <select
                id="sort-by"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "name" | "size")}
                className="bg-gray-700 text-white p-2 rounded"
              >
                <option value="name">Name</option>
                <option value="size">Size</option>
              </select>
            </div>
            {isLoadingFileSystem ? (
              <div>Loading...</div>
            ) : (
              files
                ?.sort((fileA: IFile, fileB: IFile) => {
                  const parseSize = (size: string) => {
                    const units = ["B", "KB", "MB", "GB"];
                    const matchedUnit = size.match(/[a-zA-Z]+/);
                    if (!matchedUnit) {
                      return 0;
                    }
                    const unit = matchedUnit[0];
                    const value = parseFloat(size);
                    const index = units.indexOf(unit);
                    return value * Math.pow(1024, index);
                  };

                  if (sortBy === "name") {
                    return fileA.name.localeCompare(fileB.name);
                  } else {
                    return parseSize(fileA.size) - parseSize(fileB.size);
                  }
                })
                .map((file: IFile) => (
                  <div
                    key={file.name}
                    className="flex justify-between items-center p-2 border-b border-gray-700"
                  >
                    <div className="flex items-center">
                      {file.type === "DIR" ? (
                        <svg
                          className="w-5 h-5 mr-2 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 4a2 2 0 012-2h4a2 2 0 011.414.586l1.828 1.828A2 2 0 0012 5h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V4z" />
                        </svg>
                      ) : (
                        <svg
                          className="w-5 h-5 mr-2 text-blue-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M4 2a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-.586-1.414l-4-4A2 2 0 0012 0H4zm0 2h7v4a1 1 0 001 1h4v9H4V4zm9 0v3h3l-3-3z" />
                        </svg>
                      )}
                      <button
                        onClick={() => {
                          if (file.type === "DIR") {
                            setCurrentPath(`${currentPath}${file.name}/`);
                          } else if (file.type === "FILE") {
                            setCurrentFile(`${currentPath}${file.name}`);
                          }
                        }}
                      >
                        {file.name}
                      </button>
                    </div>
                    <div>{file.size}</div>
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </BaseLayout>
  );
};

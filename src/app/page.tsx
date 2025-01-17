"use client";

import { useState } from "react";
import ProjectSummaryView from "@/components/ProjectSummaryView";

const Home = () => {
  const [parseData, setParseData] = useState(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGetData = async () => {
    if (!siteUrl) {
      alert("Введите URL сайта");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/universal-parser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: siteUrl }),
      });
      const data = await response.json();
      setParseData(data?.insights?.summary || null);
    } catch (error) {
      console.error("Ошибка получения данных:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex space-x-2">
        <input
          type="text"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
          placeholder="Введите URL для парсинга"
          className="flex-grow border p-2 rounded"
          disabled={isLoading}
        />
        {/* Я отключил "Button", вам не нужно его включать,есть пример в компоненте "ProjectSummaryView", используйте его.
        После нажатия на Button вы будете заплатить деньги, учти это... */}
        <button
          // onClick={handleGetData}
          disabled={isLoading}
          className={`
            ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            } 
            text-white px-4 py-2 rounded
          `}
        >
          {isLoading ? "Загрузка..." : "Спарсить"}
        </button>
      </div>

      {parseData && <ProjectSummaryView projectSummary={parseData} />}
    </div>
  );
};

export default Home;

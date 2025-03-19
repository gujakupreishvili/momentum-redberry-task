import React from "react";
import SelecSection from "./selecSection";
import TaskSection from "./taskSection/taskSection";

export default function Main() {
  return (
    <main className="px-[6.3%]">
      <SelecSection />
      <TaskSection />
    </main>
  );
}

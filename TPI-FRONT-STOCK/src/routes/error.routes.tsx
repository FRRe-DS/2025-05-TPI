import { Route, Routes } from "react-router-dom";

import { type ReactNode } from "react";

interface ErrorProps{
  children: ReactNode;
}

export default function ErrorRouter({children}: ErrorProps){
  return(
    <Routes>
      {children}
      <Route path="error-404" element={<p>Error 404</p>} />
    </Routes>
  );
}
import React, { useState } from "react";

const logout = () => {
  
  localStorage.removeItem("authToken");
  

  window.location.href = "/become-a-fixer";
};
export { logout };


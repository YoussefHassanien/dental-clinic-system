import { useState } from "react";

const useLanguageDropdown = () => {
  const [language, setLanguage] = useState("EN");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectLanguage = (lang: string) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return {
    language,
    isDropdownOpen,
    selectLanguage,
    toggleDropdown,
  };
};

export default useLanguageDropdown;

import { useState, useEffect } from "react";

const ThemeToggle = () => {

    const [theme, setTheme] = useState("dark");

    useEffect(() => {
        if (theme === "light") {
            document.body.classList.add("light");
        } else {
            document.body.classList.remove("light");
        }
    }, [theme]);

    function toggleTheme() {
        setTheme(prev => prev === "dark" ? "light" : "dark");
    }

    return (
        <button className="themetoggle_btn" onClick={toggleTheme}>
            {theme === "dark" ? (
                <i className="ri-sun-fill"></i>
            ) : (
                <i className="ri-sun-line"></i>
            )}
        </button>
    );
};

export default ThemeToggle;
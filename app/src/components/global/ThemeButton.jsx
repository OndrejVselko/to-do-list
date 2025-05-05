export default function ThemeButton(){
    const switchTheme = () => {
        const currentTheme = document.body.getAttribute("theme");
        if(currentTheme === "dark"){
            document.body.setAttribute("theme", "light")
        }
        else{
            document.body.setAttribute("theme", "dark")
        }
    };
    return(
        <div id="theme_button" className="corner_button"><a href="#" onClick={switchTheme}><img src="src/icons/theme.png" alt="account icon"/></a></div>
    );
}

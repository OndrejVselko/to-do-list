import './App.css'
function MyNavbar() {
  return (
      <div id="nav">
          <a href="/edit"><img src="src/icons/history.png" alt ="history icon" id="nav_left"/></a>
          <a href="/"><img src="src/icons/home.png" alt ="home icon" id="nav_mid"/></a>
          <a href="/stats"><img src="src/icons/edit.png" alt ="edit icon" id="nav_right"/></a>
      </div>
  );
}


export {MyNavbar}

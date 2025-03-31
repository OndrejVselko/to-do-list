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

function AccountButton(){
    return(
        <div id="account_button" class="corner_button"><a href=""><img src="src/icons/user.png" alt="account icon"/></a></div>
    );
}

function ThemeButton(){
    return(
        <div id="theme_button" class="corner_button"><a href=""><img src="src/icons/theme.png" alt="account icon"/></a></div>
    );
}

function NewTaskButton(){
    return(
        <div id="new_task_button" class="corner_button"><a href=""><img src="src/icons/notes.png" alt="account icon"/></a></div>
    );
}


export {MyNavbar, AccountButton, NewTaskButton, ThemeButton}

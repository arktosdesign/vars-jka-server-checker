window.addEventListener('DOMContentLoaded', () => {  
  // Window functions
  const { remote } = require('electron');

  var minimizeWindow = document.getElementById('minimize');
  var closeWindow = document.getElementById('close');
  // var refreshWindow = document.getElementById('refresh');
  var getRemote = remote.BrowserWindow.getFocusedWindow();

      minimizeWindow.addEventListener('click', function(){
        getRemote.minimize();  
      });
      closeWindow.addEventListener('click', function(){
        getRemote.close();
      });
      // refreshWindow.addEventListener('click', function(){
      //   getRemote.reload();
      // });


      function activeWindow() {
        var titleBar = document.getElementById('title-bar');
        titleBar.classList.remove('inactive');        
      }
      
      function blurredWindow() {
        var titleBar = document.getElementById('title-bar');
        titleBar.classList.add('inactive');        
      }

      window.addEventListener('blur', blurredWindow);
      window.addEventListener('focus', activeWindow);

})

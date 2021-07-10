  const selectTab = (tabName) => {
      let i;
      let x = document.querySelectorAll(".tab-item");
      for (let i = 0; i < x.length; i++) {
          x[i].style.display = "none";
          
      }
      document.getElementById(tabName).style.display = "block"
  }
  
  let viewState = true;
  const toggleWork = () => {
      const btnContent = viewState ? 'View Less' : 'View More';
      document.querySelector('.btn-more').textContent = btnContent;
      viewState = !viewState;
      x = document.querySelectorAll(".content .item");
      for (let i=0;i< x.length;i++) {
         if(i > 2){
            x[i].classList.toggle('hidden')
         }
      }
  }
  
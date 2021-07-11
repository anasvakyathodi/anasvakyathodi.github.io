const selectTab = (tabName) => {
  let i;
  let x = document.querySelectorAll(".tab-item");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
};

let viewState = true;
const toggleWork = () => {
  const btnContent = viewState ? "View Less" : "View More";
  document.querySelector(".btn-more").textContent = btnContent;
  viewState = !viewState;
  x = document.querySelectorAll(".content .item");
  for (let i = 0; i < x.length; i++) {
    if (i > 2) {
      x[i].classList.toggle("hidden");
    }
  }
};

const handleSubmit = () => {
    try {
        let form = document.getElementsByName("messageForm");
        let message = "";
        message += "name: " + form[0].elements["name"].value;
        message += "\temail: " + form[0].elements["email"].value;
        message += "\tsubject: " + form[0].elements["subject"].value;
        message += "\tmessage: " + form[0].elements["message"].value;
        form[0].elements["name"].value = "";
        form[0].elements["email"].value = "";
        form[0].elements["subject"].value = "";
        form[0].elements["message"].value = "";
        form[0].elements["submit-btn"].value = "Senting Message";
        form[0].elements["name"].disabled = true;
        form[0].elements["email"].disabled = true;
        form[0].elements["subject"].disabled = true;
        form[0].elements["message"].disabled = true;
        form[0].elements["submit-btn"].disabled = true;
        let endpoint = "https://api.callmebot.com/whatsapp.php?phone=+919656551078&apikey=252408&text="+message;
        fetch(endpoint).then((res)=>{
            console.log(res)
            form[0].elements["submit-btn"].value = "Message Sent";
        }).catch((err)=>{
            console.log(err)
        })
        return false;
    } catch (error) {
        console.log(error)
        return false
    }
};

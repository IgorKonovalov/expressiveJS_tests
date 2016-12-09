

function asTabs(node) {

  // вставим кнопки

  let tabs = node.getElementsByTagName("div");

  for (let i = tabs.length - 1; i >= 0; i--) {
    let button = document.createElement("button")
    button.innerHTML = tabs[i].getAttribute("data-tabname");
    button.id = tabs[i].getAttribute("data-tabname");
    button.className = "default_button";
    node.insertBefore(button, node.firstChild);
  }

  // устанавливаем первичное состояние - первая кнопка нажата, видна только первая вкладка

  let default_button = document.getElementById(tabs[0].getAttribute("data-tabname"));
  let currentTab = 0;
  default_button.className = "active";
  for (let tab of tabs) tab.className = "invisible";
  tabs[currentTab].className = "visible";

  // код изменения состояний кнопок/вкладок о эти танцы с грабляяяями

  let buttons = document.getElementsByTagName("button");
  for (let i = 0; i < buttons.length; i++) {
    let button_current = buttons[i];
    button_current.addEventListener("click", function(event) {
      if (button_current.className == "default_button") {
        let tabs_old = document.getElementsByClassName("visible");
        let buttons_old = document.getElementsByClassName("active");
        for (let tab of tabs_old) {
          tab.className = "invisible";
        }
        for (let button of buttons_old) {
          button.className = "default_button"
        }
        let tab_current = tabs[i];
        button_current.className = "active";
        tab_current.className = "visible";
      }
    });
  };
};



// решение из ответов - элегантное

function asTabs2(node) {
  var tabs = [];
  for (var i = 0; i < node.childNodes.length; i++) {
    var child = node.childNodes[i];
    if (child.nodeType == document.ELEMENT_NODE)
      tabs.push(child);
  }

  var tabList = document.createElement("div");
  tabs.forEach(function(tab, i) {
    var button = document.createElement("button");
    button.textContent = tab.getAttribute("data-tabname");
    button.addEventListener("click", function() { selectTab(i); });
    tabList.appendChild(button);
  });
  node.insertBefore(tabList, node.firstChild);

  function selectTab(n) {
    tabs.forEach(function(tab, i) {
      if (i == n)
        tab.style.display = "";
      else
        tab.style.display = "none";
    });
    for (var i = 0; i < tabList.childNodes.length; i++) {
      if (i == n)
        tabList.childNodes[i].style.background = "violet";
      else
        tabList.childNodes[i].style.background = "";
    }
  }
  selectTab(0);
}

asTabs2(document.querySelector("#wrapper"));

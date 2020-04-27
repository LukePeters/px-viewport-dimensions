var span = document.createElement("span"),
    text = document.createTextNode(""),
    hideViewportSizeTimeout,
    defaultPosition = "tr",
    hideDelay = 2500,
    pluginDisabled = false;

// Get from persistent storage whether or not the user has disabled the plugin
browser.storage.local.get().then(function(state) {
  pluginDisabled = state.disabled;
  
  if(state.position) {
    span.classList.add(state.position);
  } else {
    span.classList.add(defaultPosition);
  }

  if(typeof(state["hideDelay"]) !== "undefined") {
    hideDelay = state.hideDelay;
    
    if(hideDelay === 0 && !pluginDisabled) {
      showViewportSize();
    }
  }
});

// Listen for a change in the stored settings data
browser.storage.onChanged.addListener(function(data) {
  
  if(data.disabled) {
    pluginDisabled = data.disabled.newValue;
    
    if(pluginDisabled) {
      hideViewportSize();
    } else if(!pluginDisabled && hideDelay === 0) {
      showViewportSize();
    }
  }
  
  if(data.position) {
    span.classList.remove(data.position.oldValue);
    span.classList.add(data.position.newValue);
  }

  if(typeof(data["hideDelay"]) !== "undefined") {
    hideDelay = data.hideDelay.newValue;

    if(hideDelay === 0 && !pluginDisabled) {
      showViewportSize();
    } else {
      hideViewportSize();
    }
  }
});

span.classList.add("px-viewport-dimensions");
span.classList.add("px-viewport-dimensions--hidden");
span.appendChild(text);
document.body.appendChild(span);

function getViewportSize() {
  var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
      h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  
  return String(w) + " x " + String(h);
}

function showViewportSize() {
  span.textContent = getViewportSize();
  
  if(span.classList.contains("px-viewport-dimensions--hidden")) {
    span.classList.remove("px-viewport-dimensions--hidden");
    
    setTimeout(function() {
      span.classList.add("px-viewport-dimensions--fade-in");
    }, 100);
  }
  
  if(hideDelay > 0) {
    clearTimeout(hideViewportSizeTimeout);
    hideViewportSizeTimeout = setTimeout(hideViewportSize, hideDelay);
  }
}

function hideViewportSize() {
  span.classList.remove("px-viewport-dimensions--fade-in");

  setTimeout(function() {
    span.classList.add("px-viewport-dimensions--hidden");
    span.textContent = "";
  }, 400);
}

window.onresize = function() {
  if(!pluginDisabled) {
    showViewportSize();
  }
}
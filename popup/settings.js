var positionSelect = document.querySelector("#position"),
    hideDelay = document.querySelector("#hideDelay"),
    disablePluginCheckbox = document.querySelector("#disabled");

// Get the saved state
browser.storage.local.get().then(function(state) {
  disablePluginCheckbox.checked = state.disabled;

  if(state.position) {
    positionSelect.value = state.position;
  }

  if(typeof(state["hideDelay"]) !== "undefined") {
    hideDelay.value = state.hideDelay;
  }
});

// Handle changes to the popup position setting
positionSelect.addEventListener("change", function() {
  browser.storage.local.set({ position: positionSelect.value });
});

// Handle changes to the popup hide delay setting
hideDelay.addEventListener("change", function() {
  browser.storage.local.set({ hideDelay: parseInt(hideDelay.value) });
});

// Toggle disabling of the plugin with the checkbox
disablePluginCheckbox.addEventListener("change", function() {
  browser.storage.local.set({ disabled: disablePluginCheckbox.checked });
});
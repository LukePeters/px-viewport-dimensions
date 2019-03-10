var disablePluginCheckbox = document.querySelector("#disabled");

// Get the saved state
browser.storage.local.get().then(function(state) {
  disablePluginCheckbox.checked = state.disabled;
});

// Toggle disabling of the plugin with the checkbox
disablePluginCheckbox.addEventListener("change", function() {
  browser.storage.local.set({ disabled: disablePluginCheckbox.checked });
});
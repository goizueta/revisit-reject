chrome.extension.sendMessage({}, function(response) {
  var readyStateCheckInterval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(readyStateCheckInterval);

      var observer = new MutationObserver(function (mutations) {
        mutations.forEach(handleMutationEvents);
      });

      // configuration of the observer:
      var config = {
        attributes: true,
        characterData: true,
        childList: true,
        subtree: true
      };

      observer.observe(document, config);

      var handleMutationEvents = function handleMutationEvents(mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, renameAcceptanceButtons);
      }

      var renameAcceptanceButtons = function renameAcceptanceButtons(node) {
        if (nodeIsElement(node)) {
          renameButtons(findButtonsInNode(node, 'label.reject'), "Nope!");
          renameButtons(findButtonsInNode(node, 'label.accept'), "Yep!");
        }
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.querySelectorAll !== 'undefined');
      }

      var findButtonsInNode = function findButtonsInNode(node, selector) {
        return node.querySelectorAll(selector);
      }

      var renameButtons = function renameButtons(buttons, rename) {
        Array.prototype.forEach.call(buttons, function(button) {
            renameButton(button, rename);
        });
      }

      function renameButton(rejectButton, rename) {
        rejectButton.textContent = rename;
      }
    }
  }, 10);
});

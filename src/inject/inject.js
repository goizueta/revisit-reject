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
        Array.prototype.forEach.call(mutation.addedNodes, renameRejectButtons);
      }

      var renameRejectButtons = function renameRejectButtons(node) {
        if (nodeIsElement(node)) {
          renameButtons(findRejectButtonsInNode(node));
        }
      }

      var nodeIsElement = function nodeIsElement(node) {
        return (typeof node.querySelectorAll !== 'undefined');
      }

      var findRejectButtonsInNode = function findRejectButtonsInNode(node) {
        return node.querySelectorAll('label.reject');
      }

      var renameButtons = function renameButtons(rejectButtons) {
        Array.prototype.forEach.call(rejectButtons, function(rejectButton) {
            renameButton(rejectButton);
        });
      }

      function renameButton(rejectButton) {
        rejectButton.textContent = "Revisit";
      }
    }
  }, 10);
});

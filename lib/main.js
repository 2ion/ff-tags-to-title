/* Libraries */
const {Cc,Ci} = require("chrome"); 
var tabs = require("sdk/tabs");
var tsvc = Cc["@mozilla.org/browser/tagging-service;1"]
          .getService(Ci.nsITaggingService);
var ios = Cc["@mozilla.org/network/io-service;1"]
          .getService(Ci.nsIIOService);

/* for each tab, do this */
tabs.on('ready', function (tab) {
  var tabURI = ios.newURI(tab.url, null, null);
  var pageTags = tsvc.getTagsForURI(tabURI);
  var tagStr = tab.title + " ";
  for(var i=0; i<pageTags.length; i++) {
    tagStr += "#" + pageTags[i];
  }
  tab.title = tagStr;
});


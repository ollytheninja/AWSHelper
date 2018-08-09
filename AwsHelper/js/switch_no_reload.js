// Switches roles in AWS console without reloading the page several times
// expects a global variable called config with all the necessary parameters

(function() {
    uri = window.location.href;
    if(config.state.region != config.next.region.id){
        while(uri.search(config.state.region) > 0){
            uri = uri.replace(config.state.region, config.next.region.id)
        }
    }
    post(
        "https://signin.aws.amazon.com/switchrole",
        {
            action: "switchFromBasis",
            src: "nav",
            roleName: config.next.role.id,
            account: config.next.account.id,
            mfaNeeded: "0",
            color: "F2B0A9",
            csrf: config.csrfToken,
            redirect_uri: uri,
            displayName: config.next.role.name + " @ " + config.next.account.name
        }
    );
})();

function post(path, params) {
    method = "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
        }
    }

    document.body.appendChild(form);
    form.submit();
}

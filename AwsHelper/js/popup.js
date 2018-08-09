default_regions = [
    {
        id: "us-east-1",
        name: "US East (N. Virginia)",
        favorite: true
    },
    {
        id: "us-east-2",
        name: "US East (Ohio)",
        favorite: false
    },
    {
        id: "us-west-1",
        name: "US West (N. California)",
        favorite: false
    },
    {
        id: "us-west-2",
        name: "US West (Oregon)",
        favorite: false
    },
    {
        id: "ca-central-1",
        name: "Canada (Central)",
        favorite: false
    },
    {
        id: "eu-west-1",
        name: "EU (Ireland)",
        favorite: false
    },
    {
        id: "eu-central-1",
        name: "EU (Frankfurt)",
        favorite: false
    },
    {
        id: "eu-west-2",
        name: "EU (London)",
        favorite: false
    },
    {
        id: "ap-southeast-1",
        name: "Asia Pacific (Singapore)",
        favorite: false
    },
    {
        id: "ap-southeast-2",
        name: "Asia Pacific (Sydney)",
        favorite: false
    },
    {
        id: "ap-northeast-2",
        name: "Asia Pacific (Seoul)",
        favorite: false
    },
    {
        id: "ap-northeast-1",
        name: "Asia Pacific (Tokyo)",
        favorite: false
    },
    {
        id: "ap-south-1",
        name: "Asia Pacific (Mumbai)",
        favorite: false
    },
    {
        id: "sa-east-1",
        name: "South America (São Paulo)",
        favorite: false
    }
];

default_roles = [
    {
        id:"Administrator",
        name:"Admin"
    },
    {
        id:"Billing",
        name:"Billing"
    },
    {
        id:"DatabaseAdministrator",
        name:"Database Admin"
    },
    {
        id:"DataScientist",
        name:"Data Scientist"
    },
    {
        id:"PowerUserAccess",
        name:"Power User"
    },
    {
        id:"NetworkAdministrator",
        name:"Network Admin"
    },
    {
        id:"SystemAdministrator",
        name:"System Admin"
    },
    {
        id:"SecurityAudit",
        name:"Security Audit"
    },
    {
        id:"SupportUser",
        name:"Support User"
    },
    {
        id:"ViewOnlyAccess",
        name:"View Only"
    }
];

colors = [
    {
        color: "F2B0A9",
        background: "aws-red"
    },
    {
        color: "FBBF93",
        background: "aws-orange"
    },
    {
        color: "FAD791",
        background: "aws-yellow"
    },
    {
        color: "B7CA9D",
        background: "aws-green"
    },
    {
        color: "99BCE3",
        background: "aws-blue"
    },
    {
        color: "000",
        background: "aws-black"
    }
];

app = angular.module('AWSConsoleHelper', [])
    .controller('HelperController', function ($scope, $http) {
        $scope.cookies = {};
        $scope.accounts = [];
        $scope.regions = [];
        $scope.roles = [];
        $scope.state = {
            account: "",
            region: "",
            role: ""
        };
        $scope.next = {
            account: {},
            region: {},
            role: {}
        };
        $scope.showSettings = false;

        $scope.colors = colors;
        $scope.color = colors[0];

        $scope.loading = true;
        $scope.editing = false;

        var csrfToken = "";

        $scope.toggleEdit = function () {
            $scope.editing = !$scope.editing;
        };
        $scope.toggleSettings = function () {
            $scope.showSettings = !$scope.showSettings;
        };

        $scope.setAccount = function (account) {
            $scope.next.account = account;
            console.log("Selected account ", account.name);
        };

        $scope.addAccount = function () {
            var data = {
                id: $('#new_account_id').val(),
                name: $('#new_account_name').val()
            }
            if (!data.id){ return };
            if (!data.name){ data.name = data.id };
            $scope.accounts.push(data);
            saveSettings();
        };

        $scope.setRole = function (role) {
            $scope.next.role = role;
            console.log("Selected role ", role.name);
        };

        $scope.addRole = function () {
            var data = {
                id: $('#new_role_id').val(),
                name: $('#new_role_name').val()
            }
            if (!data.id){ return };
            if (!data.name){ data.name = data.id };
            $scope.roles.push(data);
            saveSettings();
        };

        $scope.selectRegion = function (region) {
            region.favorite = true;
            $scope.next.region = region;
            console.log("Selected region ", region.name);
            saveSettings();
        };

        // Switch roles
        $scope.switchRole = function () {
            executeOnCurrentPage({
                next: $scope.next,
                state: $scope.state,
                csrfToken: csrfToken
            }, "js/switch_no_reload.js");
            setTimeout(function () {
                window.close();
            }, 500);
        };

        $scope.unfavorite = function (ob) {
            ob.favorite = false;
            saveSettings();
        };

        $scope.deleteRole = function(ob){
            $scope.roles.splice($scope.roles.indexOf(ob), 1);
            saveSettings();
        };

        $scope.deleteAccount = function(ob){
            $scope.accounts.splice($scope.accounts.indexOf(ob), 1);
            saveSettings();
        };

        $scope.clearConfig = function(){
          chrome.storage.local.remove('awsHelper_settings', function(ev){
            console.log(ev);
            loadConfig();
          });
        }

        chrome.tabs.getSelected(null, function (tab) {
            // Send a request to the content script.
            chrome.tabs.executeScript(tab.id,
                {file: "js/content_script.js"},
                function (result) {
                    csrfToken = result[0];
                });
            chrome.cookies.getAll({"url": tab.url}, function (cookies) {
                var newcookies = [];
                newcookies.push.apply($scope.cookies);
                for (var k in cookies) {
                    var cookie = cookies[k];
                    newcookies[cookie.name] = cookie;
                    if (cookie.name === "noflush_awsc-roleInfo") {
                        obj = JSON.parse(decodeURIComponent(cookie.value));
                        $scope.state.role = obj.rl[0].r;
                        $scope.state.account = obj.rl[0].a;
                        $scope.state.username = obj.bn;
                    }
                    if (cookie.name === "noflush_Region") {
                        obj = cookie.value;
                        $scope.state.region = obj;
                    }
                }

                for (var account in $scope.accounts) {
                    if (account.id == $scope.state.account) {
                        $scope.next.account = accounts;
                    } else {
                        $scope.next.account.id = $scope.state.account;
                        $scope.next.account.name = $scope.state.account;
                    }
                }

                for (var region in $scope.regions) {
                    if (region.id == $scope.state.region) {
                        $scope.next.region = regions;
                    } else {
                        $scope.next.region.id = $scope.state.region;
                        $scope.next.region.name = $scope.state.region;
                    }
                }

                for (var role in $scope.roles) {
                    if (role.id == $scope.state.role) {
                        $scope.next.role = roles;
                    } else {
                        $scope.next.role.id = $scope.state.role;
                        $scope.next.role.name = $scope.state.role;
                    }
                }

                $scope.cookies = newcookies;
                $scope.$apply();
            });
        });

        // Get settings
        loadConfig();
        function loadConfig(){
            var defaults = {
                regions: default_regions,
                roles: default_roles,
                accounts: [],
                firstrun: true
            };

          chrome.storage.local.get({
              awsHelper_settings: JSON.stringify(defaults)
          }, function (result) {
              settings = JSON.parse(result.awsHelper_settings);

              console.log(settings)

              // Show edit view on first run
              if (settings.firstrun == true){
                $scope.editing = true;
              }

              // Grab all the accounts, de-duplicate entries (don't know why this happens)
              var account_ids = [];
              var accounts = [];
              for (var i in settings.accounts) {
                  var account = settings.accounts[i];
                  if (account_ids.indexOf(account.id) >= 0) {
                      console.log(account.name + " de-duped")
                  } else {
                      account_ids.push(account.id);
                      accounts.push(account);
                  }
              }

              // Grab all the roles, de-duplicate entries (don't know why this happens)
              var role_ids = [];
              var roles = [];
              for (var i in settings.roles) {
                  var role = settings.roles[i];
                  if (role_ids.indexOf(role.id) >= 0) {
                      console.log(role.id + " de-duped")
                  } else {
                      role_ids.push(role.id);
                      roles.push(role);
                  }
              }

              $scope.regions = settings.regions;
              $scope.roles = roles;
              $scope.accounts = accounts;
              $scope.$apply();
          });
        };

        function saveSettings() {
            chrome.storage.local.set({
                awsHelper_settings: JSON.stringify({
                    regions: $scope.regions,
                    roles: $scope.roles,
                    accounts: $scope.accounts,
                    firstrun: false
                })
            })
        };
    });

function executeOnCurrentPage(config, script) {
    console.log(config);
    chrome.tabs.getSelected(null, function (tab) {
        // to load parameters
        chrome.tabs.executeScript(tab.id, {
            code: 'var config = ' + JSON.stringify(config)
        }, function () {
            chrome.tabs.executeScript(tab.id, {file: script});
        });
    })
}

function executeScript(tabid, scriptName, parameters, callback) {
    chrome.tabs.executeScript(tabid, {
        code: 'var parameters = ' + JSON.stringify(parameters)
    }, function () {
        chrome.tabs.executeScript(tabid, {file: scriptName}, callback);
    });
}

function waitForPageLoad(tabid, fn) {
    chrome.tabs.onUpdated.addListener(function (tid, data, tab) {
        if (data.status == "complete" && tabid == tid) {
            fn(tabid)
        }
    })
}

function executeScriptAfterLoad(tabid, scriptName, parameters, callback) {
    waitForPageLoad(tabid, function (tabid) {
        executeScript(tabid, scriptName, parameters, callback)
    })
}

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});

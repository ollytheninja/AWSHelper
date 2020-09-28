/**
 * Created by oliver.ewert on 2016-05-12.
 */
function doStuff() {
    document.querySelectorAll('[data-testid="services-list-item-migrationhub"]')[0].remove()
    document.querySelectorAll('[data-testid="services-list-item-lightsail"]')[0].remove()
    document.querySelectorAll('[data-testid="services-list-item-eb"]')[0].remove()
    document.querySelectorAll('[data-testid="services-list-item-serverlessrepo"]')[0].remove()
    document.querySelectorAll('[data-testid="services-list-item-outposts"]')[0].remove()

}
setTimeout(function () {
    doStuff();
}, 5000);

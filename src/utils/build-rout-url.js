export function buildRouteUrl(url) {
    const routeParametersRegex = /:([a-zA-Z]+)/g;

    const urlWithParameters = url.replace(routeParametersRegex, '(?<$1>[a-zA-Z0-9\-_]+)');

    const urlRegex = new RegExp(`^${urlWithParameters}(?<query>\\?(.*))?$`);
    
    return urlRegex;
}
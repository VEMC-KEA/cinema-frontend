/**
 * Utility Method to create options for a fetch call
 * @param method GET, POST, PUT, DELETE
 * @param body  The request body (only relevant for POST and PUT)
 * @param requiresAuth boolean to determine if the call requires authentication
 * @returns
 */
function makeOptions(
    method: string,
    body: object | null,
    requiresAuth?: boolean
): RequestInit {
    const opts: RequestInit = {
        method: method,
        headers: {
            "Content-type": "application/json",
            Accept: "application/json",
            Authorization: requiresAuth
                ? `Bearer ${localStorage.getItem("token")}`
                : ""
        }
    };
    if (body) {
        opts.body = JSON.stringify(body);
    }
    return opts;
}

/**
 * Utility Method to handle http-errors returned as a JSON-response with fetch
 * Meant to be used in the first .then() clause after a fetch-call
 */
async function handleHttpErrors(res: Response) {
    if (!res.ok) {
        const errorResponse = await res.json();
        const msg = errorResponse.message
            ? errorResponse.message
            : "No details provided";
        throw new Error(msg);
    }
    if (res.status === 204) {
        return res;
    }
    return res.json();
}

export { makeOptions, handleHttpErrors };
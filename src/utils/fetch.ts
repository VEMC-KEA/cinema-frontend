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
        let msg = errorResponse.message
            ? errorResponse.message
            : "Uventet fejl opstod";
        if (res.status === 400) {
            msg = "Der opstod en fejl i din forespørgsel. Prøv venligst igen.";
        }
        if (res.status === 401) {
            msg =
                "Du er ikke logget ind eller din session er udløbet. Log venligst ind igen.";
        }
        if (res.status === 403) {
            msg = "Du har ikke adgang til denne ressource.";
        }
        if (res.status === 404) {
            msg = "Ressourcen blev ikke fundet.";
        }
        if (res.status >= 500) {
            msg = "Der skete en fejl på serveren. Prøv venligst igen senere.";
        }
        throw new Error(msg);
    }
    if (res.status === 204) {
        return res;
    }
    return res.json();
}

export { makeOptions, handleHttpErrors };

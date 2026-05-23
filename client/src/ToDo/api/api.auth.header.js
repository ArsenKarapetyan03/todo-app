export async function authFetch(url, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}${url}`, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${token}`,
        },
        credentials: "include"
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        window.location.href = "/login";
        return;
    }

    return response;
}

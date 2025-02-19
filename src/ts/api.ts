const baseURL = "https://frontend-take-home-service.fetch.com";
const headers = { "Content-Type": "application/json" };

export type Dog = {
    id: string;
    img: string;
    name: string;
    age: number;
    zip_code: string;
    breed: string;
};

export type Match = {
    match: string;
};

export async function logIn(name: string, email: string) {
    const response = await fetch(baseURL + "/auth/login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ name: name, email: email }),
        credentials: "include",
    });
    if (response.ok) {
        document.cookie = "authorized=true;max-age=3600;";
        return response;
    } else {
        throw new Error("Error logging in.");
    }
}

export async function logOut() {
    const response = await fetch(baseURL + "/auth/logout", {
        method: "POST",
        headers: headers,
        credentials: "include",
    });
    if (response.ok) {
        document.cookie = "authorized=false;";
        return response;
    } else {
        throw new Error("Error logging out.");
    }
}

export async function fetchBreeds() {
    const response = await fetch(baseURL + "/dogs/breeds", {
        method: "GET",
        headers: headers,
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error fetching breeds.");
    }
}

export async function searchDogs(query: string) {
    const response = await fetch(baseURL + "/dogs/search" + query, {
        method: "GET",
        headers: headers,
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error searching dogs.");
    }
}

export async function fetchDogs(dogIds: string[]) {
    const response = await fetch(baseURL + "/dogs", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dogIds),
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error fetching dogs.");
    }
}

export async function fetchMatch(dogIds: string[]) {
    const response = await fetch(baseURL + "/dogs/match", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(dogIds),
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error fetching match.");
    }
}

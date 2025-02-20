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

export type Location = {
    zip_code: string;
    latitude: number;
    longitude: number;
    city: string;
    state: string;
    county: string;
};

export type Coordinates = {
    lat: number;
    lon: number;
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

export async function fetchLocations(zipCodes: string[]) {
    const response = await fetch(baseURL + "/locations", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(zipCodes),
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error fetching locations.");
    }
}

export async function searchLocations(
    city?: string,
    states?: string[],
    geoBoundingBox?: {
        top?: Coordinates;
        left?: Coordinates;
        bottom?: Coordinates;
        right?: Coordinates;
        top_left?: Coordinates;
        top_right?: Coordinates;
        bottom_left?: Coordinates;
        bottom_right?: Coordinates;
    },
    size?: number,
    from?: number,
) {
    const response = await fetch(baseURL + "/locations/search", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
            city: city,
            states: states,
            geoBoundingBox: geoBoundingBox,
            size: size,
            from: from,
        }),
        credentials: "include",
    });
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Error searching locations.");
    }
}

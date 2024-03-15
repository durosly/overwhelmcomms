import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { handleError } from "./handleError";
// import generateRandomNumber from "./generate-random";

export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

export function strigifyObj(data) {
	if (typeof data !== "object") return data;
	return JSON.parse(JSON.stringify(data));
}

export { handleError as handleClientError };

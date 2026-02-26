// Test file for AI review agents - contains intentional bugs

import { useEffect, useState } from "react";

// Bug 1: Missing dependency in useEffect
export function Counter() {
	const [count, setCount] = useState(0);

	useEffect(() => {
		document.title = `Count: ${count}`;
	}, []); // Missing 'count' in dependency array

	return <button onClick={() => setCount(count + 1)}>{count}</button>;
}

// Bug 2: Memory leak - missing cleanup
export function DataFetcher() {
	const [data, setData] = useState(null);

	useEffect(() => {
		fetch("/api/data")
			.then((res) => res.json())
			.then(setData);
		// No cleanup function for race condition
	}, []);

	return <div>{data ? JSON.stringify(data) : "Loading..."}</div>;
}

// Bug 3: Security - dangerouslySetInnerHTML
export function UserContent({ html }: { html: string }) {
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

// Bug 4: TypeScript any
export function processUser(user: any) {
	return user.name.toUpperCase();
}

// Bug 5: Unused variable
const unusedConfig = { debug: true };

// Bug 6: Potential null reference
export function getUserName(user: { profile?: { name?: string } }) {
	return user.profile.name.toUpperCase(); // Can crash if profile is undefined
}

// Bug 7: Hardcoded credentials (security issue)
const API_KEY = "sk-1234567890abcdef";
const DB_PASSWORD = "admin123";

export { API_KEY, DB_PASSWORD };

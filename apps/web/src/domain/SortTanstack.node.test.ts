import assert from "node:assert/strict";
import test from "node:test";
import type { SortingState } from "@tanstack/react-table";

import {
	applySortingUpdate,
	sortDescriptorToSortingState,
	sortingStateToSortDescriptor,
} from "@/domain/SortTanstack";

test("sortDescriptorToSortingState restores persisted sort into TanStack state", () => {
	const state = sortDescriptorToSortingState({
		field: "price",
		direction: "desc",
	});
	assert.deepEqual(state, [{ id: "price", desc: true }]);
});

test("sortDescriptorToSortingState maps ascending descriptor", () => {
	const state = sortDescriptorToSortingState({
		field: "name",
		direction: "asc",
	});
	assert.deepEqual(state, [{ id: "name", desc: false }]);
});

test("sortingStateToSortDescriptor maps TanStack state back to app descriptor", () => {
	const sorting: SortingState = [{ id: "rating", desc: false }];
	const descriptor = sortingStateToSortDescriptor(sorting, {
		field: "name",
		direction: "asc",
	});
	assert.deepEqual(descriptor, { field: "rating", direction: "asc" });
});

test("sortingStateToSortDescriptor falls back when sorting state is empty", () => {
	const fallback = { field: "name", direction: "asc" } as const;
	const descriptor = sortingStateToSortDescriptor([], fallback);
	assert.deepEqual(descriptor, fallback);
});

test("sortingStateToSortDescriptor falls back for invalid field", () => {
	const fallback = { field: "name", direction: "asc" } as const;
	const sorting: SortingState = [{ id: "invalidField", desc: true }];
	const descriptor = sortingStateToSortDescriptor(sorting, fallback);
	assert.deepEqual(descriptor, fallback);
});

test("applySortingUpdate handles TanStack toggle updates", () => {
	const current: SortingState = [{ id: "name", desc: false }];
	const next = applySortingUpdate(
		(prev) => [{ id: prev[0]?.id ?? "name", desc: !prev[0]?.desc }],
		current,
		{ field: "name", direction: "asc" },
	);
	assert.deepEqual(next, { field: "name", direction: "desc" });
});

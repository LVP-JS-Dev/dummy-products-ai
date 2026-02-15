"use client";

import { Pagination, states } from "@dummy-products/ui-kit";
import { useState } from "react";

export function WithControl() {
	const base = states.pagination.MiddlePage;
	const [currentPage, setCurrentPage] = useState<number>(base.currentPage);
	const [totalPages, setTotalPages] = useState<number>(base.totalPages);

	return (
		<div style={{ display: "grid", gap: 16 }}>
			<Pagination
				currentPage={currentPage}
				onPageChange={({ page }) => setCurrentPage(page)}
				totalPages={totalPages}
			/>
			<div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Current page</span>
					<input
						min={1}
						onChange={(event) =>
							setCurrentPage(Number(event.target.value) || 1)
						}
						type="number"
						value={currentPage}
					/>
				</label>
				<label style={{ display: "grid", gap: 4 }}>
					<span>Total pages</span>
					<input
						min={1}
						onChange={(event) => setTotalPages(Number(event.target.value) || 1)}
						type="number"
						value={totalPages}
					/>
				</label>
			</div>
		</div>
	);
}

export const story = { WithControl };

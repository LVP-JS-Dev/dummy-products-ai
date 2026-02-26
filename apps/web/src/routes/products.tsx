import { Button, Modal, Pagination, SearchInput } from "@dummy-products/ui-kit";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import {
	flexRender,
	getCoreRowModel,
	getSortedRowModel,
	type SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { RefreshCw } from "lucide-react";
import {
	type FormEvent,
	type HTMLAttributes,
	useCallback,
	useEffect,
	useId,
	useMemo,
	useState,
} from "react";
import { toast } from "sonner";

import { fetchProductsPage, searchProductsPage } from "@/api/DummyJson";
import { ApiError } from "@/api/Http";
import { clearAuthSession, loadAuthSession } from "@/auth/Session";
import { clearSort, loadSort, saveSort } from "@/auth/SortStorage";
import { ProductsTableHeader } from "@/components/products/ProductsTableHeader";
import { mapTanStackHeaderGroupsToViewModel } from "@/components/products/ProductsTableHeaderModel";
import type { ProductPage } from "@/domain/Products";
import { mapProductToRow } from "@/domain/Products";
import {
	type ProductsColumnMeta,
	productsTableColumns,
} from "@/domain/ProductsTableColumns";
import type { SortDescriptor } from "@/domain/Sort";
import {
	applySortingUpdate,
	sortDescriptorToSortingState,
} from "@/domain/SortTanstack";
import { useDebouncedValue } from "@/hooks/UseDebouncedValue";

interface ProductsSearch {
	q?: string;
}

function runAsync(promise: Promise<unknown>, context: string): void {
	promise.catch((error: unknown) => {
		console.error(`[runAsync] ${context}`, error);
	});
}

function getSearchInputState(query: string) {
	return query.trim() ? ("active" as const) : ("inactive" as const);
}

function fetchPageData(query: string, page: number): Promise<ProductPage> {
	const skip = (page - 1) * PAGE_LIMIT;
	const normalizedQuery = query.trim();
	if (normalizedQuery) {
		return searchProductsPage({ q: normalizedQuery, limit: PAGE_LIMIT, skip });
	}
	return fetchProductsPage({ limit: PAGE_LIMIT, skip });
}

function getAlignClass(meta?: ProductsColumnMeta): string {
	if (meta?.align === "right") {
		return "tabular-nums text-right";
	}
	if (meta?.align === "center") {
		return "tabular-nums text-center";
	}
	return "";
}

export const Route = createFileRoute("/products")({
	validateSearch: (search: Record<string, unknown>): ProductsSearch => {
		const q = typeof search.q === "string" ? search.q : undefined;
		return { q: q?.trim() ? q : undefined };
	},
	beforeLoad: () => {
		const session = loadAuthSession();
		if (!session) {
			throw redirect({ to: "/login" });
		}
	},
	component: ProductsPage,
});

const PAGE_LIMIT = 20;
const FIGMA_PARITY_MODE = import.meta.env.VITE_FIGMA_PARITY === "true";

export function ProductsPage() {
	const navigate = useNavigate();
	const search = Route.useSearch();

	const [inputQuery, setInputQuery] = useState(search.q ?? "");
	const debouncedQuery = useDebouncedValue(inputQuery, 400);

	const [page, setPage] = useState(1);
	const [data, setData] = useState<ProductPage | null>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [retryToken, setRetryToken] = useState(0);

	const [sort, setSort] = useState<SortDescriptor>(
		() => loadSort() ?? { field: "name", direction: "asc" },
	);

	const forceLogout = useCallback(() => {
		clearAuthSession();
		clearSort();
		toast.error("Сессия истекла, войдите снова");
		runAsync(navigate({ to: "/login", replace: true }), "forceLogout");
	}, [navigate]);

	useEffect(() => {
		const q = debouncedQuery.trim();
		runAsync(
			navigate({
				to: "/products",
				search: q ? { q } : {},
				replace: true,
			}),
			"syncSearchQuery",
		);
		setPage(1);
	}, [debouncedQuery, navigate]);

	useEffect(() => {
		setInputQuery(search.q ?? "");
	}, [search.q]);

	useEffect(() => {
		let cancelled = false;

		setLoading(true);
		setError(null);

		const requestContext = `fetchProductsPage:retry-${retryToken}`;

		runAsync(
			fetchPageData(search.q ?? "", page)
				.then((pageData) => {
					if (cancelled) {
						return;
					}
					setData(pageData);
				})
				.catch((err: unknown) => {
					if (cancelled) {
						return;
					}
					if (err instanceof ApiError && err.status === 401) {
						forceLogout();
						return;
					}
					const message =
						err instanceof Error ? err.message : "Failed to load products";
					setError(message);
				})
				.finally(() => {
					if (!cancelled) {
						setLoading(false);
					}
				}),
			requestContext,
		);

		return () => {
			cancelled = true;
		};
	}, [forceLogout, page, retryToken, search.q]);

	const baseRows = useMemo(
		() => (data?.products ?? []).map(mapProductToRow),
		[data],
	);
	const sortingState: SortingState = FIGMA_PARITY_MODE
		? []
		: sortDescriptorToSortingState(sort);

	const table = useReactTable({
		data: baseRows,
		columns: productsTableColumns,
		state: { sorting: sortingState },
		onSortingChange: (updater) => {
			if (FIGMA_PARITY_MODE) {
				return;
			}
			setSort((prev) => {
				const next = applySortingUpdate(
					updater,
					sortDescriptorToSortingState(prev),
					prev,
				);
				saveSort(next);
				return next;
			});
		},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: getSortedRowModel(),
		enableMultiSort: false,
		enableSortingRemoval: false,
	});

	const rows = table.getRowModel().rows;

	const totalPages = data ? Math.max(1, Math.ceil(data.total / data.limit)) : 1;
	const searchState = getSearchInputState(inputQuery);
	const shownRangeLabel = useMemo(() => {
		if (!data) {
			return "Загрузка...";
		}
		if (data.total === 0) {
			return "Показано 0-0 из 0";
		}
		const from = data.products.length > 0 ? data.skip + 1 : 0;
		const to = FIGMA_PARITY_MODE
			? Math.min(data.total, data.skip + data.limit)
			: Math.min(data.total, data.skip + data.products.length);
		return `Показано ${from}-${to} из ${data.total}`;
	}, [data]);

	return (
		<div className="products-shell">
			<header className="products-nav" data-testid="products-nav">
				<div className="products-nav-inner">
					<h1
						className="products-nav-title"
						style={{
							fontFamily: "var(--ui-font-heading)",
							fontWeight: 700,
							fontSize: 24,
							lineHeight: "44.976px",
							color: "#202020",
						}}
					>
						Товары
					</h1>
					<div className="products-nav-search">
						<SearchInput
							ariaLabel="Поиск товаров"
							onSubmit={({ value }) => setInputQuery(value)}
							onValueChange={({ value }) => setInputQuery(value)}
							placeholder="Найти"
							showIcon
							state={searchState}
							value={inputQuery}
						/>
					</div>
					<div aria-hidden className="products-nav-spacer" />
				</div>
			</header>

			<main className="products-content">
				<section className="products-card" data-testid="products-table-shell">
					<div className="products-card-header">
						<div
							className="products-card-title"
							style={{
								fontFamily: "var(--ui-font-heading)",
								fontWeight: 700,
								fontSize: 20,
								lineHeight: "20px",
								color: "#333333",
							}}
						>
							Все позиции
						</div>
						<div className="products-card-actions">
							<button
								aria-label="Обновить"
								className="products-refresh"
								onClick={() => setRetryToken((v) => v + 1)}
								type="button"
							>
								<RefreshCw size={22} />
							</button>
							<AddProductButton />
						</div>
					</div>

					<div
						className="mb-2 h-1 overflow-hidden"
						data-testid="products-loading-bar"
						style={{ background: "var(--ui-color-surface-muted)" }}
					>
						{loading ? (
							<div
								className="h-full w-2/5 animate-[indeterminate_1.2s_ease-in-out_infinite]"
								data-testid="products-loading-indicator"
								style={{ background: "var(--ui-color-primary)" }}
							/>
						) : (
							<div
								className="h-full w-0"
								data-testid="products-loading-indicator"
								style={{ background: "var(--ui-color-primary)" }}
							/>
						)}
					</div>

					{error ? (
						<div
							style={{
								border: "1px solid var(--ui-color-border)",
								borderRadius: "var(--ui-radius-md)",
								padding: "var(--ui-space-lg)",
								background: "var(--ui-color-surface)",
							}}
						>
							<div
								style={{
									color: "var(--ui-color-text)",
									fontFamily: "var(--ui-font-heading)",
									fontWeight: 700,
									fontSize: 16,
								}}
							>
								Ошибка загрузки
							</div>
							<div
								style={{
									marginTop: 6,
									color: "var(--ui-color-text-muted)",
									fontFamily: "var(--ui-font-body)",
									fontSize: 14,
								}}
							>
								{error}
							</div>
							<div className="mt-3 flex gap-2">
								<Button
									onPress={() => setRetryToken((v) => v + 1)}
									text="Повторить"
									variant="blue"
								/>
								<Button onPress={forceLogout} text="Выйти" variant="blue" />
							</div>
						</div>
					) : (
						<div
							className="overflow-hidden"
							data-testid="products-table"
							style={{
								border: "1px solid var(--ui-color-border-row)",
								borderRadius: "var(--ui-radius-md)",
								background: "var(--ui-color-surface)",
							}}
						>
							<table className="w-full border-collapse text-left text-xs">
								<ProductsTableHeader
									rows={mapTanStackHeaderGroupsToViewModel(
										table.getHeaderGroups(),
									)}
								/>
								<tbody className="[&>tr>td]:px-3 [&>tr>td]:py-[11px]">
									{rows.length === 0 && !loading ? (
										<tr>
											<td
												colSpan={productsTableColumns.length}
												style={{
													textAlign: "center",
													padding: "32px 0",
													fontFamily: "var(--ui-font-body)",
													color: "var(--ui-color-text-muted)",
													fontSize: 14,
												}}
											>
												Нет данных
											</td>
										</tr>
									) : (
										rows.map((r) => (
											<tr
												className="border-t"
												key={r.id}
												style={{
													borderColor: "var(--ui-color-border-row)",
													boxShadow: r.getIsSelected()
														? "inset 3px 0 0 var(--ui-color-checkbox-selected)"
														: undefined,
												}}
											>
												{r.getVisibleCells().map((cell) => {
													const meta = cell.column.columnDef.meta as
														| ProductsColumnMeta
														| undefined;
													const alignClass = getAlignClass(meta);
													const isName = cell.column.id === "name";
													const cellClassName = isName
														? `font-medium ${alignClass}`.trim()
														: alignClass;
													const isLowRating =
														cell.column.id === "rating" &&
														r.original.rating < 3;
													return (
														<td
															className={cellClassName}
															key={cell.id}
															style={{
																color: isLowRating ? "#dc2626" : "inherit",
															}}
														>
															{flexRender(
																cell.column.columnDef.cell,
																cell.getContext(),
															)}
														</td>
													);
												})}
											</tr>
										))
									)}
								</tbody>
							</table>
						</div>
					)}

					<div className="products-footer" data-testid="products-pagination">
						<div
							style={{
								fontFamily: "var(--ui-font-roboto)",
								color: "var(--ui-color-text-body)",
								fontSize: 18,
								lineHeight: "21.094px",
							}}
						>
							{shownRangeLabel}
						</div>
						<div data-testid="products-table-footer">
							<Pagination
								currentPage={page}
								disabled={loading}
								maxVisiblePages={5}
								nextAriaLabel="Следующая страница"
								onPageChange={({ page: nextPage }) => setPage(nextPage)}
								pageAriaLabelPrefix="Страница"
								prevAriaLabel="Предыдущая страница"
								totalPages={totalPages}
							/>
						</div>
					</div>
				</section>
			</main>
		</div>
	);
}

function AddProductButton() {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button
				iconName="plus_circle"
				id="add-product-button"
				onPress={() => setOpen(true)}
				showIcon
				text="Добавить"
				variant="blue"
			/>
			{open ? <AddProductModal onClose={() => setOpen(false)} /> : null}
		</>
	);
}

function AddProductModal({ onClose }: { onClose: () => void }) {
	const nameId = useId();
	const priceId = useId();
	const vendorId = useId();
	const articleId = useId();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [vendor, setVendor] = useState("");
	const [article, setArticle] = useState("");
	const [errors, setErrors] = useState<Record<string, string>>({});

	function saveProduct() {
		const next: Record<string, string> = {};
		if (!name.trim()) {
			next.name = "Обязательное поле";
		}
		if (price.trim()) {
			const parsedPrice = Number.parseFloat(price.replace(",", "."));
			if (!Number.isFinite(parsedPrice) || parsedPrice <= 0) {
				next.price = "Должно быть положительным числом";
			}
		} else {
			next.price = "Обязательное поле";
		}
		if (!vendor.trim()) {
			next.vendor = "Обязательное поле";
		}
		if (!article.trim()) {
			next.article = "Обязательное поле";
		}
		setErrors(next);
		if (Object.keys(next).length > 0) {
			return;
		}

		toast.success("Товар добавлен");
		onClose();
	}

	function onSubmit(e: FormEvent) {
		e.preventDefault();
		saveProduct();
	}

	return (
		<Modal dismissible onClose={onClose} open size="lg" title="Добавить товар">
			<div data-testid="add-product-modal">
				<form onSubmit={onSubmit}>
					<div style={{ display: "grid", gap: "var(--ui-space-md)" }}>
						<Field
							error={errors.name}
							id={nameId}
							label="Наименование"
							onChange={setName}
							value={name}
						/>
						<Field
							error={errors.price}
							id={priceId}
							inputMode="decimal"
							label="Цена"
							onChange={setPrice}
							value={price}
						/>
						<Field
							error={errors.vendor}
							id={vendorId}
							label="Вендор"
							onChange={setVendor}
							value={vendor}
						/>
						<Field
							error={errors.article}
							id={articleId}
							label="Артикул"
							onChange={setArticle}
							value={article}
						/>
					</div>
					<div
						style={{
							marginTop: "var(--ui-space-lg)",
							display: "flex",
							justifyContent: "flex-end",
							gap: "var(--ui-space-sm)",
						}}
					>
						<Button
							id="add-product-cancel"
							onPress={onClose}
							text="Отмена"
							variant="secondary"
						/>
						<Button
							buttonType="submit"
							id="add-product-save"
							text="Сохранить"
							variant="blue"
						/>
					</div>
				</form>
			</div>
		</Modal>
	);
}

function Field(props: {
	id: string;
	label: string;
	value: string;
	onChange: (v: string) => void;
	error?: string;
	inputMode?: HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
	const errorId = `${props.id}-error`;
	return (
		<div style={{ display: "grid", gap: 6 }}>
			<label
				htmlFor={props.id}
				style={{
					color: "var(--ui-color-text)",
					fontFamily: "var(--ui-font-heading)",
					fontWeight: 600,
					fontSize: 14,
				}}
			>
				{props.label}
			</label>
			<input
				aria-describedby={props.error ? errorId : undefined}
				aria-invalid={Boolean(props.error)}
				className="focus-visible:outline-2 focus-visible:outline-[var(--ui-color-accent)] focus-visible:outline-offset-2"
				id={props.id}
				inputMode={props.inputMode}
				onChange={(e) => props.onChange(e.target.value)}
				style={{
					border: "1px solid var(--ui-color-border)",
					borderRadius: "var(--ui-radius-sm)",
					height: 44,
					padding: "0 var(--ui-space-md)",
					fontFamily: "var(--ui-font-ui)",
					fontSize: 14,
					color: "var(--ui-color-text)",
				}}
				value={props.value}
			/>
			{props.error ? (
				<div
					id={errorId}
					style={{
						color: "#dc2626",
						fontFamily: "var(--ui-font-body)",
						fontSize: 12,
					}}
				>
					{props.error}
				</div>
			) : null}
		</div>
	);
}

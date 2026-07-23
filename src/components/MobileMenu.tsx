import { useEffect, useState } from "react";

type Item = { label: string; href: string };

const NAV: Item[] = [
	{ label: "Home", href: "/" },
	{ label: "About", href: "/about" },
	{ label: "Skills", href: "/skills" },
];

/**
 * Small-screen navigation. Rendered as a client island so the hamburger
 * toggle is interactive; hidden at md+ where the static nav takes over.
 */
export default function MobileMenu({ active }: { active: string }) {
	const [open, setOpen] = useState(false);

	// Lock body scroll while the overlay is open.
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [open]);

	return (
		<div className="md:hidden">
			<button
				type="button"
				aria-label={open ? "Close menu" : "Open menu"}
				aria-expanded={open}
				onClick={() => setOpen((v) => !v)}
				className="inline-grid h-10 w-10 place-items-center rounded-full border border-line-3 bg-white text-ink"
			>
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					role="img"
				>
					<title>{open ? "Close menu" : "Open menu"}</title>
					{open ? (
						<>
							<line x1="18" y1="6" x2="6" y2="18" />
							<line x1="6" y1="6" x2="18" y2="18" />
						</>
					) : (
						<>
							<line x1="3" y1="6" x2="21" y2="6" />
							<line x1="3" y1="12" x2="21" y2="12" />
							<line x1="3" y1="18" x2="21" y2="18" />
						</>
					)}
				</svg>
			</button>

			{open && (
				<div className="fixed inset-x-0 top-[65px] z-50 border-b border-line bg-paper/95 backdrop-blur-lg">
					<nav className="mx-auto flex max-w-[1200px] flex-col gap-1 px-6 py-4">
						{NAV.map((item) => (
							<a
								key={item.href}
								href={item.href}
								onClick={() => setOpen(false)}
								className={`rounded-xl px-3 py-3 text-base font-medium ${
									active === item.label.toLowerCase()
										? "bg-chip text-brand"
										: "text-muted"
								}`}
							>
								{item.label}
							</a>
						))}
						{/* biome-ignore lint/a11y/useValidAnchor: in-page anchor to the #contact section; onClick only closes the menu */}
						<a
							href="#contact"
							onClick={() => setOpen(false)}
							className="mt-1 rounded-full bg-ink px-4 py-3 text-center text-base font-semibold text-white"
						>
							Get in touch
						</a>
					</nav>
				</div>
			)}
		</div>
	);
}

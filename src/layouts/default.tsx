import { Navbar } from '../components/Navbar/navbar';
import Footer from '../components/Footer/Footer';

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
	return (
		<div className="relative flex flex-col h-screen">
			<Navbar />
			<main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">{children}</main>
			<Footer />
		</div>
	);
}

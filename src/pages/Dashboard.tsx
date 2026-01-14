export default function Dashboard() {
	return (
		<div className="min-h-screen bg-gray-100 p-8">
			<header className="mb-8">
				<h1 className="text-3xl font-bold text-gray-800">Dashboard Panel</h1>
			</header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="font-bold text-lg mb-2">Product Statistic</h3>
                    <p className="text-gray-500">this is product statictic</p>
                </div>
            </div>
        </div>
	);
}

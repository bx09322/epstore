export default function Stats() {
  const stats = [
    { value: "100%", label: "Customer Satisfaction", color: "text-blue-400" },
    { value: "15,000+", label: "Feedbacks", color: "text-blue-400" },
    { value: "50,000+", label: "Product sold", color: "text-blue-400" },
    { value: "4+", label: "Years Of Experience", color: "text-blue-400" },
  ];

  return (
    <section className="bg-[#0a0a0f] py-12 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-5xl font-bold ${stat.color} mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

function AnalyticsDashboard({ analytics }) {
  if (!analytics) return null;

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold mb-6">
        Recruiter Analytics Dashboard
      </h2>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">
            Total Resumes
          </h3>

          <p className="text-3xl mt-2">
            {analytics.total_resumes}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="text-lg font-semibold">
            Avg Experience
          </h3>

          <p className="text-3xl mt-2">
            {analytics.average_experience}
          </p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h3 className="text-xl font-semibold mb-4">
          Top Skills
        </h3>

        <BarChart
          width={500}
          height={300}
          data={analytics.top_skills.map(
            ([skill, count]) => ({
              skill,
              count,
            })
          )}
        >
          <XAxis dataKey="skill" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" />
        </BarChart>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">
          Degree Distribution
        </h3>

        <PieChart width={400} height={300}>
          <Pie
            data={Object.entries(
              analytics.degree_distribution
            ).map(([degree, value]) => ({
              name: degree,
              value,
            }))}
            dataKey="value"
            nameKey="name"
            outerRadius={100}
            label
          >
            {Object.entries(
              analytics.degree_distribution
            ).map((_, index) => (
              <Cell key={index} />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
}

export default AnalyticsDashboard;
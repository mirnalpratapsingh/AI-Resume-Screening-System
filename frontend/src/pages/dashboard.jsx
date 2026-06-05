import ResumeUpload
from "../components/ResumeUpload";

import AnalyticsDashboard
from "../components/AnalyticsDashboard";

import TopCandidates
from "../components/TopCandidates";

function Dashboard() {

  return (
    <div>

      <ResumeUpload />

      <AnalyticsDashboard />

      <TopCandidates />

    </div>
  );
}

export default Dashboard;
import { MainLayout } from '@components/templates/MainLayout'
import { Box, Typography } from '@mui/material'
import PeopleAltIcon from "@mui/icons-material/PeopleAlt"
import WorkIcon from "@mui/icons-material/Work"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import WarningAmberIcon from "@mui/icons-material/WarningAmber"
import "./DashboardPage.css"

const DashboardPage = () => {
  // ✅ Stats array with MUI icons
  const stats = [
    { title: "Total Workers", value: 7, sub: "6 active workers", icon: <PeopleAltIcon /> },
    { title: "Active Jobs", value: 5, sub: "In progress", icon: <WorkIcon /> },
    { title: "Completed Jobs", value: 9, sub: "Total completed", icon: <CheckCircleIcon /> },
    { title: "Pending Tasks", value: 99, sub: "Awaiting action", icon: <AccessTimeIcon /> },
    { title: "Efficiency Rate", value: "2.8%", sub: "Completion rate", icon: <TrendingUpIcon /> },
    { title: "Issues", value: 7, sub: "High priority", icon: <WarningAmberIcon /> },
     { title: "Efficiency Rate", value: "2.8%", sub: "Completion rate", icon: <TrendingUpIcon /> },
    { title: "Issues", value: 7, sub: "High priority", icon: <WarningAmberIcon /> },
  ]

  // ✅ Jobs data
  const jobs = [
    { title: 'waqas12 (Copy)', customer: 'waqaw12', progress: 'In Progress', worker: 'Unassigned', date: 'Sep 4, 2025' },
    { title: 'waqas12', customer: 'waqaw12', progress: 'In Progress', worker: 'Unassigned', date: 'Sep 3, 2025' },
    { title: 'Small File Test', customer: 'waqaw', progress: 'In Progress', worker: 'Unassigned', date: 'Sep 3, 2025' },
    { title: 'Simple Update Test', customer: 'Test Customer Inc', progress: 'Urgent', worker: 'Unassigned', date: 'Sep 2, 2025' },
    { title: 'Test Created By Fix', customer: 'Test Customer', progress: 'Not Started', worker: 'Unassigned', date: 'Sep 2, 2025' },
    { title: 'Simple Test', customer: 'waqaw', progress: 'In Progress', worker: 'Unassigned', date: 'Sep 2, 2025' },
    { title: 'waqas', customer: 'waqaw', progress: 'Not Started', worker: 'Unassigned', date: 'Sep 2, 2025' },
  ]

  return (
    <MainLayout>
      <Box className="dashboard-container">

        {/* ✅ Welcome Card */}
        <Box className="top-card">
          <Typography className="top-card-title">Welcome back!</Typography>
          <Typography className="top-card-subtitle">
            Here's an overview of your dashboard
          </Typography>
        </Box>

        {/* ✅ Top Stats Section */}
        <Box className="top-stats-container">
          {stats.map((stat, idx) => (
            <Box key={idx} className="stat-card">
              <Box>
                <Typography className="stat-title">{stat.title}</Typography>
                <Typography className="stat-value">{stat.value}</Typography>
                <Typography className="stat-sub">{stat.sub}</Typography>
              </Box>
              <Box className="stat-icon gold-icon">{stat.icon}</Box>
            </Box>
          ))}
        </Box>

        {/* ✅ Recent Jobs Section */}
        <Box className="recent-jobs-section">
          <Box className="section-header">
            <Typography variant="h6">Recent Jobs</Typography>
            <Typography variant="body2">Overview of the latest jobs and their status</Typography>
          </Box>

          <Box className="jobs-table">
            <Box className="table-header">
              <Box className="table-cell">Job Title</Box>
              <Box className="table-cell">Customer</Box>
              <Box className="table-cell">Progress</Box>
              <Box className="table-cell">Worker</Box>
              <Box className="table-cell">Date</Box>
            </Box>

            {jobs.map((job, idx) => (
              <Box key={idx} className="table-row">
                <Box className="table-cell" data-label="Job Title">{job.title}</Box>
                <Box className="table-cell" data-label="Customer">{job.customer}</Box>
                <Box className="table-cell" data-label="Progress">
                  <span
                    className={`status-badge ${
                      job.progress === "In Progress"
                        ? "in-progress"
                        : job.progress === "Urgent"
                        ? "urgent"
                        : "not-started"
                    }`}
                  >
                    {job.progress}
                  </span>
                </Box>
                <Box className="table-cell" data-label="Worker">{job.worker}</Box>
                <Box className="table-cell" data-label="Date">{job.date}</Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </MainLayout>
  )
}

export default DashboardPage

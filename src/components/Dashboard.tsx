import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Users,
  Calendar,
  Activity,
  TrendingUp,
  Bell,
  Plus,
  FileText,
  Clock,
  Heart,
  Leaf,
  Shield,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import aboutUsImage from "../assets/dashboard-ui.jpg";

const dashboardStats = [
  {
    title: "Active Patients",
    value: "142",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
  },
  {
    title: "Diet Plans Created",
    value: "87",
    change: "+8%",
    trend: "up",
    icon: Calendar,
    color: "text-green-600",
  },
  {
    title: "Health Assessments",
    value: "64",
    change: "+15%",
    trend: "up",
    icon: Activity,
    color: "text-purple-600",
  },
  {
    title: "Success Rate",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: TrendingUp,
    color: "text-amber-600",
  },
];

const weeklyData = [
  { day: "Mon", patients: 12, plans: 8 },
  { day: "Tue", patients: 15, plans: 12 },
  { day: "Wed", patients: 18, plans: 14 },
  { day: "Thu", patients: 22, plans: 16 },
  { day: "Fri", patients: 19, plans: 15 },
  { day: "Sat", patients: 8, plans: 6 },
  { day: "Sun", patients: 5, plans: 3 },
];

const recentActivities = [
  {
    id: 1,
    type: "assessment",
    patient: "Sarah Johnson",
    action: "Completed Ayurvedic assessment",
    time: "2 hours ago",
    status: "completed",
  },
  {
    id: 2,
    type: "plan",
    patient: "Michael Chen",
    action: "Diet plan generated",
    time: "4 hours ago",
    status: "new",
  },
  {
    id: 3,
    type: "report",
    patient: "Emma Davis",
    action: "PDF report generated",
    time: "6 hours ago",
    status: "completed",
  },
  {
    id: 4,
    type: "follow-up",
    patient: "John Smith",
    action: "Follow-up appointment scheduled",
    time: "1 day ago",
    status: "scheduled",
  },
];

const notifications = [
  {
    id: 1,
    message: "5 patients need follow-up assessments",
    type: "warning",
    time: "1 hour ago",
  },
  {
    id: 2,
    message: "Weekly report is ready for download",
    type: "info",
    time: "3 hours ago",
  },
  {
    id: 3,
    message: "New recipe added to database",
    type: "success",
    time: "5 hours ago",
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* About Us Section with Complete Image */}
      <div className="relative overflow-hidden animate-slide-scale rounded-3xl border-2 border-[#61803F]/20 shadow-2xl perspective-card">
        <div className="w-full">
          <img
            src={aboutUsImage}
            alt="AyurSync About Us - Bridging ancient Ayurvedic wisdom with cutting-edge nutrition science"
            className="w-full h-auto object-contain"
            style={{ fontFamily: 'Georgia, serif' }}
          />
        </div>
        
        {/* Subtle Overlay for Enhancement */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FEFEFE]/5 via-transparent to-[#FEFEFE]/5 pointer-events-none"></div>
        
        {/* Floating Decorative Elements */}
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#C9C24D]/10 to-[#CA912E]/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-[#84A15D]/10 to-[#61803F]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
      {/* Dashboard Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 glass-morphism rounded-3xl p-8 border-2 border-[#61803F]/20 card-rustic animate-glow perspective-card card-3d-hover neo-morphism">
        <div className="animate-slide-in-left">
          <h2 className="text-3xl text-[#61803F] mb-3 font-bold tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
            Dashboard
          </h2>
        </div>
        <div className="flex gap-4 animate-slide-in-right">
          {/* Removed the 'Generate Report' and 'New Patient' buttons as requested */}
        </div>
      </div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="card-rustic animate-on-scroll perspective-card card-3d-hover neo-morphism"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[#677D5E] mb-2 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                      {stat.title}
                    </p>
                    <p className="text-3xl text-[#61803F] mb-2 font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                      {stat.value}
                    </p>
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-[#84A15D] mr-2" />
                      <span className="text-sm text-[#84A15D] font-semibold" style={{ fontFamily: 'Georgia, serif' }}>
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#C9C24D]/30 to-[#CA912E]/30 border border-[#61803F]/20 transform transition-all duration-700 hover:scale-125 hover:rotate-12 animate-pulse-bright neo-morphism animate-levitate">
                    <Icon className="w-7 h-7 text-[#61803F] drop-shadow-lg" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      {/* Weekly Activity Chart - Full Width */}
      <Card className="card-rustic animate-on-scroll perspective-card card-3d-hover glass-morphism">
        <CardHeader>
          <CardTitle className="text-[#61803F] flex items-center text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
            <Activity className="w-6 h-6 mr-3 text-[#C9C24D]" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#61803F"
                strokeOpacity={0.3}
              />
              <XAxis dataKey="day" stroke="#61803F" fontSize={12} fontWeight={600} />
              <YAxis stroke="#61803F" fontSize={12} fontWeight={600} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#FEFEFE",
                  border: "2px solid #61803F",
                  borderRadius: "16px",
                  boxShadow:
                    "0 8px 30px rgba(97, 128, 63, 0.2)",
                  fontWeight: 600,
                }}
              />
              <Bar
                dataKey="patients"
                fill="#61803F"
                name="Patients"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="plans"
                fill="#C9C24D"
                name="Diet Plans"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <Card className="card-rustic animate-on-scroll perspective-card card-3d-hover glass-morphism">
          <CardHeader>
            <CardTitle className="text-[#61803F] flex items-center text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              <Activity className="w-6 h-6 mr-3 text-[#C9C24D]" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 p-4 rounded-xl glass-morphism border border-[#61803F]/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm card-3d-hover neo-morphism"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-3 h-3 rounded-full bg-[#84A15D] mt-2 animate-pulse-bright" />
                  <div className="flex-1">
                    <p className="text-sm text-[#61803F] font-bold" style={{ fontFamily: 'Georgia, serif' }}>
                      {activity.patient}
                    </p>
                    <p className="text-sm text-[#677D5E] font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                      {activity.action}
                    </p>
                    <div className="flex items-center mt-2">
                      <Clock className="w-4 h-4 text-[#84A15D] mr-2" />
                      <span className="text-xs text-[#677D5E] font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                        {activity.time}
                      </span>
                      <Badge
                        variant="secondary"
                        className="ml-3 text-xs bg-[#C9C24D]/25 text-[#61803F] border-[#61803F]/20 font-semibold"
                      >
                        {activity.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="card-rustic animate-on-scroll perspective-card card-3d-hover glass-morphism">
          <CardHeader>
            <CardTitle className="text-[#61803F] flex items-center text-xl font-bold" style={{ fontFamily: 'Georgia, serif' }}>
              <Bell className="w-6 h-6 mr-3 text-[#C9C24D]" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification, index) => (
                <div
                  key={notification.id}
                  className="p-4 rounded-xl glass-morphism border border-[#61803F]/20 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl backdrop-blur-sm card-3d-hover neo-morphism"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between">
                    <p className="text-sm flex-1 text-[#61803F] font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                      {notification.message}
                    </p>
                    <Badge
                      variant={
                        notification.type === "warning"
                          ? "destructive"
                          : "secondary"
                      }
                      className="ml-3 text-xs bg-[#C9C24D]/25 text-[#61803F] border-[#61803F]/20 font-semibold"
                    >
                      {notification.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-[#677D5E] mt-2 font-medium" style={{ fontFamily: 'Georgia, serif' }}>
                    {notification.time}
                  </p>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4 btn-rustic-outline" style={{ fontFamily: 'Georgia, serif' }}>
              View All Notifications
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
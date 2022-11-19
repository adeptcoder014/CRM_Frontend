import DashboardLayout from "../../components/layout/dashboard-layout";

export default function Page() {
  return <h1>Yet another Page</h1>;
}
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

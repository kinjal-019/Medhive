import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export default function PatientLayout(){
 const {user,logout}=useAuth();
 return <PortalLayout title="Patient Portal" user={user} logout={logout} links={[
  ["/patient","Dashboard"],["/patient/search","Find Practitioner"],["/patient/appointments","Appointments"],["/patient/prescriptions","Prescriptions"],["/patient/queue","Queue Status"],["/patient/feedback","Feedback"]
 ]}><Outlet/></PortalLayout>
}
function PortalLayout({title,user,logout,links,children}){
 return <div className="app-shell"><aside><div className="brand">Med<span>Hive</span></div><p className="role">{title}</p><nav>{links.map(([to,label])=><Link key={to} to={to}>{label}</Link>)}</nav><button className="ghost" onClick={logout}>Log out</button></aside><main><header><div><p className="eyebrow">Welcome back</p><h1>{user?.name}</h1></div><div className="avatar">{user?.name?.[0]?.toUpperCase()}</div></header>{children}</main></div>
}
export {PortalLayout};

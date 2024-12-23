import { ReactElement } from "react";
import "./index.scss";

export default function HealthCheck() {

  const ServiceList = [
    "quickqemu", "bridge-utils"
  ]

  return (
    <>
      {
        ServiceList.map((service: string): ReactElement => {
          return (
            <div className="healthcheck flex items-center" >
              <div className="health-status w-[15px] h-[15px] rounded-full bg-red-700"></div>
              <span className="health-status-check ml-1">{service}</span>
            </div >
          )
        })
      }
    </>
  );
}

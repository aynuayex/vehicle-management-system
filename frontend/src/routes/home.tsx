import vehicle from "@/assets/vehicle.svg";

export default function HomePage() {
  return (
    <div className="flex flex-col md:gap-y-10">
      <div className="md:text-3xl font-bold tracking-tight">
        <span id="typewriter-text">Vehicle information management system</span>
      </div>
      <div className="flex flex-col items-center space-y-6 md:flex-row md:items-center md:justify-around ">
        <div className="">
          <img src={vehicle} alt="Vehicle" width={350} height={100} />
        </div>
        <div className="md:w-3/5 ">
          <p className="mb-4">
            Our Vehicle Management System (VMS) delivers streamlined vehicle
            management services. It features a user-friendly interface for
            displaying vehicle lists, providing easy access to essential details
            such as vehicle type, plate number, and owner information.
            Admins can effortlessly add, edit, or delete vehicle records, with
            built-in confirmation prompts for safe deletion.
          </p>
          <p>
            Dynamic updates ensure real-time changes to the vehicle list without
            the need for manual refreshes. VMS integrates seamlessly with Mongodb
            databases via APIs for secure and reliable data storage. With
            VMS, fleet operators and businesses can optimize vehicle management
            processes and improve operational efficiency.
          </p>
        </div>
      </div>
    </div>
  );
}

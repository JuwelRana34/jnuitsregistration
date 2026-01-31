
import BCCRegistrationForm from "@/components/BCCRegistrationForm";
import BccDescription from "./_components/BccDescription";


export default function BCCPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-2 flex flex-col md:flex-row gap-8">
        <div className="md:w-5/12">
          {/* BCC Description Section */}
          <BccDescription />
        </div>
        <div className="md:w-7/12">
          {/* Registration Form Section */}
          <BCCRegistrationForm />
        </div>
      </div>
    </div>
  );
}
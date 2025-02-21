import Header from "@/components/Header";
import UploadContainer from "./_components/upload-container";
import BackgroundsList from "./_components/backgrounds-list";

export default function HomePage() {
  return (
    <main>
      <Header type="primary" />
      <div className="px-5 py-12">
        <div className="w-3/4">
          <h2 className="font-bricolage text-2xl font-bold capitalize">
            Apply your favourite image as your DP's background.
          </h2>
          <p className="mt-4 font-medium text-app-gray-dark">
            Effortlessly change backgrounds with our easy to use tools.
          </p>
        </div>

        <UploadContainer />
        <BackgroundsList />
      </div>
    </main>
  );
}

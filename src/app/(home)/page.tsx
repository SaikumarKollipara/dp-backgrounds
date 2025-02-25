import Header from "@/components/Header";
import UploadContainer from "./_components/upload-container";
import BackgroundsList from "./_components/backgrounds-list";

export default function HomePage() {
  return (
    <main>
      <Header type="primary" />
      <div className="mx-auto max-w-6xl px-5 py-12 md:px-12">
        <div className="w-3/4 md:mx-auto md:w-full md:text-center">
          <h2 className="font-bricolage text-3xl font-bold capitalize md:text-5xl md:font-extrabold md:leading-tight">
            Apply your favourite image as your DP's background.
          </h2>
          <p className="mt-4 font-medium text-app-gray-dark md:mx-auto md:w-3/4">
            change backgrounds with our easy to use tools. Effortlessly
            transform your photos in seconds by removing backgrounds and
            blending them with any image you prefer.
          </p>
        </div>

        <UploadContainer />
        <BackgroundsList />
      </div>
    </main>
  );
}

export default function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex bg-black">
      <div
        className="hidden lg:flex w-full lg:w-1/2 login_img_section
          justify-around items-center"
      >
        <div className="w-full mx-auto px-20 flex-col items-center space-y-6">
          <h1 className="text-white font-bold text-4xl font-sans">
            Cursilho de Cristantade
          </h1>
          <p className="text-white mt-1">Igreja Cristã em Recife</p>
          <div className="flex justify-center lg:justify-start mt-6">
            <a
              href="https://www.instagram.com/igrejacristaemrecife/"
              target="_blank"
              className="hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-white text-indigo-800 mt-4 px-4 py-2 rounded-2xl font-bold mb-2"
            >
              Conheça a Igreja
            </a>
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 justify-center items-center bg-black space-y-8">
        <div className="w-full px-4 md:px-32 lg:px-24 py-10 h-screen">
          <div className="w-full max-w-lg h-full overflow-y-scroll scrollbar-hide px-3 bg-fuchsia-200 border-gray-400 rounded-lg pt-5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

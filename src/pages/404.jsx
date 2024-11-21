import Link from "next/link";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-slate-900">
      <img
        src="/images/404.gif"
        alt="404 Image"
        className="object-cover max-w-sm md:max-w-lg md:w-2/5"
      />
      <p className="px-10 py-5 font-medium text-center text-white border-t border-slate-400">
        Page you are looking for does not exist. Go to{" "}
        <Link
          href={"/"}
          className="duration-200 ease-linear text-sky-600 hover:text-sky-400 hover:underline"
        >
          Homepage
        </Link>
      </p>
    </div>
  );
};

export default ErrorPage;

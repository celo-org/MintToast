type Props = {};

const PageNotFound = (props: Props) => {
  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <img src="/images/404.png" alt="404" className="w-1/2" />
      <span className="font-bold text-lg">Page not Found</span>
    </div>
  );
};

export default PageNotFound;

type Props = {};

function Loading({}: Props) {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img src="/images/loading.png" alt="loading" className="w-1/3" />
      <span className="mt-6 font-bold">Loading...</span>
    </div>
  );
}

export default Loading;

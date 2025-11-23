import { Link } from "react-router-dom";
const Certificates = () => {
  return (
    <div className="flex flex-col justify-center items-center max-h-screen gap-6 mt-10">
      {" "}
      <header className="text-5xl font-bold mb-10">Certificates</header>
      <div className="carousel carousel-center bg-neutral rounded-box min-w-full space-x-4 p-4">
        <div className="carousel-item">
          <Link to="/">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/certificates">
            <img
              src="https://img.daisyui.com/images/stock/photo-1565098772267-60af42b81ef2.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/about">
            <img
              src="https://img.daisyui.com/images/stock/photo-1572635148818-ef6fd45eb394.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/contact">
            <img
              src="https://img.daisyui.com/images/stock/photo-1494253109108-2e30c049369b.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/contact">
            <img
              src="https://img.daisyui.com/images/stock/photo-1550258987-190a2d41a8ba.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/contact">
            <img
              src="https://img.daisyui.com/images/stock/photo-1559181567-c3190ca9959b.webp"
              className="rounded-box"
            />
          </Link>
        </div>
        <div className="carousel-item">
          <Link to="/contact">
            <img
              src="https://img.daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.webp"
              className="rounded-box"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Certificates;
